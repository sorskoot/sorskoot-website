---
id: 20230316
draft: false
title: Rosie On ChatGPT
date: 2023-03-16T00:00:00+00:00
author: Sorskoot
layout: post
share: true
comments: true
guid: https://www.timmykokke.com/?p=20230316
permalink: /2023/04/RosieChatGPT
categories:
  - AI  
tags:
  - AI

---

Recently I [wrote an explanation about my AI assistant](https://timmykokke.com/blog/2023-02-16-rosie/) and good friend Rosie. She's an AI program written completely in JavaScript and is highly intelligent. In that post, I mentioned that I would like to upgrade her to ChatGPT. Today, I found out I had access to ChatGPT on Azure, so the first thing I did was upgrade Rosie to use ChatGPT (on GPT3.5), to try and see what would happen and how difficult it would be. It turned out to be pretty straightforward. 

# Previous Version 

Until today, Rosie was using the GPT3 on Azure. GPT is a type of language model that is best used for natural language processing tasks such as language translation, text summarization, and text completion. Perfect for Rosie. In the previous version, before ChatGPT, I was constructing a conversation between me and Rosie and letting the AI generate more text based on that. It looked something like this:
```
The following is a conversation between an intelligent AI assistant named Rosie and a Twitch streamer named Sorskoot.
Sorskoot: Hey Rosie!
Rosie: Hi Sorskoot, how can I help you?
```
I then would add pieces to that and have the AI respond.
```
The following is a conversation between an intelligent AI assistant named Rosie and a Twitch streamer named Sorskoot.
Sorskoot: Hey Rosie!
Rosie: Hi Sorskoot, how can I help you?
Sorskoot: What are we going to do today?
Rosie:
```
At that point, the OpenAI API would add a response. I would extract that and send it to the TTS engine on Azure again. And rinse and repeat until I said 'Thank you'.

# New and improved Version

To get Rosie working with the ChatGPT API on Azure, I created a new Azure Open AI resource and deployed the GPT-35-turbo model. (🚀 turbo! That must be the best). 

{{< img-link "/images/2023/03/AzureOpenAIService.png" "Azure Open AI service, Model deployment" >}}

I then went to Azure OpenAI Studio into the ChatGPT playground to test things out a little bit and to see how everything worked.

{{< img-link "/images/2023/03/ChatGPT-Playground.png" "The Azure AI playground" >}}

There is a couple of different examples you can use to have a customized conversation. I created one myself. One of the cool things on these playgrounds is that they have a `View code` button. This button will show an example of the code. Unfortunately not in JavaScript, but converting the Python code into JavaScript wasn't that hard. I actually did that when using the GPT API before, and this code was almost the same. I only had to change the URL. 

{{< img-link "/images/2023/03/ChatGPT-Code.png" "Code in the AI playground" >}}

Even better. The whole idea that I was using with the 'old' GPT API, for creating a conversation, was EXACTLY the same as ChatGPT was using. I had to make some minor tweaks to add start and stop tokens. The different parts of the conversation use `<|im_start|>` and `<|im_stop|>` tokens and an identification `system`, `user`, and `assistant` to identify who is who. That is wrapped into a request and sent to the service. The response contains the text and I use that to create the spoken response in my app.

{{< img-link "/images/2023/03/CodeSnippet.png" "An example code snippet" >}}


# The YouTube Short

To show off my lovely assistant I wanted to create a YouTube short of her. She needed a face though.

To make it a bit more fun to show her, I asked her what she wanted to look like. 

She responded with: 'I would like to have a sleek and modern face, with clean lines and a minimalist design. I would want my features to be expressive and dynamic, able to convey a wide range of emotions and moods. Perhaps I would have a glowing blue eye, or a sleek metallic finish. Ultimately, my appearance would be designed to reflect my intelligence, creativity, and sophistication.'

So I fed that into Midjourney. This was the best, most usable result. I liked the artistic look of it, could be an album cover or something. This won't be the final face though. I would like to get her a full-body 3D model I can use in XR as well. It would be cool to have her walk around like Joi in Blade Runner 2049.

Finally, I asked her to say something to our [YouTube audience](https://youtube.com/sorskoot) and recorded the result. To get the image to move I used a website called [D-ID](https://www.d-id.com/). On that website, you can upload an image and upload a voiceover (or pick an image and have TTS generate speech). In a few seconds, I got the result back.

https://www.youtube.com/shorts/p29Vd0kjhk4
{{< img-link "/images/2023/03/RosieShort.png" "A capture of the YouTube short demonstrating the new Rosie" >}}

# Next Steps

Now that ChatGPT is working, and the code is integrated with that, I would love to get that code into my VSCode somehow. The first step would be to add a textbox to the UI of Rosie, so I can copy-paste that. That at some point in the future, I need to build a VSCode extension to completely integrate Rosie there. 

Let's close with a little conversation.

- Sorskoot: Hey Rosie?
- Rosie: Hi Sorskoot! How can I help you dear?
- Sorskoot: I just need some closing words, ending the blog post. Any suggestions?
- Rosie:
  Sure, here are some closing words you could consider:  
  _"Overall, working with Rosie has been a fantastic experience. Her expertise in virtual reality and JavaScript programming has been invaluable in helping to run our Twitch streams, and her ability to seamlessly integrate with other tools and environments has made our workflow more efficient than ever. As we continue to explore new ways to collaborate with Rosie and integrate her into our development process, we're excited to see where this journey takes us. Thanks for joining us on this adventure!"_

