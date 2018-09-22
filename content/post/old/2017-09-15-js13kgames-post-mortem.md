---
id: 1854
title: JS13k Games Post Mortem | A JavaScript WebVR game using A-Frame for the Js13KGames jam
date: 2017-09-15T00:00:02+00:00
author: Timmy
layout: post
guid: https://www.timmykokke.com/?p=1854
permalink: /2017/09/js13kgames-post-mortem/
wsw-settings:
  - 'a:48:{s:13:"keyword_value";s:60:"A JavaScript WebVR game using A-Frame for the Js13KGames jam";s:15:"is_meta_keyword";s:1:"1";s:17:"meta_keyword_type";s:4:"tags";s:13:"is_meta_title";s:1:"1";s:10:"meta_title";s:60:"A JavaScript WebVR game using A-Frame for the Js13KGames jam";s:19:"is_meta_description";s:1:"1";s:21:"is_meta_robot_noindex";s:0:"";s:22:"is_meta_robot_nofollow";s:0:"";s:19:"is_meta_robot_noodp";s:0:"";s:20:"is_meta_robot_noydir";s:0:"";s:16:"meta_description";s:52:"Post mortem of my entry for the Js13kGames game jam.";s:17:"is_over_sentences";s:0:"";s:20:"first_over_sentences";s:0:"";s:19:"last_over_sentences";s:0:"";s:16:"is_rich_snippets";s:0:"";s:18:"show_rich_snippets";s:0:"";s:12:"rating_value";s:1:"0";s:13:"review_author";s:0:"";s:14:"review_summary";s:0:"";s:18:"review_description";s:0:"";s:10:"event_name";s:0:"";s:10:"event_date";s:0:"";s:9:"event_url";s:0:"";s:19:"event_location_name";s:0:"";s:21:"event_location_street";s:0:"";s:23:"event_location_locality";s:0:"";s:21:"event_location_region";s:0:"";s:12:"people_fname";s:0:"";s:12:"people_lname";s:0:"";s:15:"people_locality";s:0:"";s:13:"people_region";s:0:"";s:12:"people_title";s:0:"";s:14:"people_homeurl";s:0:"";s:15:"people_photourl";s:0:"";s:12:"product_name";s:0:"";s:16:"product_imageurl";s:0:"";s:19:"product_description";s:0:"";s:14:"product_offers";s:0:"";s:18:"is_social_facebook";s:0:"";s:25:"social_facebook_publisher";s:0:"";s:22:"social_facebook_author";s:0:"";s:21:"social_facebook_title";s:0:"";s:27:"social_facebook_description";s:0:"";s:17:"is_social_twitter";s:0:"";s:20:"social_twitter_title";s:0:"";s:26:"social_twitter_description";s:0:"";s:15:"autolink_anchor";s:0:"";s:19:"is_disable_autolink";s:0:"";}'
image: /images/2017/09/js13kgames.jpg
categories:
  - WebVR
  - JS13KGames
tags:
  - a-frame
  - JavaScript
  - webgl
  - webvr
  - JS13KGames
---
On the 13th of September, the JS13k Games jam 2017 has ended. The challenge in this contest is to build a game in JavaScript that fits in a .zip file of 13k in one month. New this year was the [A-Frame](https://aframe.io) category. A-Frame is a web framework for building virtual reality experiences on the web. I love 3D and VR, programming in JavaScript and a challenge, so I decided to participate (again) this year. Eventually, the biggest challenge turned out to be time. I ran out of time, with about 5kb left of the 13kb.

Since I always wanted to try creating a _roguelike_ game that was going to be my game type, and that I would love as much as I love the <a style="text-decoration: none;" href="http://www.p4rgaming.com/blog/elo-boosting"><span style="text-decoration: none; color: #000000;">no game throws</span></a> from P4rgaming. The world should be generated randomly, with monsters and loot. You should search for pieces of you spaceplane that crashed onto this planet. At first, I wanted to create portals to go from level to level until the player would have found all pieces. I later, due to the time constraint, changed to 1 level with 5 pieces you have to find. I wanted a &#8216;low res' pixel-arty Minecraft-like look.

<img class="alignnone size-full wp-image-1861" src="https://i2.wp.com/www.timmykokke.com/wp-content/uploads/2017/09/400x250.png?resize=320%2C200&#038;ssl=1" alt="" width="320" height="200" srcset="https://i2.wp.com/www.timmykokke.com/wp-content/uploads/2017/09/400x250.png?w=400&ssl=1 400w, https://i2.wp.com/www.timmykokke.com/wp-content/uploads/2017/09/400x250.png?resize=300%2C188&ssl=1 300w" sizes="(min-width: 900px) 600px, 900px" data-recalc-dims="1" />

## A-Frame

A-Frame uses a declarative HTML syntax which makes it very easy to understand (and to copy-paste). A-Frame supports all the major virtual reality devices, mobile devices, and the desktop. It is built on top of [three.js](https://threejs.org). This way you can leverage the full potential of 3D on the web.

A-Frame works by writing _components_ to use in combination with the markup. The way this worked reminded me a lot of the way games are built in Unity3D: Creating a &#8216;script' and attach it to a game element. It took me a few days to get into this mindset, but when it hit I started creating components for every element of the game, like the player, the mobs, ground tiles and the materials.

For moving around I chose to limit to a &#8216;gaze' at the tile next to your character to move to that tile. This feature is implemented in A-Frame and could be handled by having a &#8216;click' event handler on a ground asset. This even could be filtered by using a css class on the ground elements.

## Map Generator

A hard part to build was the map generator. Though there is a lot of information on the web on building a dungeon generator on the web, pretty much all of them are too complex for the 13kB limit.

One thing I kept in mind is the fact the 13kB limit is the zipped version of your game. Having some very repeating data inside the game should theoretically be compressed quite a lot.  I decided to go for a type of generator that would place and connect various &#8216;rooms'. The rooms are constructed from 2D arrays containing 0s, 1s and 2s. Where 1s are floors and 2s are exits. I also wrote a function that mirrors the rooms horizontally and vertically.

To save bytes on holding the generated map in memory, I used a canvas instead of an array. The canvas has every function I need to write and read data for the map.

Every tile in the game is represented by a pixel on the map. Each pixel is made of 4 bytes. I used the first to represent the floor, the second to represent an item and the third for a mob. The actual value of these bytes varies per type of mob or item. The best side effect of using a canvas is that I added it to the DOM to debug the map generator. Below is an image from the map. You can clearly see the bright green pixels, which are the pieces of the plane.

<img class="alignnone size-full wp-image-1863" src="https://i2.wp.com/www.timmykokke.com/wp-content/uploads/2017/09/map.jpg?resize=320%2C416&#038;ssl=1" alt="" width="320" height="416" srcset="https://i2.wp.com/www.timmykokke.com/wp-content/uploads/2017/09/map.jpg?w=622&ssl=1 622w, https://i2.wp.com/www.timmykokke.com/wp-content/uploads/2017/09/map.jpg?resize=231%2C300&ssl=1 231w" sizes="(min-width: 900px) 600px, 900px" data-recalc-dims="1" />

The next step after generating the map is to write it to the 3D scene. In this, I used a couple of for loops to look at each pixel and draw a floor tile if the first byte is a not- zero value. I also gave the A-Frame entities an ID with the position on the map. That way it became very easy to find an entity based on its position on the map.

## Shaders and Art

To get the game to look the way I wanted I wrote a couple of shaders. Two vertex shaders and a fragment shader. The first vertex shader is pretty simple, it only transforms the vertices to 2D space and calculates the UV coordinates for the sprites. The second vertex shader is slightly more complex. It is used to _billboard_ the sprites. They are rendered that they always face the 3D camera. The fragment shader is used to render the sprites and uses a few tricks.

Speaking of sprites. The sprite sheet I used is this:<img class="alignnone wp-image-1865" src="https://i0.wp.com/www.timmykokke.com/wp-content/uploads/2017/09/lost-demo.png?resize=320%2C20&#038;ssl=1" alt="" width="320" height="20" srcset="https://i0.wp.com/www.timmykokke.com/wp-content/uploads/2017/09/lost-demo.png?resize=1024%2C64&ssl=1 1024w, https://i0.wp.com/www.timmykokke.com/wp-content/uploads/2017/09/lost-demo.png?resize=300%2C19&ssl=1 300w, https://i0.wp.com/www.timmykokke.com/wp-content/uploads/2017/09/lost-demo.png?resize=768%2C48&ssl=1 768w, https://i0.wp.com/www.timmykokke.com/wp-content/uploads/2017/09/lost-demo.png?w=640&ssl=1 640w, https://i0.wp.com/www.timmykokke.com/wp-content/uploads/2017/09/lost-demo.png?w=960&ssl=1 960w" sizes="(min-width: 900px) 600px, 900px" data-recalc-dims="1" />

Note that there are colored floor tiles, mobs or items in there. The shader I wrote is replacing the gray colors of these with a color from a second sprite sheet.

<img class="size-full wp-image-1867 alignleft" src="https://i0.wp.com/www.timmykokke.com/wp-content/uploads/2017/09/palettes-demo.png?resize=80%2C384&#038;ssl=1" alt="" width="80" height="384" data-recalc-dims="1" />I was planning on creating a lot more ground tiles in different variations. The plan was, for example, to have a grassy biome. This biome would have all kinds of variations of grass tiles. Some all green, some with yellow flowers and some with stone tiles. I even thought of doing animations on lava and water by cycling through a couple of different rows from the palette. But, again, I didn't have the time to do so.

For creating and testing the shaders I used [ShaderTool](http://store.steampowered.com/app/314720/ShaderTool/) and FireFox. ShaderTool makes it very easy to write you GLSL code and test it by wiring up the inputs. I used FireFox for fine-tuning and debugging. The GLSL dev tools in FireFox let you modify the shader while running. Very handy.

The biggest issue I ran into while creating the shaders was handling the opacity correctly. I eventually added a parameter as a cutoff value. If the alpha drops below this threshold, the pixel is discarded.

## Text

Near the end of the contest, someone mentioned on Slack that the a-text component was downloading a font. Since using external stuff besides the A-Frame library was prohibited, using the a-text component wasn't allowed as well. I solved this issue by creating a new component that renders a text on a canvas and uses this as a texture on a plane entity. Too bad this took some time to build and caused other items on my todo list to be removed.

## Future

You can play the game at [JS13KGames](http://js13kgames.com/entries/spacewrecked) or at my [GitHub](https://sorskoot.github.io/js13kgames_2017_Lost/dist). You can find the [source](https://github.com/sorskoot/js13kgames_2017_Lost) there as well. Since the game isn't entirely finished I'm thinking of continuing working on it. A few features I'd like to add are a better following camera, more intelligence on the mobs, an inventory for the items and durability on them so they break and better biomes.

Just want to close by thanking <a href="https://twitter.com/end3r" target="_blank" rel="noopener">Andrzej Mazur</a> and <a style="text-decoration: none;" href="https://www.c9bets.com/"><span style="text-decoration: none; color: #000000;">c9bets</span></a> for having this great jam every year!