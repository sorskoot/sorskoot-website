---
id: 1675
title: How to build node.js apps effortlessly with express.js
date: 2017-03-07T16:29:51+00:00
author: Timmy
layout: post
guid: http://www.timmykokke.com/?p=1675
permalink: /2017/03/building-an-app-with-express-js-pt1/
wsw-settings:
  - 'a:48:{s:13:"keyword_value";s:0:"";s:15:"is_meta_keyword";s:1:"1";s:17:"meta_keyword_type";s:8:"keywords";s:13:"is_meta_title";s:1:"1";s:10:"meta_title";s:39:"Building an app with express.js – pt1";s:19:"is_meta_description";s:1:"1";s:21:"is_meta_robot_noindex";s:0:"";s:22:"is_meta_robot_nofollow";s:0:"";s:19:"is_meta_robot_noodp";s:0:"";s:20:"is_meta_robot_noydir";s:0:"";s:16:"meta_description";s:75:"Tutorial and explanation on building your first node.js app with Express.js";s:17:"is_over_sentences";s:0:"";s:20:"first_over_sentences";s:0:"";s:19:"last_over_sentences";s:0:"";s:16:"is_rich_snippets";s:0:"";s:18:"show_rich_snippets";s:0:"";s:12:"rating_value";s:1:"0";s:13:"review_author";s:0:"";s:14:"review_summary";s:0:"";s:18:"review_description";s:0:"";s:10:"event_name";s:0:"";s:10:"event_date";s:0:"";s:9:"event_url";s:0:"";s:19:"event_location_name";s:0:"";s:21:"event_location_street";s:0:"";s:23:"event_location_locality";s:0:"";s:21:"event_location_region";s:0:"";s:12:"people_fname";s:0:"";s:12:"people_lname";s:0:"";s:15:"people_locality";s:0:"";s:13:"people_region";s:0:"";s:12:"people_title";s:0:"";s:14:"people_homeurl";s:0:"";s:15:"people_photourl";s:0:"";s:12:"product_name";s:0:"";s:16:"product_imageurl";s:0:"";s:19:"product_description";s:0:"";s:14:"product_offers";s:0:"";s:18:"is_social_facebook";s:0:"";s:25:"social_facebook_publisher";s:0:"";s:22:"social_facebook_author";s:0:"";s:21:"social_facebook_title";s:0:"";s:27:"social_facebook_description";s:0:"";s:17:"is_social_twitter";s:0:"";s:20:"social_twitter_title";s:0:"";s:26:"social_twitter_description";s:0:"";s:15:"autolink_anchor";s:0:"";s:19:"is_disable_autolink";s:0:"";}'
image: /wp-content/uploads/2017/03/expressjs.png
categories:
  - node.js
tags:
  - Express.js
  - JavaScript
  - Node.js
  - pug
  - sass
---
Node.js is a pretty powerful and versatile framework to build sites and tools. But using the defaults to handle HTTP requests and such can be a pain. Express.js can make your life a lot easier.

In the previous tutorial I showed you how to <a href="http://www.timmykokke.com/2017/03/getting-started-with-node-js-on-chakracore/" target="_blank">get started with node.js</a>, this time I'm going to expand on that. We're going to scaffold a new **<a href="http://expressjs.com" target="_blank">Express.js</a>** app.  Express.js is a web framework that makes it very easy to handle calls to the **node.js** server. It helps you with routing, error handling and it works very well other frameworks.

## Installing the express generator

The easiest way to get going with any Express.js-based node.js app is by using the express-generator. I've you are planning to use it multiple times (and trust me, you will), run the following command and install the express-generator globally.
  

  
This might take a moment, but if it's done installing you should be able to run the &#8216;express' command with the &#8216;-h' flag to display the help.

<img class="alignnone wp-image-1693" src="https://i0.wp.com/www.timmykokke.com/wp-content/uploads/2017/03/express-help.png?resize=320%2C80" width="320" height="80" srcset="https://i0.wp.com/www.timmykokke.com/wp-content/uploads/2017/03/express-help.png?w=1184&ssl=1 1184w, https://i0.wp.com/www.timmykokke.com/wp-content/uploads/2017/03/express-help.png?resize=300%2C75&ssl=1 300w, https://i0.wp.com/www.timmykokke.com/wp-content/uploads/2017/03/express-help.png?resize=768%2C193&ssl=1 768w, https://i0.wp.com/www.timmykokke.com/wp-content/uploads/2017/03/express-help.png?resize=1024%2C257&ssl=1 1024w, https://i0.wp.com/www.timmykokke.com/wp-content/uploads/2017/03/express-help.png?w=640&ssl=1 640w, https://i0.wp.com/www.timmykokke.com/wp-content/uploads/2017/03/express-help.png?w=960&ssl=1 960w" sizes="(min-width: 900px) 600px, 900px" data-recalc-dims="1" />

Options are limited, but that's fine. You can select a one of a few common view engines and stylesheet engines. Personally I prefer <a href="https://pugjs.org" target="_blank"><em><strong>pug</strong> </em></a>and** <a href="http://sass-lang.com/" target="_blank"><em>sass</em></a>**. I plan on doing an entire tutorial on pug soon.

Run the following command to bootstrap the new app.



<img class="alignnone size-full wp-image-1694" src="https://i0.wp.com/www.timmykokke.com/wp-content/uploads/2017/03/bootstrap-express.png?resize=320%2C210" alt="" width="320" height="210" srcset="https://i0.wp.com/www.timmykokke.com/wp-content/uploads/2017/03/bootstrap-express.png?w=736&ssl=1 736w, https://i0.wp.com/www.timmykokke.com/wp-content/uploads/2017/03/bootstrap-express.png?resize=300%2C197&ssl=1 300w, https://i0.wp.com/www.timmykokke.com/wp-content/uploads/2017/03/bootstrap-express.png?w=640&ssl=1 640w" sizes="(min-width: 900px) 600px, 900px" data-recalc-dims="1" />

Next, to install the necessary dependencies, run &#8216;npm install'.

&#8230;and wait&#8230;

When it's eventually done, run &#8216;npm start' to start your new application and go to the browser at http://localhost:3000 to view your node.js app running.

<img class="alignnone size-full wp-image-1695" src="https://i0.wp.com/www.timmykokke.com/wp-content/uploads/2017/03/express-running.png?resize=320%2C170" alt="" width="320" height="170" srcset="https://i0.wp.com/www.timmykokke.com/wp-content/uploads/2017/03/express-running.png?w=779&ssl=1 779w, https://i0.wp.com/www.timmykokke.com/wp-content/uploads/2017/03/express-running.png?resize=300%2C159&ssl=1 300w, https://i0.wp.com/www.timmykokke.com/wp-content/uploads/2017/03/express-running.png?resize=768%2C408&ssl=1 768w, https://i0.wp.com/www.timmykokke.com/wp-content/uploads/2017/03/express-running.png?w=640&ssl=1 640w" sizes="(min-width: 900px) 600px, 900px" data-recalc-dims="1" />

This was the easy part&#8230; now lets go into a bit more detail on what this has generated.

## The App

<img class="alignleft" src="https://i2.wp.com/www.timmykokke.com/wp-content/uploads/2017/03/exporess-outline.png?resize=222%2C530" width="222" height="530" data-recalc-dims="1" />

Left you can see a partial screenshot of the app opened in **Visual Studio Code**. Let's go over the folders and let me briefly explain what these contain. In a later tutorial we'll dive deeper in much of the concepts.

At the top you find a ./bin folder. In there is a _&#8216;www'. _This file actually contains the JavaScript needed too start your server. It handles the port at which the server is running. And it literally creates a server for your app.

Which brings to the next important file. Near the bottom of the list you can find &#8216;_app.js_&#8216;. In here the express.js app is instantiated and the root level routing is configured. This means that there is some the app is told at what url specific could should be called to handle the requests. It also configures the apps view engine (pug) and the css engine (sass).

Inside the ./views folder there are 3 .pug files. These files are used by the _pug_ view engine and contain the markup of the app.

Then there are the 2 .js files in the ./routes folders. These two handle the requests on the root level routing configured in _app.js_. What happens is that a request comes at the server, say an HTTP GET request at url http://localhost:3000/users. The url /users is configured in _app.js_ and points to the _users.js_ file in ./routes. Inside _users.js_ the request is taken from there, so the HTTP GET is handled from &#8216;/' and a string is placed in the response.



Last, there's the public folder. This folders is configured in _app.js_ as the location from which static files are served. In fact, this folder is mapped to the root url. So http://localhost:3000/stylesheets/style.css returns the css file, note that there's no &#8216;public' part in that url.

When using Gulp or Grunt to compile your JavaScript and Sass, the resulting files are placed in the public folder.

&nbsp;

&nbsp;