---
id: 20241125
draft: true
title: React Component Architecture
date: 2024-11-25T01:00:00+00:00
author: Sorskoot
layout: post
share: true
comments: true
guid: https://www.timmykokke.com/?p=20241125
permalink: /2024/11/ReactComponentArchitecture/
categories:
  - 
tags:
  - 
images:
  - /images/2024/11/??.png
---

Stuff From the internet:

- Custom Hooks => <https://www.geeksforgeeks.org/react-architecture-pattern-and-best-practices/#4-create-custom-hooks>

- Separate Logic and Design
    It is good practice to divide the components into different directories to have different types of components in different directories. You can create two separate folders one is for Designs which contains all the designs needed in your project and another is for Logics. This will help you better understand and maintain your code easily.
    For example, you can create two folders one named Logic, and another named Design. Logic will contain your components, hooks, functions, etc. You can use them anywhere. The design folder contains your stylesheets, headers, footers, sidebars, etc. which gives a nice look to your website.

- Avoiding creating a single Context for everything
    Creating a single Context for your react application can lead to performance issues like unwanted re-rendering. It is not advisable to use this. You can do the following things to better the project.
  - Identify Related Data.
  - Create Multiple Contexts.
  - Use Context Providers Strategically
  - Split Contexts by Concerns
  - Avoid Over-Nesting Contexts.
  - Use Context Composition.
  - Use React.memo and useCallback.
