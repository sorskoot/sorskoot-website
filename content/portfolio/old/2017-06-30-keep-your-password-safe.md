---
id: 1834
title: Keep your password safe!
date: 2017-06-30T16:10:20+00:00
author: Timmy
layout: post
guid: https://www.timmykokke.com/?p=1834
permalink: /2017/06/keep-your-password-safe/
categories:
  - HTML5
  - JavaScript
tags:
  - websecurity
---
I&#8217;m currently working on a short course on web security. In this course, I&#8217;m going to show a couple of common mistakes in websites that create gaping holes. I&#8217;d like to give you a small tip in advance, just to make you more aware of what you are doing when you hit that &#8216;remember my password&#8217; button in your browser.

[<img class="aligncenter wp-image-1837 size-full" src="https://i2.wp.com/www.timmykokke.com/wp-content/uploads/2017/06/Login.jpg?resize=320%2C220&#038;ssl=1" alt="" width="320" height="220" srcset="https://i2.wp.com/www.timmykokke.com/wp-content/uploads/2017/06/Login.jpg?w=370&ssl=1 370w, https://i2.wp.com/www.timmykokke.com/wp-content/uploads/2017/06/Login.jpg?resize=300%2C206&ssl=1 300w" sizes="(min-width: 900px) 600px, 900px" data-recalc-dims="1" />](https://i2.wp.com/www.timmykokke.com/wp-content/uploads/2017/06/Login.jpg?ssl=1)

Although I&#8217;m pretty sure your browser itself keeps the password safe, it has to place it in the password field of the login form to be able to submit it. With this small trick you, (and anyone else that might sit behind your pc), can read it again&#8230;

When the username is selected and the browser has filled in the &#8216; * &#8216; in the password box, right click the password box and hit inspect.

<a href="https://i0.wp.com/www.timmykokke.com/wp-content/uploads/2017/06/Login2.jpg?ssl=1" target="_blank" rel="noopener"><img class="aligncenter wp-image-1838 size-large" src="https://i0.wp.com/www.timmykokke.com/wp-content/uploads/2017/06/Login2.jpg?resize=320%2C212&#038;ssl=1" alt="" width="320" height="212" srcset="https://i0.wp.com/www.timmykokke.com/wp-content/uploads/2017/06/Login2.jpg?resize=1024%2C679&ssl=1 1024w, https://i0.wp.com/www.timmykokke.com/wp-content/uploads/2017/06/Login2.jpg?resize=300%2C199&ssl=1 300w, https://i0.wp.com/www.timmykokke.com/wp-content/uploads/2017/06/Login2.jpg?resize=768%2C510&ssl=1 768w, https://i0.wp.com/www.timmykokke.com/wp-content/uploads/2017/06/Login2.jpg?w=1037&ssl=1 1037w, https://i0.wp.com/www.timmykokke.com/wp-content/uploads/2017/06/Login2.jpg?w=640&ssl=1 640w, https://i0.wp.com/www.timmykokke.com/wp-content/uploads/2017/06/Login2.jpg?w=960&ssl=1 960w" sizes="(min-width: 900px) 600px, 900px" data-recalc-dims="1" /></a>
  
In the inspector go to the console and type: $0.value

[<img class="size-full wp-image-1841 aligncenter" src="https://i1.wp.com/www.timmykokke.com/wp-content/uploads/2017/06/login3.jpg?resize=264%2C120&#038;ssl=1" alt="" width="264" height="120" data-recalc-dims="1" />](https://i1.wp.com/www.timmykokke.com/wp-content/uploads/2017/06/login3.jpg?ssl=1)

Et Voila, your password is exposed.

The &#8216;$0&#8217; refers to the selected element in the inspector. &#8216;value&#8217; just writes the value property on that to the console. In this case, the password is in there.

&nbsp;

&nbsp;

&nbsp;