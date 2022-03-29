---
id: 20220328
draft: false
title: Making money with your WebXR games
date: 2022-03-28T20:00:00+00:00
author: Sorskoot
layout: post
share: true
comments: true
guid: https://www.timmykokke.com/?p=20220328
permalink: /2022/03/making-money-with-webxr/
categories:
  - WebXR  
tags:
  - WebXR
  - Zesty

---

## Intro
Making some money with your WebXR can be really tough. Selling any web game is already hard, but doing that in a VR headset is near impossible. Unless you maybe add your credit card to Facebook or type it into the browser in your headset. Traditional ads like Google Ads are also not going to work. There are only shown in desktop mode and are not going to work in VR. They also look really bad most of the time and have very low payouts. 

Zesty solves this problem in a very modern and unique way using blockchain technology, NFTs, and smart contracts. This sounds really complicated, but you don't have to know any details about all of this to use it in your apps. 

This blog post is not sponsored. I believe in the platform and think it can become a really big thing. With more people joining the platform and more games using the ads, we all benefit. 

## How does it work?
On the Zesty Market developers can create spaces they can auction for ads. Other people can have their ad shown in that space in VR in your app. Think of this as renting out a billboard.

The Zesty Market uses a [Dutch Auction](https://en.wikipedia.org/wiki/Dutch_auction) model where the price declines over time until it reaches 0 at the moment the space expires. You can specify the price, the timeslot, and the moment the auction starts.

The ad spaces are tokenized into NFTs. NFTs have a really bad name from people selling stupid images for millions of dollars, but there's more to it than just that. NFTs are a safe way of storing anything digital, including music, drawings, or ad spaces. 

The goal of Zesty is to provide creators with a method of capturing the value they create on a decentralized platform. They hope to one day be able to exit the community and have the platform owned by the community of creators and advertisers.    

## How to use it in your game?
To use an ad space in your game, you need a few things. First of all, you need a crypto wallet. I use [MetaMask](https://metamask.io/) connected to the [Polygon network](https://polygon-rpc.com). 
{{< img-link "/images/2022/03/MetamaskPolygonNetwork.png" "Metamask Polygon network" >}}
By connecting Zesty to your wallet you are logged in and you can start creating your ad spaces. To create an ad space on the [Zesty Market](https://app.zesty.market) you'll need to enter a few things like an example image, a name, the URL to your game, and a description. I usually create a screenshot from VR with an ad shown in my app by just using an example code and edit something in the same spot afterward. When everything is entered you need to approve and deposit the NFT to the Zesty Smart Contract. At this point, you need to have a few Matic in your wallet. Every interaction with the network will cost a couple of cents in fees, also known as gas. You might have looked at NFTs on the Ethereum network at some point in time. Gas prices on Ethereum are 10s of dollars, sometimes even 100s. On the Polygon network, it's 0.01s of dollars. 
If you like to read a more detailed tutorial on creating an ad space, you should check out the [Zesty documentation on the subject](https://docs.zesty.market/guides/for-creators/create-space).
{{< img-link "/images/2022/03/ZestyMarketCreateSpace.png" "Create Ad space NFT" >}}

Now that you have an ad space, you need to integrate it into your WebXR game. Well, I mention WebXR game, but you can also use the ads in your website, in Unity games, on Crytovoxel, Decentraland, or Muse and even OBS is supported. Integration in WebXR is supported in the most used frameworks, like A-Frame, Babylon.js React Three Fiber, Three.js, and Wonderland Engine (as shown in the image below). 
{{< img-link "/images/2022/03/WonderlandZestyComponent.png" "Zesty component in Wonderland" >}}

You don't have to struggle with figuring out how to get the integration with one of these frameworks to work. Zesty is generating examples on the fly with the spaces you created. In the screenshot below you can see an example of how to integrate it into an A-Frame project. All you have to do is copy-paste a few lines of code to get it to work.
{{< img-link "/images/2022/03/ZestyIntegration.png" "Integration examples from Zesty" >}}

From that point on you can integrate the ad into your VR world. You can place it in a nice visual place below the main menu for example. I prefer to really find a nice spot, like a picture on the wall. This way the ads are not annoying like they are on most web pages that have ads. 
{{< img-link "/images/2022/03/HotDAdFrame.png" "Ad in Sorskoot's House of the Dead" >}}

Whenever an ad is shown or when a user clicks on it there's a notification sent to Zesty. When you have the Beacon turned on anyone can see how the ads are doing. To have people place their ads in your space you have to create an auction time slots. You decide the duration of a timeslot and you decide how long before the slot expires the auction starts. I'm still experimenting a little bit with different durations. But, for my best performing game [Back to Space](https://constructarcade.com/game/back-to-space/), I have time slots of 1 day. I recently started opening the auctions 1 week before the slots expire. You have options to start directly or 3 days to 4 weeks before they expire. Don't be afraid to experiment with different prices. Mine range from 10$ to 25$ a day. As the auction runs the price will drop until you accept the bid. 
{{< img-link "/images/2022/03/ZestyCreateAuction.png" "Zesty create auction" >}}

Now that you have rented out a space and that time has passed you get the amount of money you sold it for. You can find this on your dashboard. You can find the amount that you can claim and the amount that is coming through time slots that are not expired yet. These show in $, but the payout will be in [USDC](https://en.wikipedia.org/wiki/USD_Coin), a digital coin linked to the US Dollar. The amount will go to your wallet, MetaMask in my case. I'm not sure if I'm using the most efficient path, but I convert the USDC to Matic on MetaMask and then go through the [Kraken](kraken.com) exchange to get to euros and into my bank account as 'real' money. Keep in mind that every interaction with your crypto-money will cost a small fee. The route I'm taking only costs a few $, because I stay away from Ethereum. 

{{< img-link "/images/2022/03/ZestyDashboard.png" "Zesty dashboard" >}}

## Wrap

If you have any questions on how to set things up feel free to ask. Just hit me up through the [Zesty Discord](https://discord.gg/4Jc3XhM5mp) and I'm happy to help you get going on the platform.






