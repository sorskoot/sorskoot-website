---
id: 1082
title: Convert json to TypeScript
date: 2014-01-09T17:17:34+00:00
author: Timmy
layout: post
guid: http://www.timmykokke.com/?p=1082
permalink: /2014/01/convert-json-to-typescript/
categories:
  - JSON
  - TypeScript
tags:
  - JSON
  - TypeScript
---
While working on a Windows Store app I noticed I was writing TypeScript interfaces to get some syntax checking and code completion on JSON data received from an external service. In C# projects I’m used to use <http://json2csharp.com> to get the C# classes for my JSON and than just deserialize it to those types. I quickly searched the web and realized there wasn’t a similar solution for TypeScript.

# Solution

<http://json2ts.com> was born. You just paste a block of JSON code into the text area and hit the _generate TypeScript_ button to convert the piece of JSON to a TypeScript definition with interfaces. 

<a title="json2ts" href="http://json2ts.com/" target="_blank"><img title="json2ts" style="border-left-width: 0px; border-right-width: 0px; background-image: none; border-bottom-width: 0px; padding-top: 0px; padding-left: 0px; display: inline; padding-right: 0px; border-top-width: 0px" border="0" alt="json2ts" src="/images/2014/01/image1.png" width="320" height="247" data-recalc-dims="1" /></a>

# Using the site

To use the result in you application you’ll have to add a “_.d.ts”_&#160; file (declaration files) and just copy/paste the generated TypeScript from <a href="http://json2ts.com/" target="_blank">json2ts</a> in there. You may have seen these files before, like for jQuery or KnockoutJS. These files only contain a description of types and are very useful when used next to a Javascript Library (for a lot of these have a look at <a title="DefinitelyTyped" href="https://github.com/borisyankov/DefinitelyTyped" target="_blank">DefinitelyTyped</a>), but there are useful on the JSON result of a external service too.

Let’s assume there’s some 3rd party service you want to use in you application that return the following JSON:

<pre>{
    "date" : "01-03-2014",
    "entry" : [{
            "id" : 1,
            "name" : "Alpha"
        }, {
            "id" : 2,
            "name" : "Beta",
            "xtra" : {
                "value" : "D",
                "someRandomLongerName" : 162    
            }
        }
    ]
}</pre>

This result is stored in the “result” variable. Now you can type “result.date” in your code to use the date value. But, TypeScript can give use code completion and syntax checking in Visual Studio. When <http://json2ts.com> generates the interfaces for this piece of JSON it looks something like this:

<pre>declare module namespace {

    export interface Xtra {
        value: string;
        someRandomLongerName: number;
    }

    export interface Entry {
        id: number;
        name: string;
        xtra: Xtra;
    }

    export interface RootObject {
        date: string;
        entry: Entry[];
    }

}</pre>

You can see the relations between the various types. When you place this in a “.d.ts” file and reference this file in the TypeScript file you want to use the definition you get all the benefit of TypeScript.

# Wrap up

The site isn’t tested very much and I’m pretty sure there are some bug in it. If you have a piece of JSON that isn’t converting properly, please send me an email (<a title="mailto:ts2json@timmykokke.com" href="mailto:ts2json@timmykokke.com" target="_blank">ts2json@timmykokke.com</a>). If you have any questions or feature suggestion drop me a line too. I probably going to add some “advanced” features to set the module name and root object names.