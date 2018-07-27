---
id: 1612
title: Getting started with Node.js on ChakraCore
date: 2017-03-01T07:15:00+00:00
author: Timmy
layout: post
guid: http://www.timmykokke.com/?p=1612
permalink: /2017/03/getting-started-with-node-js-on-chakracore/
categories:
  - node.js
tags:
  - ChakraCore
  - Express.js
  - JavaScript
  - Node.js
---
## Intro

Last year I started to use <a href="https://nodejs.org/en/" target="_blank">Node.js</a> more and more. Personally I really like it. Using node.js on ChakraCore has some advantages over using V8. I&#8217;ve decided to get to know node.js a bit better and start a series of posts about it, beginning from the top.

### What is node.js?

Node.js is described as interface to <a href="https://developers.google.com/v8/" target="_blank">V8, Google&#8217;s JavaScript engine</a> that also used in Chrome. Node.js enable you to write server-side code using JavaScript. It is uses an event-driven, non-blocking I/O mode.  This  very lightweight and efficient, but, as a trade off, you have have to implement every HTTP status code yourself. Fortunately there are a lot of libraries that can help you with that. Packages are distributed by the node.js&#8217; packaging system, <a href="https://www.npmjs.com/" target="_blank">npm</a>, which happens to be the largest ecosystem of open source libraries in the world.

### Why use ChakraCore?

I was mentioning ChakraCore a few times already. What the heck is that? ChakraCore is the core part of Chakra, Microsoft&#8217;s JavaScript engine, the engine that powers Microsoft Edge. <a href="https://github.com/Microsoft/ChakraCore" target="_blank">ChakraCore is open source</a>, runs cross platform and is also very fast and efficient. So technically it should be possible to replace V8 in node.js with ChakraCore. And it is. Since everything is open source nowadays, Microsoft <a href="https://github.com/nodejs/node/pull/4765" target="_blank">forked node.js</a> and created a shim for the V8 API, ChakraShim, to make node.js use ChakraCore.

The fact that node.js can run on ChakraCore isn&#8217;t the best reason by itself. But there is another bigger advantage in using ChakraCore:

**_Time Travel Debugging_**

Every developer knows about placing breakpoints, hitting them and stepping through the code from there. But what if you are just passed the point that has the issue you want to investigate? You normally would place a breakpoint at another place and rerun your application, bringing it to the same state and trying to hit that breakpoint. Wouldn&#8217;t it be great if you didn&#8217;t have to go though all of that and could just step backwards? That&#8217;s exactly what Time Travel Debugging can do.

## Set up

Let&#8217;s get node.js up and running. The easiest way to get going us by using the node-ChakraCore version switcher, _nvs_. You can download that <a href="https://github.com/jasongin/nvs" target="_blank">here</a>.

After installing _nvs _ go to command prompt or PowerShell and run &#8216;nvs&#8217;. Now you can select a &#8216;remote&#8217;. This is will be the node.js type to use.

[<img class="wp-image-1622 size-large alignnone" src="https://i2.wp.com/www.timmykokke.com/wp-content/uploads/2017/02/NodeChakra-SelectRemote-1024x207.jpg?w=320" srcset="https://i1.wp.com/www.timmykokke.com/wp-content/uploads/2017/02/NodeChakra-SelectRemote.jpg?resize=1024%2C207&ssl=1 1024w, https://i1.wp.com/www.timmykokke.com/wp-content/uploads/2017/02/NodeChakra-SelectRemote.jpg?resize=300%2C61&ssl=1 300w, https://i1.wp.com/www.timmykokke.com/wp-content/uploads/2017/02/NodeChakra-SelectRemote.jpg?resize=768%2C155&ssl=1 768w, https://i1.wp.com/www.timmykokke.com/wp-content/uploads/2017/02/NodeChakra-SelectRemote.jpg?w=1109&ssl=1 1109w, https://i1.wp.com/www.timmykokke.com/wp-content/uploads/2017/02/NodeChakra-SelectRemote.jpg?w=640&ssl=1 640w, https://i1.wp.com/www.timmykokke.com/wp-content/uploads/2017/02/NodeChakra-SelectRemote.jpg?w=960&ssl=1 960w" sizes="(min-width: 900px) 600px, 900px" data-recalc-dims="1" />](https://i1.wp.com/www.timmykokke.com/wp-content/uploads/2017/02/NodeChakra-SelectRemote.jpg)

After selecting a node.js, you can specify the exact version to use:

<img class="alignnone wp-image-1623 size-full" src="https://i0.wp.com/www.timmykokke.com/wp-content/uploads/2017/02/NodeChakra-SelectVersion.jpg?w=320" srcset="https://i0.wp.com/www.timmykokke.com/wp-content/uploads/2017/02/NodeChakra-SelectVersion.jpg?w=910&ssl=1 910w, https://i0.wp.com/www.timmykokke.com/wp-content/uploads/2017/02/NodeChakra-SelectVersion.jpg?resize=300%2C119&ssl=1 300w, https://i0.wp.com/www.timmykokke.com/wp-content/uploads/2017/02/NodeChakra-SelectVersion.jpg?resize=768%2C304&ssl=1 768w, https://i0.wp.com/www.timmykokke.com/wp-content/uploads/2017/02/NodeChakra-SelectVersion.jpg?w=640&ssl=1 640w" sizes="(min-width: 900px) 600px, 900px" data-recalc-dims="1" />

Wait for it to download and install&#8230;

After it is installed you should be able to request the version with &#8220;node &#8211;version&#8221;.

<img class="alignnone size-full wp-image-1625" src="https://i2.wp.com/www.timmykokke.com/wp-content/uploads/2017/02/NodeChakra-Version.jpg?resize=320%2C33" alt="" width="320" height="33" srcset="https://i2.wp.com/www.timmykokke.com/wp-content/uploads/2017/02/NodeChakra-Version.jpg?w=469&ssl=1 469w, https://i2.wp.com/www.timmykokke.com/wp-content/uploads/2017/02/NodeChakra-Version.jpg?resize=300%2C31&ssl=1 300w" sizes="(min-width: 900px) 600px, 900px" data-recalc-dims="1" />

## Getting up and running

Now we have node.js running we could begin developing an application. I&#8217;m going to start with a very simple application using express.js.

In a later tutorial I&#8217;m going to show you how you can scaffold using express.js, but for now let&#8217;s get a simple app running.  I always start with creating a new folder, let&#8217;s call it &#8216;NodeDemo&#8217; and &#8216;cd&#8217; into that.

Node.js comes with a <a href="https://www.npmjs.com/" target="_blank">package manager, npm</a>. That&#8217;s one of the most used standards in JavaScript development nowadays. It can do a lot more than only managing packages, but we&#8217;ll save that for a later tutorial.

The use of npm has to be initialized inside the folder we just created run &#8216;npm init&#8217;. You can fill out the questions asked, or just enter through for now, until you&#8217;re back at the commandline. This will create a _package.json_ file in which the packages used by the project are stored.

Next, let&#8217;s add the package for express.js by running the folling command: &#8216;npm install express &#8211;save&#8217;. The _&#8211;save_ options makes sure the use of the package is registered into the package.json file.

Last thing to do is use the express.js package in an app. It&#8217;s time to start Visual Studio Code. You can do that by running &#8216;code .&#8217; in the commandline (note the period at the end). Add a file, &#8216;app.js&#8217; and add the following code.



<!-- pre>var express = require('express');
var app = express();

app.get('/', function (req, res) {
res.send('Hello World!');
});

app.listen(3000, function () {
console.log('Example app listening on port 3000!');
});</pre--> This small piece of code does a few things. The first part loads express.js and initializes it.

After that it registers an HTTP GET on the root url &#8216;/&#8217;. When an GET is performed the function is called and a response is send to the client.

The last part starts the app listening on port 3000 and logs a message to the console when it&#8217;s started.

If you followed along, you should be able to run the app now. Go back to the commandline and type:&#8217;node app.js&#8217;.
  
<img class="alignnone size-full wp-image-1685" src="https://i1.wp.com/www.timmykokke.com/wp-content/uploads/2017/02/running-the-app.jpg?resize=320%2C34" alt="" width="320" height="34" srcset="https://i1.wp.com/www.timmykokke.com/wp-content/uploads/2017/02/running-the-app.jpg?w=534&ssl=1 534w, https://i1.wp.com/www.timmykokke.com/wp-content/uploads/2017/02/running-the-app.jpg?resize=300%2C32&ssl=1 300w" sizes="(min-width: 900px) 600px, 900px" data-recalc-dims="1" />

Now you should be able to navigate to http://localhost:3000 and see the app running&#8230;

And that&#8217;s it.