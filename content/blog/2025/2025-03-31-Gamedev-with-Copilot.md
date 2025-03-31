---
id: 20250331
draft: true
title: Supercharging Game Development with GitHub Copilot
date: 2025-03-31T01:00:00+00:00
author: Sorskoot
layout: post
share: true
comments: true
guid: https://www.timmykokke.com/?p=20250331
permalink: /2025/03/GamedevwithCopilot/
categories:
  - Game Development
  - AI
tags:
  - AI
  - Copilot
images:
  - /images/2025/03/copilot-gamedev.jpeg
---

Hello Coders! 👾

Over the past year, AI-powered development tools have completely transformed how I build games. GitHub Copilot has become an essential part of my workflow when developing WebXR games with Wonderland Engine. Today, I want to share how I leverage Copilot to streamline my game development process and some practical tips to make it work better for your specific needs.

## How I Use Copilot for Game Development

### 1. Scaffolding Components Quickly

One of my favorite uses for Copilot is quickly generating Wonderland Engine component scaffolding with basic logic. While it's not always perfect (and sometimes creates completely incorrect code), it's often significantly faster than writing everything manually. For example, when I need a new physics component, I can describe what I want, and Copilot will generate a starting point.

### 2. Adding Documentation

Documentation is crucial for game projects, especially if you're working with a team or plan to revisit your code later. I also often work on code for libraries that might be used by other, which makes having documentation over more valuable. I use Copilot to quickly draft documentation for my methods and classes, which saves time and ensures my code is well-documented.

When I need to document a complex method, I simply start typing a comment and Copilot suggests comprehensive documentation that I can then tweak to match my specific implementation.

### 3. Code Reviews

Though I am pretty strict about how I want my code to be structured, having an AI doing a review makes my code even stricter. I'll ask Copilot to review my code and suggest improvements, which often catches issues I might have missed or suggests more elegant solutions. This additional layer of review has significantly improved my code quality.

### 4. Refactoring Complex Code

When my code gets too complex or I want to modify something substantial, I ask Copilot to help with refactoring. It's particularly useful for:

- Breaking down large functions into smaller, more manageable ones
- Identifying and eliminating redundant code
- Suggesting more efficient patterns or algorithms
- Implementing design patterns where appropriate

### 5. Finding bugs

That's right, I even use Copilot to find bugs. Sometimes there are bugs that aren't really obvious.

For example, recently I had an issue with storing and retreiving a value that was stored as a bit in a number. The code was ported from C#. The original used a ulong value and flipped bits to store a ranges of boolean values. I had some strange results in JavaScirpt. After some debugging I got to the class where the issue should be. But nothing looked wrong. So I asked Copilot, and immidately got the pointed to the issue. It turned out that in C# the ulong is 64 bits that are used for these bit operations. In JavaScript, it only uses 32 bits in a number. So I was another 32 bit short. I might have found that eventually, but probably only after disecting the bit of the numbers manually, which might have taken me hours. Copilot solved it in seconds.

## Customizing Copilot for Your Projects

The real power of Copilot comes from customization. I enhance its effectiveness by providing project-specific context through custom instruction files.

### Using Custom Instruction Files

I use a `.github/copilot-instructions.md` file in my project repositories. This file is custom for the project I'm working on and contains a description of the game or project. But, what I also do is reference another document I created that contains the complete coding guide for Wonderland Engine, with a few extra customizations on top mentioning some deprecated features and such.

For example, I use this for a little example game I'm working on:

```md
# Hoppy Highway

- The game is build using TypeScript.
- Make sure to comply to the [Wonderland Engine Guide](./wonderland-instructions.md)
- The game uses a custom React implementation for Wonderland Engine, REACT-DOM is not used.
- Everything, including the UI is rendered through Wonderland Engine.
- We can't use any other 3rd party libraries.
- Wonderland Engine uses ESBuild for building projects.
```

By doing it this way, you'll have a document with your personal guidelines that applies to all your projects, plus project-specific instructions that tailor Copilot's suggestions to the exact requirements of what you're currently building.

### Easy reusable prompts

There are a [couple of settings](https://code.visualstudio.com/docs/copilot/copilot-settings#_customize-copilot-prompts) that you can add to your workspace settings or even use them globally to specify how you would like Copilot to handle things. For example, I'd like to influence how my commit messages are generated. I have this in the workspace settings of one of my games. This generates consistent commit messages for my project.

```json
{
    "github.copilot.chat.commitMessageGeneration.instructions": [
        {
            "text": "Use imperative text, with a group prefix if applicable. Feel free to add an emoji at the end if that fits the change."
        }
    ]
}
```

## Tips for Better Results

For the best results when using Copilot for coding:

1. **Be specific in your requests** - The more details you provide, the better Copilot's suggestions will be
2. **Review suggestions carefully** - Don't blindly accept code, especially for complex game logic
3. **Teach Copilot your style** - The more you use it with your custom instructions, the better it adapts to your preferences. Iterate and improve.
4. **Break down complex problems** - Ask for solutions to smaller parts of a problem rather than the entire solution
5. **Use it for exploration** - Copilot can help you discover new approaches or techniques you might not have considered

## Conclusion

GitHub Copilot has become an invaluable tool in my game development toolkit. While it doesn't replace understanding core concepts or creative decision-making, it significantly speeds up implementation, reduces boilerplate, and helps maintain code quality.

By customizing it with project-specific instructions and leveraging it for the right tasks, you can dramatically improve your productivity as a game developer.

Have you integrated AI tools into your game development workflow? I'd love to hear about your experiences in the comments!

Happy Coding! 🚀

{{< img-link "/images/2025/03/copilot-gamedev.jpeg" "Title" >}}
