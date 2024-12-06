---
id: 20241206
draft: true
title: Wonderland Project Day - December
date: 2024-12-06T01:00:00+00:00
author: Sorskoot
layout: post
share: true
comments: true
guid: https://www.timmykokke.com/?p=20241206
permalink: /2024/12/ProjectdayDecember/
categories:
  - devlog
tags:
  - wonderland engine
  - project day
images:
  - /images/devlogStills/ProjectDayDecember02.png
---

Hello Coders! 👾

At Wonderland Engine, every first Friday of the month is 'Project Day'. This day is designed to give those who typically work on the engine a chance to work with it, experiencing firsthand what developers face every day. For me, Project Day is an opportunity to explore engine features I don't usually utilize. Since my daily tasks involve working with the engine, this day provides a fresh perspective and allows me to try something different, giving me a chance to offer valuable feedback on my experiences.

### Today's Project: Generating Objects in the Editor

For this Project Day, I decided to dive into generating objects, worlds, or maps inside the editor using a plugin. The plugin API is fairly new and project days allow me to explore what it possible and provide some feedback on this.

I began the day brainstorming what I wanted to build. I have a lengthy list of ideas, and I settled on generating a map inside the editor and aiming to build a game from it, two ideas! I think this is the first time that a plugin is used to generate things inside the editor.

Here’s a quick breakdown of the day's progress:

- I started by exploring some previous code I wrote on plugins to figure out how to actually add things to the hierarchy.
- Pretty quickly I was able to add objects, and not long after I was adding mesh components and then collider components too.
- Midway through the day, I realized that transforming my work into a complete game wasn't feasible.
- I managed to create a function that clones a given object, and it turns out that this process is a bit faster. This speed increase makes it easier to generate more content.
- I wanted to add custom components to these objects too, unfortunately, it turned out this is not supported in the editor API yet.
- Although it doesn't quite look like a game yet, running it in the browser does show a bit of what I had in mind. The orthographic view adds a unique aspect to it, differing from the usual Wonderland Engine game style.

Here are some screenshots from the day's progress:

{{< img-link "/images/devlogStills/ProjectDayDecember01.png" "Screenshot 1" >}}

- Something is generating!

{{< img-link "/images/devlogStills/ProjectDayDecember02.png" "Screenshot 2" >}}

- I used Perlin noise and textures to enhance the visuals.

{{< img-link "/images/devlogStills/ProjectDayDecember03.png" "Screenshot 3" >}}

- End-of-day results.

{{< img-link "/images/devlogStills/ProjectDayDecember04.png" "Screenshot 4" >}}

- Running it in the browser.

I'm excited about the possibilities and insights gained from today's Project Day. I plan on using these findings in the development of games like Storage Space 13 pretty soon. There's something uniquely rewarding about experimenting with new ideas and pushing the limits of what we can create.

Happy Coding! 🚀
