---
id: 1511
title: 'How to build a Unity game for Windows 10&ndash;part 3'
date: 2016-03-07T20:43:08+00:00
author: Timmy
layout: post
guid: http://www.timmykokke.com/?p=1511
permalink: /2016/03/how-to-build-a-unity-game-for-windows-10part-3/
categories:
  - Unity
tags:
  - Game
  - Unity
  - Windows 10
---
In the <a href="http://www.timmykokke.com/2016/02/how-to-build-a-unity-game-for-windows-10part-2/" target="_blank" rel="noopener">previous part of this series</a> we create the gameplay. In this part we’re going to add a scoring mechanism and add some UI that shows that as the great UI big games as World of Warcraft have and people play using a [wow gaming mouse](http://www.armchairempire.com/Reviews/gaming-mouse-reviews/wow) and other hardware. I also want to change the start of the game a little by randomizing the tiles, because the solution is way to simple: Just click all the tiles once and you’re done. Maybe in a future part we’ll make an editor to create patterns of colors. Let’s start with the randomization.

## Randomizing Tiles

Both changes are made in the code, in the LevelController to be exact. I added a line to the _Start_ method.

<pre class="brush:csharp;first-line: 25; highlight: [28]">t.Row = j;
t.Column = i;
t.Clicked = TileClicked;
t.CurrentColor = Random.Range(0, t.Colors.Length);
tiles.Add(t);</pre>

On line 28 you can see the _CurrentColor_ being set to a random value in the range 0 to the number of colors available. This will cause the tile to have a random color and always use the total number of colors available. Even if we choose to change the number of colors in the future, it still works.

That’s it. When you run the game, it should be all random.

[<img style="margin: 0px; border: 0px currentcolor; display: inline; background-image: none;" title="image" src="https://i0.wp.com/timmykokke.com/images/a297f79f3d4c_B7B6/image_thumb.png?resize=320%2C323" alt="image" width="320" height="323" border="0" data-recalc-dims="1" />](https://i2.wp.com/timmykokke.com/images/a297f79f3d4c_B7B6/image.png)

## Some project reorganization

Since the project is growing, and will continue to do that, I believe it would be best to do some reorganization. To enable the scene to be in different states I’d like to have the generated tiles inside another GameObject. Add a new empty GameObject to the scene and call this one “Level”. This will be the parent of all tiles and it’ll also contain the GUI that’s shown during gameplay.

To make the tiles have this “Level” GameObject as a parent we’ll have to make some adjustments to the LevelController Code. First add a new public GameObject to the class and call this “LevelRoot”.

<pre class="brush:csharp;first-line: 7; highlight: [9]">public int NumberOfRows = 7;
public int NumberOfColumns = 7;
public GameObject LevelRoot;
public TileComponent Tile;

private List&lt;tilecomponent&gt; tiles;</pre>

Than, inside the loops in the Start method, set the transform.parent property of the tile to the transform property of this LevelRoot GameObject as shown in row 31 below.

<pre class="brush:csharp;first-line: 27; highlight: [31]">t.Row = j;
t.Column = i;
t.Clicked = TileClicked;
t.CurrentColor = Random.Range(0, t.Colors.Length);
t.transform.parent = LevelRoot.transform;
tiles.Add(t);
</pre>

I also would like to have the controller scripts together. In an earlier part of the tutorial we’ve added the LevelController to the camera, let’s move it to its own container.

Add a new GameObject to the scene called “Controllers” and add another GameObject to that as a child called “LevelController”. Now, select the camera and look for the LevelController script in the inspector. Drag that script from the camera to the GameObject “LevelController” we’ve just created.

Last thing to get it all working is to drag the “Level” GameObject to the LevelRoot property of the LevelController.

<img style="border: 0px currentcolor; display: inline; background-image: none;" title="SNAGHTML12d62e8" src="https://i0.wp.com/timmykokke.com/images/a297f79f3d4c_B7B6/SNAGHTML12d62e8.png?resize=320%2C126" alt="SNAGHTML12d62e8" width="320" height="126" border="0" data-recalc-dims="1" />

Run to test game. Nothing should have changed to the workings of the game. If you look at the hierarchy panel when the game is running you should see a whole list of tile objects inside the Level GameObject.

## Adding a score

The scoring needs a ScoreController. So, lets add a new empty GameObject to the Controller object and name it &#8220;ScoreController&#8221;. Add a new script to the scripts folder and name that &#8220;ScoreController&#8221; too. Add the script to the GameObject by dragging it onto there. Double click the script to open it in Visual Studio.

<pre class="brush:csharp">using UnityEngine;
using UnityEngine.UI;

public class ScoreController : MonoBehaviour {

    private int CurrentScore;
    private LevelController levelController;
    public Text Text;

    public void Start()
    {
        levelController =
                GameObject.FindGameObjectWithTag("LevelController")
                .GetComponent&lt;LevelController&gt;();
    }
    public void OnEnable()
    {
        LevelController.ScorePoints += LevelController_ScorePoints;
    }

    public void OnDisable()
    {
        LevelController.ScorePoints -= LevelController_ScorePoints;
    }

    private void LevelController_ScorePoints(int points)
    {
        this.CurrentScore += points;
        Text.text = this.CurrentScore.ToString();
    }
}


</pre>

The way the score is updates is though events raised by the LevelControler. To prevent memory leaks the event handler is attached in the OnEnable method and detached in the OnDisable method. The _Text_ property on line 8 is going to hold a reference to a text object in the scene that we&#8217;ll create in a sec. For finding the LevelController I want to introduce another technique, by using a Tag. How to create the tag itself we&#8217;ll go over too, but from line 12 to 14, in the Start method, you can see how this is done. When the game grows and more tags, or other strings, are used in my game, I might refactor this to come from a class containing constants to prevent bugs.

The second piece of code that has to be extended is inside the LevelController. I added the actual event in the last lines below. Raising the event is nothing more that calling a method (line 44). I always check for null, just in that rare case there&#8217;s no event handler attached.

<pre class="brush:csharp;first-line: 36">private void TileClicked(int row, int column)
{
    tiles.Where(t =&gt; t.Row == row || t.Column == column)
         .ToList()
         .ForEach(d =&gt; d.NextColor());

    if (ScorePoints != null)
    {
        ScorePoints(1);
    }
}

public delegate void ScoreEventHandler(int points);
public static event ScoreEventHandler ScorePoints;</pre>

Back in Unity we&#8217;ll need to create a new Empty GameObject as a child to the Controllers GameObject, and call it ScoreController. Drag the new ScoreController script to ScoreController GameObject.

Every GameObject can be marked with a Tag. Select the LevelController to set its tag.  As you can see at the top of the Inspector the LevelController is &#8220;Untagged&#8221;. To add a new tag, click the drop down next to &#8220;Tag&#8221; and select &#8220;Add Tag&#8230;&#8221;. Click on the little &#8221; + &#8221; below Tags and enter &#8220;LevelController&#8221;. Select the LevelController GameObject again in the Hierarchy and, again, open the dropdown next to Tag in the Inspector. You should see &#8220;LevelController&#8221; as an option. Select that and you&#8217;re done.

<img style="border: 0px currentcolor; display: inline; background-image: none;" title="SNAGHTML2cee32" src="https://i2.wp.com/timmykokke.com/images/a297f79f3d4c_B7B6/SNAGHTML2cee32.png?resize=320%2C111" alt="SNAGHTML2cee32" width="320" height="111" border="0" data-recalc-dims="1" />

Now for the actual texts. Right click the Level GameObject in the Hierarchy panel and look for Text under the UI category. Note that the Text GameObject gets a Canvas as a parent.

Snap the text to the left top. By holding Alt and Shift while selecting the top-left icon, you can set the snap point and the hotspot to be in the top left corner.

<img style="margin: 0px; border: 0px currentcolor; display: inline; background-image: none;" title="image" src="https://i2.wp.com/timmykokke.com/images/a297f79f3d4c_B7B6/image.png?resize=274%2C148" alt="image" width="274" height="148" border="0" data-recalc-dims="1" />

Set the position to X: 10 and Y: –10 to give it just a little space from the edges. I gave it a width of 70 and a height of 30. I entered “Moves:” as text to show, set the font size to 20 and the color to black.

<img style="border: 0px currentcolor; display: inline; background-image: none;" title="SNAGHTML50315b" src="https://i1.wp.com/timmykokke.com/images/a297f79f3d4c_B7B6/SNAGHTML50315b.png?resize=277%2C601" alt="SNAGHTML50315b" width="277" height="601" border="0" data-recalc-dims="1" />

Copy the text, you can do that by hitting ctrl+d in hierarchy panel and set the text to “0”. This text object will show the score.

Last thing to do is selecting the ScoreController in the Hierarchy and drag the Text object with for the scoring to the Text property of the ScoreController.

By now, the Hierarchy should look something like this:

<img style="border: 0px currentcolor; display: inline; background-image: none;" title="image" src="https://i2.wp.com/timmykokke.com/images/a297f79f3d4c_B7B6/image_3.png?resize=320%2C202" alt="image" width="320" height="202" border="0" data-recalc-dims="1" />

And that&#8217;s it for part 3 of this tutorial. Nothing specific to Windows 10 this time. In the next part we&#8217;re going to add a title screen and a complete screen. We&#8217;re also going to add the last score to the current live-tile.