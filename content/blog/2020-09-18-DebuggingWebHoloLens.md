---
id: 20200918
draft: false
title: How to debug Microsoft Edge on the HoloLens
date: 2020-09-19T08:00:00+00:00
author: Sorskoot
layout: post
share: true
comments: true
guid: https://www.timmykokke.com/?p=20200918
permalink: /2020/09/how-to-debug-edge-on-the-hololens
categories:
  - HoloLens
tags:
  - HoloLens
  - Edge
---

I recently started a new job as a Mixed Reality developer building applications for the Microsoft HoloLens. We build our applications using Unity3D. But, of course I had to try and run WebXR on the device as well. Microsoft Edge comes with the HoloLens and supports WebVR. And switching to 'VR' removes the browser chrome and your 3D model becomes a hologram in the real world. After that it get different from running a WebXR app on other devices very quickly. One of the difficulties I ran into was debugging.

<!--  Intro -->

## Debugging
When running a web application on the Oculus Quest, for example, you can use Edge on your desktop de remotely debug. Just browse to edge://inspect and without too much hassle you should be able to debug with the same tools you would debug any other website. The HoloLens runs the 'old' UWP version of Edge and can't be debugged with the new Chromium Edge. I've tried a couple of different approaches, but none worked.

##Vorlon.JS
This is where Vorlon.JS comes in. This nifty little tool can replace the web debug tools and creates a connection to debug your website remotely. Just install the npm package globally on your machine (`npm i vorlon -g`). When you run this it spins up a small web server locally, by default on port 1337. You'll have to add a script that is served from this page to your HTML page and you are pretty much good to go. Except that I run my WebXR application using SSL, with a custom certificate (I have a DNS entry that points a local IP) and mixing secure and unsecured connections doesn't work in this case.

To get this to work you have to find where Vorlon is installed on your Windows machine. In my case it's %AppData%\npm\node_modules\vorlon\Server. You'll have to edit the config.json file there. Basically it comes down to changing "useSSL": true.
When you want to run SSL on LocalHost this is enough. In my case, I wanted to use my own certificate. To get this to work I copied the .crt and the .key files to the /cert folder. I also updated the config to use these. Don't forget to update the script tag in your .html file to use the domain name if that's different now. I added `<script src="https://{YOUR-IP}:1337/vorlon.js"></script>` to my HTML file.

After this, you just open the Vorlon URL (`https://{YOUR-IP}:1337`) on your desktop and the WebXR app on the HoloLens. Anything that is written to the console will show up on the desktop. But you can explore a lot more on the remote location from your desktop machine.

{{< img-link "/images/2020/09/Vorlonjs.jpg" "Vorlon.js" >}}