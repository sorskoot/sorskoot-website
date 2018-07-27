---
id: 1550
title: Poor Mans jQuery
date: 2016-05-15T21:12:19+00:00
author: Timmy
layout: post
guid: http://www.timmykokke.com/?p=1550
permalink: /2016/05/poor-mans-jquery/
categories:
  - JavaScript
tags:
  - JavaScript
  - jQuery
---
A lot of people use jQuery in their HTML/JavaScript applications. There&#8217;s nothing wrong with that. But I&#8217;ve seen a lot of people use jQuery only to make it easy to find elements and they are not using any of the other jQuery functions. It&#8217;s pretty clear that writing a single &#8216; _$_ &#8216; instead of the way longer usages of various function on the &#8216;_document_&#8216; object, like getElementById. One of the functions on the &#8216;_document&#8217;_ object is the _querySelectorAll_ function. This function brings a similar experience to vanilla JavaScript by taking selectors as a parameter.  So if we take a look at the example below. This show a fairly complicated selector you might find in an application.
  

  
I personally don&#8217;t like writing &#8216;document.querySelectorAll every time I need to find some things in the DOM, and many people with me. That&#8217;s why a lot of developers include jQuery in their project. To be able to use a similar syntax as jQuery is using I often add the following line somewhere at the start of my JavaScript code:

<pre class="brush:javascript">window.$ = function (selector) { return document.querySelectorAll(selector); };</pre>

Here&#8217;s the earlier example, but with the poor-mans-jQuery added.
  

  
It&#8217;s not perfect and sometimes I add a context or something to that function if it is needed for that project, but it works fine in most cases.
  
As a last note, always look at the performance. If you are using selectors a lot, like in a big for-iteration, you might want to use the document.getElementsByClass function or something similar. These have less overhead and are somewhat faster.