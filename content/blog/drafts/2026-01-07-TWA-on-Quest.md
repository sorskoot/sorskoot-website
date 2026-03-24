---
id: 20260107
draft: true
title: TWA On Quest
date: 2026-01-07T01:00:00+00:00
author: Sorskoot
layout: post
share: true
comments: true
guid: https://www.timmykokke.com/?p=20260107
permalink: /2026/01/TWAonQuest/
categories:
  - 
tags:
  - 
images:
  - /images/2026/01/??.png
---

Steps I took to get it to work:

## 1. Cloned Meta Bubblewrap "Fork"

This isn't really a fork but rather a modified copy Meta pushed to github. Absolute downside is that they can't update it from the original repo. They also moved the code to a subfolder which causes npx to now work with it directly.

To make my life easier, I created npm packages from this version that I can install directly when I need it. I wonder how hard it would be to correct this. Maybe create a real for and apply the changes from Meta.

## 2. VSCode Extension

To make my life, and possibly other too I started a WebXR/Quest VSCode extension. Creating a PWA / TWA is going to be a part of this. Just being able to run commands directly from VSCode makes things very easy. No need to remember everything. It's still very rough, but it works.

## 3. Create a Test Project

The test project is an empty Wonderland Engine Project. The project is the default VR template. Because the PWA needs to run on HTTPS and not localhost for it to work with the tooling I set up my DNS to point to my local IP address. I created a certificate for this domain. By running it locally I can go to my test domain on Quest on my WIFI and it loads it from my local machine.

I added the UpSDK core and digital-goods packages to the project. And I added the code to load it.

When running a project as an APK, you need to start the VR from code. Normally this is not allowed and requires a user interaction. But when the Quest starts an APK it needs to do this. I didn't bother to add something to keep it working normally, I just added 1 line.

```javascript
engine.onLoadingScreenEnd.once(() => {
    requestSession('immersive-vr'); // Start VR session
    const el = document.getElementById('version');
    if (el) setTimeout(() => el.remove(), 2000);
});
```

I added a 512x512 icon to the assets folder to let WLE handle the rest. I did add a custom service worker, just to make sure it doesn't cache anything. I also added a manual manifest.json to have full control.

## 4. PWA / TWA Project

In a new folder I initialized the PWA. By running  `bubblewrap init --manifest=https://hf.c0dr.nl/manifest.json --metaquest --directory=apk`

With `nvm` I made sure to use Node 21 (21.7.3 to be precise)

TODO: Add settings / Screenshot

I then went into the apk folder and ran: `bubblewrap build`. I then had a signed and a unsigned APK.

I used the list-tool to create a fingerprint and used Bubblewrap fingerprint to create the file. I copied the file into a .well-known folder in the WLE project. In the static folder to have Wonderland Engine copy it to the output.

## 5. First Test

I used the Meta Developer Hub to deploy the apk to my quest. I'm using a test user created in the developer Dashboard. This should eventually have access to the digital goods I created. It took a moment the first time for the app to load, but it did.

## 6. Adding goods

I added the call to digital goods. This time I added it to the button in the default scene to make ture there's a user interaction. This resulted in the error:

`Unable to download payment manifest "https://quest.meta.com/billing". HTTP 404 Not Found.`

I also noticed this warning:

`index.html?utm_source=pwa:1  Favicon not found for PaymentRequest UI. User may not recognize the website.`

### 6.2

I did some testing. It turns out I can't get details of the good either.

```javascript
await service.getDetails(['SS13_Support']);
```

causes: `Uncaught OperationError: clientAppUnavailable`;

My app does not have the 'Data Use Checkup' cleared. But, according to the documentation a test user should not need this.

I tried it before but it was rejected. It was pending do have it resolved. I removed the requirements for now.

`service.getLoggedInUserId()` does not give an error. It returns '5'. Not sure if that's expected.

Tested in on my main user, this also returned `5`. Seems odd.

### 6.3

I decided to create a new app in the developer dashboard. Maybe something got messed up. I created a new app, new digital goods.

Now I can see them!

Darn. `Unable to download payment manifest "https://quest.meta.com/billing". HTTP 404 Not Found.`. Also the "data use checkup" is still required, even for test users.
