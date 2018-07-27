---
id: 1859
title: Why does JavaScript even have null?
date: 2017-09-21T22:54:29+00:00
author: Timmy
layout: post
guid: https://www.timmykokke.com/?p=1859
permalink: /2017/09/why-does-javascript-even-have-null/
categories:
  - JavaScript
tags:
  - JavaScript
---
JavaScript has its quirks and difficulties. One of them is **null** **&** **undefined**. If there&#8217;s _undefined_, why does JavaScript even have null?

## Equality

Let&#8217;s start exploring null and undefined by having a look at the following comparisons:

<pre class="default prettyprint prettyprinted">null &gt;= 0; //true
null &lt;= 0; //true 
null == 0; //false 
null &gt; 0;  //false
null &lt; 0;  //false</pre>

How can null be bigger or equal to zero, less or equal to zero, but not be equal to zero?!

To understand this we have to know how JavaScript handles these comparisons. There are two different kinds of operators used in the example above: _Equality Operators_  (==, ===, != and !===) and _Relational Operators_ (>, <, >= and <=).  And both work differently.

Equality operators compare at an object level. If both _operands, _the things left and right of the operator, are of different types a strict comparison (=== or !==) is used. Because null is an object and 0 is a number they are not equal.

In the case of Relational Operators, both operands are converted to the same type. In the example to a number. Under the hood, JavaScript is doing the following:

<pre class="default prettyprint prettyprinted">Number(null) &gt;= 0; //true</pre>

Which makes much more sense. Number(null) return the value 0 and 0 is equal to 0.

Let&#8217;s try the same examples with _undefined_:

<pre class="default prettyprint prettyprinted">undefined &gt;= 0;//false 
undefined &lt;= 0;//false 
undefined == 0;//false 
undefined &lt; 0;//false
undefined &gt; 0;//false</pre>

First thought would be that this should result in the same outcome. Although JavaScript is doing the same, the result is different. Again, JavaScript is converting _undefined_ to a number, but Number_(undefined)_ is not 0 but **NaN**. The JavaScript [spec](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Comparison_Operators) says that every comparison with NaN results in false, even a comparison with NaN.

There&#8217;s even a little bit more to the _[comparison algorithm](http://www.ecma-international.org/ecma-262/5.1/#sec-11.9.3) _than this, but this explains the idea.

## Why null?

Does JavaScript need a null value? Though it would be possible to write an entire application without using null, and often it does, there is a place for null. The difference in usage is _intention_. A null value is intenionally abcent, where an undefined value is often unintentional and just the default value.

For example in a function retrieving a piece of data. When that data isn&#8217;t there, this function returns null. Otherwise, it returns the data. This way one can tell if the value is returned by the function and is set to null or if the variable that should contain the result isn&#8217;t set at all.

In other words: _null !== undefined_

&nbsp;

&nbsp;