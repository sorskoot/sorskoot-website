---
id: 20220201
draft: true
title: Custom templates for Wonderland Editor
date: 2022-02-01T17:00:00+00:00
author: Sorskoot
layout: post
share: true
comments: true
guid: https://www.timmykokke.com/?p=20220201
permalink: /2022/02/Wonderland-Custom-Template
categories:
  - WebXR
  - Content
  - Wonderland
tags:
  - WebXR

---

## Intro
A lesser-known feature of [Wonderland Engine](https://wonderlandengine.com) is the ability to use custom templates. In this quick post, I'll show you how I created my own.

## TL;DR
If you're just here for the download 👉 [This is the Template](/media/SorskootBasicTemplate.zip).

Extract the zip file in `%appdata%\Roaming\WonderlandEngine\Templates` and you're good to go. 

## The Template
By default, a template in Wonderland is not any different than a normal project. The easiest way to reuse something is to just copy a project to the `%appdata%\Roaming\WonderlandEngine\Templates` folder. You don't need to copy the `deploy` folder since that is automatically created when building the project. Scripts and assets that you often use can be included in the template.

When instantiating a new project, Wonderland renames the .wlp file and renames it internally as well. 

But that's not enough for me. 

{{< img-link "/images/2022/02/wonderland-new-project.png" "Wonderland new project dialog" >}}

## Sorskoot Template

In my projects, I use a little bit more. I'm using npm to manage my dependencies and I'm using RxJS to manage state in my games. I have a global object that is named after my game and I'm not even using the default esbuild to build the project but have some custom Webpack set up. And then there are a couple of components and utilities I use all the time, for music, sound effects, and other things.

To get this to work I created a little Gulp script. The biggest challenge in this was to run it automatically. I'm pretty lazy when it comes to things like this. It's the whole reason I wanted my own template in the first place. Luckily for me, it turned out there's a default npm script that is executed when after an `npm install`, `postinstall`. If that script is defined in your `package.json` it will be executed automatically.

My little Gulp script renames the main bundle file I'm using. It reads the name of the project from the .wlp file (this is just a nice json file 😊). After that, it scans all .js files and a few .json files for the SorskootBasicTemplate, the name of the template. It then replaces this string with the project name found in the .wlp file. It checks if the bundle is there with the original name, to prevent the script from running twice.

## Current limitations
Wonderland does not run `npm install` automatically when a new project is created. This means you'll have to exit the editor after creating the project and run it. After the installation can restart the editor and load your project. 


