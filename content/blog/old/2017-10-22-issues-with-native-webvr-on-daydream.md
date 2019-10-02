---
id: 1890
title: Issues with native WebVR on Daydream
date: 2017-10-22T11:13:21+00:00
author: Timmy
layout: post
guid: https://www.timmykokke.com/?p=1890
permalink: /2017/10/issues-with-native-webvr-on-daydream/
categories:
  - WebVR
tags:
  - Android
  - Chrome
  - Daydream
  - webvr
---
When I was building my [entry for the JS13K games contest](http://js13kgames.com/entries/spacewrecked), I tested my app on the Google Daydream. One issue I ran into was that it was hard to focus my eyes in VR. I thought it was just me at first and during the contest, I didn't have the time to investigate any further anyway. Now that the contest is over I've decided to dig in a little deeper.

## Debugging

I'd like to start with a little background on how to debug a WebVR app running on a phone in a Daydream View. Since the app will probably be running in Chrome on the device ( although debugging <a href="https://blogs.windows.com/msedgedev/2017/10/05/microsoft-edge-ios-android-developer/#FwoaFRK81B8P7BJs.97" target="_blank" rel="noopener">Microsoft Edge</a> works as well!), I use the Chrome remote inspector. The remote inspector can be accessed by starting Chrome on your dev machine and navigate to <a href="chrome://inspect" target="_blank" rel="noopener">chrome://inspect</a>. When your phone is connected to your PC via USB it will show up there, but it is possible to find it over WIFI as well. Select the page you want to debug and click &#8216;inspect'.

[<img class="alignnone size-full wp-image-1897" src="https://i2.wp.com/www.timmykokke.com/wp-content/uploads/2017/10/developertools-connect.jpg?resize=320%2C218&#038;ssl=1" alt="" width="320" height="218" srcset="https://i2.wp.com/www.timmykokke.com/wp-content/uploads/2017/10/developertools-connect.jpg?w=548&ssl=1 548w, https://i2.wp.com/www.timmykokke.com/wp-content/uploads/2017/10/developertools-connect.jpg?resize=300%2C205&ssl=1 300w" sizes="(min-width: 900px) 600px, 900px" data-recalc-dims="1" />](https://i2.wp.com/www.timmykokke.com/wp-content/uploads/2017/10/developertools-connect.jpg?ssl=1)

Now you can debug the page as you would normally.

To test if the page supports WebVR you can check if &#8216;n<span class="mtk1">avigator.getVRDisplays' exists. Just type this in the console:</span>

<pre><span style="display: inline !important; float: none; background-color: transparent; color: #000000; cursor: text; font-family: 'PT Serif',Georgia,Cambria,'Times New Roman',Times,serif; font-size: 17.93px; font-style: normal; font-variant: normal; font-weight: 400; letter-spacing: normal; line-height: 26.89px; orphans: 2; text-align: left; text-decoration: none; text-indent: 0px; text-transform: none; -webkit-text-stroke-width: 0px; white-space: normal; word-spacing: 0px;">n</span><span class="mtk1">avigator.getVRDisplays
</span></pre>

You should get one of these three responses.

_&#8220;undefined&#8221;_. In this case, WebVR isn't available. Not native, and not through a polyfill.

[<img class="alignnone size-full wp-image-1900" src="https://i2.wp.com/www.timmykokke.com/wp-content/uploads/2017/10/getVRDisplays-Polyfill.jpg?resize=320%2C19&#038;ssl=1" alt="" width="320" height="19" srcset="https://i2.wp.com/www.timmykokke.com/wp-content/uploads/2017/10/getVRDisplays-Polyfill.jpg?w=935&ssl=1 935w, https://i2.wp.com/www.timmykokke.com/wp-content/uploads/2017/10/getVRDisplays-Polyfill.jpg?resize=300%2C18&ssl=1 300w, https://i2.wp.com/www.timmykokke.com/wp-content/uploads/2017/10/getVRDisplays-Polyfill.jpg?resize=768%2C45&ssl=1 768w, https://i2.wp.com/www.timmykokke.com/wp-content/uploads/2017/10/getVRDisplays-Polyfill.jpg?w=640&ssl=1 640w" sizes="(min-width: 900px) 600px, 900px" data-recalc-dims="1" />](https://i2.wp.com/www.timmykokke.com/wp-content/uploads/2017/10/getVRDisplays-Polyfill.jpg?ssl=1)

In this case, you'll see an implemented function. This function is implemented in the polyfill.

[<img class="alignnone size-full wp-image-1899" src="https://i0.wp.com/www.timmykokke.com/wp-content/uploads/2017/10/getVRDisplays-Native.jpg?resize=320%2C15&#038;ssl=1" alt="" width="320" height="15" srcset="https://i0.wp.com/www.timmykokke.com/wp-content/uploads/2017/10/getVRDisplays-Native.jpg?w=935&ssl=1 935w, https://i0.wp.com/www.timmykokke.com/wp-content/uploads/2017/10/getVRDisplays-Native.jpg?resize=300%2C14&ssl=1 300w, https://i0.wp.com/www.timmykokke.com/wp-content/uploads/2017/10/getVRDisplays-Native.jpg?resize=768%2C37&ssl=1 768w, https://i0.wp.com/www.timmykokke.com/wp-content/uploads/2017/10/getVRDisplays-Native.jpg?w=640&ssl=1 640w" sizes="(min-width: 900px) 600px, 900px" data-recalc-dims="1" />](https://i0.wp.com/www.timmykokke.com/wp-content/uploads/2017/10/getVRDisplays-Native.jpg?ssl=1)

Best case scenario. The function is implemented natively.

In the last two cases, you'll be able to call the function and get info about the device. This function returns a promise, but with the following like you can view it in the console.

<pre>navigator.getVRDisplays().then(d =&gt; console.log(d));</pre>

Now, you can dig into the result and see what is in there. For example the device that is used.

## Issue and Fix

It turned out that for some reason my WebVR app was defaulting to &#8216;Google Cardboard' and not Daydream, while other examples had access to the Daydream native VR. This seemingly weird behavior is caused by the polyfill, flags in Chrome and a meta tag.

After a lot of debugging, testing and digging around, I learned the following:

  * The polyfill defaults to cardboard, even when running it on a Daydream device, which causes the wrong settings for the Daydream lenses. This makes it very hard to focus your eyes on the VR.
  * To get WebVR running on your Daydream supported Android device everywhere on any page, you need to enable it through a flag. Go to about://flags and search for &#8216;WebVR'. After doing that it runs natively.
  * If you don't want your users to have to enable a flag, there's another way. That is by adding a meta tag. You have to enable the experimental feature by registering an origin trial. This is very easy to do. Start by going to the <a href="https://github.com/GoogleChrome/OriginTrials/blob/gh-pages/developer-guide.md#how-do-i-enable-an-experimental-feature-on-my-origin" target="_blank" rel="noopener">OriginTrials Gitbub</a> and follow the link there to a form to register. You'll receive a token you can add to the page to enable the WebVR feature for every visitor.

That last point, the meta tag, is what is used in the examples from ThreeJs.