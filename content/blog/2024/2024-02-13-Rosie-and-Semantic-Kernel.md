---
id: 20240213
title: "Rosie and Semantic Kernel"
date: 2024-02-13T00:00:00+00:00
author: Sorskoot
layout: post
share: true
comments: true
draft: false
categories:
  - AI
tags:
  - Semantic Kernel
  - Rosie
---

Hello Coders! 👾

I've been itching to share some updates about my AI assistant, [Rosie](https://timmykokke.com/blog/2023/2023-02-16-rosie/). She's been my silent partner for quite some time, and I've been tweaking her abilities to make her even more helpful in my daily grind. One of the coolest upgrades I've made is getting her to chat with Azure Functions and something called [Semantic Kernel](https://learn.microsoft.com/en-us/semantic-kernel/). Let's unwrap this Semantic Kernel today, so we can get our hands dirty with some code in the next posts!

## 🧠 What's This Semantic Kernel Thingy?

Alright, so imagine you've got this awesome toolbox, right? But instead of screwdrivers and hammers, it's packed with smart tools that help you talk to AI, generate code, and analyze data. That's what Semantic Kernel is like – it's an SDK that's all about making conventional programming languages BFFs with Large Language Models.

Here's a quick rundown of the SK's main parts:

- **Kernel**: Think of it as the brain of the operation. It takes your requests and turns them into goals.
- **Planner**: This is the strategist. It maps out the steps to hit those goals with the tools at hand.
- **Plugins**: These are your Swiss Army knives, blending AI prompts with your good ol' code to get stuff done.
- **Memories**: They're like your diary, keeping track of what's happened so everything makes sense.
- **Connectors**: These are your bridges to the outside world, pulling in data from elsewhere.

Semantic Kernel isn't just a one-trick pony. It's meant for chatty bots, whipping up content, coding on the fly, journalism, answering questions, and digging through data. Plus, it's all about being clear and ethical with AI – we're talking tech that's helpful and makes sense, without stepping on any moral toes.

{{<img-link "/images/2024/02/Kernel.png" "An animated illustration of a digital computer kernel floating amidst a vibrant background. Various components symbolic of artificial intelligence, such as neural networks, machine learning algorithms, data streams, algorithmic patterns, and robotic elements, revolve in an orbital pattern around the kernel." >}}

## 🧠 The Kernel: The AI Maestro

Imagine an orchestra without a conductor. That's an AI application without its kernel. The kernel in SK is the maestro, conducting the symphony of AI models, services, and plugins. It's all about making sure everything works together in harmony to create a seamless user experience.

The kernel is the boss that manages tasks like choosing the right AI service, parsing responses, and handling prompt templates. It's like having a super-efficient assistant who knows exactly what to do and when to do it. And the best part? You can add new services or tweak the existing ones, and the kernel will make sure everything still runs smoothly.

## 📋 The Planner: The Strategy Genius

Now, let's talk about the planner. This clever component is like a master strategist in a game of chess. It takes a look at the user's request (the "ASK") and comes up with a brilliant plan to achieve it. The planner breaks down the goal into steps and decides which plugins to use and in what order.

For example, if you're building an AI agent with SK, the planner will look at the user's ASK and orchestrate the plugins to fulfill the request. It's all about making smart decisions and ensuring that each step is taken at the right time for the best outcome.

## 🔌 Plugins: The Swiss Army Knife of Functions

Plugins in SK are like the versatile tools in a Swiss Army knife. They can be anything from native functions written in languages like C# to interactions with AI services like OpenAI. They're the building blocks that you can mix and match to give your AI application the skills it needs.

Here's a little sneak peek at how you might set up a plugin in SK:

```C#
// Create a kernel object
Kernel kernel = Kernel.CreateBuilder()
      .AddAzureOpenAIChatCompletion(chatModel, endPoint, apiKey)
      .Build();

// Import your plugin into the kernel
var skill = kernel.ImportPluginFromType<GitHubSkill>();

// Invoke the skill
var result = await kernel.InvokeAsync(skill, arguments);
```

With plugins, you can customize your AI to do just about anything, from sending emails to generating natural language text. And because SK uses the OpenAI plugin specification, your plugins can play nice with other environments too!

## 🧠 Memories: The AI's Secret to Remembering

Memories in SK are like a brain's ability to recall important info. They help the AI keep track of context, which is super important for making responses relevant and on-point. Memories can be simple key-value pairs, large data stored on disk, or even semantic memory searches using embeddings.

Semantic memory search is like having a conversation with someone who really gets you. Instead of just matching keywords, it looks for the meaning behind your words to find the best response. It's what makes chatting with an AI feel more natural and less like talking to a robot.

## 🔗 Connectors: The Ultimate Liaisons

Last but not least, we've got connectors. These are the diplomats that help SK talk to the outside world. Whether it's fetching data from an API or accessing a database, connectors make sure the AI can get the info it needs to answer your questions accurately.

Imagine asking your AI about the weather, and thanks to a connector, it can pull the latest forecast from a weather service API. That's the kind of real-time, relevant response that connectors enable.

## 🛠️ Rosie's SK Makeover

So, Rosie's been getting quite the upgrade with SK. I've been using her every day, and she's been a star at handling tasks that used to take up so much of my time. It's like having a super-smart buddy who's always ready to lend a hand.

Semantic Kernel is still a small part of Rosie's capabilities, but it's a part I'm eager to extend and improve. Particularly the Planner and Plugins parts. They could make Rosie even more helpful than she already is.

## 🗣️ Signing Off

I'm super excited to dive deeper into Rosie's world and share more about how I've been using Semantic Kernel to boost her abilities. But hey, I'm not just here to talk at you – I'd love to hear your thoughts too! Have you worked with AI in your projects? What's been your experience? Drop a comment and let's get the conversation rolling!

And if you're digging this and don't want to miss out on the code deep-dive, make sure to follow along. Trust me, it's going to be a fun ride!

That's all for today, folks! Keep an eye out for my next post where we'll peel back the layers of Rosie's code and see Semantic Kernel (and more) in action. Until then, keep experimenting, keep learning, and most importantly, keep having fun with tech! 

Happy Coding! 🚀

{{<img-link "/images/2024/02/Excited.png" "A diverse group of individuals huddles around a glowing computer screen, with expressions of excitement and enthusiasm evident on their faces." >}}