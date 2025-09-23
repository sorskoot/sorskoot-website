---
id: 20250916
draft: true
title: JS13KGames 2025
date: 2025-09-16T01:00:00+00:00
author: Sorskoot
layout: post
share: true
comments: true
guid: https://www.timmykokke.com/?p=20250916
permalink: /2025/09/JS13KGames2025/
categories:
  - 
tags:
  - 
images:
  - /images/2025/09/??.png
---

Sorskoot — 8/13/2025 13:38 PM
Theme for js13k this year is "Black Cat"... 🐈‍⬛
Now the question is how to make a 13KB WebXR game about a black cat... 🤔

Sorskoot — 8/13/2025 18:19 PM
First bold idea... COD: Black CAT.   Something like Rainbow Siege, but with cats and cod. Or something.

Sorskoot — 8/14/2025 15:26 PM
Besides the usual geometry and textures,  the biggest challenges would be:
coming up with some sort of shooting mechanic related to cats (nails?)
enemies
make it look extremely good (shaders and such)

I want to surpass every js13 I did in the past. I need a to stick to a very simple mechanic and go from there. Back to Space had that. Even though I didnt win that year I think that game had everything.

Sorskoot — 8/15/2025 17:36 PM
Last night I had some wifi connection on the campsite, so I set up the basic build pipeline so I can use Aframe and TypeScript. I'm not 100% I will stick with Aframe, but it would be fun to change things up again.

Sorskoot — 8/20/2025 17:03 PM
I so have to do the COD: Black CAT idea... they introduced an "online" category, that you can also add to your codebase and communication between clients is handled outside of the entry.  Imagine 2 teams, one defending a bomb the others trying to dismantle it...

Sorskoot — 8/20/2025 17:52 PM
Big challeng for a game like this would be 3d content. I have some ideas on how to create voxelbased geometry in a very tiny way. It would be just a few bytes per model. I'm not sure how to hanle collisions yet for these. You need to be able to shoot under a table for example... but it would be worth exploring.

Sorskoot — 8/25/2025 17:06 PM
I'm probably streaming development of js13k later today.... in 3 or 4 hours.

Sorskoot — 8/27/2025 7:10 AM
The little A-Frame voxel engine seems to be working. During the stream last night we completed the importing of models from MagicaVoxel in a tiny way.
Image

Sorskoot — 8/29/2025 23:38 PM
Progress is a bit too slow. Stuff keeps interrupting. But, I've added paws as controllers 🐾

And I improved the encoder and decoder so that the models are now a string.  For example, this is the mouse.
00000000,22000000,20000000,03000000,03300000,13300000,03330000,03333000,00333000,13332300,03333300,03430000|000122200344432005666520066666000766670089a6a98006b6b60000030000|8,12,7,4

Since there is a large change certain patters repeat it first has a list of different rows in the model. Then it has 64 characters that tell what pattern to use in a 8x8 grid. I have limited the maximum amount of colors in 1 model to 15, but the entire scene can have more colors. So, right now it maps the numbers of the columns to the color indices of the palette.

The nice thing that these types of strings zip really well.
Image

Sorskoot — 8/30/2025 0:05 AM
Experimental floor.
Image

Sorskoot — 8/31/2025 20:53 PM
Game is at 3.09 KB now...
Lots of room for more... And an actual game 😛

First priority now is to shoot mice.
Then we need to complete a game loop, with:
button to start
game over state
game win state

Sorskoot — 8/31/2025 22:58 PM
Added a little bit of functionality to my production build to show the size of the zipped version.. And also added that to a workflow on GitHub... Current size:
[██░░░░░░░░] 23.1% of 13312 bytes | +10234 bytes remaining

Sorskoot — 9/1/2025 23:42 PM
Progress is slow... But I changed the palette, made the voxel engine a bit more versatile and added a wall.
[██░░░░░░░░] 27.0% of 13312 bytes | +9719 bytes remaining

Sorskoot — 9/3/2025 20:43 PM
True. I did make a little bit of progress yesterday too, and I just discovered something that I was expecting to be one of the hardest parts. The built-in ray tracer in A-Frame can detect exactly if a mesh is hit or not. I don't have to implement any custom voxel ray caster.

Wait. That even means I can remove the one in the voxel engine.
Nice! more bytes for the game 🥳
[██░░░░░░░░] 25.8% of 13312 bytes | +9880 bytes remaining

Oh, an this is including the smooth-locomotion I added yesterday, and a gun model on the paw. I'm going backwards in bytes 😅

Sorskoot — 9/4/2025 23:29 PM
Only had time to do a little bit tonight...
But added a rotation option to the voxel models, and I added a ceiling. I also played a little bit with the lighting.

[███░░░░░░░] 31.2% of 13312 bytes | +9154 bytes remaining
Image
That's a room with mice, VR controls and a chair in 4.06 KB 😁

Sorskoot — 9/5/2025 23:46 PM
worked on some bugfixes, performance issues and the  room generation during the live stream today...
And we are at:
[███░░░░░░░] 35.7% of 13312 bytes | +8563 bytes remaining

Sorskoot — 9/6/2025 23:27 PM
Still a very busy week ahead to get this done, but I've added the doors and the mouse holes to the world generation, and I added some sort of collision detection to the walls and objects.
[███░░░░░░░] 37.8% of 13312 bytes | +8282 bytes remaining
There's at least a 1.000.000 places that this can be improved, but since there is the 13KB limit I'm going to try not to be bothered too much about it 🙂

Sorskoot — 9/7/2025 23:00 PM
No visual changes today, but I added a simple A* path finding for the mice, because why not...
I also added a simple finite state idea for the mice and ported my Wonderland Coroutine system to an AFrame system, to schedule things and keep that on the main game loop....

Take a couple of bytes though... But makes having the mice spawn, running around and attack a lot easier.
[████░░░░░░] 41.7% of 13312 bytes | +7757 bytes remaining

Sorskoot — 9/8/2025 23:23 PM
I vibecoded a little editor for the map of the game...
Image
The map took up a little bit of space, but I have an idea to make it compress a little bit better if needed.

[████░░░░░░] 42.0% of 13312 bytes | +7724 bytes remaining
Here's a higher resolution...
Image
😂

Sorskoot — 9/9/2025 23:11 PM
I fixed some issues with the placement of the mouse holes. I also make them register themselves with the game system. So, that in the update loop they can be activated. I'm not 100% sure how I'm going to activate them. I think I will activate them in the neighbouring rooms to the room you are in. I think I need some checks there anyway to activate lighting to limit the amount of lights in the scene.

The mice now spawn using my coroutine port.

[████░░░░░░] 44.3% of 13312 bytes | +7417 bytes remaining
4 major things remain now. And then it's making things look good.

1) The mice need to have some state management and switch between searching, attacking and hiding.
2) You need to be able to shoot them again
3) You need to block off the mouse holes.
4) You need to reach the bomb to disarm it.

After that the remainder of the bytes can be used to make it look better and add things like an effect when you get hit, and show a title and game over screen.

Sorskoot — 9/9/2025 23:27 PM
Did a small test with sound... JsFxr... I'm going to remove it again for now, but I leave this here for reference on how much KB it takes: 1844 bytes. Only if I really have enough space I might add sounds...

[█████░░░░░] 58.1% of 13312 bytes | +5573 bytes remaining
jsfxr is almost the same size as the voxel engine...
Image
Last year I used math to generate some sounds... I might just copy those...  That was nothing more that creating an audio buffer and generate some stuff into the buffer.

Sorskoot — 9/10/2025 21:27 PM
Mice are moving! Right now they randomly pick a direction and move 1 tile. The check the grid map to see if they can move there...
[████░░░░░░] 46.7% of 13312 bytes | +7089 bytes remaining
I added a debug map in the corner for now. This is automatically removed when doing a production build. Very nice feature in ESBuild.
There's also some improvements to the grid too. Instead of adding just a 1 to the array, I add a bit flag. That way if there's something in a cell, I know what it is. I need that to improve the wall collisions. Now they are seen as 1 block, but the wall is at the edge.
As pretty much everything in js13k, the movement and rotation can be improved by a lot... But this works.

Sorskoot — 9/10/2025 23:40 PM
I now have the basic cycle of the mice implemented. I removed the a*. That was too complex for this right now. Specially since the walls are not full cells. I switched back to just a ray cast to check line of sight. The mice do a move and then check. If they see you the move towards you. Unless you hide. If they reach you they bite and then run back to their hole. It is very easy to trap them since they don't do any path finding.

[████░░░░░░] 48.2% of 13312 bytes | +6900 bytes remaining
So the main TODO:

1) The mice need to have some state management and switch between searching, attacking and hiding.
2) You need to be able to shoot them again
3) You need to block off the mouse holes.
4) You need to reach the bomb to disarm it.
Right now, I feel this is the biggest challenge...
Image

Sorskoot — 9/11/2025 21:10 PM
It is possible to hit the mice now! The red spheres are for debugging...

[████░░░░░░] 49.2% of 13312 bytes | +6762 bytes remaining
Image

Sorskoot — 9/12/2025 0:29 AM
We have shooting, killing of mice. The flee when you get bitten...

Since I already had the code to place the spheres to test, I thought it might be nice to keep that. I changed it to a small black cube. Now it looks like you burned a little hole in the wall with your laser.

Speaking of which, I added that too. Just a simple blue line that flashes. An to make it flash more. I also briefly flash a light.

I also dropped in a couple of particles for when you hit a mouse to give it a little more impact.

Total Size:

[█████░░░░░] 52.5% of 13312 bytes | +6328 bytes remaining
I actually double checked if the size is correct...  I extracted the zip and played it. I can't believe this whole thing is not even 7KB. 🤯
Image

Sorskoot — 9/12/2025 22:09 PM
Busy, busy, busy... I drew/modeled some furniture...  Now the size is growing....

[██████░░░░] 60.7% of 13312 bytes | +5233 bytes remaining

Next, fill the scene with furniture and mouseholes.
Image
Sorskoot — 9/12/2025 23:45 PM
Got a map in place... With a lot of mouse holes... But now the performance is dead... 🙈

[██████░░░░] 62.8% of 13312 bytes | +4955 bytes remaining
Sorskoot — 9/13/2025 1:32 AM
Time is up 🙁

[██████░░░░] 68.2% of 13312 bytes | +4238 bytes remaining
This year I had more bytes then time...
There's a lot I wanted to add but it's not possible unfortunately...
I'll be submitting in the morgning...
Sorskoot — 9/13/2025 8:16 AM
I mentioned earlier I was not going to use jsfxr, but since I have soo many bytes left, I dropped it in real quick... to have 4 sounds 😛

[████████░░] 81.9% of 13312 bytes | +2412 bytes remaining
Image

Sorskoot — 9/13/2025 8:26 AM
With a bit of AI and a bit of photoshop:

Or do I get into trouble for this?
Image

Sorskoot — 9/13/2025 8:43 AM
How about this?
Image
Do I dare to use it 🤔

Sorskoot — 9/13/2025 9:37 AM
Draft is playable, VR Only

<https://drafts.js13kgames.com/cod-black-cat/>

<https://hmd.link/?https://drafts.js13kgames.com/cod-black-cat/>
I know WASD and mouse look are still in, somehow removing this caused a bug with the camera height in VR.  So I had to leave it...
I settled with this image. I removed the cats in the background. I like it. It definitely still has the COD link, but I hope it's different enough to not trigger any Activision lawyers...
Image

Sorskoot — 9/13/2025 12:20 PM
I submitted...

Sorskoot — 9/13/2025 12:30 PM
I wish I had a bit more time on this. I hoped to add some SSAO and bloom to make it look better. Size-wise it should have fitted. I also wanted to improve the performance a bit, so more mice could spawn. I know there are lots of places where things are very suboptimal... But, it's a jam with a time constraint...
