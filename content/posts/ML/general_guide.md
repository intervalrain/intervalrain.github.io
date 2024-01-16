---
title: "[ML] General guide on ML"
keywords: ["ML"]
description: "general guide on machine learning"
date: 2024-01-14T14:31:56+08:00
tags: ["ML"]
draft: false
Categories: Leetcode
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
+ Loss on training data
    + large:
        + model bias -> add features
        + optimization -> change optimization methods
    + small:
        + loss on testing data
            + large:
                + overfitting: 
                    + (1) more training data, data augmentation
                    + (2) make model simpler
            + small:
                + mismatch