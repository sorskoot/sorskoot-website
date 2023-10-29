---
id: 20230708
draft: true
title: Automatically deploy to HeyVR
date: 2023-10-13T00:00:00+00:00
author: Sorskoot
layout: post
share: true
comments: true
guid: https://www.timmykokke.com/?p=20231013
permalink: /2023/10/deploytoHeyVR/
categories:
  - WebXR
tags:
  - Wonderland
  - HeyVR
---


# How to Make Your WebXR Self-Deploy on HeyVR: The Easy Peasy Guide 🎮

Hello Coders! 👾

I've been having a blast playing around with WebXR and stumbled upon a cool trick to auto-deploy projects to HeyVR. It's super fun, trust me! So, let's jump right into the nitty-gritty, shall we?

## Securing Your Secret Handshake Token from HeyVR 🤝

The first thing you need is a Token from HeyVR. It's basically your secret handshake with the platform. But don't fret - snagging one is a piece of cake. Just log into your HeyVR account, find your way to the settings tab, and there it is - your personal token sitting there just for you.

{{< img-link "/images/2023/10/Snag_668f0bf.png" "Title" >}}

## Embedding Your Token into GitHub Variables 🔐

Got your token? Brilliant! Now, it's time to embed it into your GitHub variables. Why should you do this? Essentially, this lets GitHub chat with HeyVR on your behalf. You're saying "Hey GitHub, here's my secret handshake token. Kindly pass my greetings to HeyVR!". And GitHub replies "Absolutely!"

## Setting up a Fancy GitHub Action 🤖

Here comes the most exciting part - setting up a GitHub action. What's that now, you ask? Imagine it as a robotic butler who can perform tasks for you automatically every time specific events happen in your repository.

This is how you can create one:

```
npm i -g heyvr-cli
heyvr --version $CI_COMMIT_TAG --gameId "dead-secret-circle"
```

Let me break this down.

`npm i -g heyvr-cli` is how you invite the robotic butler into your digital home (repository). It stands for 'Node Package Manager install global heyvr command-line interface'. In simpler terms, this command installs the necessary tools for the GitHub action (our robot butler) to understand and carry out your commands.

`heyvr --version $CI_COMMIT_TAG --gameId "dead-secret-circle"` is where you instruct the robot butler on what he should do when an event happens in your repository. `$CI_COMMIT_TAG` is tech-speak for 'the label of the latest commit in your repository'. And `"dead-secret-circle"`? That's simply the ID of your game on HeyVR.

## Wrapping Up 🎁

And there we have it! Set up everything properly and each time you tweak your repository, those changes will automatically deploy themselves to HeyVR. Cool stuff, isn't it?

So go ahead, give it a whirl! Let the coding universe revel in your creativity!

Until our next coding adventure,
Your friendly neighborhood coder

Happy Coding! 🚀