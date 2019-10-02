---
id: 1479
title: How to build a Unity game for Windows 10
date: 2016-02-20T22:59:49+00:00
author: Timmy
layout: post
guid: http://www.timmykokke.com/?p=1479
permalink: /2016/02/how-to-build-a-unity-game-for-windows-10/
image: /wp-content/uploads/2016/02/9.png
categories:
  - Unity
tags:
  - Game
  - Unity
  - Windows 10
---
There are various ways to develop apps and games for the Windows Platform. One of them is by using a great tool called [Unity](http://www.unity3d.com). Unity is a development environment and platform to build 3D and 2D games and interactive experiences. There’s a vast community of people creating, sharing and selling assets. The most awesome thing about Unity is that is has a free version you can use for your personal projects. It only shows a splash screen stating that the game is built with the personal version of Unity.

There are beautiful examples of games built with Unity (you definitely should look at the [showcase](http://madewith.unity.com/)), but for now I’ll focus on getting started.

The game I’m going to build is a going to be a simple puzzle game, it will be a clone of [Alien Tiles](http://www.alientiles.com/index.html). I’m going to use Unity 5 and Visual Studio 2015, both running on Windows 10. The game will show a grid of tiles with a particular color. When the player clicks a tile the entire row and the entire column of the tile will cycle to the next color. The goal of the game is to get the entire grid to a specific color.

#### Setting up Unity

Let’s start by opening Unity and create a new project. I’m going to name my game “ColorfulTiles” for now. To have Unity preconfigured for a 2D game, I select 2D from the options.<figure id="attachment_1482" style="width: 1002px" class="wp-caption alignnone">

<img class="wp-image-1482 size-full" src="https://i1.wp.com/www.timmykokke.com/wp-content/uploads/2016/02/1.png?resize=320%2C184" alt="Unity Welcome Screen" width="320" height="184" srcset="https://i1.wp.com/www.timmykokke.com/wp-content/uploads/2016/02/1.png?w=1002&ssl=1 1002w, https://i1.wp.com/www.timmykokke.com/wp-content/uploads/2016/02/1.png?resize=300%2C173&ssl=1 300w, https://i1.wp.com/www.timmykokke.com/wp-content/uploads/2016/02/1.png?resize=768%2C442&ssl=1 768w, https://i1.wp.com/www.timmykokke.com/wp-content/uploads/2016/02/1.png?w=640&ssl=1 640w" sizes="(min-width: 900px) 600px, 900px" data-recalc-dims="1" /><figcaption class="wp-caption-text">Unity Welcome Screen</figcaption></figure> 

I also want to include the Visual Studio 2015 Tools Asset Packages, by clicking the Asset Packages button and checking the package “Visual Studio 2015 Tools”. And hit “Done” to close the package select window.<figure id="attachment_1483" style="width: 441px" class="wp-caption alignnone">

<img class="wp-image-1483 size-full" src="https://i0.wp.com/www.timmykokke.com/wp-content/uploads/2016/02/2.png?resize=320%2C331" alt="Asset Packages" width="320" height="331" srcset="https://i0.wp.com/www.timmykokke.com/wp-content/uploads/2016/02/2.png?w=441&ssl=1 441w, https://i0.wp.com/www.timmykokke.com/wp-content/uploads/2016/02/2.png?resize=290%2C300&ssl=1 290w" sizes="(min-width: 900px) 600px, 900px" data-recalc-dims="1" /><figcaption class="wp-caption-text">Asset Packages</figcaption></figure> 

&nbsp;

Now hit “Create Project” to create the game and get going.

I won’t be going over the various panels of Unity in detail in this tutorial, so I can focus on building the game. But, let me know if you would like me to write a tutorial about the details of the UI of Unity.

When starting a new project in Unity I always start by creating a few folders: Scenes, Prefabs, Materials and Scripts. Depending on the game I’ll be building I might add other folders (for sounds, textures, etc.), but for now this would be sufficient. You can add folders by right-clicking the project panel and going to Create -> Folder in the context menu.<figure id="attachment_1484" style="width: 560px" class="wp-caption alignnone">

<img class="wp-image-1484 size-full" src="https://i2.wp.com/www.timmykokke.com/wp-content/uploads/2016/02/3.png?resize=320%2C138" alt="Folders" width="320" height="138" srcset="https://i2.wp.com/www.timmykokke.com/wp-content/uploads/2016/02/3.png?w=560&ssl=1 560w, https://i2.wp.com/www.timmykokke.com/wp-content/uploads/2016/02/3.png?resize=300%2C130&ssl=1 300w" sizes="(min-width: 900px) 600px, 900px" data-recalc-dims="1" /><figcaption class="wp-caption-text">Folders</figcaption></figure> 

&nbsp;

#### Graphics

Before I start on the level generator I would like to add the tile to the game. I do this by adding an “empty game object” to the scene, by right-clicking on the hierarchy and selecting “Create Empty” from the context menu. I rename this GameObject to “Tile”. Now the graphic itself could be anything from a 3D object to a sprite. In this first version of the game I use a simple quad. I add one to the “Tile” object I just created by right-clicking the “Tile” and selecting “3D” -> “Quad”. I renamed the quad “TileGraphic”. I added the quad to an empty GameObject to be able to change the graphic in a later stage without needing to change too much in the game. Scripts, translation and scaling will be done on the root object of the tile and not on the graphic. Actually, let’s change the scale of the “Tile” object to 0.9 on all axis. This way I can create a grid of 1 by 1 tiles and have a little space between the tiles.

You might be wondering why I add 3D object to a 2D game. The 2D game is actually still 3D under the cover. Just by configuration, like setting the Camera to orthographic for example, the 3<sup>rd</sup> dimension somewhat hidden and object don’t appear smaller when further away from the camera.

To make the tile reusable I convert it to a Prefab. A prefab is an object that is stored separate and can be reused easily. To convert the GameObject to a Prefab just drag it from the hierarchy to the Prefabs folder. The GameObject in the hierarchy should turn blue indicating it is a prefab.<figure id="attachment_1485" style="width: 288px" class="wp-caption alignnone">

<img class="wp-image-1485 size-full" src="https://i1.wp.com/www.timmykokke.com/wp-content/uploads/2016/02/4.png?resize=288%2C440" alt="Create Prefab" width="288" height="440" srcset="https://i1.wp.com/www.timmykokke.com/wp-content/uploads/2016/02/4.png?w=288&ssl=1 288w, https://i1.wp.com/www.timmykokke.com/wp-content/uploads/2016/02/4.png?resize=196%2C300&ssl=1 196w" sizes="(min-width: 900px) 600px, 900px" data-recalc-dims="1" /><figcaption class="wp-caption-text">Create Prefab</figcaption></figure> 

&nbsp;

I delete the “Tile” GameObject from the hierarchy now. It should still be available as a prefab.

#### Generating a level

Time to write some code. To generate a level we need to run some code. I added a new C# script to the scripts folder, by right-clicking the scripts folder and selecting “Create” -> “C# script”. I named the script “LevelController”. Double-click the script to edit it in Visual Studio, which may take a _few seconds_.<figure id="attachment_1486" style="width: 359px" class="wp-caption alignnone">

<img class="wp-image-1486 size-full" src="https://i0.wp.com/www.timmykokke.com/wp-content/uploads/2016/02/5.png?resize=320%2C73" alt="Just a Moment" width="320" height="73" srcset="https://i0.wp.com/www.timmykokke.com/wp-content/uploads/2016/02/5.png?w=359&ssl=1 359w, https://i0.wp.com/www.timmykokke.com/wp-content/uploads/2016/02/5.png?resize=300%2C69&ssl=1 300w" sizes="(min-width: 900px) 600px, 900px" data-recalc-dims="1" /><figcaption class="wp-caption-text">Just a Moment</figcaption></figure> 

&nbsp;

After Visual Studio opens you’ll end up with a class, inherited from MonoBehavior. This class contains two methods. “Start”, which is called when the script is activated and “Update”, which is called every frame.

<pre class="brush:csharp">using UnityEngine;

public class LevelController : MonoBehaviour
{
    public int NumberOfRows = 7;
    public int NumberOfColumns = 7;

    public GameObject Tile;

    void Start()
    {
        for (int i = 0; i &lt; NumberOfColumns; i++)
        {
            for (int j = 0; j &lt; NumberOfRows; j++)
            {
                Instantiate(Tile,
                            new Vector2(i - NumberOfColumns / 2f + .5f,
                                        j - NumberOfRows / 2f + .5f),
                            Quaternion.identity);
            }
        }
    }
}
</pre>

The first version of the LevelController just generates a level when the script is activated. It does this by going through two for loops. The two integer fields in the beginning of the class define how many rows and columns the grid will contain. By making these public Unity will show them in the Inspector so these values can be changed design-time. The third field, “Tile”, will be linked to the prefab we created earlier.

Inside both for-loops the Instantiate method is called. This method instantiates a new version of the GameObject passed as its first parameter. The second parameter of the Instantiate method is the position of where the newly instantiated GameObject should be placed. It seems like a whole lot of math for such a simple thing. All it does is centering the grid to the world. The +.5f is added because the tiles are positioned based on their center and not the top-left corner as you might expect. The last parameter, the Quaternion.identity, is the rotation. In this case it basically means to use no rotation.

Make sure the script is saved before heading back to Unity.

In Unity the script has to be attached to something. Because there’s not much in the scene at the moment, I just attach it to the camera by dragging the script onto it. When you look at the Inspector you should see the script, with its properties in there. Last thing to do is to drag the prefab created earlier to the “Tile” property of the script. By now, the inspector should look something like this:<figure id="attachment_1487" style="width: 416px" class="wp-caption alignnone">

<img class="wp-image-1487 size-full" src="https://i0.wp.com/www.timmykokke.com/wp-content/uploads/2016/02/6.png?resize=320%2C267" alt="Inspector" width="320" height="267" srcset="https://i0.wp.com/www.timmykokke.com/wp-content/uploads/2016/02/6.png?w=416&ssl=1 416w, https://i0.wp.com/www.timmykokke.com/wp-content/uploads/2016/02/6.png?resize=300%2C250&ssl=1 300w" sizes="(min-width: 900px) 600px, 900px" data-recalc-dims="1" /><figcaption class="wp-caption-text">Inspector</figcaption></figure> 

&nbsp;

If you were following along you should be able to test-run the game now. You can do this by hitting the play button at the top of the screen in Unity.<figure id="attachment_1488" style="width: 720px" class="wp-caption alignnone">

<img class="size-large wp-image-1488" src="https://i0.wp.com/www.timmykokke.com/wp-content/uploads/2016/02/7-1024x649.png?resize=320%2C203" alt="Running in Unity" width="320" height="203" srcset="https://i1.wp.com/www.timmykokke.com/wp-content/uploads/2016/02/7.png?resize=1024%2C649&ssl=1 1024w, https://i1.wp.com/www.timmykokke.com/wp-content/uploads/2016/02/7.png?resize=300%2C190&ssl=1 300w, https://i1.wp.com/www.timmykokke.com/wp-content/uploads/2016/02/7.png?resize=768%2C487&ssl=1 768w, https://i1.wp.com/www.timmykokke.com/wp-content/uploads/2016/02/7.png?w=1173&ssl=1 1173w, https://i1.wp.com/www.timmykokke.com/wp-content/uploads/2016/02/7.png?w=640&ssl=1 640w, https://i1.wp.com/www.timmykokke.com/wp-content/uploads/2016/02/7.png?w=960&ssl=1 960w" sizes="(min-width: 900px) 600px, 900px" data-recalc-dims="1" /><figcaption class="wp-caption-text">Running in Unity</figcaption></figure> 

&nbsp;

If you haven’t already, this would be a great time to save the scene. Just hit ctrl+s and save the scene under the scenes folder by the name of “Main”.

#### Running as a Windows app

To run the game as a Windows app we’ll have to change the build settings. You can find the build settings under “File”->”Build Settings…” in the menu.<figure id="attachment_1489" style="width: 549px" class="wp-caption alignnone">

<img class="size-full wp-image-1489" src="https://i0.wp.com/www.timmykokke.com/wp-content/uploads/2016/02/8.png?resize=320%2C357" alt="Build Settings" width="320" height="357" srcset="https://i0.wp.com/www.timmykokke.com/wp-content/uploads/2016/02/8.png?w=549&ssl=1 549w, https://i0.wp.com/www.timmykokke.com/wp-content/uploads/2016/02/8.png?resize=269%2C300&ssl=1 269w" sizes="(min-width: 900px) 600px, 900px" data-recalc-dims="1" /><figcaption class="wp-caption-text">Build Settings</figcaption></figure> 

&nbsp;

First, make sure the scene is in the build. You’ll probably have to add it by clicking the “Add Open Scenes” button. Next, set the Platform to “Windows Store” and click “Switch Platform”. Change the SDK to Universal 10. To be able to Run and debug from Visual Studio, check the “Unity C# Projects” and “Development Build” checkboxes. Keep in mind that this will create a C# solution with everything you need to run the game. If you are looking to <a style="text-decoration:none;" href="https://www.iwantcheats.net/"><span style="text-decoration: none; color: #000;">buy hacks</span></a> on online games, visit iwantcheats.net for more information. The scripts we’ve edited before are not C# files contained in this project, because they’re Unity scripts that happen to be C# (although they’re linked in there as well).

Hit Build to build the project. You’ll have to specify a folder to build to. I usually create a new folder called “WindowsStoreBuild” and choose that. You can open the solution in Visual Studio and run it from there.<figure id="attachment_1490" style="width: 720px" class="wp-caption alignnone">

<a href="https://i0.wp.com/www.timmykokke.com/wp-content/uploads/2016/02/9.png" rel="attachment wp-att-1490"><img class="wp-image-1490 size-large" title="Running as UWP App" src="https://i0.wp.com/www.timmykokke.com/wp-content/uploads/2016/02/9-1024x795.png?resize=320%2C248" alt="Running as UWP App" width="320" height="248" srcset="https://i0.wp.com/www.timmykokke.com/wp-content/uploads/2016/02/9.png?resize=1024%2C795&ssl=1 1024w, https://i0.wp.com/www.timmykokke.com/wp-content/uploads/2016/02/9.png?resize=300%2C233&ssl=1 300w, https://i0.wp.com/www.timmykokke.com/wp-content/uploads/2016/02/9.png?resize=768%2C596&ssl=1 768w, https://i0.wp.com/www.timmykokke.com/wp-content/uploads/2016/02/9.png?w=1202&ssl=1 1202w, https://i0.wp.com/www.timmykokke.com/wp-content/uploads/2016/02/9.png?w=640&ssl=1 640w, https://i0.wp.com/www.timmykokke.com/wp-content/uploads/2016/02/9.png?w=960&ssl=1 960w" sizes="(min-width: 900px) 600px, 900px" data-recalc-dims="1" /></a><figcaption class="wp-caption-text">Running as UWP App</figcaption></figure> 

&nbsp;

And that’s it for now. In the second part I’m going to add the various colors to the tiles and probably make them clickable.