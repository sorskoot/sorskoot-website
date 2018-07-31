---
id: 1994
title: Substance Painter to AFrame
date: 2018-07-27T22:49:33+00:00
author: Timmy
layout: post
share: true
comments: true
guid: https://www.timmykokke.com/?p=1994
permalink: /2018/07/Substance-Painter-to-AFrame/
wsw-settings:
  - 'a:48:{s:13:"keyword_value";s:0:"";s:15:"is_meta_keyword";s:1:"1";s:17:"meta_keyword_type";s:4:"tags";s:13:"is_meta_title";s:1:"1";s:10:"meta_title";s:18:"WebVR in BabylonJS";s:19:"is_meta_description";s:1:"1";s:21:"is_meta_robot_noindex";s:0:"";s:22:"is_meta_robot_nofollow";s:0:"";s:19:"is_meta_robot_noodp";s:0:"";s:20:"is_meta_robot_noydir";s:0:"";s:16:"meta_description";s:55:"Tutorial on how to get started using WebVR in BabylonJS";s:17:"is_over_sentences";s:0:"";s:20:"first_over_sentences";s:0:"";s:19:"last_over_sentences";s:0:"";s:16:"is_rich_snippets";s:0:"";s:18:"show_rich_snippets";s:0:"";s:12:"rating_value";s:1:"0";s:13:"review_author";s:0:"";s:14:"review_summary";s:0:"";s:18:"review_description";s:0:"";s:10:"event_name";s:0:"";s:10:"event_date";s:0:"";s:9:"event_url";s:0:"";s:19:"event_location_name";s:0:"";s:21:"event_location_street";s:0:"";s:23:"event_location_locality";s:0:"";s:21:"event_location_region";s:0:"";s:12:"people_fname";s:0:"";s:12:"people_lname";s:0:"";s:15:"people_locality";s:0:"";s:13:"people_region";s:0:"";s:12:"people_title";s:0:"";s:14:"people_homeurl";s:0:"";s:15:"people_photourl";s:0:"";s:12:"product_name";s:0:"";s:16:"product_imageurl";s:0:"";s:19:"product_description";s:0:"";s:14:"product_offers";s:0:"";s:18:"is_social_facebook";s:0:"";s:25:"social_facebook_publisher";s:0:"";s:22:"social_facebook_author";s:0:"";s:21:"social_facebook_title";s:0:"";s:27:"social_facebook_description";s:0:"";s:17:"is_social_twitter";s:0:"";s:20:"social_twitter_title";s:0:"";s:26:"social_twitter_description";s:0:"";s:15:"autolink_anchor";s:0:"";s:19:"is_disable_autolink";s:0:"";}'
categories:
  - AFrame
  - Substance
  - WebVR
tags:
  - Aframe
  - Substance
  - webvr
---
I was working with on a WebVR project the other day and was trying to get a model rendered with the correct textures. I was creating the textures in Substance Painter. I was doing a back and forth between various tools to get the textured model to render correctly. At first, I was using a .obj model. But I rather would have used a .glTF model.
Luckily, there's actually a very nice way to get directly to .glTF  from Substance Painter.

When you are done painting your textures, got to the file menu and look for _Export Textures…_.

![Export step 1](/images/2018/07/sp-export1.png)

In the config dropdown, find _glFT PBR Metal Roughness_. Depending on where I need the resulting files I might lower the resolution of the textures to 512x512. When uploading you models to FaceBook you need to do this to decrease the file size. 

![Export step 2](/images/2018/07/sp-export2.png)

Make any other configuration where needed and hit _export_. 

When you open the resulting folder you'll end up with files like this.

![Export result](/images/2018/07/glb-export.png)

Depending on the usage you can copy these to your project. If you only need the model with textures, the .glb file is probably the one you need. This file contains the .glTF with textures in a binary format.

To use the file in A-Frame, use the `<_a-gltf-model>` tag. Like so:

```html
<a-scene>

  <a-assets>
    <a-asset-item id="art-model" src="/assets/art.glb"></a-asset-item>
  </a-assets>

  <a-gltf-model id="art" src="#art-model" position="0 2.5 -10" ></a-gltf-model>
      
</a-scene>
  ```

  And that's all! 