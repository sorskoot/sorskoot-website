---
id: 1591
title: Quick note on WinJS templates and controls
date: 2016-11-02T20:48:46+00:00
author: Timmy
layout: post
guid: http://www.timmykokke.com/?p=1591
permalink: /2016/11/quick-note-on-winjs-templates-and-controls/
categories:
  - JavaScript
  - WinJs
tags:
  - WinJS
---
<div>
  Today I was working streaming (<a href="https://livecoding.tv/sorskoot">https://livecoding.tv/sorskoot</a>) building my new JavaScript Audio Workstation. I wanted to use a template in a custom WinJS control but found it wasn&#8217;t in the samples.  Also, the MSDN documentation contained an error which made it even harder to get it to work.
</div>

<div>
</div>

<!--more-->

<div>
  Here&#8217;s an example:
</div>

<div>
</div>

<div>
  <pre class="brush:javascript">(function () {
  WinJS.Namespace.define('jsaw.ui', { 
    menuBar: WinJS.Class.define(
      function (element, options) {
        this.element = element || document.createElement('div');
        this.element.winControl = this;
        this.options = options;
        this.createControl();
    }, {
      createControl: function () {
        WinJS.UI.Fragments.render('./app/templates/menubar.html',
                                  this.element)
                          .done(
                                /* Your success and error handlers */
                          );
      }
    })
  });
  WinJS.Class.mix(jsaw.ui.menuBar, WinJS.Utilities.eventMixin);
})();</pre>
</div>

<div>
  In this example I create a WinJS class in the <em>jsaw.ui</em> namespace. This class has a constructor function (line 4) that calls the <em>createControl</em> function. In that function (line 10), a fragment is rendered. This fragment serves as a template for the control. All HTML in that control will be rendered and it will be cached as well. Note, that the Fragments object is in the <em>UI</em> namespace.
</div>