---
id: 1557
title: Debugging AngularJS in Visual Studio 2015
date: 2016-05-24T15:23:31+00:00
author: Timmy
layout: post
guid: http://www.timmykokke.com/?p=1557
permalink: /2016/05/debugging-angularjs-in-visual-studio-2015/
categories:
  - Angular
  - Cordova
  - JavaScript
  - Visual Studio
tags:
  - AngularJS
  - Debugging
  - Visual Studio 2015
---
While working on the Cordova Drum Machine I&#8217;m currently streaming live at <a href="http://LiveCoding.tv/sorskoot" target="_blank">LiveCoding.tv/sorskoot</a>, I ran into a few issues with Visual Studio debugger. Normally I debug my &#8216;normal&#8217; AngularJS web applications inside Chrome using an extension on the debug tools that shows the context of the selected HTML element. In Visual Studio I do not have these tools available. Here&#8217;s how to get information on the Angular context of a selected element.

## Scope

The first thing that&#8217;s really useful to gain insight to is the Angular scope. The scope has to be read from a specific DOM element. To select an element from your app (in my case I&#8217;m running my Cordova app as a UWP app on the Windows desktop), click the &#8216;select element&#8217; button in Visual Studio and pick the element from your app. In the screenshot below I&#8217;ve selected a group of radio buttons from which I&#8217;d like to view the current scope.

<a href="https://i2.wp.com/www.timmykokke.com/wp-content/uploads/2016/05/selectElement.png" target="_blank"><img class="alignnone size-large wp-image-1559" src="https://i0.wp.com/www.timmykokke.com/wp-content/uploads/2016/05/selectElement-1024x858.png?resize=320%2C268" alt="selectElement" width="320" height="268" srcset="https://i2.wp.com/www.timmykokke.com/wp-content/uploads/2016/05/selectElement.png?resize=1024%2C858&ssl=1 1024w, https://i2.wp.com/www.timmykokke.com/wp-content/uploads/2016/05/selectElement.png?resize=300%2C251&ssl=1 300w, https://i2.wp.com/www.timmykokke.com/wp-content/uploads/2016/05/selectElement.png?resize=768%2C643&ssl=1 768w, https://i2.wp.com/www.timmykokke.com/wp-content/uploads/2016/05/selectElement.png?w=1060&ssl=1 1060w, https://i2.wp.com/www.timmykokke.com/wp-content/uploads/2016/05/selectElement.png?w=640&ssl=1 640w, https://i2.wp.com/www.timmykokke.com/wp-content/uploads/2016/05/selectElement.png?w=960&ssl=1 960w" sizes="(min-width: 900px) 600px, 900px" data-recalc-dims="1" /></a>

Visual Studio will highlight the DOM element that is selected.

Now we&#8217;ll have a look at the JavaScript Console inside Visual Studio. If you type _$0_ in there and hit enter, the JavaScript Console will prompt the highlighted element. We need this to get the current Angular Scope. The easiest way to get the Angular Scope is by using the _angular.element_ function on the selected element and call the _scope _function on the result. Like so:

<pre class="brush:javascript">var s = angular.element($0).scope()</pre>

At this point the &#8216;s&#8217; variable contains the entire scope. You&#8217;re probably interested in some properties of that.

<a href="https://i1.wp.com/www.timmykokke.com/wp-content/uploads/2016/05/vm.png" target="_blank"><img class="alignnone size-large wp-image-1561" src="https://i0.wp.com/www.timmykokke.com/wp-content/uploads/2016/05/vm-1024x208.png?resize=320%2C65" alt="vm" width="320" height="65" srcset="https://i1.wp.com/www.timmykokke.com/wp-content/uploads/2016/05/vm.png?resize=1024%2C208&ssl=1 1024w, https://i1.wp.com/www.timmykokke.com/wp-content/uploads/2016/05/vm.png?resize=300%2C61&ssl=1 300w, https://i1.wp.com/www.timmykokke.com/wp-content/uploads/2016/05/vm.png?resize=768%2C156&ssl=1 768w, https://i1.wp.com/www.timmykokke.com/wp-content/uploads/2016/05/vm.png?w=1360&ssl=1 1360w, https://i1.wp.com/www.timmykokke.com/wp-content/uploads/2016/05/vm.png?w=640&ssl=1 640w, https://i1.wp.com/www.timmykokke.com/wp-content/uploads/2016/05/vm.png?w=960&ssl=1 960w" sizes="(min-width: 900px) 600px, 900px" data-recalc-dims="1" /></a>

In my drum machine I only added a property &#8216;vm&#8217; to my scope that contains the viewmodel. In my case I used this code to debug and find out what the scope contained at for the selected elements.

## Controller

Alternatively you might be interested in the controller that is used at the DOM element you have selected. The code to get access to the current controller is very similar to that of the scope. But instead of calling the scope function you have to call the controller function.

<pre class="brush:javascript">var c = angular.element($0).controller()</pre>

When evaluating the &#8216;c&#8217; variable in the console we get to see what&#8217;s inside the current controller.

<a href="https://i0.wp.com/www.timmykokke.com/wp-content/uploads/2016/05/controller.png" target="_blank"><img class="alignnone size-large wp-image-1563" src="https://i2.wp.com/www.timmykokke.com/wp-content/uploads/2016/05/controller-1024x277.png?resize=320%2C87" alt="controller" width="320" height="87" srcset="https://i0.wp.com/www.timmykokke.com/wp-content/uploads/2016/05/controller.png?resize=1024%2C277&ssl=1 1024w, https://i0.wp.com/www.timmykokke.com/wp-content/uploads/2016/05/controller.png?resize=300%2C81&ssl=1 300w, https://i0.wp.com/www.timmykokke.com/wp-content/uploads/2016/05/controller.png?resize=768%2C208&ssl=1 768w, https://i0.wp.com/www.timmykokke.com/wp-content/uploads/2016/05/controller.png?w=1360&ssl=1 1360w, https://i0.wp.com/www.timmykokke.com/wp-content/uploads/2016/05/controller.png?w=640&ssl=1 640w, https://i0.wp.com/www.timmykokke.com/wp-content/uploads/2016/05/controller.png?w=960&ssl=1 960w" sizes="(min-width: 900px) 600px, 900px" data-recalc-dims="1" /></a>

You can look at the current state of all properties inside the controller and even call function on there.

## Wrap

Since there is no specific tooling inside Visual Studio 2015 that help you to debug and explore AngularJS inside your application, these functions might help you getting some insights of your app. I would suggest to have a look at the other properties in the result of angular.element($0).

&nbsp;