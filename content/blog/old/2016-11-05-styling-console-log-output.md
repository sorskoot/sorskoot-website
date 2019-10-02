---
id: 1598
title: Styling console.log output
date: 2016-11-05T08:43:03+00:00
author: Timmy
layout: post
guid: http://www.timmykokke.com/?p=1598
permalink: /2016/11/styling-console-log-output/
image: /wp-content/uploads/2016/11/fun-console-message.png
categories:
  - JavaScript
tags:
  - Console
  - JavaScript
---
I recently learned about a very cool _console.log_ feature. You can use CSS formatting to style the output of _console.log_. And it&#8217;s very easy. All you have to do is use the &#8216; **%c** &#8216; formatting tag in your message. <!--more-->Here&#8217;s a simple example:

<pre class="brush:javascript">console.log('%cThis is a %cfun%c console message',
            'font: 24px serif; font-weight:100; color: #228;',
            'font: 30px sans-serif; font-weight:800; color: #F44;',
            'font: 24px serif; font-weight:100; color: #228;'
        );
</pre>

When you look in the console of the browser, you should see something like this:

[<img class="alignnone size-full wp-image-1600" src="https://i2.wp.com/www.timmykokke.com/wp-content/uploads/2016/11/fun-console-message.png?resize=320%2C36" alt="fun-console-message" width="320" height="36" srcset="https://i2.wp.com/www.timmykokke.com/wp-content/uploads/2016/11/fun-console-message.png?w=633&ssl=1 633w, https://i2.wp.com/www.timmykokke.com/wp-content/uploads/2016/11/fun-console-message.png?resize=300%2C34&ssl=1 300w" sizes="(min-width: 900px) 600px, 900px" data-recalc-dims="1" />](https://i2.wp.com/www.timmykokke.com/wp-content/uploads/2016/11/fun-console-message.png)

Unfortunately this features is not supported in all browsers, which may result in a whole bunch of CSS being written to the console. You should check the browser in your code before using this feature. As far as I know only Chrome and Firefox support this feature.