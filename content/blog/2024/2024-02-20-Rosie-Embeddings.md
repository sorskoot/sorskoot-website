---
id: 20240221
draft: false
title: Adding Knowledge to Rosie
date: 2024-02-21T00:00:00+00:00
author: Sorskoot
layout: post
share: true
comments: true
guid: https://www.timmykokke.com/?p=20240221
permalink: /2024/02/AddingKnowledgetoRosie/
categories:
  - AI
tags:
  - Rosie
  - Semantic Kernel
  - Azure
---

Hello Coders! 👾

In the ongoing series about my AI Assistant Rosie, I'd like to shed some light on how I gave her access to accurate and up-to-date information about topics I often use.

Equipped with Azure AI Search and Azure OpenAI Services, I gave Rosie access to the latest information on WebXR (mainly Wonderland Engine), parts of Azure, Semantic Kernel, and Web Development. To provide me with not just answers, but the right answers, exactly when needed. By embedding data and adding it to Azure to be semantically searched in Azure AI Search (formally Azure Cognitive Search) she has less chance of 'hallucinating'. 

## Memory in Semantic Kernel

In the world of AI, memories are what keep things relevant by 'remembering' certain data and context. In Semantic Kernel, there are three primary ways to access and utilize memory: conventional key-value pairs, conventional local-storage, and semantic memory search (*embeddings*). When incorporating these memory types into your Semantic Kernel project, you would define your key-value pairs for quick data references, use local-storage files for larger, persistent data, and generate and store embeddings for complex texts requiring semantic search capabilities. 

In Rosie's case, I wanted to give her permanent knowledge about specific information, thus using the embedding features. I wanted to use information that is open-source and freely available on the internet. But instead of _binging_ it every time I want to know something, I've created embedding from the texts and stored the information in Azure for Rosie to semantically retrieve.

Here's how I've set things up.

## Setting up Azure AI Search

To be fair, at first, I started out using an in-memory database when creating embeddings. It's not hard to set up and works similarly to other ways of storing memory in SK. This has a very large downside though: The data is volatile. This means that every time the project is restarted the data is gone and needs to be embedded again. So I replaced it. Well, I still have the code commented since it's just 1 line. Now if I need to test something I uncomment the line and comment the line specifying Azure AI Search.

To get started with Azure AI Search, I followed these general steps:

In the [Azure Portal](https://portal.azure.com) I created a new resource by searching for `AI Search`. I filled in the details such as subscription, resource group, resource name, region, and pricing tier and clicked `Review + create`.

{{<img-link "/images/2024/02/AzureAISearch-Item.png" "The Azure AI Search Item in the list" >}}

Since I wanted to do everything else from code, I didn't set up any indexers or anything else. I did need some properties from it, I show you in a second which ones.

## Using Azure AI Search in Semantic Kernel

To add and use data from Azure AI Search, I created a text memory instance using the `MemoryBuilder` class from Semantic Kernel. 

```cs
  ISemanticTextMemory memory = new MemoryBuilder()
      .WithLoggerFactory(kernel.LoggerFactory)
      //.WithMemoryStore(new VolatileMemoryStore())
      .WithMemoryStore(new AzureAISearchMemoryStore(aiSearchEndpoint, aiSearchKey))
      .WithAzureOpenAITextEmbeddingGeneration("text-embedding-ada-002", endPoint, apiKey)
      .Build();
```

For the `Endpoint` and `APIKey` for creating embeddings, I use the same key and endpoint that I use for GPT in Semantic Kernel. It's the one from [Azure OpenAI](/blog/2024/2024-02-17-rosie-and-chatgpt/). In my Azure OpenAI environment, I have the `text-embedding-ada-002` model deployed that I use as a model for vectorizing my data.

The properties for Azure AI Search can be found in the Azure Portal, where I created the AI Search earlier. The `aiSearchEndpoint` is the `URL` from the portal:

{{<img-link "/images/2024/02/AzureAISearch.png" "Location of the AI Search endpoint" >}}

For the `aiSearchKey` I grabbed the admin key from the keys page in the portal:

{{<img-link "/images/2024/02/AzureAISearch2.png" "Location of the admin key" >}}

I left the line for the volatile memory in the snippet above. Since it is really useful to test things before actually sending things to Azure. (Or in case you want to try out things and haven't set up the Azure stuff) 

## Create Embedding

To create the embeddings you need data. I downloaded a couple of projects from GitHub that contained MarkDown files with documentation of certain topics. Normally these MarkDown files are converted to websites with documentation. But by using the original MarkDown I didn't have to work around all the styling inside a website and I can just use the data directly.

I added a fairly simple method inside the Azure Functions project that scans for all .md files recursively from a folder and stores the files in a list. 

This is the method reads the markdown files, splits their content into paragraphs, and then saves each paragraph into the memory. The great thing is that this also takes care of the embedding automatically. 

```cs
  public async Task AddMdToMemory(string folderPath, ISemanticTextMemory memory, string collectionName)
  {
      List<string> markdownFiles = GetAllMarkdownFiles(folderPath);

      int total = markdownFiles.Count;
      int counter = 0;
      foreach (var file in markdownFiles)
      {
          counter++;
          var id = Guid.NewGuid();
          Console.WriteLine($"Found markdown file ({counter}/{total}: {file}");

          string content = File.ReadAllText(file);

          var paragraphs =
              TextChunker.SplitPlainTextParagraphs(
                  TextChunker.SplitPlainTextLines(
                      content,
                      128),
                  1024);

          for (int i = 0; i < paragraphs.Count; i++)
          {
              await memory.SaveInformationAsync(collectionName, paragraphs[i], $"id{id}--paragraph{i}", file, "markdown");
          }

      }
  }

```

The method takes three parameters:

`folderPath`: The path to the folder containing markdown files that are processed.
`memory`: The instance of `ISemanticTextMemory` I created earlier.
`collectionName`: A string that denotes the name of the collection within the memory where the information will be saved. I use this later to focus on the information itself.

The content is split into paragraphs using the `TextChunker.SplitPlainTextParagraphs` method, which itself takes the output from `TextChunker.SplitPlainTextLines`. These methods came with SK and are responsible for splitting the content by lines and paragraphs with character limits of 128 and 1024 respectively. This makes sure they don't exceed the maximum number of tokens of the GPT model used to create the embeddings. 

Finally, I loop over each paragraph, and the `memory.SaveInformationAsync` method is called. This method automatically vectorizes the data and saves the paragraph of text into the semantic memory, Azure AI Search (or volatile).

One thing to note about this procedure is that I run it locally on my machine. The Azure functions with Semantic Kernel and everything else are running in the cloud when I use them, but creating the embeddings from my local machine is just a bit more convenient.

## Using the embedded data

Now all that there's left is to actually use the embeddings. To get some data from AI Search, you can just ask it a question. The question will be embedded. So you'll need to have the same model for searching as you had for embedding the data. It is then sent to wherever you are searching and a couple of matches are returned.

In code, this is WAY simpler than the description above. 

```cs
memory.SearchAsync(collection, question, limit: 3);
```

Now you basically get a couple of strings with matches from the database. You can insert these into a prompt as facts to use and send that to GPT4 to get a nice answer to your question. These are the ways I use the data from memory at the moment:

### Just asking questions

I have an Azure Function set up that takes 3 parameters: 
- The collection I want to use, to focus the question and answers a bit. 
- The question to ask about the data. And this doesn't have to be a really specific question. `Can you give me some information on how to get started in Semantic Kernel?` is a valid question. 
- Optionally, I can specify the system message to use for the AI. This way I have a bit of control over _how_ I want the data. Like, `You are a copywriter` gives a different type of result than `You are a developer`.

It's like having a personalized search engine on hand :) 

### A plugin for the planner

The truly amazing thing happens when the memory search is put into a plugin and combined with the planner functionality of Semantic Kernel. The planner figures out what to do and what data it needs by itself. So when asked to `write a blogpost about the planner feature in Semantic Kernel` it creates a plan and executes it. And when it executes it uses the plugins provided. Complete with various searches in memory, creating an outline and whatever plugins and skills I have provided to the planner. 

At the time of writing, I don't have the planner fully up and running and I'm mainly experimenting with it. I'm not completely happy with the results. But as soon as I'm using that, I'll post another blog. I have MANY ideas for planners. 

## Things I need to improve

Although this whole system is very useful, there are a few things I'd like to improve.

Right now the markdown files are just used as is. They are read from disk and chunked. This means any _Front Matter_ or other additional unrelated stuff is still in there. In the future, I'd like to update the code that creates the embedding to make use of any meta-data to improve the context to help the search give the best possible results. 

Another thing I'm still trying to figure out is what the best way to embed code would be. As an AI-driven developer, I'd love to have my entire history of code available through my assistant. The challenge here is how to keep the overall context of a codebase. Maybe at some point, we can embed an entire codebase in a single chunk. Who knows.

Last thing to note is that Microsoft is working on [Kernel Memory](https://microsoft.github.io/kernel-memory/). A multi-modal AI service for all things related to Memory. I am following this project and might start implementing this in the future as well. 

And that's a wrap for today's update! I hope you're as excited about Rosie's new capabilities as I am. If you've got any thoughts or questions. Let me know down below. As always, make sure to [follow me](https://twitter.com/sorskoot) and subscribe to my [YouTube Channel](https://youtube.com/sorskoot) for updates on that side.

Happy Coding! 🚀