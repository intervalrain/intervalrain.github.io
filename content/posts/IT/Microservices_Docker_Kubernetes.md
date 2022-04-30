---
title: "[IT] Introduction to Microservices, Docker and Kubernetes"
date: 2022-04-29T11:40:10+08:00
tags: ["IT", "Programming", "Docker"]
draft: false
Categories: programming     # Programming, Create, Cover, Life, Semiconductor, Leetcode, Logic Design, Daily, OS, CS50, CA
description: "Desc Text."                     
author: "Rain Hu"           # Rain Hu, 陣雨, intervalrain
showToc: true
TocOpen: true
math: true                  # KaTex or not
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
cover:
    image: "/images/cover.jpg"
    alt: "Oh! You closed up the window, so you cannot see raining"
    relative: false
    hidden: false
---
# Microservices
![microservice](/images/IT/microservices.png)
## Definition
+ Separate business logic functions.
+ Instead of one big problem, several smaller applications.
+ Communicative via well defined APIs - usually HTTP
+ In demand
![microservice2](/images/IT/microservices2.png)
## Advantages and Disavantages
+ Advantages
    + Language independent
    + Fast iterations
    + Small teams
    + Fault Isolation
    + Pair well with containers
    + Scalable
        + Big plus
+ Disavantages
    + Complex networking
    + Overhead
        + Databases
        + Servers
# Docker
> is an open platform for developers and sysadmins to build, ship, and run distributed applications, whether on laptops, data center VMs, or the cloud.
![docker](/images/IT/docker.png)
## Definition
+ Containers are a way to package software in a format that can run isolated on a shared operating system.
+ Unlike VMs, containers do not bundle a full operating system - only libraries and setting required to make the software work are needed.
+ This makes for efficientm, lightweight, self-contained systems and guarantees that software will always run the same, regardless of where it's deployed.

## Docker vs VM
+ VM = App + Bins/Libs + guest OS
+ Container = App + Bins/Libs + Docker

## Dockerfile
+ Describes the build process for an image
+ Can be run to automatically create an image
+ Contains all the commands necessary to build the image and run your application.

# Kubernetes
![kubernetes](/images/IT/kubernetes.png)
## Components
+ Node
    + Kubelet
    + Communicates with master
    + Run Pods
+ Pod
    + Runs 1+ containers
    + Exists on a node
+ Service
    + Handles requests
    Usually a load balancer
+ Deployment
    + Defines desired state - kubernetes handles the rest


