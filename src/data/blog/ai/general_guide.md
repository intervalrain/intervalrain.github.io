---
title: "[ML] General guide on ML"
author: "Rain Hu"
pubDatetime: 2024-01-14T14:31:56+08:00
description: "general guide on machine learning"
category: "AI"
tags: ["Machine Learning"]
math: true
mermaid: true
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