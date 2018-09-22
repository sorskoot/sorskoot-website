---
id: 1995
title: JS13KGames 2018 Post Mortem
date: 2018-07-27T22:49:33+00:00
author: Timmy
layout: post
share: true
comments: true
guid: https://www.timmykokke.com/?p=1995
permalink: /2018/09/JS13KGames-2018-PostMortem/
categories:
  - BabylonJS
  - JS13KGames
  - WebVR
tags:
  - BabylonJS
  - JS13KGames
  - webvr
---
And another [JS13KGames](https://js13kgames.com) competition is over. This year's theme was 'Offline'. Since [BabylonJS](https://www.babylonjs.com/) was allowed too in the WebXR category this time and I had been looking into Babylon lately, I decided to go with that. At the JS13kGames website you can play my entry, [Lasergrid](http://js13kgames.com/entries/lasergrid).

The first concept I had in mind was in a factory setting where the player gets an order on a display in the form of a selection of different colored objects. The player then has to look at the conveyor belt and push everything that's not in the order off. The problem that I ran into very quickly was that I couldn't use the default physics with Babylon. Although there's a library for physics available for Babylon, it's an external library that I couldn't fit into the allowed 13kB. So I went with my second idea, a laser grid in which the player has to turn object and make the laser get from the start to the finish. 

![Lasergrid](/images/2018/09/Lasergrid.png)

## BabylonJS and Virtual Reality
Setting BabylonJS up for Virtual Reality is very easy. It's not 'on' by default, but there's a helper function to add everything including the icon to switch to VR. It is usually called right after initializing the scene:
`this.vrHelper = scene.createDefaultVRExperience();`. Moving around in the browser works right out of the box. Teleportation in VR is also very simple to add. I created a mesh for the ground and called `enableTeleportation`:
```javascript
  this.vrHelper.enableTeleportation({
    floorMeshName: ground.name
  });
```
With that out of the way, I added a simple data structure for the puzzles and created a few basic cubes as objects to work with. When these are clicked in the browser they would rotate. 

With this part working I was confident enough to start working on the full game.

## Challenge 1 - Textures
Since even a PNG gets larger than 13kB very quickly texturing is always a challenge. When you try to shrink down images you quickly end up with a pixel art look. So that was the look I went for. Of course, I used my favorite pixel art tool PyxelEdit. 
![PyxelEdit](/images/2018/09/Screenshot-PyxelEdit.png)
Applying the textures to the models was giving me some issues as well, which actually takes me to the next challenge:

## Challenge 2 - Models
The models for the game would exist of very simple objects. In the proof of concept, I used a box and an extruded triangle. At first, this worked fine. When texturing the models I learned that Babylon stores the UVW information in the vertices, and not in the faces as I expected. This meant I could not map the textures per face. Getting the UVWs for 1 face right meant breaking another. I ended up 'modeling' in 3D Studio. I needed the UVW information so I recreated the simple meshes in 3D Studio and detached some faces to give them their own vertices and UVWs. I wrote a custom script to extract all information about vertices, faces, and UVWs to simple JavaScript objects. 
Since I was working with 3D Studio already, this gave me the idea to use this for puzzle design as well. So I created another MaxScript to export a scene from 3D Studio to JSON. The scenes are very simple. I just add some cubes in various colors by setting the material ID. This gave me the possibility to rotate the cubes and build entire walls out of them without any problems. I included these scripts in the GitHub project as well, by the way. In case anyone wants to have a look. 

## Challenge 3 - Laser
I needed to find a way to calculate the laser beam. I decided to go with casting some rays. Every object has a rotation value, I used that. The first ray is cast from the transmitter object. If it hits an object I call a method on that object that returns 1 of 4 possible values: Stop processing; Go left; Go right; Hit target. I planned on extending that list with other constants but never got to that. The laserbeam repeated that process until it hit nothing, a wall or the target. Every time it hit something it adds a new coordinate to an array. The array is then used to create a tube. I ended up adding a glow effect to the tube to make it a bit more like a laser.

## Challenge 4 - Controls
To make the game into a real VR game I wanted to add Oculus Rift support. I wanted to be able to rotate the blocks and move around using the Oculus Touch controls. Babylon.js has some very simple function to add interactions and teleportation. That is until you really want to do something with it. There is a mesh selection event you can use. This has a filter to limit exactly what you can select in the game. Unfortunately, this event triggers when you point your controller to the object, without even pushing one of the buttons on the controller. I ended up having to track what the user is pointing at and have the controller respond to that. Another this is that the trigger for the Oculus Touch controllers are not boolean values, but can be anything between 0 and 1. As soon as you slightly touch the trigger this value changes and the event is fired. And whenever you slightly change the amount you are touching the controller this value changes. I fixed this by adding some more status values. And although it's working it is by far an elegant solution.

## Challenge 5 - Finishing
Finishing the game turned out to be the biggest challenge. I started working on the project as soon as I could, during my summer vacation in France. I was making some progress but got struck by the flu. This took me out for a whole week. I also had to finish some presentations and a workshop. I did learn a lot though. I wasn't planning on continuing to finish the game, but after using the game in a demo at our local [WebXR NL Meetup](https://www.meetup.com/webxrnl/) people convinced me to continue working on it. I try to stream as much as possible on my [Twitch Channel](https://www.twitch.tv/sorskoot) and upload it my [Youtube Channel](https://www.youtube.com/c/sorskoot).

## Wrap-up
The main reason for me to work on compos like JS13kGames is just to have a fun project to work on and learn a lot in the process. The constraints force you to think outside the box. And although I got sick, I managed to create something playable, learn a lot and had fun. 

@end3r, thank you for hosting this great compo every year! Already looking forward to the next.