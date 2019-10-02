---
id: 1993
title: BabylonJS WebVR Hello World
date: 2018-05-27T21:49:33+00:00
author: Timmy
layout: post
share: true
comments: true
guid: https://www.timmykokke.com/?p=1993
permalink: /2018/05/babylonjs-webvr-hello-world/
wsw-settings:
  - 'a:48:{s:13:"keyword_value";s:0:"";s:15:"is_meta_keyword";s:1:"1";s:17:"meta_keyword_type";s:4:"tags";s:13:"is_meta_title";s:1:"1";s:10:"meta_title";s:18:"WebVR in BabylonJS";s:19:"is_meta_description";s:1:"1";s:21:"is_meta_robot_noindex";s:0:"";s:22:"is_meta_robot_nofollow";s:0:"";s:19:"is_meta_robot_noodp";s:0:"";s:20:"is_meta_robot_noydir";s:0:"";s:16:"meta_description";s:55:"Tutorial on how to get started using WebVR in BabylonJS";s:17:"is_over_sentences";s:0:"";s:20:"first_over_sentences";s:0:"";s:19:"last_over_sentences";s:0:"";s:16:"is_rich_snippets";s:0:"";s:18:"show_rich_snippets";s:0:"";s:12:"rating_value";s:1:"0";s:13:"review_author";s:0:"";s:14:"review_summary";s:0:"";s:18:"review_description";s:0:"";s:10:"event_name";s:0:"";s:10:"event_date";s:0:"";s:9:"event_url";s:0:"";s:19:"event_location_name";s:0:"";s:21:"event_location_street";s:0:"";s:23:"event_location_locality";s:0:"";s:21:"event_location_region";s:0:"";s:12:"people_fname";s:0:"";s:12:"people_lname";s:0:"";s:15:"people_locality";s:0:"";s:13:"people_region";s:0:"";s:12:"people_title";s:0:"";s:14:"people_homeurl";s:0:"";s:15:"people_photourl";s:0:"";s:12:"product_name";s:0:"";s:16:"product_imageurl";s:0:"";s:19:"product_description";s:0:"";s:14:"product_offers";s:0:"";s:18:"is_social_facebook";s:0:"";s:25:"social_facebook_publisher";s:0:"";s:22:"social_facebook_author";s:0:"";s:21:"social_facebook_title";s:0:"";s:27:"social_facebook_description";s:0:"";s:17:"is_social_twitter";s:0:"";s:20:"social_twitter_title";s:0:"";s:26:"social_twitter_description";s:0:"";s:15:"autolink_anchor";s:0:"";s:19:"is_disable_autolink";s:0:"";}'
categories:
  - BabylonJS
  - WebVR
tags:
  - babylonjs
  - JavaScript
  - TypeScript
  - webvr
---
In a few weeks, we have our next [WebXR NL meetup](https://www.meetup.com/webxrnl/). This evening we are going to put a couple of WebVR frameworks head to head: **A-Frame**, **ThreeJS**, and **BabylonJS**. Since I happen to have some experience with <a href="https://babylonjs.com/" rel="noopener" target="_blank">BabylonJS </a>it is upon me to explain how to work with WebVR in BabylonJS. This post will be the first part, &#8220;Hello World&#8221;.

# Basics

For this tutorial I use <a href="https://stackblitz.com/edit/babylonjs-helloworld" rel="noopener">StackBlitz</a>, but any other online or offline editor will work. In my case, I started a new TypeScript project in StackBlitz. This will give you an HTML file, a TS file, and a CSS file. The HTML file is the simplest. This contains only 1 element in the body of the HTML file: the Canvas element. All renderings will go to this canvas.
  
{{< gist sorskoot 46bbfeeb61b9d161949601ea9e559081 "index.html" >}}
  
The CSS file is pretty straightforward as well. It makes sure the canvas element will file the entire screen.
  
{{< gist sorskoot 46bbfeeb61b9d161949601ea9e559081 "styles.css" >}}

# Packages

To get BabylonJS to work we need to install a few packages. Of course BabylonJS itself, this packages also includes the TypeScript definitions.
  
<img class="aligncenter size-full wp-image-1998" src="https://i1.wp.com/www.timmykokke.com/wp-content/uploads/2018/05/2018-05-26_23-31-16.png?resize=320%2C147&#038;ssl=1" alt="" width="320" height="147" srcset="https://i1.wp.com/www.timmykokke.com/wp-content/uploads/2018/05/2018-05-26_23-31-16.png?w=381&ssl=1 381w, https://i1.wp.com/www.timmykokke.com/wp-content/uploads/2018/05/2018-05-26_23-31-16.png?resize=300%2C138&ssl=1 300w" sizes="(min-width: 900px) 600px, 900px" data-recalc-dims="1" />BabylonJS needs a couple of packages, which you don&#8217;t need right away, but may become handy in the future. However, if you don&#8217;t add them, Babylon will complain.

  * <a href="https://www.npmjs.com/package/oimo" rel="noopener">Oimo</a> => JavaScript 3D Physics engine
  * <a href="https://www.npmjs.com/package/cannon" rel="noopener">Cannon</a> => JavaScript 3D Physics engine
  * <a href="https://www.npmjs.com/search?q=earcut" rel="noopener">Earcut</a> => JavaScript triangulation library

With StackBlitz it very easy and fast to install them. Just enter the name in the &#8216;enter package name&#8217;. If you miss one StackBlitz will offer to install the missing package.

# Main Class

I started by clearing the index.ts file with the exception of the import of the styles. I&#8217;ve added the import for BabylonJS as well. This will make sure the library is loaded and you can use it.

We need a TypeScript class for our app to run, I named it VRApp. Add an empty constructor and a function named &#8216;run()&#8217;. This is the basic outline of the class. After creating the class, instantiate it and call the run function.
  
{{< gist sorskoot 46bbfeeb61b9d161949601ea9e559081 "index.step1.ts" >}}

Babylon works by having an <a href="http://doc.babylonjs.com/api/classes/babylon.engine" rel="noopener">Engine</a>, that talks to the lower-level WebGL. You also need one or more BabylonJS <a href="https://doc.babylonjs.com/api/classes/babylon.scene" rel="noopener">Scenes</a>. The Scene contains, for example, the geometry, lights, and camera that needs to be rendered. I created 2 private fields for these because there need to be available from different places in the class.

The engine itself is instantiated in the constructor of the VRApp class. You need to pass 2 parameters to the constructor of the BabylonJS Engine: a reference to the canvas and a bool to turn the antialiasing on. After that, we can instantiate a scene and pass it the engine. Right now, your code should like something like:
  
{{< gist sorskoot 46bbfeeb61b9d161949601ea9e559081 "index.step2.ts" >}}

Next, we need to add a few things to the scene to render. We need a light to illuminate the scene. The first light I often create is a <a href="https://doc.babylonjs.com/api/classes/babylon.hemisphericlight" rel="noopener">hemispheric light</a>. This light has a direction. This is not the direction of the light itself, but the reflection of the light. The hemispheric light is used to create some ambient lighting in your scene. For ambient lighting in combination with other lights, you often point this up. In this case, I kept it at an angle to get some shading going.
  
{{< gist sorskoot 46bbfeeb61b9d161949601ea9e559081 "index.step3.ts" >}}

Lighting alone won&#8217;t do anything. We need some geometry. For the ground, I create a <a href="https://doc.babylonjs.com/api/classes/babylon.groundmesh" rel="noopener">Ground Mesh</a>. This plane is optimized for the ground and can be used in more advanced scenarios like octrees if you wish in the future.

The rest of the scene will be made from a couple of cubes randomly scattered around. I created a simple for-loop in which I create a cube mesh and change its position to a random value.
  
{{< gist sorskoot 46bbfeeb61b9d161949601ea9e559081 "index.step4.ts" >}}

Almost there. We need two more things. We need an implementation of the _run_ function of the VRApp class. In this function, I provide the BabylonJS Engine I created in the beginning with a <a href="https://doc.babylonjs.com/api/classes/babylon.engine#runrenderloop" rel="noopener">render loop</a>. This function we provide to the engine is called every frame and is responsible for rendering the scene. This function can do more and probably will do more in the future, but for now, it only calls the <a href="https://doc.babylonjs.com/api/classes/babylon.scene#render" rel="noopener">render function</a> of the scene.
  
{{< gist sorskoot 46bbfeeb61b9d161949601ea9e559081 "index.step5.ts" >}}

At this point, you should see an error when running the application using StackBlitz.

[<img class="aligncenter size-full wp-image-2010" src="https://i1.wp.com/www.timmykokke.com/wp-content/uploads/2018/05/2018-05-27_21-46-40.png?resize=320%2C116&#038;ssl=1" alt="" width="320" height="116" srcset="https://i1.wp.com/www.timmykokke.com/wp-content/uploads/2018/05/2018-05-27_21-46-40.png?w=390&ssl=1 390w, https://i1.wp.com/www.timmykokke.com/wp-content/uploads/2018/05/2018-05-27_21-46-40.png?resize=300%2C108&ssl=1 300w" sizes="(min-width: 900px) 600px, 900px" data-recalc-dims="1" />](https://i1.wp.com/www.timmykokke.com/wp-content/uploads/2018/05/2018-05-27_21-46-40.png?ssl=1)

And the error is correct. We didn&#8217;t create a camera. In a &#8216;normal&#8217; WebGL application you need to create a camera, and you can do that in our case as well. But you don&#8217;t have to. Creating a WebVR project from a WebGL project takes some effort: You need to configure everything; And render a special camera. To make it as easy as possible BabylonJS has a special method that creates all of these for you and converts your application to WebVR, <a href="https://doc.babylonjs.com/api/classes/babylon.scene#createdefaultvrexperience" rel="noopener">createDefaultVRExperience</a>. The function creates a default <a href="https://doc.babylonjs.com/api/classes/babylon.vrexperiencehelper" rel="noopener">VRExperienceObject</a>. This helper will add the VR-button to the UI, checks if WebVR is available and by default creates (or replaces) the device orientation camera for you. I&#8217;ve added the following to the end of the constructor of the VRApp class:
  
{{< gist sorskoot 46bbfeeb61b9d161949601ea9e559081 "index.step6.ts" >}}

# Result

The result of the tutorial should look something like this, the full code is in here as well:
  
{{< stackblitz babylonjs-helloworld "index.ts" >}}
  
You can open this code on StackBlitz and play with it yourself. Of course, there&#8217;s much more you can do with WebVR, but this is it for this tutorial. If you have any question feel free to add a comment or come to our <a href="https://www.meetup.com/webxrnl/events/250348403/" rel="noopener">meetup on the 12th of June in Eindhoven, The Netherland</a>s.