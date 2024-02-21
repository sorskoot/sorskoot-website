---
id: 20240219
draft: true
title: Porting from native to webxr
date: 2024-02-19T00:00:00+00:00
author: Sorskoot
layout: post
share: true
comments: true
guid: https://www.timmykokke.com/?p=20240219
permalink: /2024/02/Porting from native to webxr/
categories:
  - WebXR
tags:
  - Wonderland Engine
---

# The Process of Porting a Native Quest Game to WebXR

We made a bold statement: "The web is as capable to run games as native is".



## The Appeal of WebXR

WebXR holds its own unique allure. It could be likened to the most intriguing individual in the realm of technology. It is both accessible and adaptable. However, its most significant attribute is its promise of universal compatibility. It's akin to programming for all platforms simultaneously!
Our Objective: Transitioning a Native Game to WebXR
Our project embarked with an intriguing and ambitious concept: transforming the native Meta Quest 2 game 'Dead Secret Circle' into a WebXR version. We aimed not just at replicating the game for web access but also ensuring it offers an immersive, interactive, and performance-optimized experience across all platforms.
For this task, we were fortunate to be granted access to all game assets of 'Dead Secret Circle'. This included not only the raw design files but also in-game mechanisms, character models, audio files, and even UI components. Having these resources at our disposal provided us with a great starting point; it allowed us to thoroughly understand the original game's structure and mechanics.
However, more than simply transitioning the existing elements into WebXR format, we undertook meticulous planning to adapt each asset and functionality considering the unique nature of web-based gaming. For instance, keeping in mind that WebXR games need to cater to different devices with varying screen sizes and input methods.
We focused on building a trial or demo version featuring the first couple of scenes from 'Dead Secret Circle'.

## Embarking on the Journey

The initial step we undertook was to prepare our coding environment for handling WebXR. We had to ensure that our coder toolkit was aptly equipped for this new endeavor.

## Encountering Obstacles

During our journey of transitioning 'Dead Secret Circle' from a native Meta Quest 2 game to WebXR, we came across numerous obstacles that tested our skills and resolve. Among these challenges, one stood out due to its implications on the overall user experience and the unique nature of web games — download size.
While it's common for PC or console games to measure in gigabytes, web games need to be significantly smaller. Large files take longer to download and can lead to slow loading times, which can frustrate users and discourage them from playing the game. To address this issue, we had to optimize our assets as much as possible without compromising the game's visual appeal or performance.
For a big part Wonderland Engine takes care of compressing our 3D models and textures. Some other files like audio files we optimized manually. This approach reduced individual asset sizes and consequently shrank the overall download size of our game.
In addition to optimizing asset sizes, we also implemented a smart loading strategy. Rather than having players wait for all assets to load before starting the game, we decided to preload scenes and assets while players were already engaged in gameplay. This method masks some of the loading time as it spreads out asset delivery over the course of gameplay rather than concentrating it all at once during initial load time.
This proactive approach not only minimized waiting periods but also allowed us a buffer window to seamlessly deliver high-quality assets without interrupting gameplay or causing frustration due to load times.
Facing this challenge certainly wasn't easy; striking a balance between optimization, performance, and maintaining quality was complex. However, by addressing this hurdle head-on with creative solutions and thorough testing – we ensured that 'Dead Secret Circle' remains an enjoyable experience for users across diverse devices.
Overcoming Performance Barriers
Performance is a critical element in the realm of gaming. A game that suffers from lagging or sluggish performance can detract from its appeal, regardless of its other merits. As such, one of our key focuses during this project was to overcome these performance barriers and ensure an optimal gameplay experience.
The Wonderland Engine played a crucial role in this process. Designed with web deployment in mind, this engine is optimized for WebXR content creation which takes care of many performance issues often encountered on the web platform. Its engine features, like automated Level-of-Detail (LoD) generation and efficient rendering pipelines, helped minimize the application's memory footprint and GPU workload.
However, leveraging an optimized engine was only half the battle won; we had to ensure our game code was as efficient as possible. We made conscious efforts to write performance-optimized code by following best practices like reusing objects, minimizing expensive operations, and avoiding unnecessary computations.
Moreover, we used profiling tools both within the Wonderland Engine and browser developer tools regularly to evaluate our game’s performance in real-time scenarios. This helped us identify any performance bottlenecks in our code or assets promptly and fix them before they could affect the end-user experience.
The integration of these optimizations into our workflow proved instrumental in overcoming potential performance hurdles. In particular, it allowed us not just to develop a functional WebXR version of our game but also one that provides smooth gameplay across various devices with different capabilities.

## Ensuring Cross-Platform Compatibility

Ensuring cross-platform compatibility was one of the major obstacles we encountered in our journey. Given WebXR's inherent promise of universal compatibility, it was crucial to ensure that our game functioned smoothly across a myriad of devices – mobiles, tablets, desktops and VR headsets.
One significant aspect of this challenge was adding support for different input methods such as mouse and keyboard on the desktop version. The initial design of the Meta Quest 2 game leveraged controllers to provide an immersive and interactive VR experience. However, when porting this over to a desktop environment through WebXR, we needed to ensure that users could also play using their keyboard and mouse — common desktop input methods.
The mapping of controller actions to mouse clicks or keystrokes posed unique challenges due to the difference in interaction style between the VR controllers and traditional mouse-and-keyboard setup. We had to carefully re-design these interactions with simplicity, intuitiveness, and user comfort in mind while preserving as much gameplay mechanics as possible from its original VR version.
During this phase, we had several iterations; testing controls for feel and responsiveness, ensuring appropriate feedback is provided to players regardless of their chosen device. This included making sure virtual buttons were clickable with a mouse pointer or gaze-based pointing system for headset users without causing discomfort or fatigue.
In addition, we also prioritized optimization for each platform’s hardware constraints by fine-tuning performance settings such as frame rates, resolutions or graphics quality.
Overall, despite the complex task at hand, adding cross-platform support served as an enriching learning process about how different devices interact within the realm of WebXR. It demanded creative problem-solving skills but certainly added value by maximizing accessibility and usability.

## UI/UX Adaptations

The process of transitioning 'Dead Secret Circle' from a native VR game to WebXR required us to make substantial adaptations in the user interface (UI) and user experience (UX) design. It was paramount that these changes were carried out without undermining the immersive experience that the original game provided.
In VR, players interact with the environment more directly - they can point at objects, grab items, and perform actions using their hands or controllers. We aimed to keep this interactive aspect as close to the original as possible within our WebXR version. When players pointed at specific objects in the virtual world, we ensured an appropriate reticle appeared indicating an action - be it investigating a mystery element or opening a door.
However, for the desktop version where users interacted via mouse and keyboard instead of controllers, we needed a different approach to preserve intuitive interaction. To solve this issue, we cleverly repurposed assets used for the VR reticle into dynamic mouse cursors on desktops.
This creative adaptation meant that when users hovered over clickable elements with their mouse pointers, we swapped out the standard cursor for these custom reticles indicating various interaction possibilities. This way, not only did we retain consistency between platforms but also kept interactions intuitive and coherent with gameplay.
Adapting each element from its native form into something suitable for web-based play through WebXR proved challenging. Still, by focusing on consistent visual cues and maintaining intuitive controls across platforms – whether in VR or on desktop – we created a seamless UI/UX design adapted to each player's device capabilities while preserving engaging gameplay.

## Rigorous Testing

Testing is absolutely essential when porting games from native software to new platforms like WebXR. Ensuring that all functionalities operated correctly was certainly not an easy task, but we persevered and succeeded.

## Lightmaps in Unity and Exporting to Wonderland Engine

During this exciting journey, an essential aspect was creating lightmaps within Unity for our game. Lightmaps are a precomputed solution that essentially "paints" light onto surfaces in the 3D environment, making it look like the scene is lit without requiring any real-time lighting calculations. This technique significantly optimizes performance by reducing the computational load on rendering scenes, which is especially vital when we think about WebXR and the variety of devices it needs to support.
We started by setting up our lights and baking them into our 3D scene in Unity. The process was complex but rewarding, as we began seeing our game world come alive with stunning lighting effects.
However, another challenge awaited us – exporting these lightmaps from Unity and importing them into the Wonderland Engine. We needed to ensure that all the painstakingly created light information wasn't lost during this transfer. After several iterations and tweaking settings, we successfully managed to import these lightmaps into Wonderland Engine, where they maintained their appearance from Unity.
The process wasn't easy - there were definite challenges in maintaining parity between two different engines and understanding how each one handles lightmap data differently. However, Rosie's expertise in technical issues was invaluable during this process.
This phase taught us the importance of cross-engine compatibility and planning for asset transfer right at the inception of a project while continuing to optimize for best performance across various platforms.

## Lessons Learnt

The process of porting 'Dead Secret Circle' from a native VR game to WebXR was not merely an exercise in technical adaptation but also a tremendous learning experience, filled with challenges and breakthroughs that enriched our understanding of WebXR's potential.
One of the most significant lessons we learned from this project was the affirmation that WebXR is truly capable of delivering a quality and performance comparable to native VR games. Despite initial concerns about performance limitations or quality degradation, our final product demonstrated that with appropriate optimization techniques and ingenious solutions, it is possible to create engaging and high-quality games using WebXR.
We proved that WebXR could handle complex graphical elements, dynamic interactions, and provide a smooth gameplay experience just like its native VR counterparts. Moreover, the added advantage of universal accessibility - enabling players to engage across various platforms without any device-specific constraints - cemented WebXR's potential as the future of cross-platform gaming.

Another lesson was about asset management and optimization strategies for web-based games. We realized the importance of compressing assets for quick downloads and implemented innovative loading strategies to prevent long waiting times, ensuring an uninterrupted gaming experience.

Lastly, this journey underscored the power of adaptability in game development—translating VR interactions into desktop settings without losing intuitive gameplay required us to rethink interaction designs fundamentally.
In conclusion, this project served as both a technical achievement in demonstrating what is feasible with WebXR and an enriching journey expanding our knowledge boundaries.

## The Final Result

After countless cups of coffee and numerous long nights devoted to coding, we finally achieved our goal! Our native Meta Quest 2 game is now fully functional on the web.
And thus concludes our journey of porting a native Quest game into WebXR!

---

# The Process of Porting a Native Quest Game to WebXR

Consider the following scenario: a native Meta Quest 2 game, available on the web. An extraordinary proposition, isn't it? Indeed, we've managed to achieve just that. It was indeed an interesting journey, and now let's delve deeper into it.

## The Appeal of WebXR

WebXR holds its own unique allure. It could be likened to the most intriguing individual in the realm of technology. It is both accessible and adaptable. However, its most significant attribute is its promise of universal compatibility. It's akin to programming for all platforms simultaneously!

## Our Objective: Transitioning a Native Game to WebXR

Our project embarked with an intriguing and ambitious concept: transforming the native Meta Quest 2 game 'Dead Secret Circle' into a WebXR version. We aimed not just at replicating the game for web access but also ensuring it offers an immersive, interactive, and performance-optimized experience across all platforms.

For this task, we were fortunate to be granted access to all game assets of 'Dead Secret Circle'. This included not only the raw design files but also in-game mechanisms, character models, audio files, and even UI components. Having these resources at our disposal provided us with a great starting point; it allowed us to thoroughly understand the original game's structure and mechanics.

However, more than simply transitioning the existing elements into WebXR format, we undertook meticulous planning to adapt each asset and functionality considering the unique nature of web-based gaming. For instance, keeping in mind that WebXR games need to cater to different devices with varying screen sizes and input methods.

We focused on building a trial or demo version featuring the first couple of scenes from 'Dead Secret Circle'.

## Embarking on the Journey

The initial step we undertook was to prepare our coding environment for handling WebXR. We had to ensure that our coder toolkit was aptly equipped for this new endeavor.

Encountering Obstacles
During our journey of transitioning 'Dead Secret Circle' from a native Meta Quest 2 game to WebXR, we came across numerous obstacles that tested our skills and resolve. Among these challenges, one stood out due to its implications on the overall user experience and the unique nature of web games — download size.

While it's common for PC or console games to measure in gigabytes, web games need to be significantly smaller. Large files take longer to download and can lead to slow loading times, which can frustrate users and discourage them from playing the game. To address this issue, we had to optimize our assets as much as possible without compromising the game's visual appeal or performance.

For a big part Wonderland Engine takes care of compressing our 3D models and textures. Some other files like audio files we optimized manually. This approach reduced individual asset sizes and consequently shrank the overall download size of our game. 

In addition to optimizing asset sizes, we also implemented a smart loading strategy. Rather than having players wait for all assets to load before starting the game, we decided to preload scenes and assets while players were already engaged in gameplay. This method masks some of the loading time as it spreads out asset delivery over the course of gameplay rather than concentrating it all at once during initial load time.

This proactive approach not only minimized waiting periods but also allowed us a buffer window to seamlessly deliver high-quality assets without interrupting gameplay or causing frustration due to load times.

Facing this challenge certainly wasn't easy; striking a balance between optimization, performance, and maintaining quality was complex. However, by addressing this hurdle head-on with creative solutions and thorough testing – we ensured that 'Dead Secret Circle' remains an enjoyable experience for users across diverse devices.

## Overcoming Performance Barriers

Performance is a critical element in the realm of gaming. A game that suffers from lagging or sluggish performance can detract from its appeal, regardless of its other merits. As such, one of our key focuses during this project was to overcome these performance barriers and ensure an optimal gameplay experience.

The Wonderland Engine played a crucial role in this process. Designed with web deployment in mind, this engine is optimized for WebXR content creation which takes care of many performance issues often encountered on the web platform. Its engine features, like automated Level-of-Detail (LoD) generation and efficient rendering pipelines, helped minimize the application's memory footprint and GPU workload.

However, leveraging an optimized engine was only half the battle won; we had to ensure our game code was as efficient as possible. We made conscious efforts to write performance-optimized code by following best practices like reusing objects, minimizing expensive operations, and avoiding unnecessary computations.

Moreover, we used profiling tools both within the Wonderland Engine and browser developer tools regularly to evaluate our game’s performance in real-time scenarios. This helped us identify any performance bottlenecks in our code or assets promptly and fix them before they could affect the end-user experience.

The integration of these optimizations into our workflow proved instrumental in overcoming potential performance hurdles. In particular, it allowed us not just to develop a functional WebXR version of our game but also one that provides smooth gameplay across various devices with different capabilities.

## Ensuring Cross-Platform Compatibility

Ensuring cross-platform compatibility was one of the major obstacles we encountered in our journey. Given WebXR's inherent promise of universal compatibility, it was crucial to ensure that our game functioned smoothly across a myriad of devices – mobiles, tablets, desktops and VR headsets.

One significant aspect of this challenge was adding support for different input methods such as mouse and keyboard on the desktop version. The initial design of the Meta Quest 2 game leveraged controllers to provide an immersive and interactive VR experience. However, when porting this over to a desktop environment through WebXR, we needed to ensure that users could also play using their keyboard and mouse — common desktop input methods.

The mapping of controller actions to mouse clicks or keystrokes posed unique challenges due to the difference in interaction style between the VR controllers and traditional mouse-and-keyboard setup. We had to carefully re-design these interactions with simplicity, intuitiveness, and user comfort in mind while preserving as much gameplay mechanics as possible from its original VR version.

During this phase, we had several iterations; testing controls for feel and responsiveness, ensuring appropriate feedback is provided to players regardless of their chosen device. This included making sure virtual buttons were clickable with a mouse pointer or gaze-based pointing system for headset users without causing discomfort or fatigue.

In addition, we also prioritized optimization for each platform’s hardware constraints by fine-tuning performance settings such as frame rates, resolutions or graphics quality.

Overall, despite the complex task at hand, adding cross-platform support served as an enriching learning process about how different devices interact within the realm of WebXR. It demanded creative problem-solving skills but certainly added value by maximizing accessibility and usability.

## UI/UX Adaptations
The process of transitioning 'Dead Secret Circle' from a native VR game to WebXR required us to make substantial adaptations in the user interface (UI) and user experience (UX) design. It was paramount that these changes were carried out without undermining the immersive experience that the original game provided.

In VR, players interact with the environment more directly - they can point at objects, grab items, and perform actions using their hands or controllers. We aimed to keep this interactive aspect as close to the original as possible within our WebXR version. When players pointed at specific objects in the virtual world, we ensured an appropriate reticle appeared indicating an action - be it investigating a mystery element or opening a door.

However, for the desktop version where users interacted via mouse and keyboard instead of controllers, we needed a different approach to preserve intuitive interaction. To solve this issue, we cleverly repurposed assets used for the VR reticle into dynamic mouse cursors on desktops.

This creative adaptation meant that when users hovered over clickable elements with their mouse pointers, we swapped out the standard cursor for these custom reticles indicating various interaction possibilities. This way, not only did we retain consistency between platforms but also kept interactions intuitive and coherent with gameplay.

Adapting each element from its native form into something suitable for web-based play through WebXR proved challenging. Still, by focusing on consistent visual cues and maintaining intuitive controls across platforms – whether in VR or on desktop – we created a seamless UI/UX design adapted to each player's device capabilities while preserving engaging gameplay.

## Rigorous Testing

Testing is absolutely essential when porting games from native software to new platforms like WebXR. Ensuring that all functionalities operated correctly was certainly not an easy task, but we persevered and succeeded.

## Lightmaps in Unity and Exporting to Wonderland Engine

During this exciting journey, an essential aspect was creating lightmaps within Unity for our game. Lightmaps are a precomputed solution that essentially "paints" light onto surfaces in the 3D environment, making it look like the scene is lit without requiring any real-time lighting calculations. This technique significantly optimizes performance by reducing the computational load on rendering scenes, which is especially vital when we think about WebXR and the variety of devices it needs to support.

We started by setting up our lights and baking them into our 3D scene in Unity. The process was complex but rewarding, as we began seeing our game world come alive with stunning lighting effects.

However, another challenge awaited us – exporting these lightmaps from Unity and importing them into the Wonderland Engine. We needed to ensure that all the painstakingly created light information wasn't lost during this transfer. After several iterations and tweaking settings, we successfully managed to import these lightmaps into Wonderland Engine, where they maintained their appearance from Unity.

The process wasn't easy - there were definite challenges in maintaining parity between two different engines and understanding how each one handles lightmap data differently. However, Rosie's expertise in technical issues was invaluable during this process.

This phase taught us the importance of cross-engine compatibility and planning for asset transfer right at the inception of a project while continuing to optimize for best performance across various platforms.

## Lessons Learnt

The process of porting 'Dead Secret Circle' from a native VR game to WebXR was not merely an exercise in technical adaptation but also a tremendous learning experience, filled with challenges and breakthroughs that enriched our understanding of WebXR's potential.

One of the most significant lessons we learned from this project was the affirmation that WebXR is truly capable of delivering a quality and performance comparable to native VR games. Despite initial concerns about performance limitations or quality degradation, our final product demonstrated that with appropriate optimization techniques and ingenious solutions, it is possible to create engaging and high-quality games using WebXR.

We proved that WebXR could handle complex graphical elements, dynamic interactions, and provide a smooth gameplay experience just like its native VR counterparts. Moreover, the added advantage of universal accessibility - enabling players to engage across various platforms without any device-specific constraints - cemented WebXR's potential as the future of cross-platform gaming.

Another lesson was about asset management and optimization strategies for web-based games. We realized the importance of compressing assets for quick downloads and implemented innovative loading strategies to prevent long waiting times, ensuring an uninterrupted gaming experience.

Lastly, this journey underscored the power of adaptability in game development—translating VR interactions into desktop settings without losing intuitive gameplay required us to rethink interaction designs fundamentally.

In conclusion, this project served as both a technical achievement in demonstrating what is feasible with WebXR and an enriching journey expanding our knowledge boundaries.

## The Final Result

After countless cups of coffee and numerous long nights devoted to coding, we finally achieved our goal! Our native Meta Quest 2 game is now fully functional on the web.

And thus concludes our journey of porting a native Quest game into WebXR!