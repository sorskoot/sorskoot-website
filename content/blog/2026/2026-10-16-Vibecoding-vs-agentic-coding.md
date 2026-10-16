---
id: 20261016
draft: true
title: Vibecoding Vs Agentic Coding
date: 2026-10-16T01:00:00+00:00
author: Sorskoot
layout: post
share: true
comments: true
guid: https://www.timmykokke.com/?p=20261016
permalink: /2026/10/Vibecodingvsagenticcoding/
categories:
  - 
tags:
  - 
images:
  - /images/2026/10/??.png
---

Hello Coders! 👾

Something about the way a lot is being said around AI and coding is bothering me. I keep seeing people use the term *vibecoding* for all AI assisted coding, including *agentic coding*, as if they're the same thing. And most often this is meant in a negative way. But I think they are very different approaches. While both approaches involve AI writing most of the code and both can produce a working application, for me, the difference is how I get there and how I check the result.

## Not everything is vibecoding

When I think about vibecoding, I think about that turtle in Finding Nemo who just goes with the flow and sees where the current takes him. It's about exploring and experimenting without a rigid plan, letting the process guide the outcome. And just throwing instruction at an AI until something works.

It's a way to explore an idea. If I want to try a game mechanic or build a quick prototype, I don't always need a detailed plan before I start.

But that's not the only way to build software with AI. That's not the best way to build using AI.

Imagine two developers building the same feature. One starts prompting, tries the result, and asks for fixes whenever something breaks. The other defines the requirements, thinks about how the feature fits into the application, and decides how to test it. They then use agents to help with the work and review what comes back.

Both use AI. They might even end up with something that looks the same. But the process behind it is quite different.

**The difference isn't who types the code. It's the engineering that goes into it.**

## Code is only part of the work

Writing code is only one part of software development. I still need to understand the problem, make design decisions, test the behavior, and maintain the result later.

AI doesn't remove any of that work. It can help with it, but generating an implementation isn't the same as knowing that implementation is correct.

For a prototype, "does it work when I try it?" might be enough for now. For something I want to keep building on, I need more answers. Does it meet the requirements? Does it fit the existing code? What happens with unexpected input? Can I change it later without breaking something else?

That's where I see the difference between vibecoding and a more structured, agentic approach.

Of course, these aren't two completely separate worlds. I can explore an idea through vibecoding and then bring more structure into the project once I know what I want to build.

And a plan doesn't magically make the software good. Bad requirements and weak tests are still bad requirements and weak tests, even when an agent follows them perfectly.

I want AI to be part of my engineering process, not a replacement for it.

## My role as a developer

What I find interesting is how this changes where I need to spend my attention.

If an agent handles more of the implementation, I can spend more time defining the problem, deciding how to divide the work, and checking that the result makes sense.

Instead of only asking how to implement a feature, I need to ask things like:

- What exactly needs to be built, and how do I know it's done?
- What constraints does the agent need to follow?
- Which decisions do I need to make myself?
- How do I check the result beyond asking the agent if it's correct?

Those aren't just prompting questions. They're software engineering questions.

I don't think being a developer becomes only about writing better prompts. I still need to understand the software well enough to guide the work and take responsibility for the result.

## More agents, more coordination

A single agent can already help with planning, implementation, and testing. Adding more agents introduces another problem: coordinating their work.

If two agents change the same files, or make different assumptions about an interface, I still have to deal with the conflicts. Having them work faster doesn't make those problems disappear.

One possible workflow is to let a planning agent break down a task, have an implementation agent write the code, and use a separate agent to review the change. Tests and other checks then help determine whether the work is ready to integrate.

I wouldn't use that whole workflow for every small change. Sometimes one agent and a focused test are enough. Other tasks need more planning or a closer review.

The important part is that each agent has a clear job, and that I define what needs to happen before I accept its work. A second agent agreeing with the first isn't proof that the implementation is correct.

For me, the goal isn't to run as many agents as possible. It's to let them do useful work without losing track of the application as a whole.

## Giving agents clear tasks

Breaking down the work becomes especially important when I want agents to work in parallel.

"Implement the inventory system" sounds like a task, but it leaves a lot open. How are items represented? How does saving work? What should happen when the inventory is full? Which parts of the game need to interact with it?

I could split that into a data model, item interactions, saving and loading, and a user interface. But smaller tasks aren't automatically independent tasks. If the interface depends on a data model that hasn't been decided yet, those agents can't safely work in parallel without agreeing on that model first.

For each task, I'd want to provide:

- The problem and expected behavior.
- Clear acceptance criteria, meaning the conditions that tell me the task is done.
- Relevant interfaces and project conventions.
- Dependencies on other tasks.
- Tests or other checks needed before accepting the result.

For example, a task for adding an item could specify that adding to a full inventory must fail without changing its contents. That gives the agent a concrete behavior to implement and gives me something to verify.

A human colleague might pick up an unwritten convention from working on the project. An agent might guess instead. I don't want an important design decision to depend on whether that guess happens to match mine.

This isn't a completely new problem. Practices like [test-driven development](https://martinfowler.com/bliki/TestDrivenDevelopment.html) and [continuous integration](https://martinfowler.com/articles/continuousIntegration.html) already help us define and verify work. I think a lot of those principles still apply. We just need to be more explicit about the context we give agents.

## Learning from the results

I also think the workflow should give me feedback, not just code.

If an agent needs clarification several times, maybe the task wasn't clear enough. If two implementations conflict, maybe I divided the work at the wrong boundary. If the same mistake keeps coming back in review, maybe it needs an automated check.

Those are useful things to learn before starting the next task.

I don't want to build a rigid process with lots of steps just because I can automate them. I want to improve the process based on what actually happens.

That means looking at test results, review findings, and integration problems. Not just asking an AI to review its own work and accepting "looks good" as the answer.

## Better prompts aren't enough

A lot of the discussion focuses on models, tools, and how quickly someone can build an application. I understand why. Getting something working in minutes is exciting.

But I'm more interested in what happens after that first version. How do I add the next feature? How do I catch regressions? How do I keep several agents working toward the same design?

Better prompts help, but they don't answer all of those questions. I also need clear requirements, shared context, sensible task boundaries, and reliable checks.

I don't think we need to reinvent software engineering. I do think we need to work out which practices transfer well to agents and which need adjusting.

## What I mean by agentic coding

There are plenty of labels floating around: AI-assisted development, AI-driven development, agentic coding, and agentic software engineering. I'm not too concerned about finding the perfect one.

When I talk about agentic coding in this context, I mean using agents within a deliberate development process. They can help plan, implement, test, and review, but I still define the requirements and decide whether the work is ready.

Just using an agent doesn't guarantee that process. I can vibecode with an agent too.

Vibecoding is useful for exploring ideas, and I don't want to dismiss it. I just don't want it to become the label for everything we do with AI in software development.

For me, the interesting shift is from asking AI to generate code to building a workflow where AI can contribute reliably. I might write fewer lines myself, but I still need to make sure we're building the right software.

That's still software engineering. The tools are changing, not the need to understand what we're building.

Happy Coding! 🚀