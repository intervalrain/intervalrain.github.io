---
title: "[Swift] UI Challenge"
author: "Rain Hu"
pubDatetime: 2024-06-21T01:19:02+08:00
description: "UI Challenge for iOS View on IPhone"
category: "Programming"
tags: ["UI", "Swift", "IOS", "Apple", "IPhone", "Xcode"]
math: true
mermaid: true
---

## Challenge 1: Card Style
<img src="/Swift/images/img1.jpg" width="300" />
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