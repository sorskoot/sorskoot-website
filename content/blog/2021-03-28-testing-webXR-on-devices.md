---
id: 20210328
draft: true
title: Testing WebXR on Devices
date: 2021-03-28T23:50:00+00:00
author: Sorskoot
layout: post
share: true
comments: true
guid: https://www.timmykokke.com/?p=20210328
permalink: /2021/03/WebXR-Discord
categories:
  - WebXR
tags:
  - WebXR
---

I often get asked how to test a WebXR application on Oculus Quest, or on other devices. Since WebXR requires HTTPS when not running on localhost this might cause some troubles. Today I want to show you 2 ways of testing a WebXR app on a device, like the Oculus Quest or HoloLens.

The problem that I have run into quite often is that the WebXR session needs SSL. These two options with get you around that.

<!-- Intro -->

## Option 1 - Port Forwarding

The first option I want to talk about is the one I always use when testing WebXR apps on my Oculus Quest. 
First, on your PC go to the following page by typing the URL in the bar: edge://inspect or chrome://inspect 
Ofcourse this depends on your browser. Once on that page go to `Port forwarding`. 
On the popup to follow, add the address you would normally use to test on your PC. I'm often using these two ports, but they are probably different in your case.
{{< img-link "/images/2021/03/PortForwardingSettings.jpg" "Port Forwarding Settings" >}}

https://hmd.link/