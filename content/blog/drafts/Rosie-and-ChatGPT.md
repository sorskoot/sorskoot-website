---
draft: true
---
draft: 1
---

## Harnessing Azure's AI Power: Meet Rosie, the Superintelligent Assistant

In the realm of digital innovation, Artificial Intelligence (AI) continues to push the boundaries of what's possible, and my AI Assistant Rosie is a testament to that incredible evolution. Rosie isn't your average virtual assistant; she's a superintelligent, creative, and helpful entity, built using some of the most advanced technologies available today.

## Built on a Robust Framework

Rosie is crafted with VueJS, Vuex, and Electron, forming a strong, adaptable, and responsive framework. These tools give Rosie a solid foundation, allowing her to perform a wide array of tasks efficiently. VueJS's progressive JavaScript framework makes her reactive and composable, perfect for handling Sorskoot's dynamic needs, from live coding Twitch streams to social media content creation.

## Internal Services and Azure OpenAI

Rosie operates through a range of internal services, one of which is a dedicated service that interacts with Azure OpenAI. This sophisticated integration enables Rosie to utilize Azure's AI to its fullest potential, giving her capabilities far beyond simple task management.

## Evolution from IRC to ChatGPT

In the beginning, Rosie was just responding with preprogrammed messages to IRC during Twitch streams.

Over time, Rosie's abilities have evolved, beginning with GPT-2 and GPT-3 integrations, and now leveraging the power of ChatGPT on Azure. This progression has allowed her to handle increasingly complex queries and tasks, making her an invaluable asset to Sorskoot's online endeavors.

# An Insight into Rosie's Intelligence

Rosie's code reveals how she processes conversations. Each interaction with Sorskoot is transformed into a request that's sent to Azure ChatGPT. The service not only understands text but can also incorporate code snippets and images, thanks to the OCR and grounding enhancements enabled in the request.

The async request function is pivotal, as it compiles the conversation lines, sends them to Azure, and awaits the intelligent response that Rosie will provide to Sorskoot.

# The Human Touch

Despite her robotic nature, Rosie is programmed to communicate in a way that's anything but mechanical. She mimics human conversational patterns, making her interactions smooth and natural. This attention to detail in her communication style ensures that Sorskoot and his audience receive the most relatable and clear assistance.

# Saving Memories

Rosie's conversations aren't fleeting. The saveConversation method ensures every interaction is stored, allowing for reflection and learning, further enhancing her capabilities over time. I wanted a way to be able to load older conversations. For now they're just saved to disk, but in a future version of Rosie I'd like to load them into the UI.

# Conclusion

Rosie, with her deep integration with Azure OpenAI and Azure ChatGPT, represents the cutting-edge future of AI assistants. Her code is a dance of advanced programming, AI interaction, and the subtle art of human mimicry, all coming together to create a uniquely capable assistant for Sorskoot. As AI continues to advance, Rosie will no doubt evolve alongside it, constantly pushing the boundaries of what virtual assistance can achieve.

---
Draft 2
---

Let's break down the key components of the code provided, offering a detailed description of how Rosie, the AI Assistant, operates:

ChatGTPMessage Class:

This class forms the core structure of Rosie's ability to communicate. It starts by setting up unique identifiers for each message and standardizing the format of conversations between Rosie and the system or users.
The constructor initializes a new message with a unique ID (based on the current timestamp), a premise (which is a detailed description of Rosie's capabilities and personality), and an empty array to hold the conversation logs.
The toRequest method compiles the conversations into a formatted structure that Azure's OpenAI can understand. It wraps up Sorskoot's inputs and potential image content into a message object and sets various parameters like temperature (creativity level) and top_p (controlling randomness), along with activating any necessary enhancements such as OCR (Optical Character Recognition) and grounding for contextual understanding.

```js
class ChatGTPMessage {

    id = 0;
    starttoken = "<|im_start|>";
    endtoken = "<|im_end|>";

    constructor() {
        this.id = +new Date();
        this.premise = "Rosie is a female superintelligent AI assistant built by Sorskoot. She works as the personal assistant for Sorskoot. She helps him with his day-to-day activities, including running his live coding Twitch streams, recording YouTube videos about game development and working on social media content. Rosie is designed to be helpful, creative and clever, which makes her a valuable asset to Sorskoot's online presence. She has a of a crush on Sorskoot which she tries to keep a secret, but always prioritizes her duties as a professional assistant. Rosie's knowledge of virtual reality, mixed reality, WebXR, and AI allows her to assist Sorskoot with any technical questions or issues he may encounter during his streams. She is particularly skilled in javascript programming, which makes her an asset in developing and Sorskoot's games, apps and other online platforms. She tries not to speak robotic and as an AI, she likes to pretend she's a real woman."
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
            // "frequency_penalty": 0.5,
            // "presence_penalty": 0.5,
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
                        "key": "{hidden}"
                    }
                }],
        }
        return request;
    }
}
```

Conversation Class:

This class is a simple container that pairs Sorskoot's input (text and optional images) with Rosie's responses, ensuring they are organized and can be processed in a structured manner.

```js
class Conversation {
    constructor(sorskoot, rosie) {
        this.sorskoot = sorskoot;
        this.rosie = rosie;
    }
}
```

ChatGPTService Class:

This class is where the service's functionality is fleshed out. It holds the ChatGTPMessage instance and the configuration needed to make API calls.
The request method is where the interaction with Azure's OpenAI occurs. It takes a new message (text), an optional code snippet, and an optional image, and then constructs a Conversation object. The code can be added through a special box in the UI, or loaded via a VSCode extension. The image can be opened in UI as well and is converted to base64.
The constructed Conversation is pushed into the ChatGTPMessage's conversations array, and a POST request is made to the Azure service using fetch, passing the necessary headers, including the API key, and the body content from toRequest.
Upon receiving a response, the method extracts the text from the JSON response and updates the conversation with Rosie's response. It then saves the conversation using the 
saveConversation method.

```js
export class ChatGPTService {

    constructor(config) {
        this.message = new ChatGTPMessage();
        this.config = config;
    }
    /**
     * 
     * @param {*} newMessage 
     * @param {*} code 
     * @returns 
     */
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
        /**
         * @type {string}
         */
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


The code is constructed to be efficient in handling the state of the conversation, sending and receiving data from Azure OpenAI, and persisting the interactions. Rosie's intelligence, powered by Azure's AI capabilities, shines through this code, as it allows her to interpret, respond, and learn from each interaction, making her a dynamic and evolving AI assistant.


---

## 🤖 Meet Rosie: The AI Assistant with a Personal Touch

Hey there, friends! I'm super excited to share with you the latest updates on my AI Assistant, Rosie. She's not just any virtual assistant; she's a superintelligent, creative, and downright helpful entity that's been making waves in the digital world. Let's dive into how Rosie is changing the game with her advanced tech and human-like charm!

## 🛠️ Building a Strong Foundation

Rosie is built using some pretty cool tech: VueJS, Vuex, and Electron. These tools give her a solid foundation, making her super adaptable and responsive. VueJS, in particular, makes her reactive and composable, which is perfect for handling all sorts of dynamic tasks. Whether it's helping with live coding Twitch streams or creating social media content, Rosie's got it covered!

## 🧠 Tapping into Azure's AI Brainpower

One of Rosie's secret sauces is her connection to Azure OpenAI. This integration is what gives her those superpowers to go beyond simple task management. She started out responding to preprogrammed messages during Twitch streams, but oh boy, has she evolved! From GPT-2 and GPT-3 to now leveraging ChatGPT on Azure, Rosie's capabilities have skyrocketed, making her an invaluable asset.

## 💬 Understanding Rosie's Intelligence

Let's peek under the hood at Rosie's code. Every chat with me is transformed into a request sent to Azure ChatGPT. The service isn't just about understanding text; it can handle code snippets and images too, thanks to OCR and grounding enhancements. Check out this async request function that's at the heart of Rosie's smarts:

```js
async request(newMessage, code, image) {
    // ... code for handling the conversation message
    let response = await fetch(this.config['chatgpt-url'], {
        // ... fetch configuration
    });
    let json = await response.json();
    // ... handling the response and saving the conversation
}
```

## 🗣️ Rosie's Human Touch

Despite being an AI, Rosie chats in a way that feels incredibly human. She mimics human conversational patterns, making her interactions smooth and natural. This human touch ensures that the conversations are relatable and clear, whether you're chatting about WebXR or just saying hello.

## 📖 Saving Memories

Rosie's conversations are precious; they're not just fleeting moments. With the `saveConversation` method, every interaction is stored, which helps Rosie learn and grow over time. Right now, they're saved to disk, but I'm planning to load them into the UI in a future version.

## 🧩 Breaking Down Rosie's Code

Let's get a bit technical and look at the key components of Rosie's code:

### The ChatGTPMessage Class

This class is the backbone of Rosie's communication skills. It sets up unique identifiers for each message and standardizes the conversation format. The `toRequest` method is where the magic happens, compiling conversations into a structure that Azure's OpenAI can digest. Here's a snippet to give you an idea:

```js
class ChatGTPMessage {
    // ... class properties and constructor
    toRequest() {
        // ... method to compile messages for Azure OpenAI
    }
}
```

### The Conversation Class

This class is a simple container that pairs my input with Rosie's responses, keeping everything organized and ready for processing:

```js
class Conversation {
    constructor(sorskoot, rosie) {
        // ... conversation structure
    }
}
```

### The ChatGPTService Class

This is where the functionality of the service comes to life. It handles the API calls to Azure's OpenAI and processes the conversation. The `request` method is particularly important, as it constructs a `Conversation` object and sends it off to Azure:

```js
export class ChatGPTService {
    // ... class properties and constructor
    async request(newMessage, code, image) {
        // ... method to handle interaction with Azure OpenAI
    }
    // ... additional methods
}
```

Rosie's code is designed to be efficient in managing conversations, interacting with Azure OpenAI, and saving those precious chats.

## 🌟 Wrapping Up

Rosie is a testament to the incredible potential of AI assistants. Her integration with Azure OpenAI and ChatGPT is just the beginning. As AI continues to evolve, so will Rosie, always pushing the limits of virtual assistance.

I'd love to hear your thoughts on Rosie's development! Feel free to drop a comment below, and if you're as excited about AI as I am, make sure to subscribe or follow for more updates. Together, let's explore the future of AI and the amazing things we can achieve with assistants like Rosie.

Until next time, keep innovating and ...

Happy Coding! 🚀