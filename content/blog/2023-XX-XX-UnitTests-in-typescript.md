---
id: 20230619
draft: true
title: Unit Testing in TypeScript
date: 2023-06-19T00:00:00+00:00
author: Sorskoot
layout: post
share: true
comments: true
guid: https://www.timmykokke.com/?p=20230619
permalink: /2023/06/TestingTypescript/
categories:
  - TypeScript  
tags:
  - Architecture
  
---
# Unit Testing in TypeScript Games: A Quick Guide 🕹️

Hello Coders! 🎮 As we all know, testing is a crucial part of software development. But when it comes to game development, particularly with TypeScript, it can be a bit daunting to figure out the best way to write those unit tests. In this blog post, I'm going to give you a quick guide on how to get started with unit testing in your TypeScript games. Let's dive in!

## Why Test Your Game? 🤔

Before we get into the nitty-gritty, let's talk about why we need to be testing our games in the first place. Writing tests helps us:

1. Ensure that our code works as expected.
2. Catch bugs before they make it into production.
3. Make our code more maintainable and easier to refactor.

So basically, it's all about writing better code and making our lives easier in the long run!

## Getting Started 🚀

Alright, enough of the pep talk - let's get down to business! I'm going to assume that you're already using TypeScript for your game project, so I won't go into detail about setting that up.

First things first: we need a testing framework. There are many options out there, but for this guide, I'll be using [Jest](https://jestjs.io/) as it's popular and easy to use.

To install Jest, open up your terminal and run the following command:

```bash
npm install --save-dev jest ts-jest @types/jest
```

This will install Jest and some necessary dependencies for working with TypeScript.

Next, create a `jest.config.js` file in your project root directory and add the following configuration:

```javascript
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
};
```

This tells Jest to use `ts-jest` for working with TypeScript files and sets the test environment to Node.js.

Now we're ready to start writing tests!

## Writing Tests ✍️

Let's say we have a simple TypeScript class representing a player in our game:

```typescript
class Player {
  private _score: number;

  constructor() {
    this._score = 0;
  }

  public increaseScore(points: number): void {
    this._score += points;
  }

  public get score(): number {
    return this._score;
  }
}

export default Player;
```

To write tests for this class, create a new file named `Player.test.ts` alongside your `Player.ts` file. This is where we'll write our unit tests.

Start by importing the necessary modules and creating an instance of the `Player` class:

```typescript
import Player from './Player';

let player: Player;

beforeEach(() => {
  player = new Player();
});
```

Here, we're using the `beforeEach` function provided by Jest to create a new instance of `Player` before each test is run.

Now let's write our first test! We'll test that the player's score increases correctly when calling the `increaseScore` method:

```typescript
test('player score increases correctly', () => {
  player.increaseScore(10);
  expect(player.score).toBe(10);
});
```

In this test, we're using Jest's `test` function to define a test case. We call the `increaseScore` method on our `player` instance and then use the `expect` function to check if the player's score has increased correctly.

That's it! You've written your first unit test for your TypeScript game! 🎉

## Running Tests 🏃‍♂️

To run your tests, simply add the following script to your `package.json` file:

```json
{
  "scripts": {
    "test": "jest"
  }
}
```

Now you can run your tests by typing this command in your terminal:

```bash
npm test
```

Jest will automatically find and run all test files with `.test.ts` or `.spec.ts` suffixes.

## Wrapping Up 🌟

Congratulations! You've learned how to set up Jest for testing your TypeScript games and how to write simple unit tests. As you continue developing your game, aim to follow a test-driven development process by writing tests for each feature before implementing it. This will ensure that your code remains stable and bug-free as you iterate on your game design.

Happy Coding! 🚀