---
id: 20260111
draft: true
title: Unity Scriptable Objects
date: 2026-01-11T01:00:00+00:00
author: Sorskoot
layout: post
share: true
comments: true
guid: https://www.timmykokke.com/?p=20260111
permalink: /2026/01/UnityScriptableObjects/
categories:
  -
tags:
  -
images:
  - /images/2026/01/??.png
---

<https://www.youtube.com/watch?v=raQ3iHhE_Kk>
Game Architecture with Scriptable Objects by Ryan Hipple

Core Idea
ScriptableObjects in Unity are data containers that can store data independently of scene objects.
They:

Exist as assets in your project.
Are not tied to a specific scene or GameObject.
Can be shared across multiple objects and scenes.
Reduce memory usage and duplication.

Benefits in Game Architecture

Decoupling Systems

Instead of hardcoding references between scripts, you store shared data in ScriptableObjects.
Example: A PlayerHealth ScriptableObject can be referenced by UI, enemies, and gameplay scripts without them knowing about each other.

Runtime Data Sharing

Multiple objects can read/write to the same ScriptableObject instance.
Great for global variables, configuration, and state tracking.

Inspector-Friendly

Designers can tweak values in the Inspector without touching code.
Changes persist as asset modifications, not scene changes.

Event System with ScriptableObjects

Hipple introduces a GameEvent ScriptableObject that can be raised and listened to by multiple listeners.
This replaces direct method calls, reducing dependencies.

Example: GameEvent System
GameEvent.cs

```cs
using UnityEngine;
using System.Collections.Generic;

[CreateAssetMenu(menuName = "Events/Game Event")]
public class GameEvent : ScriptableObject
{
    private readonly List<GameEventListener> listeners = new List<GameEventListener>();

    public void Raise()
    {
        for (int i = listeners.Count - 1; i >= 0; i--)
            listeners[i].OnEventRaised();
    }

    public void RegisterListener(GameEventListener listener)
    {
        if (!listeners.Contains(listener))
            listeners.Add(listener);
    }

    public void UnregisterListener(GameEventListener listener)
    {
        if (listeners.Contains(listener))
            listeners.Remove(listener);
    }
}
```

GameEventListener.cs

```cs
using UnityEngine;
using UnityEngine.Events;

public class GameEventListener : MonoBehaviour
{
    public GameEvent Event;
    public UnityEvent Response;

    private void OnEnable() => Event.RegisterListener(this);
    private void OnDisable() => Event.UnregisterListener(this);

    public void OnEventRaised() => Response.Invoke();
}
```

Usage:

Create a GameEvent asset in your project.
Attach GameEventListener to objects that should respond.
Call myGameEvent.Raise() from anywhere to trigger all listeners.

Common Use Cases

Global configuration (e.g., difficulty settings, audio volumes).
Shared runtime state (e.g., player score, inventory).
Event broadcasting without tight coupling.
Data-driven design for enemies, weapons, levels.
