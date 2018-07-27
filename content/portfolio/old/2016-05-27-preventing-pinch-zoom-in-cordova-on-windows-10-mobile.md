---
id: 1566
title: Preventing Pinch-Zoom in Cordova on Windows 10 Mobile | Cordova
date: 2016-05-27T22:57:08+00:00
author: Timmy
layout: post
guid: http://www.timmykokke.com/?p=1566
permalink: /2016/05/preventing-pinch-zoom-in-cordova-on-windows-10-mobile/
wsw-settings:
  - 'a:48:{s:13:"keyword_value";s:7:"Cordova";s:15:"is_meta_keyword";s:1:"1";s:17:"meta_keyword_type";s:10:"categories";s:13:"is_meta_title";s:1:"1";s:10:"meta_title";s:0:"";s:19:"is_meta_description";s:1:"1";s:21:"is_meta_robot_noindex";s:0:"";s:22:"is_meta_robot_nofollow";s:0:"";s:19:"is_meta_robot_noodp";s:0:"";s:20:"is_meta_robot_noydir";s:0:"";s:16:"meta_description";s:0:"";s:17:"is_over_sentences";s:0:"";s:20:"first_over_sentences";s:0:"";s:19:"last_over_sentences";s:0:"";s:16:"is_rich_snippets";s:0:"";s:18:"show_rich_snippets";s:0:"";s:12:"rating_value";s:1:"0";s:13:"review_author";s:0:"";s:14:"review_summary";s:0:"";s:18:"review_description";s:0:"";s:10:"event_name";s:0:"";s:10:"event_date";s:0:"";s:9:"event_url";s:0:"";s:19:"event_location_name";s:0:"";s:21:"event_location_street";s:0:"";s:23:"event_location_locality";s:0:"";s:21:"event_location_region";s:0:"";s:12:"people_fname";s:0:"";s:12:"people_lname";s:0:"";s:15:"people_locality";s:0:"";s:13:"people_region";s:0:"";s:12:"people_title";s:0:"";s:14:"people_homeurl";s:0:"";s:15:"people_photourl";s:0:"";s:12:"product_name";s:0:"";s:16:"product_imageurl";s:0:"";s:19:"product_description";s:0:"";s:14:"product_offers";s:0:"";s:18:"is_social_facebook";s:0:"";s:25:"social_facebook_publisher";s:0:"";s:22:"social_facebook_author";s:0:"";s:21:"social_facebook_title";s:0:"";s:27:"social_facebook_description";s:0:"";s:17:"is_social_twitter";s:0:"";s:20:"social_twitter_title";s:0:"";s:26:"social_twitter_description";s:0:"";s:15:"autolink_anchor";s:0:"";s:19:"is_disable_autolink";s:0:"";}'
categories:
  - Cordova
  - Windows 10
tags:
  - Cordova
  - CSS
  - Windows 10
  - Windows 10 Mobile
---
One of the most obvious ways to spot a **Cordova** app is a pinch-zoom inside the app. On Android and iOS you can use meta-tags and CSS to disable the pinch-zoom and over scroll. But for some reason I couldn&#8217;t get it disabled on _Windows 10 mobile_.

<!--more-->

## The Solution

I&#8217;ve been looking everywhere for the solution. And after a long search it turned out to be very easy. Just add the following CSS to your app:

<pre class="brush:css">html {
    touch-action: none;
}</pre>

There used to be a **Microsoft** vender specific version of this, but the vender part is dropped and it&#8217;s now according to <a href="http://www.w3.org/TR/pointerevents/#declaring-candidate-regions-for-default-touch-behaviors" target="_blank">the W3C standard</a>.