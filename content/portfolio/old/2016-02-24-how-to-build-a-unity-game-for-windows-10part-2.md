---
id: 1505
title: 'How to build a Unity game for Windows 10&ndash;Part 2'
date: 2016-02-24T08:42:09+00:00
author: Timmy
layout: post
guid: http://www.timmykokke.com/?p=1505
permalink: /2016/02/how-to-build-a-unity-game-for-windows-10part-2/
categories:
  - Unity
tags:
  - Game
  - Unity
  - Windows 10
---
In <a href="http://www.timmykokke.com/2016/02/how-to-build-a-unity-game-for-windows-10/" target="_blank">part 1 of this series</a> I showed you how to set up Unity, creating a prefab for the tiles and added the first script for generating a grid of tiles. In this second part I’d like to make the grid interactive and enable the change of colors for the rows and columns in the grid.

## Tile behavior

Lets start by adding a new C# script to the scripts folder. I named this script _TileComponent_ and opened it in Visual Studio. In the script we’re going to add some properties to the tile. First we need an array that will contain the various colors of the tile. We also need to keep track of the current color. This integer contains the current index of the the tile. To make things a little easier when changing the colors in a row and column, I also added two integers that are going to contain these.

<pre class="brush:csharp">public int CurrentColor;
public Color[] Colors;

[HideInInspector]
public int Row;
[HideInInspector]
public int Column;</pre>

By making these properties public we can change them from the Unity inspector. I don’t want the row and column properties to be edited in Unity, but I need them to be public to be able to access them from another class. The _HideInInspector_ attribute marks fields hidden from the inspector.

Let’s switch back to Unity to add a few thing there.

To get the the script attached to the tile, first select the tile in the project explorer. Than, in the inspector, click “Add Component” and go to scripts. Alternatively you can search for it.

<img style="border-width: 0px; padding-top: 0px; padding-right: 0px; padding-left: 0px; display: inline; background-image: none;" title="SNAGHTML25a9877" src="https://i1.wp.com/timmykokke.com/images/How-to-build-a-Unity-game-for-Windows-10_AEE1/SNAGHTML25a9877.png?resize=320%2C269" alt="SNAGHTML25a9877" width="320" height="269" border="0" data-recalc-dims="1" />

I added 4 colors to the array by setting the size to 4 and selecting the 4 colors I like to use for the tiles.

<img style="border-width: 0px; padding-top: 0px; padding-right: 0px; padding-left: 0px; display: inline; background-image: none;" title="image" src="https://i0.wp.com/timmykokke.com/images/How-to-build-a-Unity-game-for-Windows-10_AEE1/image.png?resize=320%2C261" alt="image" width="320" height="261" border="0" data-recalc-dims="1" />

To get the tile to show the color, we need a material. Let’s add a new material to the materials folder by right-clicking on the materials folder and selecting “Create”->”Material”. I named my material “TileMaterial”.

[<img style="border-width: 0px; padding-top: 0px; padding-right: 0px; padding-left: 0px; display: inline; background-image: none;" title="image" src="https://i0.wp.com/timmykokke.com/images/How-to-build-a-Unity-game-for-Windows-10_AEE1/image_thumb.png?resize=320%2C188" alt="image" width="320" height="188" border="0" data-recalc-dims="1" />](https://i0.wp.com/timmykokke.com/images/How-to-build-a-Unity-game-for-Windows-10_AEE1/image_3.png)

Instead of using the default shader I want to use the “Unlit”->”Color” shader. This shader doesn’t have any other properties than the color.

[<img style="border-width: 0px; margin: 0px; padding-top: 0px; padding-right: 0px; padding-left: 0px; display: inline; background-image: none;" title="image" src="https://i0.wp.com/timmykokke.com/images/How-to-build-a-Unity-game-for-Windows-10_AEE1/image_thumb_3.png?resize=320%2C234" alt="image" width="320" height="234" border="0" data-recalc-dims="1" />](https://i0.wp.com/timmykokke.com/images/How-to-build-a-Unity-game-for-Windows-10_AEE1/image_4.png)

To add the material to the prefab we need to drag the tile prefab to the scene hierarchy, open the “Tile” GameObject and drag the “TileMaterial” onto the “TileGraphic”.

[<img style="border-width: 0px; margin: 0px; padding-top: 0px; padding-right: 0px; padding-left: 0px; display: inline; background-image: none;" title="SNAGHTML1ae31e" src="https://i1.wp.com/timmykokke.com/images/How-to-build-a-Unity-game-for-Windows-10_AEE1/SNAGHTML1ae31e_thumb.png?resize=320%2C362" alt="SNAGHTML1ae31e" width="320" height="362" border="0" data-recalc-dims="1" />](https://i0.wp.com/timmykokke.com/images/How-to-build-a-Unity-game-for-Windows-10_AEE1/SNAGHTML1ae31e.png)

Make sure the change is applied to the prefab by clicking on the “Apply” button in the inspector.

[<img style="border-width: 0px; margin: 0px; padding-top: 0px; padding-right: 0px; padding-left: 0px; display: inline; background-image: none;" title="image" src="https://i0.wp.com/timmykokke.com/images/How-to-build-a-Unity-game-for-Windows-10_AEE1/image_thumb_4.png?resize=320%2C127" alt="image" width="320" height="127" border="0" data-recalc-dims="1" />](https://i0.wp.com/timmykokke.com/images/How-to-build-a-Unity-game-for-Windows-10_AEE1/image_5.png)

You can safely delete the “Tile” prefab from the scene hierarchy now.

Before we do another test run, let’s switch to Visual Studio and add some more code.

<pre class="brush:csharp">using UnityEngine;

public class TileComponent : MonoBehaviour
{
    public int CurrentColor;
    public Color[] Colors;

    [HideInInspector]
    public int Row;
    [HideInInspector]
    public int Column;

    void Start()
    {
        UpdateColor();
    }

    private void UpdateColor()
    {
        this.GetComponentInChildren&lt;MeshRenderer&gt;().material.color = Colors[CurrentColor];
    }

    public void NextColor()
    {
        this.CurrentColor++;
        if(this.CurrentColor &gt; this.Colors.Length - 1)
        {
            this.CurrentColor = 0;
        }
        UpdateColor();
    }
}</pre>

I added a new private method called UpdateColor. This method looks in the children of the GameObject where the script is attached to, the “Tile”, and finds a component of type MeshRenderer. The MeshRenderer contains the material. The _color_ property of this material is set to the current color of the tile.

The _Start_ method is executed when the Tile is activated and sets the color to its initial color.

I also added another method, NextColor. This method increases the CurrentColor index, but makes sure it’s reset to 0 when it exceeds the number of colors. After this change the color of the material is updated too.

## Interaction

The game won’t be any fun until there’s some interaction. I’d like to handle the click on the tile in the LevelController we created in part 1 of the tutorial. The LevelController has access to all tiles. I’m adding a callback from the tile that the LevelController is going to subscribe to. The field is called “Clicked” and is an _Action_ with two integer parameters which will hold the Row and Column of the clicked Tile.

<pre class="brush:csharp">public Action&lt;int, int&gt; Clicked;</pre>

To handle the actual click on the tile we can add the OnMouseDown method. Unity will automatically call this method when a mouse down event occurs.

<pre class="brush:csharp">public void OnMouseDown()
    {
        if (Clicked != null)
        {
            Clicked(Row, Column);
        }
    }
</pre>

Just in case there’s nothing that handles the click I added a null check. If something is handling the _Clicked_ action it is called with the row and column.

To get the Tile to register click events we need to add a collider in Unity. Select the prefab and click the “Add Component” button. Search for the “Box Collider 2D” component and add that.

[<img style="border-width: 0px; margin: 0px; padding-top: 0px; padding-right: 0px; padding-left: 0px; display: inline; background-image: none;" title="image" src="https://i1.wp.com/timmykokke.com/images/How-to-build-a-Unity-game-for-Windows-10_AEE1/image_thumb_5.png?resize=320%2C428" alt="image" width="320" height="428" border="0" data-recalc-dims="1" />](https://i0.wp.com/timmykokke.com/images/How-to-build-a-Unity-game-for-Windows-10_AEE1/image_6.png)

To get the color of the tiles to change, we need to keep track of the created tiles from within the LevelController. Let’s have a look at the code and go over the changes.

&nbsp;

<pre class="brush:csharp">using System.Collections.Generic;
using System.Linq;
using UnityEngine;

public class LevelController : MonoBehaviour
{
    public int NumberOfRows = 7;
    public int NumberOfColumns = 7;

    public TileComponent Tile;

    private List&lt;TileComponent&gt; tiles;
    void Start()
    {
        tiles = new List&lt;TileComponent&gt;();
        for (int i = 0; i &lt; NumberOfColumns; i++)
        {
            for (int j = 0; j &lt; NumberOfRows; j++)
            {
                TileComponent t = (TileComponent)Instantiate(Tile,
                            new Vector2(i - NumberOfColumns / 2f + .5f,
                                        j - NumberOfRows / 2f + .5f),
                            Quaternion.identity);

                t.Row = j;
                t.Column = i;
                t.Clicked = TileClicked;
                tiles.Add(t);
            }
        }
    }
    private void TileClicked(int row, int column)
    {
        tiles.Where(t =&gt; t.Row == row || t.Column == column)
             .ToList()
             .ForEach(d =&gt; d.NextColor());
    }
}
</pre>

I changed the type of the “Tile” field to TileComponent. I also added a list of TileComponents to keep track of the ones created. In the Start method the list is constructed. I added a variable to hold the result of the Instantiate method in line 20. Because we added the Row, Column and Clicked fields to the TileComponent earlier we can set them here.

The TileClicked method contains some code that might look a little complex. I used the linq _Where_ method to filter the list of TileComponents. I want all items where the row is equal to the row of tile that was clicked or where the column is equal to the column of that tile. I than convert the result back to a list to be able to use the ForEach method to go over the selected tiles. For every tile in the result I change the color the the next by executing the NextColor method.

One last thing before we can run the game. Because I changed the type of the “Tile” GameObject to TileComponent, we need to drag the prefab from the folder to property in the inspector in Unity.

You should be able to run the game now. Click around and the colors should change.

<img style="border: 0px currentcolor; padding-top: 0px; padding-right: 0px; padding-left: 0px; display: inline; background-image: none;" title="image" src="https://i1.wp.com/timmykokke.com/images/How-to-build-a-Unity-game-for-Windows-10_AEE1/image_7.png?resize=320%2C320" alt="image" width="320" height="320" border="0" data-recalc-dims="1" />

In part 3 we’re going to add some UI to show our current number of  moves.