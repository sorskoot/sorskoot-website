---
id: 1608
title: Progressive Enhancement
date: 2017-01-30T12:28:25+00:00
author: Timmy
layout: post
guid: http://www.timmykokke.com/?p=1608
permalink: /2017/01/progressive-enhancement/
categories:
  - JavaScript
tags:
  - Progressive Enhancement
---
Since last December I&#8217;ve been giving [talks](http://www.slideshare.net/TimmyKokke/progressive-web-apps-70058133) about [Progressive Web apps](https://developers.google.com/web/progressive-web-apps/). A couple of them where lightning talks of 10 minutes. One of the things I had to remove to fit the slides and the demo into those 10 minutes was the explanation of Progressive Enhancement, although it&#8217;s in the definition of a PWA. So, let me explain&#8230;

<!--more-->

## Progressive Enhancement

Start with a strong base and _enhance_ from that. You want to deliver the best possible experience for the widest possible audience. That&#8217;s your base. If the browser of your visitor supports more, great! Than his/her experience will be even better.

Here&#8217;s an example taken from my demo code:

<pre class="prettyprint">if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js').then(function (registr) {
    console.log('successful with scope: ', registr.scope);
  }).catch(function (err) {
    console.log('ServiceWorker registration failed: ', err);
  });
}
</pre>

In this case a feature detection is used to check if a _ServiceWorker _exists on the navigator object. If there isn&#8217;t, no hard feelings and the site will work as expected. If the service worker object is available then just register one. From that point on the user gets an even better experience, like offline support for example.

## Update

I posted the samplecode to my <a href="https://github.com/sorskoot/PWADemo" target="_blank">GitHub</a>.