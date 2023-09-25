---
title: "[IT] 事件總線 EventBus"
keywords: ["EventBus", "MacOS", "cocoa"]
description:
date: 2023-09-25T23:50:02+08:00
tags: ["IT"]
draft: false
Categories: "IT"
author: "Rain Hu"
showToc: true
TocOpen: true
math: true
mermaid: true
hidemeta: false
canonicalURL: "https://intervalrain.github.io/"
disableHLJS: true
disableShare: true
disableHLJS: false
hideSummary: false
searchHidden: false
ShowReadingTime: true
ShowBreadCrumbs: true
ShowPostNavLinks: true
ShowCodeCopyButtons: true
---

# EventBus

![eventBus](http://www.skcircle.com/zb_users/upload/2021/07/20210708201740162574666058856.png)

+ EventBus 用於維護一個事件源與事件處理的映射字典
+ 通過 Singleton，確保 EventBus 的唯一入口
+ 利用反射完成事件源與件事處理的初始化綁定
+ 提供統一的事件注冊(register)、取消注冊(unsubscribe)和觸發(trigger)。

## Interfaces
### IEventData
```csharp
public interface IEventData
{
    DateTime EventTime { get; set; }
    object EventSource {get; set; }
}
```
### IEventHandler
```csharp
public interface IEventHandler
{
}
```
### IEventHandler`1
```csharp
public interface IEventHandler<TEventData> : IEventHandler where TEventData : IEventData
{
    void HandlerEvent(TEventData eventData);
}
```

## base class
### EventData
```csharp
public class EventData : IEventData
{
    public DateTime EventTIme { get; set; }
    object EventSource { get; set; }

    public EventData()
    {
        EventTime = DateTime.Now;
    }
}
```

## Domain
### FishType
```csharp
public enum FishType
{
    None,
    鯽魚,
    鯉魚,
    黑魚,
    青魚,
    草魚,
    鱸魚
}
```
### FishingEventData : EventData
```csharp
public class FishingEventData : EventData
{
    public FishType FishType { get; set; }
    public FishingMan FishingMan { get; set; }
}
```

### FishingEventHandler : IEventHandler
```csharp
public class FishingEventHandler : IEventHandler<FishingEventData>
{
    public void HandleEvent(FishingEventData eventData)
    {
        var type = eventData.FishType;
        var fishMan = eventData.FishingMan;
        
        var Name = fishMan.Name;

        if (type == FishType.None)
        {
            fishMan.Message = string.Format("{0}: 沒有釣到魚, 累計釣了{1}條魚", Name, fishMan.FishCount);
        }
        else
        {
            fishMan.FishCount++;
            fishMan.Message = string.Format("{0}: 釣到一條[{2}], 累計釣了{1}條魚", Name, fishMan.FishCount, type);
        }
    }
}
```

### FishingMan
```csharp
public class FishingMan
{
    public string Name { get; set; }
    public int FishCount { get; set; }
    public FishingRod FishingRod { get; set; }

    public string Message { get; set; }

    public FishingMan(string name)
    {
        Name = name;
        FishCount = 0;
    }

    public void Fishing()
    {
        FishingRod.ThrowHook(this);
    }
}
```

### FishingRod
+ 用反射註冊事件
```csharp
public class FishingRod
{
    public string Message { get; private set; }

    public FishingRod()
    {
    }

    public void ThrowHook(FishingMan man)
    {
        if (new Random().Next() % 2 == 0)
        {
            var type = (FishType)(new Random().Next(0, 5) + 1);
            Message = ("魚兒上鉤了!");
            if (FishingEvent != null)
            {
                var eventData = new FishingEventData
                {
                    FishingMan = man,
                    FishType = type
                };
                EventBus.Default.Trigger<FishingEventData>(eventData);
            }
        }
        else
        {
            var type = FishType.None;
            Message = ("可惜了!");
            if (FishingEvent != null)
            {
                var eventData = new FishingEventData
                {
                    FishingMan = man,
                    FishType = type
                };
                EventBus.Default.Trigger<FishingEventData>(eventData);
            }
        }
    }
}
```

## EventBus 實作
+ 用一個靜態單例來統一管理事件
```csharp
public class EventBus
{
	public static EventBus Default => new EventBus();

	private readonly ConcurrentDictionary<Type, List<Type>> _eventAndHandlerMapping;

	private EventBus()
	{
		_eventAndHandlerMapping = new ConcurrentDictionary<Type, List<Type>>();
		MapEventToHandler();
	}

	private void MapEventToHandler()
	{
		Assembly assembly = Assembly.GetEntryAssembly();
		foreach (var type in assembly.GetTypes())
		{
			if (typeof(IEventHandler).IsAssignableFrom(type))
			{
				Type handlerInterface = type.GetInterface("IEventHandler`1");
				if (handlerInterface == null) continue;
				Type eventDataType = handlerInterface.GetGenericArguments()[0];

				if (_eventAndHandlerMapping.ContainsKey(eventDataType))
				{
					List<Type> handlerTypes = _eventAndHandlerMapping[eventDataType];
					handlerTypes.Add(type);
					_eventAndHandlerMapping[eventDataType] = handlerTypes;
				}
				else
				{
					var handlerTypes = new List<Type> { type };
					_eventAndHandlerMapping[eventDataType] = handlerTypes;
				}
			}
		}
	}

	public void Register<TEventData>(Type eventHandler)
	{
		List<Type> handlerTypes = _eventAndHandlerMapping[typeof(TEventData)];
		if (!handlerTypes.Contains(eventHandler))
		{
			handlerTypes.Add(eventHandler);
			_eventAndHandlerMapping[typeof(TEventData)] = handlerTypes;
		}
	}

	public void Unsubscribe<TEventData>(Type eventHandler)
	{
        List<Type> handlerTypes = _eventAndHandlerMapping[typeof(TEventData)];
        if (!handlerTypes.Contains(eventHandler))
        {
            handlerTypes.Remove(eventHandler);
            _eventAndHandlerMapping[typeof(TEventData)] = handlerTypes;
        }
    }

	public void Trigger<TEventData>(TEventData eventData) where TEventData : IEventData
	{
        List<Type> handlers = _eventAndHandlerMapping[eventData.GetType()];
		if (handlers != null && handlers.Count > 0)
		{
			foreach (var handler in handlers)
			{
				MethodInfo methodInfo = handler.GetMethod("HandleEvent");
				if (methodInfo != null)
				{
					object obj = Activator.CreateInstance(handler);
					methodInfo.Invoke(obj, new object[] { eventData });
				}
			}
		}
    }
}
```


# demo
+ MacOs Cocoa Project
```csharp
public partial class ViewController : NSViewController
{
    public ViewController (IntPtr handle) : base (handle)
    {
    }

    public override void ViewDidLoad ()
    {
        base.ViewDidLoad ();

        jeff = new FishingMan("Jeff");
        rod = new FishingRod();
        jeff.FishingRod = rod;
        EventBus eventBus = EventBus.Default;
        eventBus.Register<FishingEventData>(typeof(FishingEventHandler));
    }
    
    FishingMan jeff;
    FishingRod rod;

    public override NSObject RepresentedObject {
        get {
            return base.RepresentedObject;
        }
        set {
            base.RepresentedObject = value;
        }
    }

    partial void Button_Click(NSButton sender)
    {
        jeff.Fishing();
        TextLabel.StringValue = rod.Message;
        TextLabel2.StringValue = jeff.Message ?? "";
    }
}
```