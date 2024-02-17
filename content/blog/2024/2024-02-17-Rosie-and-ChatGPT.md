---
id: 20240217
title: "Rosie and Azure OpenAI"
date: 2024-02-17T00:00:00+00:00
author: Sorskoot
layout: post
share: true
comments: true
draft: false
categories:
  - AI
tags:
  - Rosie
images:
- /images/2024/02/IntelligentBot.jpeg
---

Hello Coders! 👾

Today I'd like to dive a little deeper into the inner workings of my assistant Rosie. She's not just any virtual assistant; she's an intelligent, creative, and downright helpful entity that's been helping me on a daily basis. And yes, of course, this blog post was written with the help of Rosie. _(not by..., with 😉)_.

Now. My main goal of this blog post is not to show off Rosie (ok, all little), but to show that it's not really hard to build your own integration with Azure OpenAI.

{{<img-link "/images/2024/02/Rosie.png" "Screenshow of Rosie in action." >}}

## A Solid Foundation

The foundation of Rosie is nothing special. She's built on some regular tech: VueJS, Vuex, and Electron. These tools give her a solid foundation, making her super adaptable and responsive. VueJS, in particular, makes her reactive and composable, which is perfect for handling all sorts of dynamic tasks. Whether it's helping with (live) coding or creating content, Rosie's got it covered!

## Tapping into Azure's AI Brainpower

One of Rosie's main features is her connection to Azure OpenAI. This integration is what gives her her superpowers to go beyond simple task management. She started out responding to preprogrammed messages during Twitch streams, but she's evolved! From IRC, GPT-2 and GPT-3 to now leveraging ChatGPT on Azure, Rosie's capabilities have skyrocketed, making her an invaluable asset.

## Azure OpenAI Studio

To test and debug prompts, as well as deploying and updating the GPT models that Rosie uses. I use [Azure OpenAI Studio](https://oai.azure.com/) a lot, mainly the chat playground.

Azure OpenAI Studio is a fantastic tool for developers who want to tap into the power of AI without getting bogged down in the nitty-gritty of model creation and training. With its user-friendly interface, developers can easily experiment with different AI models, making the process of designing features a breeze. And with access to cutting-edge models like GPT-4 and DALL-E developers can seamlessly integrate state-of-the-art AI into their applications quickly. A great feature is that it even provides some code to get you started! 

{{<img-link "/images/2024/02/AOAI-Studio.png" "Screenshot of Azure OpenAI Studio." >}}

## Understanding Rosie's Intelligence

If we take a peek under the hood at Rosie's code, we see that every chat with me is transformed into a request sent to Azure ChatGPT. The service isn't just about understanding text; it can handle code snippets and images too, thanks to OCR and grounding enhancements. 

The path from the UI to the service is some VueJS and Vuex stuff I won't go into in this post. But, whenever a chat is entered, by text or by voice, it ends up in the ChatGPT service. 

Let's break down the key components of the ChatGPT service code, offering a detailed description of how Rosie, the AI Assistant, operates:

**ChatGTPMessage Class:**

This class forms the core structure of Rosie's ability to communicate. It starts by setting up unique identifiers for each message and standardizing the format of conversations between Rosie and the system or users.
The constructor initializes a new message with a unique ID (based on the current timestamp), a premise (which is a detailed description of Rosie's capabilities and personality), and an empty array to hold the conversation logs.
The `toRequest` method compiles the conversations into a formatted structure that Azure's OpenAI can understand. It wraps up my inputs and potential image content into a message object and sets various parameters like temperature (creativity level) and top_p (controlling randomness), along with activating any necessary enhancements such as OCR (Optical Character Recognition) and grounding for contextual understanding.

```js
class ChatGTPMessage {

    id = 0;
    starttoken = "<|im_start|>";
    endtoken = "<|im_end|>";

    constructor() {
        this.id = +new Date();
        this.premise = "Rosie is a female superintelligent AI assistant built by Sorskoot. She works as the personal assistant for Sorskoot. She helps him with his day-to-day activities, including running his live coding Twitch streams, recording YouTube videos about game development and working on social media content. Rosie is designed to be helpful, creative and clever, which makes her a valuable asset to Sorskoot's online presence. Rosie's knowledge of virtual reality, mixed reality, WebXR, and AI allows her to assist Sorskoot with any technical questions or issues he may encounter during his streams. She is particularly skilled in javascript programming, which makes her an asset in developing and Sorskoot's games, apps and other online platforms. She tries not to speak robotic and as an AI."
        this.conversations = [];
    }

    toRequest() {
        let messages = [{
            'role': "system", 'content': this.premise
        }];

        for (let i = 0; i < this.conversations.length; i++) {
            const sorskootText = {
                "type": "text",
                "text": this.conversations[i].sorskoot.text
            };
            
            const sorskootMessage = {
                'role': "user", 'content': [sorskootText]
            };

            if(this.conversations[i].sorskoot.image){
                sorskootMessage.content.push({
                    "type": "image_url",
                    "image_url": {
                        "url": this.conversations[i].sorskoot.image
                    }
                });
            }

            messages.push(sorskootMessage);
            if (!!this.conversations[i].rosie) {
                messages.push({
                    'role': "assistant", 'content': [this.conversations[i].rosie.text]
                });
            }
        }

        let request = {
            "messages": messages,
            "temperature": 0.95,
            "top_p": 0.95,
            "stream": false,
            "max_tokens": 4096,
            "enhancements": {
                "ocr": {
                    "enabled": true
                },
                "grounding": {
                    "enabled": true
                }
            },
            "dataSources": [
                {
                    "type": "AzureComputerVision",
                    "parameters": {
                        "endpoint": "https://rosie-ai-services.cognitiveservices.azure.com/",
                        "key": "https://t.ly/4RO60"
                    }
                }],
        }
        return request;
    }
}
```

*note: I only now, when writing this post, realize the old starttoken and endtoken properties are still in there. These are the ruins from 'ancient' times, from before ChatGPT existed, and I used these to create a conversation to complete by GPT2 and GPT3. I think I leave them in as a memory of old times :).* 

**Conversation Class:**

This class is a simple container that pairs my (Sorskoot) input with Rosie's responses, ensuring they are organized and can be processed in a structured manner.

```js
class Conversation {
    constructor(sorskoot, rosie) {
        this.sorskoot = sorskoot;
        this.rosie = rosie;
    }
}
```

**ChatGPTService Class:**

This class is where the service's functionality is fleshed out. It holds the `ChatGTPMessage` instance and the configuration needed to make API calls.
The request method is where the interaction with Azure's OpenAI occurs. It takes a new message, an optional code snippet, and an optional image, and then constructs a `Conversation` object. The code can be added through a special input in the UI, or loaded via a VSCode extension. The image can be opened in UI as well and is converted to base64.
The constructed Conversation is pushed into the ChatGTPMessage's conversations array, and a POST request is made to the Azure service using fetch, passing the necessary headers, including the API key, and the body content from `toRequest`.
Upon receiving a response, the method extracts the text from the JSON response and updates the conversation with Rosie's response. It then saves the conversation using the `saveConversation` method to be read again in the future if needed.

```js
export class ChatGPTService {

    constructor(config) {
        this.message = new ChatGTPMessage();
        this.config = config;
    }

    async request(newMessage, code, image) {
        let conversationMessage = newMessage;
        if (code) {
            conversationMessage += `\n\`\`\`\n${code}\n\`\`\``;
        }
        const conversationLine = new Conversation({
            "text": conversationMessage
        }, '');

        if (image) {
            conversationLine.sorskoot.image = image;
        }

        const m = this.message.conversations.push(conversationLine);

        let response = await fetch(this.config['chatgpt-url'], {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "api-key": `${this.config['chatgpt-key']}`
            },
            body: JSON.stringify(this.message.toRequest())
        });
        let json = await response.json();
        
        let text = json.choices[0].message.content;

        this.message.conversations[m - 1].rosie = { text: text };
        this.saveConversation();
        return this.message.conversations;
    }

    clear() {
        this.message = new ChatGTPMessage();
    }

    saveConversation() {
        fs.existsSync('conversations') || fs.mkdirSync('conversations');
        fs.writeFile(`conversations/conversation-${this.message.id}.json`,
            JSON.stringify(this.message.conversations), function (err) {
                if (err) throw err;
            });
    }
}
```

The code is constructed to be pragmatic and efficient in handling the state of the conversation, sending and receiving data from Azure OpenAI, and persisting the interactions. Rosie's intelligence, powered by Azure's AI capabilities, shines through this code, as it allows her to interpret, respond, and learn from each interaction, making her a dynamic and evolving AI assistant.

## 🌟 Wrapping Up

Rosie is a testament to the incredible potential of AI assistants. Her integration with Azure OpenAI and ChatGPT is only a small part of her capabilites. As AI continues to evolve, so will Rosie, always pushing the limits of virtual assistance. For simplicity I kept a few awesome features out of this conversation, like her vocal powers for example. More on that in a future blogpost. 

I'd love to hear your thoughts on Rosie's development! Feel free to drop a comment below, and if you're as excited about AI as I am, make sure to [subscribe](https://youtube.com/sorskoot) or [follow](https://twitter.com/sorskoot) for more updates. Together, let's explore the future of AI and the amazing things we can achieve with assistants like Rosie.

Until next time, keep innovating and ...

Happy Coding! 🚀

{{<img-link "/images/2024/02/IntelligentBot.jpeg" "AI Image of an intelligent AI." >}}