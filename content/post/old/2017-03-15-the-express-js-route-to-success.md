---
id: 1711
title: The Express.js Route to Success | express.js router
date: 2017-03-15T23:50:31+00:00
author: Timmy
layout: post
guid: http://www.timmykokke.com/?p=1711
permalink: /2017/03/the-express-js-route-to-success/
wsw-settings:
  - 'a:48:{s:13:"keyword_value";s:17:"express.js router";s:15:"is_meta_keyword";s:1:"1";s:17:"meta_keyword_type";s:0:"";s:13:"is_meta_title";s:1:"1";s:10:"meta_title";s:31:"The Express.js Route to Success";s:19:"is_meta_description";s:1:"1";s:21:"is_meta_robot_noindex";s:0:"";s:22:"is_meta_robot_nofollow";s:0:"";s:19:"is_meta_robot_noodp";s:0:"";s:20:"is_meta_robot_noydir";s:0:"";s:16:"meta_description";s:236:"You probably want your node.js server to respond to requests that are coming in, specially when you are building a website. This can be complex and quite tedious to implement in vanilla node.js. Luckily express.js has done this for you.";s:17:"is_over_sentences";s:0:"";s:20:"first_over_sentences";s:0:"";s:19:"last_over_sentences";s:0:"";s:16:"is_rich_snippets";s:0:"";s:18:"show_rich_snippets";s:0:"";s:12:"rating_value";s:1:"0";s:13:"review_author";s:0:"";s:14:"review_summary";s:0:"";s:18:"review_description";s:0:"";s:10:"event_name";s:0:"";s:10:"event_date";s:0:"";s:9:"event_url";s:0:"";s:19:"event_location_name";s:0:"";s:21:"event_location_street";s:0:"";s:23:"event_location_locality";s:0:"";s:21:"event_location_region";s:0:"";s:12:"people_fname";s:0:"";s:12:"people_lname";s:0:"";s:15:"people_locality";s:0:"";s:13:"people_region";s:0:"";s:12:"people_title";s:0:"";s:14:"people_homeurl";s:0:"";s:15:"people_photourl";s:0:"";s:12:"product_name";s:0:"";s:16:"product_imageurl";s:0:"";s:19:"product_description";s:0:"";s:14:"product_offers";s:0:"";s:18:"is_social_facebook";s:0:"";s:25:"social_facebook_publisher";s:0:"";s:22:"social_facebook_author";s:0:"";s:21:"social_facebook_title";s:0:"";s:27:"social_facebook_description";s:0:"";s:17:"is_social_twitter";s:0:"";s:20:"social_twitter_title";s:0:"";s:26:"social_twitter_description";s:0:"";s:15:"autolink_anchor";s:0:"";s:19:"is_disable_autolink";s:0:"";}'
categories:
  - node.js
tags:
  - Express.js
  - JavaScript
  - Node.js
---
You probably want your node.js server to respond to requests that are coming in, specially when you are building a website in this site <https://www.webdesign499.com/5-types-of-content-every-business-website-should-have/>. This can be complex and quite tedious to implement in vanilla node.js. Luckily <a href="http://expressjs.com/" target="_blank">express.js </a>has done this for you.
  
<!--more-->


  
<img style="width: 100%;" src="https://i0.wp.com/www.timmykokke.com/wp-content/uploads/2017/03/road-1030789_1280-e1489614864953-1024x435.jpg?resize=320%2C136" alt="" data-recalc-dims="1" />

## Basic Routing

Your node.js server needs to respond to event the most basic HTTP requests. If it doesn't your website would be very boring. <a href="http://expressjs.com/en/4x/api.html#app.METHOD" target="_blank">Express.js has functions for the 23</a>( I thought there were like 8&#8230; :P ) most common HTTP methods. They all work in the same way. For example, to respond to an HTTP GET method on the root url you can do this:
  
Let's dissect this piece. The _app_ object is defined earlier and holds the current instance of  the Express app. This object is instantiated at the beginning of your _app.js_ file if you followed the description in my <a href="http://www.timmykokke.com/2017/03/building-an-app-with-express-js-pt1/" target="_blank">previous tutorial</a>&#8230;

On the app object the _get_ function is called. The first parameter of this function hold the URL on which the GET method should be handled. The second parameter is a function that is called when a request to the URL from the first parameter is coming in. This function has to have 2 parameters itself, an object containing all information of the request and an object you can use to create a response. In this case its _send_ function is called with a string. This string will be send back to the client.

In a real-world application you probably end up with a lot of routes and handlers. You don't want all of these handled inside you app.js. Express.js has you covered. This should be already inside the default app.js:
  
and if we look at that file at ./routes/index:
  
In the first part you can see that the _index _file is loaded with _require_. A few lines below that it is used. Instead of the _get _function the _use_ function is used this time. Again, its first parameter is the route to cover, the second a <a href="http://expressjs.com/en/4x/api.html#router" target="_blank"><em>Router</em> object from Express.js</a>. And that is it as far as the app.js goes. You'll probably end up with a whole list of these _use_ functions. The _use_ function can be used for a lot more than only routing. If you want to use logging or authentication, this function can be used to specify middleware for that as well. Often the path parameter is omitted than.

The second part is located inside the ./routes folder by default. In this case I'm showing the default _index.js_ file that's in there. Right at the start of the file it loads &#8216;express' and initialized the router.

After that the _get_ function is called, again with a path. That path however starts at the location that is used in the app.js file. So for example when you do something like &#8220;app.use(&#8216;/users/',users);&#8221; in your app.js file, the path you use in the _users.js_ file may look like &#8220;router.put(&#8216;/description', someFunction)&#8221;. In that case the URL for which the HTTP PUT verb handles &#8220;http://yourdomain.com/users/description&#8221;. _ _

## Handling query parameters

With handling calls to certain URLs, you also want to be able to handle query parameters or the message body send to that URL. Both are handled differently, so first let's look at the query parameters.

Take the following URL: &#8220;http://yourdomain.com/users/p?name=sorskoot&#8221;. In the handling of the HTTP GET, you want to get access to the _name_ parameter.
  
To get access to the query parameters you can use the _params_ object that is available though the _req _argument in the handling of the request. Since JavaScript isn't strongly typed, you can just access the parameter.

It's nice to be able to use &#8216; ? &#8216; and stuff in the URL, but I personally would rather have the URL written like: &#8220;http://yourdomain.com/users/p/sorskoot&#8221;. In situations like that, express.js provides us with the solution. You can add a &#8216; : &#8216; to the path argument followed by the name of the parameter and the rest is handled automatically. The code would look like this in that case:
  
Now what if we want to use an HTTP POST? We don't have a query string to pick parameters from. In that case we don't use the _params_ property, but the _body_ property of the _req_ argument. In the case below I want to POST something to &#8220;http://yourdomain.com/users/p&#8221;. Inside my _users.js_ file I can handle this like:
  


## More advanced routing

Sometimes you need to do more than one thing on a certain request or URL. Express.js provides a mechanism to have the routing being continuously checked. By calling the next() function that is passed to the route handler you do exactly that. You can have multiple callback handlers on the exact same route.

There are two more functions on the route that can be very useful when chaining handlers, &#8216;router.all()' and &#8216;router.param()'. The &#8216;router.all()'  is similar to the &#8216;router.use()' function, except that it handles all HTTP verbs. The &#8216;router.param()' function adds a callback that triggers on the parameters. This function takes the name of the url parameter as an argument and is called when a url is routed that contains that parameter.

This means that you can have a routers that handle every path,  that handle the parameters and that handle the HTTP verbs:
  

  
Keep in mind that the order of registering the handlers is significant. The _param_ function is always called before the use of that parameter. But placing the _all_ function after the _get_ function, this having the wildcard path &#8216; * &#8216;  later than the much tighter &#8216;/p/:name' will cause the _all _function not being called.

## Working with the response

When you are done handling the route you'll probably want to send some response back to the client. There are a lot of specialized function you can use. I'm going to give you some information on the most common.

_&#8216;res.send()'_ sends a response back to the client. This can be pretty much everything, a string, a JSON object or a Buffer. The content-length header is set automatically.

_&#8216;res.json()' _can be used to send a piece of JSON back to the client. Even though you can send JSON back using the _send_ function, the _json_ function provide a little bit more customization on the data. For example, you can specify the number of spaces used or specify a _replacer_ function to further customize the parsing.

The last one I like to mention is &#8216;_res.render()_&#8216;. This function uses to specified view engine to render a template to HTML.

Here are a few examples: