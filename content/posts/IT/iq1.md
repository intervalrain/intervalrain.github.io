---
title: "[IT] LINQ: IQueryable Provider"
keywords: ["LINQ", "C#", "SQL", "DB"]
description: "一系列關於如何建立 LINQ IQueryable Provider 的文章，每篇都是建立在前一篇的基礎上。"
date: 2023-09-21T11:34:15+08:00
tags: ["LINQ", "C#", "IQueryable"]
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
# 可重複使用的 IQueryable 基類
## IQueryable 簡介
　　在 C# 最新版本中的 `IQueryable` 已經不再是一個介面，而是分為兩個部分： `IQueryable` 與 `IQueryProvider`。在開始實作之前，我們必須先了解一下這兩個介面。
```csharp
public interface IQuerable : IEnumerable
{
    Type ElementType { get; }
    Expression Expression { get; }
    IQueryProvider Provider { get; }
}

public interface IQueryable<T> : IEnumerable<T>, IQueryable, IEnumerable
{
}
```
　　`IQueryable` 有三個唯讀屬性：
1. `ElementType` 代表了元素的類型 (或等於 `IQueryable<T>` 中的 `T`)
2. `Expression` 代表了查詢對應的表達式。這是 `IQueryable` 存在的核心要素。在 `IQueryable` 的內部，實際上是一個表示查詢的表達式，它將查詢表示為 LINQ 查詢運算子/方法調用的樹狀結構。如果進一步看，你會發現，`IQueryable` 或是 `Queryable` 都只是在提供一個自動構建表達式樹節點 (expression tree nodes) 的機制。當我們對 `IQeuryable` 使用 `Where` 方法時，它只是回傳一個新的 `IQueryable`，並且在進行調用的樹頂添加一個方法表達式樹節點。
3. `Provider` 作為真正的「提供者」，它負責原先所有 `IQueryable` 的執行方法。

## IQueryProvider 簡介
```csharp
public interface IQueryProvider
{
    IQueryable CreateQuery(Expression expression);
    IQueryable<TElement> CreateQuery<TElement>(Expression expression);
    object Execute(Expression expression);
    TResult Execute<TResult>(Expression expression);
}
```
　　當我們進一步觀察 `IQueryProvider`，會發現它事實上只有兩個操作：`CreateQuery`、`Execute`，只是各有一個泛型與非泛型的方法。一般我們會使用泛型的方法，因為它可以避免使用反射來建構實例，從而提高性能。  
1. `CreateQuery` 人如其名，它基於指定的表達樹建構 `IQueryable` 的實例。標準查詢運算子 `Queryable` 會使用這個方法來建構與 Provider 相關聯的新的 `IQueryable`。
    + 需注意，使用者可以任意向 API 傳遞任何可能的表達樹，甚至不是合法的查詢，然而，它的回傳值必定要是 `IQueryable`。
2. `Execute` 是進入 Provider 的入口，用於實際執行查詢表達式。擁有一個明確的執行方法而不僅僅依賴於 `IEnumerable.GetEnumerator()` 是非常重要的，因為它允許執行時不一定要產生序列。比方說，`myquery.Count()` 回傳一個整數，該查詢的表達樹是調用一個 Count 方法並回傳整數，其它的聚合方法也是同樣的道理，都是即時的執行方法。

## Query 實作 IQueryable
　　首先，我們從 `IQueryable` 開始，因為現在這個介面被分為兩個部分，所以我們可以只實現 `IQueryable` 一次，並在其它的 `QueryProvider` 中重複使用它。
```csharp
public class Query<T> : IQueryable<T>, IQueryable, IEnumerable<T>, IEnumerable, IOrderedQueryable<T>, IOrderedQueryable
{
    QueryProvider provider;
    Expression expression;
    public Query(QueryProvider provider)
    {
        if (provider == null)
            throw new ArgumentNullException("provider");
        this.provider = provider;
        this.expression = Expression.Constant(this);
    }

    public Query(QueryProvider provider, Expression expression)
    {
        if (provider == null)
            throw new ArgumentNullException("provider");
        if (expression == null)
            throw new ArgumentNullException("expression");
        if (!typeof(IQueryable<T>).IsAssignableFrom(expression.Type))
            throw new ArgumentOutOfRangeException("expression");
        this.provider = provider;
        this.expression = expression;
    }

    Expression IQueryable.Expression
    {
        get { return this.expression; }
    }

    Type IQueryable.ElementType
    {
        get { return typeof(T); }
    }

    IQueryProvider IQueryable.Provider
    {
        get { return this.provider; }
    }

    public IEnumerator<T> GetEnumerator()
    {
        return ((IEnumerable<T>)this.provider.Execute(this.expression)).GetEnumerator();
    }

    IEnumerator IEnumerable.GetEnumerator()
    {
        return ((IEnumerable)this.provider.Execute(this.expression)).GetEnumerator(); 
    }

    public override string ToString()
    {
        return this.provider.GetQueryText(this.expression);
    }
}
```
　　如你所見，上面的 `Query` 只用來保存一個 `Expression` 與一個 `Provider`。Provider才是真正核心的地方。
## QueryProvider 實作 IQueryProvider
```csharp
public abstract class QueryProvider : IQueryProvider
	{
		public QueryProvider()
		{
		}

        IQueryable<S> IQueryProvider.CreateQuery<S>(Expression expression)
		{
			return new Query<S>(this, expression);
		}
		IQueryable IQueryProvider.CreateQuery(Expression expression)
		{
			Type elementType = TypeManager.GetElementType(expression.Type);

			try
			{
				return (IQueryable)Activator.CreateInstance(typeof(Query<>).MakeGenericType(elementType), new object[] { this, expression });
			}
			catch (Exception tie)
			{
				throw tie.InnerException;
			}
		}

		S IQueryProvider.Execute<S>(Expression expression)
		{
			return (S)this.Execute(expression);
		}

		object IQueryProvider.Execute(Expression expression)
		{
			return this.Execute(expression);
		}

		public abstract string GetQueryText(Expression expression);

		public abstract object Execute(Expression expression);
    }
```
　　我們先是用 `QueryProvider` 實作了 `IQueryProvider` 的基類別。這些 `CreateQuery` 方法創建了 `Query<T>` 的新實例，並將執行轉發到尚未實作的 `Execute` 方法。  
　　接下來我們可以將之視為樣板，只是為了開始建立一個 LINQ 的 `IQueryable` 的 provider。真正的執行將會發生在 `Execute` 的內部，屆時，provider 可以真正通過檢查表達樹來理解查詢的含義。

## [Helper] TypeManager
　　TypeManager 用來處理非泛型的方法，檢查其型別。
```csharp
internal static class TypeManager
{
    internal static Type GetElementType(Type seqType)
    {
        Type? ienum = FindIEnumerable(seqType);
        if (ienum == null) return seqType;
        return ienum.GetGenericArguments()[0];
    }

    private static Type? FindIEnumerable(Type seqType)
    {
        if (seqType == null || seqType == typeof(string))
            return null;
        if (seqType.IsArray)
            return typeof(IEnumerable<>).MakeGenericType(seqType.GetElementType());
        if (seqType.IsGenericType)
        {
            foreach (Type arg in seqType.GetGenericArguments())
            {
                Type ienum = typeof(IEnumerable<>).MakeGenericType(arg);
                if (ienum.IsAssignableFrom(seqType))
                    return ienum;
            }
        }

        Type[] ifaces = seqType.GetInterfaces();

        if (ifaces != null && ifaces.Length > 0)
        {
            foreach (Type iface in ifaces)
            {
                Type? ienum = FindIEnumerable(iface);
                if (ienum != null)
                    return ienum;
            }
        }

        if (seqType.BaseType != null && seqType.BaseType != typeof(object) )
        {
            return FindIEnumerable(seqType.BaseType);
        }

        return null;
    }
}
```

# Where 和可重複使用的表達樹詢問器 (Expression tree visitor)
　　在建立好基類別 `Query` 與 `QueryProvider` 後，我們將繼續建立一個實際執行某些操作的 provider。Query Provider 實際上執行的是一小最被定義為表達樹的程式碼，而不是 IL。當然，它不需要傳統意義上的方式執行它，例如 LINQ to SQL 將查詢表達式轉換為 SQL，並將其發送到伺服器上執行。  
　　接下來的範例將會舉 LINQ to SQL 很相近，它會將查詢翻譯並執行到一個 ADO provider。在此，我們只打算處理 `Where` 這個操作，不會做其它更複雜的判斷。將來可能會對它進行擴展，但目前僅為了說明目的。  
　　要注意 provider 必須要做到兩件事：
1. 將查詢轉換成 SQL。
2. 將執行命令的結果轉換成物件。
## 查詢翻譯器 (Query Translator)
　　查詢翻譯器將簡單地訪問表達樹中的每個節點，並使用 StringBuilder 將操作轉換成文本。為了說明方便，我們在這裡假設有個 `ExpressionVisitor` 類，為表達樹節點定義了基本的訪問者模式。
```csharp
internal class QueryTranslator : ExpressionVisitor
{
    StringBuilder sb;

    internal QueryTranslator()
    {
    }

    internal string Translate(Expression expression)
    {
        sb = new StringBuilder();
        Visit(expression);
        return sb.ToString();
    }

    private static Expression StripQuotes(Expression e)
    {
        while (e.NodeType == ExpressionType.Quote)
        {
            e = ((UnaryExpression)e).Operand;
        }
        return e;
    }

    protected override Expression VisitMethodCall(MethodCallExpression m)
    {
        if (m.Method.DeclaringType == typeof(Queryable) && m.Method.Name == "Where")
        {
            sb.Append("Select * From (");
            Visit(m.Arguments[0]);
            sb.Append(") As T Where ");
            LambdaExpression lambda = (LambdaExpression)StripQuotes(m.Arguments[1]);
            Visit(lambda.Body);
            return m;
        }
        throw new NotSupportedException(string.Format("The method '{0}' is not supported", m.Method.Name));
    }

    protected override Expression VisitUnary(UnaryExpression u)
    {
        switch (u.NodeType)
        {
            case ExpressionType.Not:
                sb.Append(" Not ");
                Visit(u.Operand);
                break;
            default:
                throw new NotSupportedException(string.Format("The unary operator '{0}' is not supported", u.NodeType));
        }
        return u;
    }

    protected override Expression VisitBinary(BinaryExpression b)
    {
        sb.Append("(");
        Visit(b.Left);
        switch (b.NodeType)
        {
            case ExpressionType.Add:
                sb.Append(" And ");
                break;
            case ExpressionType.Or:
                sb.Append(" Or ");
                break;
            case ExpressionType.Equal:
                sb.Append(" = ");
                break;
            case ExpressionType.NotEqual:
                sb.Append(" <> ");
                break;
            case ExpressionType.LessThan:
                sb.Append(" < ");
                break;
            case ExpressionType.LessThanOrEqual:
                sb.Append(" <= ");
                break;
            case ExpressionType.GreaterThan:
                sb.Append(" > ");
                break;
            case ExpressionType.GreaterThanOrEqual:
                sb.Append(" >= ");
                break;
            default:
                throw new NotSupportedException(string.Format("The binary operator '{0}' is not supported", b.NodeType));
        }
        Visit(b.Right);
        sb.Append(")");
        return b;
    }

    protected override Expression VisitConstant(ConstantExpression c)
    {
        IQueryable? q = c.Value as IQueryable;

        if (q != null)
        {
            sb.Append("Select * From ");
            sb.Append(q.ElementType.Name);
        }
        else if (c.Value == null)
        {
            sb.Append("Null");
        }
        else
        {
            switch (Type.GetTypeCode(c.Value.GetType()))
            {
                case TypeCode.Boolean:
                    sb.Append(((bool)c.Value) ? 1 : 0);
                    break;
                case TypeCode.String:
                    sb.Append("'");
                    sb.Append(c.Value);
                    sb.Append("'");
                    break;
                case TypeCode.Object:
                    throw new NotSupportedException(string.Format("The constant for '{0}' is not supported", c.Value));
                default:
                    sb.Append(c.Value);
                    break;
            }
        }
        return c;
    }

    protected override Expression VisitMemberAccess(MemberExpression m)
    {
        if (m.Expression != null && m.Expression.NodeType == ExpressionType.Parameter)
        {
            sb.Append(m.Member.Name);
            return m;
        }

        throw new NotSupportedException(string.Format("The member '{0}' is not supported", m.Member.Name))
    }
}
```
　　儘管我們只針對 `Where` 進行了實作，但仍然相當的複雜。我希望在表達樹中看到的是一個方法的調用，其中參數引用了資料源(source, arg[0])，與謂詞(predicate, arg[1])。參考 `VisitMethodCall` 方法，我們明確地處理了 `Queryable.Where` 方法，生成一個 `"Select * From ("` 的字串，然後遞迴訪問資料源後，加上了 `) As T Where`，最後再訪問謂詞。這樣可以用嵌套的方式處理資料源中可能出現子查詢的可能。在不考慮其它操作子的情況下，我們可以很優雅的處理 `Where` 方法。在此表的別名是無關的，因為我們並無對它做任何引用，當然在一個完善的 provider，將有可能對它進行引用。  
　　這裡包含了一個 helper `StripQuotes`，它的作用是去除方法參數中的任何 `ExpressionType.Quote` 節點，以便取得純粹的 lambda 表達式。  
　　`VisitUnary` 和 `VisitBinary` 方法很直白，它們將一元與二元運算子翻譯成文本。  
　　`VisitConstant`，在我們的架構中，我們的源引用(table reference)其實就是 `IQueryable` 的根。如果有一個常數根作為 `Query<T>` 實例，那麼我們可以假設它代表源引用(子查詢)，所以我們可以用 `"Select * From"` 與查詢元素類型的名稱(ElementType.Name)，即表的名稱。至於其它的常數節點，就是簡單的實際常數，對文本需要以加上單引號。注意，**在此並無處理 SQL injection**，真正的 provider 需要處理這一部分。  
　　最後，`VisitMemberAccess` 假設所有的欄位或屬性存取都是指令文字中的欄位參考。在這裡省略了證明，並假設欄位或屬性的名稱與資料庫中的欄位名稱相符。  
　　給定一個 `Product` 類別，其欄位與 `All_product` 資料庫中的欄位名稱相符，此查詢轉譯器將生成以下形式的查詢：
```csharp
Query<Product> products = ...;
IQueryable<Product> q = products.Where(p => p.Generation = "L22");
```
　　對應的 SQL 語句：
```sql
Select * From (
    Select * From Customers
) As T Where (Generation = 'L22')
```

## 物件閱讀器 (Object Reader)
　　物件閱讀器的工作是將 SQL 查詢的結果轉換為物件。這裡會建立一個簡單的類別，在建構子中會需要一個 `DbDataReader`，並且接受一個泛型類型 T 以繼承 `IEnumerable<T>`。實作的部分也沒有什麼花俏的，只能透過射將數據寫入類別的 fields 中，所以需要注意的只有 field 的名稱需要跟 reader 中的欄位名稱相符、類型也必須要相符。
```csharp
internal class ObjectReader<T> : IEnumerable<T>, IEnumerable where T : class, new()
{
    Enumerator? enumerator;
    public ObjectReader(DbDataReader reader)
    {
        enumerator = new Enumerator(reader);
    }

    public IEnumerator<T> GetEnumerator()
    {
        Enumerator? e = enumerator;
        if (e == null)
            throw new InvalidOperationException("Cannot enumerate more than once");
        enumerator = null;
        return e;
    }

    IEnumerator IEnumerable.GetEnumerator()
    {
        return GetEnumerator();
    }

    class Enumerator : IEnumerator<T>, IEnumerator, IDisposable
    {
        DbDataReader reader;
        FieldInfo[] fields;
        int[] fieldLookup;
        T current;

        internal Enumerator(DbDataReader reader)
        {
            this.reader = reader;
            this.fields = typeof(T).GetFields();
        }

        public T Current => current;

        object IEnumerator.Current => current;

        public bool MoveNext()
        {
            if (reader.Read())
            {
                if (fieldLookup == null)
                {
                    InitFieldLookup();
                }
                T instance = new T();
                for (int i = 0, n = fields.Length; i < n; i++)
                {
                    int index = fieldLookup[i];
                    if (index >= 0)
                    {
                        FieldInfo fi = fields[i];
                        if (reader.IsDBNull(index))
                        {
                            fi.SetValue(instance, null);
                        }
                        else
                        {
                            fi.SetValue(instance, reader.GetValue(index));
                        }
                    }
                }
                current = instance;
                return true;
            }
            return false;
        }

        public void Reset()
        {
        }

        public void Dispose()
        {
            reader.Dispose();
        }

        private void InitFieldLookup()
        {
            var map = new Dictionary<string, int>(StringComparer.InvariantCultureIgnoreCase);
            for (int i = 0, n = reader.FieldCount; i < n; i++)
            {
                map.Add(reader.GetName(i), i);
            }
            fieldLookup = new int[fields.Length];
            for (int i = 0, n = fields.Length; i < n; i++)
            {
                if (map.TryGetValue(fields[i].Name, out int index))
                {
                    fieldLookup[i] = index;
                }
                else
                {
                    fieldLookup[i] = -1;
                }
            }
        }
    }
}
```
　　`ObjectReader` 為每一行由 `DbDataReader` 讀取的類型 `T` 創建一個新的實例。它使用反射 API `FieldInfo.SetValue` 為對象物件的每個 field 分配值。當 `ObjectReader` 首次創建時，它實例化嵌套的 `Enumerator` 類的實例。當調用 `GetEnumerator` 方法時，將分發此枚舉器。由於 `DataReader` 無法重置並再次執行，因此枚舉器只能分發一次。如果第二次調用 `GetEnumerator`，則會拋出異常。  
　　`ObjectReader` 在 field 上的排序是寬鬆的。由於 `QueryTranslator` 使用了 `Select *` 建構查詢，這是必須的，否則程式無法知道結果中哪個欄位會首先出現。注意，一般程式中不建議使用 `Select *`。為了允許不同欄的順序，在讀取 `DataReader` 的第一行時，精確的順序會在執行期被定義。`InitFieldLookup` 方法構建了一個從欄位名稱對欄位索引對映射，並組裝了一個查找表 `fieldLookup`，用於將物件的 fields 與索引進行映射。

## 提供者 (Provider)
　　現在我們已經有了 `IQueryable` 與 `QueryProvider` 的基礎建設，要將它們結合在一起製作一個實際的 `IQueryable` LINQ Provider 就很容易了。
```csharp
public class DbQueryProvider : QueryProvider
{
    private readonly DbConnection connection; 

    public DbQueryProvider(DbConnection connection)
    {
        this.connection = connection;
    }

    public override string GetQueryText(Expression expression)
    {
        return Translate(expression);
    }

    public override object Execute(Expression expression)
    {
        DbCommand cmd = connection.CreateCommand();
        cmd.CommandText = Translate(expression);
        DbDataReader reader = cmd.ExecuteReader();
        Type elementType = TypeManager.GetElementType(expression.Type);

        return Activator.CreateInstance(
            typeof(ObjectReader<>).MakeGenericType(elementType),
            BindingFlags.Instance | BindingFlags.NonPublic, null,
            new object[] { reader },
            null);
    }

    private string Translate(Expression expression)
    {
        return new QueryTranslator().Translate(expression);
    }
}
```

## Try it out
現在有了 provider，我們可以按照 LINQ to SQL 模型進行操作。
```csharp
public class Customers
{
    public string CustomerId;
    public string ContactName;
    public string Phone;
    public string City;
    public string Country;
}

public class Orders
{
    public int OrderId;
    public string CustomerId;
    public DateTime OrderDate;
}

public class Northwind
{
    public Query<Customers> Customers;
    public Query<Orders> Orders;

    public Northwind(DbConnection connection)
    {
        QueryProvider provider = new DbQueryProvider(connection);
        Customers = new Query<Customers>(provider);
        Orders = new Query<Orders>(provider);
    }
}

public class Program
{
    public static void Main(string[] args)
    {
        string connstr = @"...";

        using (var conn = new SqlConnection(connstr))
        {
            conn.Open();
            Northwind db = new Northwind(conn);

            IQueryable<Customers> query = 
                db.Customers.Where(c => c.City == "London");
            
            Console.WriteLine("Query:\n{0}\n", query);

            var list = query.ToList();

            foreach (var item in list)
            {
                Console.WriteLine("Name: {0}", item.ContactName);
            }

            Console.ReadLine();
        }
    }
}
```

## [Helper] 表達式訪問者 (Expression Visitor)
　　這個表達式訪問者是一種訪問者模式的呈現。在這個變體中，只有一個訪問者類別，將調用分派到對應於不同節點類型的特定 `VisitXXX` 方法的一般訪問函數。注意，並非每個節點類型都有自己的方法，例如所有二元運算子都在一個 `VisitBinary` 方法中處理。節點本身不直接參與訪問的過程，它們只被視為數據。這樣做的原因是訪問者的數量實際上是開放的。因此，訪問的語義並未耦合到節點類別中，而是完全由訪問者控制。節點的默認訪問行為已經內置在基類的 `VisitXXX` 版本中了。  
　　另一個變體是所有 `VisitXXX` 方法都返回一個節點。樹節點是不可變的，為了改變樹，必須要構建一個新的樹。如果任何子樹發生變化，默認的 `VisitXXX` 方法將構建一個新的節點。如果沒有進行任何更改，則返回相同的節點。這樣，如果在樹的深處進行了一個更改，則整個樹將自動重新構建。

```csharp
public abstract class ExpressionVisitor
{
    protected ExpressionVisitor()
    {
    }

    protected virtual Expression Visit(Expression exp)
    {
        if (exp == null)
            return exp;

        switch (exp.NodeType)
        {
            case ExpressionType.Negate:
            case ExpressionType.NegateChecked:
            case ExpressionType.Not:
            case ExpressionType.Convert:
            case ExpressionType.ConvertChecked:
            case ExpressionType.ArrayLength:
            case ExpressionType.Quote:
            case ExpressionType.TypeAs:
                return this.VisitUnary((UnaryExpression)exp);

            case ExpressionType.Add:
            case ExpressionType.AddChecked:
            case ExpressionType.Subtract:
            case ExpressionType.SubtractChecked:
            case ExpressionType.Multiply:
            case ExpressionType.MultiplyChecked:
            case ExpressionType.Divide:
            case ExpressionType.Modulo:
            case ExpressionType.And:
            case ExpressionType.AndAlso:
            case ExpressionType.Or:
            case ExpressionType.OrElse:
            case ExpressionType.LessThan:
            case ExpressionType.LessThanOrEqual:
            case ExpressionType.GreaterThan:
            case ExpressionType.GreaterThanOrEqual:
            case ExpressionType.Equal:
            case ExpressionType.NotEqual:
            case ExpressionType.Coalesce:
            case ExpressionType.ArrayIndex:
            case ExpressionType.RightShift:
            case ExpressionType.LeftShift:
            case ExpressionType.ExclusiveOr:
                return this.VisitBinary((BinaryExpression)exp);

            case ExpressionType.TypeIs:
                return this.VisitTypeIs((TypeBinaryExpression)exp);

            case ExpressionType.Conditional:
                return this.VisitConditional((ConditionalExpression)exp);

            case ExpressionType.Constant:
                return this.VisitConstant((ConstantExpression)exp);

            case ExpressionType.Parameter:
                return this.VisitParameter((ParameterExpression)exp);

            case ExpressionType.MemberAccess:
                return this.VisitMemberAccess((MemberExpression)exp);

            case ExpressionType.Call:
                return this.VisitMethodCall((MethodCallExpression)exp);

            case ExpressionType.Lambda:
                return this.VisitLambda((LambdaExpression)exp);

            case ExpressionType.New:
                return this.VisitNew((NewExpression)exp);

            case ExpressionType.NewArrayInit:
            case ExpressionType.NewArrayBounds:
                return this.VisitNewArray((NewArrayExpression)exp);

            case ExpressionType.Invoke:
                return this.VisitInvocation((InvocationExpression)exp);

            case ExpressionType.MemberInit:
                return this.VisitMemberInit((MemberInitExpression)exp);

            case ExpressionType.ListInit:
                return this.VisitListInit((ListInitExpression)exp);

            default:
                throw new Exception(string.Format("Unhandled expression type: '{0}'", exp.NodeType));
        }
    }

    protected virtual MemberBinding VisitBinding(MemberBinding binding)
    {
        switch (binding.BindingType)
        {
            case MemberBindingType.Assignment:
                return this.VisitMemberAssignment((MemberAssignment)binding);

            case MemberBindingType.MemberBinding:
                return this.VisitMemberMemberBinding((MemberMemberBinding)binding);

            case MemberBindingType.ListBinding:
                return this.VisitMemberListBinding((MemberListBinding)binding);

            default:
                throw new Exception(string.Format("Unhandled binding type '{0}'", binding.BindingType));
        }
    }

    protected virtual ElementInit VisitElementInitializer(ElementInit initializer)
    {
        ReadOnlyCollection<Expression> arguments = this.VisitExpressionList(initializer.Arguments);

        if (arguments != initializer.Arguments)
        {
            return Expression.ElementInit(initializer.AddMethod, arguments);
        }

        return initializer;
    }

    protected virtual Expression VisitUnary(UnaryExpression u)
    {
        Expression operand = this.Visit(u.Operand);

        if (operand != u.Operand)
        {
            return Expression.MakeUnary(u.NodeType, operand, u.Type, u.Method);
        }

        return u;
    }

    protected virtual Expression VisitBinary(BinaryExpression b)
    {
        Expression left = this.Visit(b.Left);
        Expression right = this.Visit(b.Right);
        Expression conversion = this.Visit(b.Conversion);

        if (left != b.Left || right != b.Right || conversion != b.Conversion)
        {
            if (b.NodeType == ExpressionType.Coalesce && b.Conversion != null)
                return Expression.Coalesce(left, right, conversion as LambdaExpression);
            else
                return Expression.MakeBinary(b.NodeType, left, right, b.IsLiftedToNull, b.Method);
        }

        return b;
    }

    protected virtual Expression VisitTypeIs(TypeBinaryExpression b)
    {
        Expression expr = this.Visit(b.Expression);

        if (expr != b.Expression)
        {
            return Expression.TypeIs(expr, b.TypeOperand);
        }

        return b;
    }

    protected virtual Expression VisitConstant(ConstantExpression c)
    {
        return c;
    }

    protected virtual Expression VisitConditional(ConditionalExpression c)
    {
        Expression test = this.Visit(c.Test);
        Expression ifTrue = this.Visit(c.IfTrue);
        Expression ifFalse = this.Visit(c.IfFalse);

        if (test != c.Test || ifTrue != c.IfTrue || ifFalse != c.IfFalse)
        {
            return Expression.Condition(test, ifTrue, ifFalse);
        }

        return c;
    }

    protected virtual Expression VisitParameter(ParameterExpression p)
    {
        return p;
    }

    protected virtual Expression VisitMemberAccess(MemberExpression m)
    {
        Expression exp = this.Visit(m.Expression);

        if (exp != m.Expression)
        {
            return Expression.MakeMemberAccess(exp, m.Member);
        }

        return m;
    }

    protected virtual Expression VisitMethodCall(MethodCallExpression m)
    {
        Expression obj = this.Visit(m.Object);
        IEnumerable<Expression> args = this.VisitExpressionList(m.Arguments);

        if (obj != m.Object || args != m.Arguments)
        {
            return Expression.Call(obj, m.Method, args);
        }

        return m;
    }

    protected virtual ReadOnlyCollection<Expression> VisitExpressionList(ReadOnlyCollection<Expression> original)
    {
        List<Expression> list = null;

        for (int i = 0, n = original.Count; i < n; i++)
        {
            Expression p = this.Visit(original[i]);

            if (list != null)
            {
                list.Add(p);
            }
            else if (p != original[i])
            {
                list = new List<Expression>(n);

                for (int j = 0; j < i; j++)
                {
                    list.Add(original[j]);
                }

                list.Add(p);
            }
        }

        if (list != null)
        {
            return list.AsReadOnly();
        }

        return original;
    }

    protected virtual MemberAssignment VisitMemberAssignment(MemberAssignment assignment)
    {
        Expression e = this.Visit(assignment.Expression);

        if (e != assignment.Expression)
        {
            return Expression.Bind(assignment.Member, e);
        }

        return assignment;
    }

    protected virtual MemberMemberBinding VisitMemberMemberBinding(MemberMemberBinding binding)
    {
        IEnumerable<MemberBinding> bindings = this.VisitBindingList(binding.Bindings);

        if (bindings != binding.Bindings)
        {
            return Expression.MemberBind(binding.Member, bindings);
        }

        return binding;
    }

    protected virtual MemberListBinding VisitMemberListBinding(MemberListBinding binding)
    {
        IEnumerable<ElementInit> initializers = this.VisitElementInitializerList(binding.Initializers);

        if (initializers != binding.Initializers)
        {
            return Expression.ListBind(binding.Member, initializers);
        }

        return binding;
    }

    protected virtual IEnumerable<MemberBinding> VisitBindingList(ReadOnlyCollection<MemberBinding> original)
    {
        List<MemberBinding> list = null;

        for (int i = 0, n = original.Count; i < n; i++)
        {
            MemberBinding b = this.VisitBinding(original[i]);

            if (list != null)
            {
                list.Add(b);
            }
            else if (b != original[i])
            {
                list = new List<MemberBinding>(n);

                for (int j = 0; j < i; j++)
                {
                    list.Add(original[j]);
                }

                list.Add(b);
            }
        }

        if (list != null)
            return list;

        return original;
    }

    protected virtual IEnumerable<ElementInit> VisitElementInitializerList(ReadOnlyCollection<ElementInit> original)
    {
        List<ElementInit> list = null;

        for (int i = 0, n = original.Count; i < n; i++)
        {
            ElementInit init = this.VisitElementInitializer(original[i]);

            if (list != null)
            {
                list.Add(init);
            }
            else if (init != original[i])
            {
                list = new List<ElementInit>(n);

                for (int j = 0; j < i; j++)
                {
                    list.Add(original[j]);
                }

                list.Add(init);
            }
        }

        if (list != null)
            return list;

        return original;
    }

    protected virtual Expression VisitLambda(LambdaExpression lambda)
    {
        Expression body = this.Visit(lambda.Body);

        if (body != lambda.Body)
        {
            return Expression.Lambda(lambda.Type, body, lambda.Parameters);
        }

        return lambda;
    }

    protected virtual NewExpression VisitNew(NewExpression nex)
    {
        IEnumerable<Expression> args = this.VisitExpressionList(nex.Arguments);

        if (args != nex.Arguments)
        {
            if (nex.Members != null)
                return Expression.New(nex.Constructor, args, nex.Members);
            else
                return Expression.New(nex.Constructor, args);
        }

        return nex;
    }

    protected virtual Expression VisitMemberInit(MemberInitExpression init)
    {
        NewExpression n = this.VisitNew(init.NewExpression);
        IEnumerable<MemberBinding> bindings = this.VisitBindingList(init.Bindings);

        if (n != init.NewExpression || bindings != init.Bindings)
        {
            return Expression.MemberInit(n, bindings);
        }

        return init;
    }

    protected virtual Expression VisitListInit(ListInitExpression init)
    {
        NewExpression n = this.VisitNew(init.NewExpression);
        IEnumerable<ElementInit> initializers = this.VisitElementInitializerList(init.Initializers);

        if (n != init.NewExpression || initializers != init.Initializers)
        {
            return Expression.ListInit(n, initializers);
        }

        return init;
    }

    protected virtual Expression VisitNewArray(NewArrayExpression na)
    {
        IEnumerable<Expression> exprs = this.VisitExpressionList(na.Expressions);

        if (exprs != na.Expressions)
        {
            if (na.NodeType == ExpressionType.NewArrayInit)
            {
                return Expression.NewArrayInit(na.Type.GetElementType(), exprs);
            }
            else
            {
                return Expression.NewArrayBounds(na.Type.GetElementType(), exprs);
            }
        }

        return na;
    }

    protected virtual Expression VisitInvocation(InvocationExpression iv)
    {
        IEnumerable<Expression> args = this.VisitExpressionList(iv.Arguments);
        Expression expr = this.Visit(iv.Expression);

        if (args != iv.Arguments || expr != iv.Expression)
        {
            return Expression.Invoke(expr, args);
        }

        return iv;
    }
}
```

# 本地變量參考 (Local Variable References)
　　至此，我們已經建立了一個 provider，但它只能操作一些查詢運算子和一些次要的運算子，例如比較運算子等等。然後，真正的 provider 不得不處理更多運算子與它們之間的複雜操作。

## 翻譯本地變數參考 (Translate Local Variable References)
　　假如我們需要用參考本地變數的方式來進行參詢，例如：
```csharp
string city = "London";
var query = db.Customers.Where(c => c.City == city);
```
　　在目前的設計會丟出一個異常: `The member 'city' is not supported`，city 應該是其中一個欄位，不應是 member，所以我們進一步看向表達式樹的 `ToString()` 所丟出的結果：
```csharp
Select * From Customers.Where(c => return (c.City = value(Sample.Program+<>c__DisplayClass0).city))
```
　　原來 C# 編譯器已經創建了一個類來保存在 lambda 表達式中被引用的局部變數了。當局部變數在匿名方法中被引用時，它也會做同樣的事情。  
　　無論如何，如果我們想讓 provider 與本地變數的參考一起工作，我們就必須處理它。也許我們可以只識別這些編譯器生成的類型的 field 引用，那我們該如何識別編譯器生成的類型？根據名稱嗎？如果 C# 編譯器改變了它們命名方式怎麼辦？如果另一種語言使用了不同的方案呢？本地變數是唯一的情況嗎？那麼在範圍內引用成員變數呢？它們也不會被編碼成樹中的值。最好的情況是，它們是一個常數節點，引用該成員所在的實例，或是一個 MemberAccess 的節點，用於訪問該實例上的成員。我們能否只識別對常數節點的任何成員訪問，並使用反射手動評估它？也許可以，但如果編譯器生成了更複雜的東西呢？
　　我們要做的是在整個樹中識別可以立即評估並轉換值的子樹，如果我們能做到這一點，那麼翻譯器的其餘部分只需要處理這些值。

```csharp
public static Expression PartialEval(Expression expression, Func<Expression, bool> fnCanBeEvaluated)
{
    return new SubtreeEvaluator(new Nominator(fnCanBeEvaluated).Nominate(expression)).Eval(expression);
}

public static Expression PartialEval(Expression expression)
{
    return new PartialEval(expression, Evaluator.CanBeEvaluatedLocally);
}

public static bool CanBeEvaluatedLocally(Expression expression)
{
    return expression.NodeType != ExpressionType.Parameter;
}

public class SubtreeEvaluator : ExpressionVisitor
{
    HashSet<Expression> candidates;

    internal SubtreeEvaluator(HashSet<Expression> candidates)
    {
        this.candidates = candidates;
    }

    internal Expression Eval(Expression expression)
    {
        return Visit(expression);
    }

    protected override Expression Visit(Expression expression)
    {
        if (expression == null)
            return null;
        if (candidates.Contains(expression))
            return Evaluate(expression);
        return base.Visit(expression);
    }

    private Expression Evaluate(Expression expression)
    {
        if (expression.NodeType == ExpressionType.Constant)
            return expression;
        LambdaExpression lambda = Expression.Lambda(expression);
        Delegate fn = lambda.Compile();

        return Expression.Constant(fn.DynamicInvoke(null), expression.type);
    }
}

public class Nominator : ExpressionVisitor
{
    Func<Expression, bool> fnCanBeEvaluated;
    HashSet<Expression> candidates;
    bool cannotBeEvaluated;

    internal Nominator(Func<Expression, bool> fnCanBeEvaluated)
    {
        this.fnCanBeEvaluated = fnCanBeEvaluated;
    }

    internal HashSet<Expression> Nominate(Expression expression)
    {
        this.candidates = new HashSet<Expression>();
        this.Visit(expression);
        return this.candidates;
    }

    protected override Expression Visit(Expression expression)
    {
        if (expression != null)
        {
            bool saveCannotBeEvaluated = this.cannotBeEvaluated;
            this.cannotBeEvaluated = false;
            base.Visit(expression);
            if (!this.cannotBeEvaluated)
            {
                if (this.fnCanBeEvaluated(expression))
                {
                    this.candidates.Add(expression);
                }
                else 
                {
                    this.cannotBeEvaluated = true;
                }
            }
            this.cannotBeEvaluated |= saveCannotBeEvaluated;
        }
        return expression;
    }
}
```
　　Evaluator 類公開了一個靜態方法 `ParitalEval`，讓我們可以呼叫此方法來評估表達式中的子樹，只留下具有實際值的常數節點。  
　　大部分的程式碼是用來劃分可以獨立求值的最大小樹。實際評估的過程非常簡單，因為這些子樹可以使用 `LambdaExpression.Compile` 進行編譯，轉換為委派並進行調用。我們可以在 `SubtreeVisitor.Evaluate` 方法中觀察這一過程的發生。  
　　確定最大子樹的過程分為兩個步驟，首先，在 `Nominator` 類中進行自底向上的遍歷，確定可能獨立求值的節點，然後在 `SubtreeEvaluator` 中進行自頂向下的遍歷，找到被標記的子樹的最高節點。  
　　Nominator 由我們的定義的函式作參數化，該函數可以使用任何觸發式方法來確定某個給定節點是否可以獨立求值。默認的觸發鉽方法是除了 ExpressionType.Parameter 之外的任何節點都可以獨立求值。除此之外，還有一個通用規則，即如果子節點無法在本地求值，則父節點也無法求值。因此，參數上游的任何節點都無法求值並將保留在樹中。其它所有節點將被求值並替換成常數。  
　　現在有了這個類別，我們就可以在翻譯表達樹時隨時使用它。這個操作已經被分解到 `DbQueryProvider` 類別的 `Translate` 方法中了。
```csharp
public class DbQueryProvider : QueryProvider
{
    private string Translate(Expression expression)
    {
        expression = Evaluator.PartialEval(expression);
        return new QueryTranslator().Translate(expression);
    }
}
```

# Select
　　我們已經有了一個粗糙的 LINQ provider 了，可以把 `Where` 方法轉成 SQL。可以執行查詢並將結果轉成我的物件。但我們想要做的是一個可以完整運作的 ORM，首先我們可以試著將 provider 加入 `Select`。  
　　相比 `Select`，翻譯 `Where` 方法容易許多。我指的是 LINQ 的 Select 操作，我們可以將數據轉換成任何我們想要的形式。LINQ 的 Select 運算子的選擇器函數可以是任何用戶能夠想象的轉換表達式。這裡可能會有物件建構子、初始化程式、條件語句、二元運算子、方法調用等等。我們該如何將這些轉換成 SQL，更不用說在返回的物件中重現這種結構？  
　　事實上，當用戶撰寫好查詢時，它已經寫好程式碼了。  
　　選擇器函數是建構結果的程式碼，如果這是物件的 LINQ 而不是 `IQueryable` 提供的程式，選擇器函數將是運行以產生結果的程式碼，這有什麼不同呢？  
　　如果選擇器函數是實際程式碼而不是表達樹，那它只需要一個函數將一個物件轉換成另一個物件。
　　我們可能可以將先前的 `ObjectReader` 與基本上是 LINQ to Objects 版本的 Select 結合起來，將檢索到的所有數據結果轉換為不同形狀。然而，這將是對時間與空間結構的嚴重濫用。我們不應該檢索所有數據，我們只應該帶回需要的二元制結果(bits)。
```csharp
public abstract class ProjectionRow
{
    public abstract object GetValue(int index);
}
```
　　先做一個簡單的抽象基類，代表一行數據。如果我們透過選擇器表達式通過調用 `GetValue` 從這個對象中提取數據，然後使用 `Expression.Convert` 操作。


待續