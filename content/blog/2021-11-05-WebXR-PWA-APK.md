---
id: 20211105
draft: true
title: Creating an APK from a WebXR app
date: 2021-11-05T18:51:00+00:00
author: Sorskoot
layout: post
share: true
comments: true
guid: https://www.timmykokke.com/?p=20211105
permalink: /2021/11/WebXR-PWA-APK
categories:
  - WebXR
  - Content
tags:
  - WebXR

---

## Intro
Since recently it is possible to package progressive web apps into an APK using the tools provided by Oculus. This is a great way to get your app into the hands of users who are not able to use the web. And, it is just as easy as it sounds.

This tutorial is not a detailed walkthrough on how to create a WebXR app or how to create a PWA. It's a quick overview of the steps you need to take to get your app packaged into an APK and deploy it to the Oculus Quest.

## WebXR app
Let's start with a simple example. I created a pretty empty A-Frame example that just shows a cube on a black background. To make everything work offline and to prevent cross-origin issues, I downloaded the [A-Frame library](https://aframe.io/releases/1.2.0/aframe.min.js) and added it to the project. 

{{< gist ace44833a1a72e27c6a207619168ea6e >}}

{{< img-link "/images/2021/11/PWA_Cube.png" "WebXR Cube" >}}

## Web manifest
The first step in converting the example is to add a [webmanifest](https://developer.mozilla.org/en-US/docs/Web/Manifest). Most of the file is pretty much the same for all Progressive Web Apps, with a few exceptions. The biggest and maybe the most important addition is `"ovr_package_name":"TheCube.Sorskoot.com"`. This is the name of the package that will be used to install the app on the Oculus Quest. Another thing to mention is the display property. Right now there are two valid values, `standalone` and `minimal-ui`. I noticed no difference on the Quest. I will leave it as `standalone` for now. I hope that soon Oculus figures out a way of opening the app in full immersive mode, maybe by using `fullscreen` or something. For now, you have to show the UI to enter VR. 
In the example below I use a reference of my app running at localhost. If you release the app on a server or use a different address on your machine, you need to change this line.
Lastly, there has to be at least one image in the `icons` array, a 512x512 image. This image has to have its purpose set to `any maskable`. More sizes are recommended.

{{< gist a16ad097575321a74918d2d9e25973b9 >}}

## Service Worker
For this example, I used a service worker from the service workers cookbook at [serviceworke.rs](https://serviceworke.rs/strategy-cache-and-update.html).
This service worker has a precache that loads the specified files as soon as possible and then updates the files in the background if possible. I'm not going into the details of how this works, because it is fully described at [serviceworke.rs](https://serviceworke.rs/strategy-cache-and-update.html). The only downside of this service worker is that an update is always 1 behind. I would advise you to have a look at the cookbook and find a way that best suits your needs.

{{< gist ba9f2b9803a58d031ebc27c94d6bb95d >}}

To see if it works you can look it up in the Chrome Dev Tools, under the Application tab. You should see the service worker in the list of installed scripts.
{{< img-link "/images/2021/11/PWA_SW_Debug.png" "Service Worker" >}}

## updating the app
To finalize the implementation of the progressive web app, we need to add a few lines to the index.html example. In the head section, I added a link tag referring to the web manifest. I also added a small piece of script to load the service worker. 

{{< gist 861f19952459b28843e576b1a8c30c40 >}}

## Building the APK
Now that we have a complete PWA, we need to package it into an APK. This is done using the CLI tool provided by Oculus, you download it [here](https://developer.oculus.com/documentation/web/pwa-packaging/#download-the-cli). I believe this also needs [Java 1.7 or later](https://www.java.com/en/download/manual.jsp) to be installed. The Android SDK or at least the [Android SDK Build tools](https://androidsdkmanager.azurewebsites.net/Buildtools) is also needed. 
I installed the tool on my C: drive in tools/ovr-platform-util-pwa.
If you run the following from the command line it will create an APK file from your PWA.
`/tools/ovr-platform-util-pwa/ovr-platform-util.exe create-pwa -o TheCube.apk --android-sdk %localappdata%/Android/Sdk --manifest-content-file manifest.webmanifest`
The paths used in the command above are relative to the location of the tool, and probably will be completely different on your machine.

## Deploy using adb
The fastest and easiest way to get your freshly built APK on your Oculus Quest is to use the Android debug CLI tool, [adb](https://developer.android.com/studio/command-line/adb). There's only a short line needed to deploy the APK to the Quest.
`adb install TheCube.apk`

## npm scripts
To speed things up, I added a few npm scripts to the package.json file. You don't really have to use npm or any packages in your project, but just having these scripts
around saves a lot of time. I added the following to the scripts section of the package.json file:
```
scripts:{
    "build": "/tools/ovr-platform-util-pwa/ovr-platform-util.exe create-pwa -o TheCube.apk --android-sdk %localappdata%/Android/Sdk --manifest-content-file manifest.webmanifest",
    "deploy":"/tools/scrcpy/adb.exe install TheCube.apk",
}
```
Now I can just run `npm run build` and `npm run deploy` to build the APK and deploy the app to the Quest when it is connected.

Keep in mind that the folders might be different on your machine.

## Closing words
At the moment of writing this, it is not possible to release the app in the Oculus store yet. It is possible to sign the APK with a keystore, but it is not possible to do anything more with that than what I've shown above. When Oculus starts allowing PWA/APK apps to be uploaded to the store by the general public, I will write part 2 of this tutorial showing what steps to take there.