---
title: "[Swift] UI Challenge"
date: 2024-06-21T01:19:02+08:00
tags: ["UI", "Swift", "IOS", "Apple", "IPhone", "Xcode"]
draft: false
Categories: programming
description: "UI Challenge for iOS View on IPhone"
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

## Challenge 1: Card Style
{{< img "/Swift/images/img1.jpg" 300 >}}
```swift

struct ContentView: View {
    var body: some View {
        ZStack {
            Color(.systemMint)
                .ignoresSafeArea()
            VStack(alignment: .leading, spacing: 20.0){
                Image("eva")
                    .resizable()
                    .aspectRatio(contentMode: .fit)
                    .cornerRadius(15)
                    .padding(.all)
                HStack {
                    Text("Eva Hsu")
                        .font(.largeTitle)
                        .fontWeight(.semibold)
                        .foregroundColor(.black)
                        .padding()
                    Spacer()
                    VStack {
                        HStack {
                            Image(systemName: "star.fill")
                            Image(systemName: "star.fill")
                            Image(systemName: "star.fill")
                            Image(systemName: "star.fill")
                            Image(systemName: "star.leadinghalf.fill")
                        }
                        .foregroundColor(.orange)
                        .font(.caption)
                        Text("(Reviews 240,152)")
                    }
                    .padding()
                    
                }
                Text("The best girl in the world.")
                    .foregroundColor(.primary)
                    .padding(.horizontal)
                
                HStack {
                    Spacer()
                    Image(systemName: "binoculars.fill")
                    Image(systemName: "fork.knife")
                }
                .foregroundColor(.gray)
                .font(.caption)
                .padding()
                
            }
            .background(Rectangle()
                .foregroundColor(.white)
                .cornerRadius(15)
                .shadow(radius: 15))
                .padding()
        }
    }
}m
```