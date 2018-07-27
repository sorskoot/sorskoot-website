---
id: 1915
title: 'Getting started with A-Frame &#8211; #1'
date: 2018-02-09T09:07:06+00:00
author: Timmy
layout: post
guid: https://www.timmykokke.com/?p=1915
permalink: /2018/02/getting-started-with-a-frame-1/
wsw-settings:
  - 'a:48:{s:13:"keyword_value";s:0:"";s:15:"is_meta_keyword";s:1:"1";s:17:"meta_keyword_type";s:10:"categories";s:13:"is_meta_title";s:1:"1";s:10:"meta_title";s:0:"";s:19:"is_meta_description";s:1:"1";s:21:"is_meta_robot_noindex";s:0:"";s:22:"is_meta_robot_nofollow";s:0:"";s:19:"is_meta_robot_noodp";s:0:"";s:20:"is_meta_robot_noydir";s:0:"";s:16:"meta_description";s:0:"";s:17:"is_over_sentences";s:0:"";s:20:"first_over_sentences";s:0:"";s:19:"last_over_sentences";s:0:"";s:16:"is_rich_snippets";s:0:"";s:18:"show_rich_snippets";s:0:"";s:12:"rating_value";s:1:"0";s:13:"review_author";s:0:"";s:14:"review_summary";s:0:"";s:18:"review_description";s:0:"";s:10:"event_name";s:0:"";s:10:"event_date";s:0:"";s:9:"event_url";s:0:"";s:19:"event_location_name";s:0:"";s:21:"event_location_street";s:0:"";s:23:"event_location_locality";s:0:"";s:21:"event_location_region";s:0:"";s:12:"people_fname";s:0:"";s:12:"people_lname";s:0:"";s:15:"people_locality";s:0:"";s:13:"people_region";s:0:"";s:12:"people_title";s:0:"";s:14:"people_homeurl";s:0:"";s:15:"people_photourl";s:0:"";s:12:"product_name";s:0:"";s:16:"product_imageurl";s:0:"";s:19:"product_description";s:0:"";s:14:"product_offers";s:0:"";s:18:"is_social_facebook";s:0:"";s:25:"social_facebook_publisher";s:0:"";s:22:"social_facebook_author";s:0:"";s:21:"social_facebook_title";s:0:"";s:27:"social_facebook_description";s:0:"";s:17:"is_social_twitter";s:0:"";s:20:"social_twitter_title";s:0:"";s:26:"social_twitter_description";s:0:"";s:15:"autolink_anchor";s:0:"";s:19:"is_disable_autolink";s:0:"";}'
image: /wp-content/uploads/2017/12/A-Frame-Tutorial.png
categories:
  - A-Frame
tags:
  - 3D
  - a-frame
  - Virtual Reality
---
# Getting started with A-Frame

For a while now I&#8217;ve been working with the A-Frame framework for building virtual reality application in the browser and I really like it. So, it&#8217;s time to dive in deeper and what better way to do that, than writing a series of tutorials. Of course, I have to start at the very beginning and work my way through the entire framework.

This first tutorial will explain a little bit about the framework itself and shows you how to get your first polygons on screen in the browser.

## What is A-Frame?

What is the A-Frame framework all about? A-Frame is a framework for building Virtual Reality applications using web technology, originally by <a href="https://mozvr.com/" target="_blank" rel="noopener">Mozilla</a> and started in 2015. It is built on top of the <a href="https://developer.mozilla.org/en-US/docs/Web/API/WebVR_API/Using_the_WebVR_API" target="_blank" rel="noopener">WebVR API</a> and uses <a href="https://threejs.org/" target="_blank" rel="noopener">Three.js</a>. Three.js is built on top of WebGL. This may seem like a dependency on top of a dependency. And, although it is, you probably do not want to write everything for WebGL and WebVR yourself.

A-Frame uses a declarative syntax in your HTML files, which makes your HTML files feel very natural, easy to understand and it makes copy-pasting very simple. A-Frame is, just as the web itself, cross-platform. Applications build with A-Frame run everywhere from your desktop browser to your mobile devices, on Google Cardboard, Google Daydream, and Samsung Gear, and on the HTC Vive and Oculus Rift. It supports the controllers for the various devices as well.

A-Frame is using Three.js in the back, but you are free to use whatever you want next to it on your website. Because it used the HTML component structure you can use whatever you want next to it, like Vue, Angular or React. It also comes with a visual inspector, just hit CRTL+ALT+I when running. In a later tutorial, I&#8217;ll dive deeper into this and show you what it is capable of.

A-Frame uses component you can build yourself or download from a <a href="https://aframe.io/aframe-registry/" target="_blank" rel="noopener">large repository</a>. This list is curated and can be compared with the Unity Asset store a bit. These components make it very easy to extend your application and create reusable pieces. More on this in later tutorials as well&#8230;

## Let&#8217;s start a scene

In this first tutorial, we are just going to get our feet wet. Let&#8217;s start by having a look at a piece of HTML.
  


On line 3 you can see the A-Frame framework scripts being loaded from their CDN. You can use npm or a local, offline copy of the framework, but I personally use the CDN most of the time.

The more interesting parts are on line 6 through 8. <span style="display: inline !important; float: none; background-color: transparent; color: #000000; cursor: text; font-family: 'PT Serif',Georgia,Cambria,'Times New Roman',Times,serif; font-size: 17.93px; font-style: normal; font-variant: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: left; text-decoration: none; text-indent: 0px; text-transform: none; -webkit-text-stroke-width: 0px; white-space: normal; word-spacing: 0px;">All A-Frame tags start with an &#8220;A&#8221;.</span> And every A-Frame application must have a scene.  The **a-scene** tag creates this. You can add attributes to the scene as well, but just the tag is sufficient for now. Inside the scene is an **a-box_. _**This tag adds a box entity to the scene. There are two attributes defined on that: color and position. Both are pretty self-explanatory.

## What&#8217;s next?

Next time I&#8217;ll dive a little deeper into these attributes. How that work and what you can do with them.

In the meantime, you can have a look the code for this tutorial (and possibly the next tutorials as well) on my <a href="https://github.com/sorskoot/a-frame-tutorial/tree/master/01A" target="_blank" rel="noopener">Github</a> page. If you like to support the series you can use one of the affiliate links throughout the page. Another way of support is to become a <a href="https://www.patreon.com/sorskoot" target="_blank" rel="noopener">Patreon. </a>This will provide you with all kinds of benefits, like early access to pretty much everything I write.

&nbsp;

&nbsp;