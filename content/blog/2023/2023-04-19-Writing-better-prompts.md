---
id: 20230419
draft: false
title: "Making AI-Generated Text More Natural: Tips and Tricks"
date: 2023-04-19T00:00:00+00:00
author: Sorskoot
layout: post
share: true
comments: true
guid: https://www.timmykokke.com/?p=20230419
permalink: /2023/04/WritingBetterPrompts
categories:
  - AI  
tags:
  - AI
---

As someone who often works with AI-generated text, I've discovered a few handy strategies for making it appear more natural and less obviously computer-generated. Here's what I've learned:

1. **Be specific with your prompts:** To get better results, provide clear instructions and plenty of context to guide the AI model. This way, you're more likely to obtain the desired response.

2. **Adjust the temperature setting:** The creativity of AI outputs can be fine-tuned by tweaking the temperature. For focused responses, try a lower value (e.g., 0.3); for diverse or creative ones, go higher (e.g., 0.8).

3. **Limit response length:** Set a maximum token limit to avoid unnecessarily long or off-topic responses that sound unnatural.

4. **Iterate and refine:** If the initial output isn't quite right, don't hesitate to rephrase your prompt or tweak settings until you achieve a satisfying result.

5. **Use examples in prompts:** Incorporating examples within your prompt gives the AI model a clearer understanding of the response you're looking for.

For instance, instead of asking \"Write an introduction about A-Frame,\" provide context like this:

> _\"Please write a concise yet informative introduction about A-Frame as if it were part of an article on WebXR technologies for beginners.\"_

By applying these techniques, you'll find that your AI-generated text feels more natural and human-like in no time! Give them a try next time you work with any text generation tools!

## A bit more on how to generate something

Let me give you an example of a prompt that I'm using with [Semantic Kernel](https://devblogs.microsoft.com/semantic-kernel/) at the moment. I start by stating to ChatGPT or GPT3 what I want, and then make sure there's a clear set of rules the AI should adhere to. In SK the `{{ $INPUT }}` is being replaced with your information about the post it should write. If you want to use this example without SK, you can put your ideas for the post there. What works well with this is giving a list of bullet points on the topic you want your text to be about, although just a description works well. You can always iterate and try again.


```
====
WRITE A SMALL BLOGPOST USING THE SAMPLE BELOW. USE THE FOLLOWING RULES:
- USE MARKDOWN FOR FORMATTING
- KEEP SENTENSES SHORT
- DON'T USE HASHTAGS
- DON'T USE LINKS
- DON'T USE EMOJIS
- WRITE IN THE FIRST PERSON
- WRITE IN A CREATIVE, INFORMAL STYLE FOR TECHNICAL PEOPLE
- WRITE IN AN EXPOSITORY STYLE
- WRITE IN A STYLE THAT IS EASY TO UNDERSTAND
==== 

{{ $INPUT }}
```

## Closing words
Make sure to follow me on [LinkedIn](https://www.linkedin.com/in/timmykokke/), [Twitter](https://twitter.com/Sorskoot), and [YouTube](https://www.youtube.com/sorskoot) as I will post more on Semantic Kernel, prompting, and how this all works in my AI Assistant Rosie soon.
