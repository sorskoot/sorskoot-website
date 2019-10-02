---
id: 1544
title: Fix unsafe:ms-appx-web issues in Angular and Cordova on Windows 10
date: 2016-05-09T15:24:51+00:00
author: Timmy
layout: post
guid: http://www.timmykokke.com/?p=1544
permalink: /2016/05/fix-unsafems-appx-web-issues-in-angular-and-cordova-on-windows-10/
categories:
  - Angular
  - Cordova
  - Windows 10
tags:
  - Angular
  - Cordova
  - UWP
  - Windows 10
---
During a recent stream over at <a href="http://livecoding.tv/sorskoot" target="_blank">LiveCoding.TV</a> I ran into some issues with displaying an image in a Cordova app I&#8217;m building. This image was stored inside my appx package, but the Content Security Policy blocked it anyways. 

It turned out I needed to whitelist the ms-appx and ms-appx-web protocols.

I modified the initialization of the Angular module to whitelist these protocols for images and hrefs as you can see in the example below:

<pre class="brush: javascript">angular.module('app', ['ngRoute'], function ($compileProvider) {
    $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|file|chrome-extension|ms-appx-web|ms-appx):|data:image\//);
    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|chrome-extension|ms-appx-web|ms-appx):/);
});
</pre>