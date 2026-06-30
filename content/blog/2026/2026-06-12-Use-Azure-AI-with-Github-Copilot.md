---
id: 20260612
draft: true
title: Use Azure AI With Github Copilot
date: 2026-06-12T01:00:00+00:00
author: Sorskoot
layout: post
share: true
comments: true
guid: https://www.timmykokke.com/?p=20260612
permalink: /2026/06/UseAzureAIwithGithubCopilot/
categories:
  - AI
tags:
  - AI
  - Copilot
  - Azure
images:
  - /images/2026/06/??.png
---
With the recent [pricing changes of GitHub Copilot](https://github.blog/news-insights/company-news/github-copilot-is-moving-to-usage-based-billing/), things you can run out of AI credits real quick. If you have access to Azure through a Visual Studio subscription or in a different way, you might have some Azure credits every month. You can use the BYOK (Bring Your Own Key) functionatility to use models on [Azure AI Foundry](https://ai.azure.com/) instead of the models on GitHub. This way you can keep using Copilot and not run out of credits on GitHub too quickly. In this post I will show you how to set this up.

If you don't have access to Azure credits, you can still connect to other providers in a similar way. You can even use LM Studio to run models locally and connect to that for free. The models on Azure are usually more powerfull and do not require any local resources.

## Setting up Azure AI Foundry

First thing to do is to create a project on Azure AI Foundry. You can do this by going to the [Azure AI Foundry portal](https://ai.azure.com/) and creating a new project. Once you have a project, you need to create a deployment for the model you want to use. You can choose from a variety of models. Some models similar to GitHub Copilot, but others too. Different models have different capabilities and pricing. Though you might have some free credits, it is good to keep an eye on the costs so you won't burn through you credits too quickly. I currently use the `gpt-chat-latest` model (which is basically GPT-5.5), GPT-5.3-codex, GPT-5.4-mini and GPT-5.4-nano. These all have different costs, Nano being the cheapest.

## Connecting Azure AI Foundry to GitHub Copilot

- select gear in model selection of Copilot Chat, next to `Other Models`.
- Click `Add Models`, select `Azure`, and give it a name (I just named it 'Azure');
- You need to give it the API key from Azure. This can be found on the project Home page in the Azure AI Foundry portal. But also on the model details page found through `Build` > `Models` and selecting a model and then go to the `Details` tab.

## Monitoring costs
- On the model details page found through `Build` > `Models` and selecting a model and then go to the `Monitoring` tab.