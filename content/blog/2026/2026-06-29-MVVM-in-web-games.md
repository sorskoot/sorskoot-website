---
id: 20260629
draft: true
title: MVVM In Web Games
date: 2026-06-29T01:00:00+00:00
author: Sorskoot
layout: post
share: true
comments: true
guid: https://www.timmykokke.com/?p=20260629
permalink: /2026/06/MVVMinwebgames/
categories:
  - 
tags:
  - 
images:
  - /images/2026/06/??.png
---

# MVVM

I used this pattern a lot back in the days of Silverlight and WPF. It is a great way to separate concerns in a project. I realized it works pretty well for games too! Back then I used C# with the INotifyPropertyChanged interface. In this post I well be using TypeScript and a reactive state system. The principles are the same though. It's all about separating concerns and keeping the code maintainable.

## Building Games with MVVM

When developers hear about MVVM, they often think about business applications, desktop software, or maybe mobile apps. However, MVVM can be just as valuable in game development, especially for projects that are expected to grow beyond a simple prototype.

MVVM helps separate game rules, game flow, and presentation concerns into distinct layers. This makes a game easier to maintain, test, and extend without creating tight coupling between gameplay systems and user interface code.

## What Is MVVM?

MVVM stands for:

- Model
- View
- ViewModel

Each layer has a clear responsibility.

```text
User
  ↓
View
  ↓
ViewModel
  ↓
Services / Domain Models
  ↓
Game State
```

The goal is to keep rendering, presentation logic, and business logic separate.

## The Model

The Model represents game data and domain state.

In a game, examples include:

- Puzzle definitions
- Tile information
- Current puzzle state
- Move counts
- Session progress

The Model should not know:

- How the UI is rendered
- Which buttons exist
- Whether the game uses Wonderland Engine, Unity, Unreal, or a web browser

A good Model focuses entirely on representing the state and behavior of the game domain.

### Does The Model Contain Logic?

This is one of the most misunderstood topics in MVVM.

Many articles claim that Models should not contain logic. In practice, that statement is usually too simplistic and often incorrect for game development.

A more useful guideline is:

- Models should not contain presentation logic.
- Models should not contain UI logic.
- Models should contain domain logic.

For example:

```ts
export class Player {
	public health = 100;
	public score = 0;

	public addScore(points: number): void {
		this.score += points;
	}

	public takeDamage(amount: number): void {
		this.health = Math.max(0, this.health - amount);
	}
}
```

Both `addScore()` and `takeDamage()` contain logic, but they are responsible for managing the player's state. That makes them domain logic and a perfectly reasonable responsibility for the Model.

The confusion often comes from mixing different kinds of logic together.

#### Domain Logic

Domain logic represents the rules and behavior of the game world.

```ts
player.takeDamage(10);
player.addScore(100);
inventory.addItem(sword);
puzzle.isSolved();
```

This logic belongs in Models or dedicated domain services.

#### Presentation Logic

Presentation logic exists purely to help the UI display information.

```ts
public get scoreText(): string {
	return `Score: ${this.player.score}`;
}
```

This belongs in the ViewModel.

The game world does not need a formatted score string. Only the UI does.

#### UI Logic

UI logic controls visual behavior and screen interactions.

```ts
public get canShowContinueButton(): boolean {
	return this.saveGameExists;
}
```

This is also ViewModel responsibility.

### A Useful Rule Of Thumb

Ask yourself:

"Would this code still exist if the user interface disappeared?"

If the answer is yes:

```ts
player.takeDamage(10);
character.levelUp();
puzzle.validate();
```

it is probably domain logic.

If the answer is no:

```ts
showHealthWarning;
scoreText;
isStartButtonEnabled;
```

it is probably presentation logic.

The most maintainable game architectures keep these two categories separate.

## The View

The View is what the player sees and interacts with.

Examples include:

- Main menu screens
- HUD elements
- Puzzle complete dialogs
- Buttons and labels

The View should:

- Render information
- Bind user interactions
- Observe state changes

The View should not:

- Validate puzzle rules
- Manage game progression
- Coordinate multiple systems

If a button click starts containing game rules, the View is becoming too smart.

## The ViewModel

The ViewModel sits between the View and the rest of the application.

Its job is to translate application behavior into a format that is easy for the View to consume.

In a typical TypeScript game, ViewModels might be implemented as hooks, controllers, or presentation models such as:

- `useMainMenuViewModel()`
- `useGameHudViewModel()`
- `useSettingsViewModel()`

The ViewModel:

- Calls services
- Exposes commands
- Provides derived UI state
- Adapts domain information for presentation

The ViewModel should not contain core game rules.

Those belong in domain models and services.

## MVVM in a Game Flow

Consider a player starting a new puzzle.

```text
Player clicks Start
	↓
MainMenuPanel
	↓
useMainMenuViewModel
	↓
GameFlowService
	↓
PuzzleService
	↓
Puzzle Session Created
	↓
Signals Update
	↓
UI Refreshes
```

Notice that the UI never directly manipulates puzzle data.

Instead, it asks the ViewModel to perform an action, and the ViewModel delegates that work to the appropriate service.

## Why Use MVVM in Games?

### 1. Better Separation of Concerns

One of the biggest problems in game projects is that gameplay code slowly leaks into UI code.

Menus start containing game rules.
Buttons begin modifying state directly.
UI components become responsible for progression systems.

MVVM prevents this by giving each layer a clearly defined responsibility.

### 2. Easier Testing

When game logic lives outside UI components, it becomes much easier to test.

For example:

- Puzzle validation can be tested without rendering a screen.
- Session management can be tested without a game engine.
- ViewModels can be tested without loading a scene.

This significantly reduces the cost of maintaining larger projects.

### 3. Engine Independence

A strong architecture keeps domain logic independent from engine-specific code.

In the Nurikabe architecture:

- Wonderland Components act as adapters.
- Services coordinate gameplay.
- Domain models own puzzle state.

As a result, the core puzzle logic could potentially be reused in another engine.

### 4. Cleaner Scaling

Many prototypes start simple.

Then features arrive:

- Save systems
- Tutorials
- Achievements
- Analytics
- Daily challenges
- Multiple puzzle types

Without clear boundaries, every new feature increases complexity.

MVVM helps control that complexity by keeping responsibilities organized.

### 5. Improved Team Collaboration

When responsibilities are clearly defined:

- UI developers can work on Views.
- Gameplay developers can work on Services and Models.
- Technical designers can focus on game rules.

The architecture naturally reduces conflicts between systems.

## MVVM and Reactive State

MVVM becomes especially powerful when combined with reactive state management.

Many modern game architectures use reactive state systems.

Instead of manually refreshing UI, state changes automatically propagate through the system.

```text
Tile State Changes
	↓
Signal Updates
	↓
ViewModel Observes
	↓
View Re-renders
```

This creates predictable and maintainable data flow.

## Common Mistakes

### Putting Business Logic in the View

Bad:

- Button decides whether a puzzle is complete.
- UI directly modifies game state.

Better:

- View calls a ViewModel command.
- Service performs validation.

### Putting UI Logic in Services

Bad:

- Service knows about panels and buttons.

Better:

- Service exposes state.
- ViewModel decides how the UI should present it.

### Creating Massive ViewModels

A ViewModel should adapt state for a specific screen.

If it starts coordinating large portions of the game, responsibilities should move into dedicated services.

## When Should You Use MVVM?

MVVM is a particularly good fit when:

- The game has multiple screens.
- UI complexity is growing.
- You want automated testing.
- Multiple developers are involved.
- Long-term maintainability matters.

For a tiny game jam prototype, MVVM may be more structure than necessary.

For a game intended to evolve over time, the investment often pays for itself quickly.

## Final Thoughts

MVVM is not about adding layers for the sake of architecture. It is about assigning ownership correctly.

- Models own state.
- ViewModels own presentation logic.
- Views own rendering.

MVVM helps keep gameplay rules independent from UI concerns while supporting scalable, event-driven architectures. Combined with services, reactive state, and domain-focused models, it creates a foundation that can grow from a simple prototype into a much larger game without collapsing under its own complexity.

## TypeScript Examples

### Model

The Model owns game state.

```ts
export class PlayerModel {
	public health = 100;
	public score = 0;

	public addScore(points: number): void {
		this.score += points;
	}
}
```

The Model knows nothing about buttons, menus, or rendering.

### Service

Services contain application and gameplay logic.

```ts
export class GameService {
	public constructor(private readonly player: PlayerModel) {}

	public defeatEnemy(): void {
		this.player.addScore(100);
	}
}
```

### ViewModel

The ViewModel adapts gameplay state for the UI.

```ts
export class HudViewModel {
	public constructor(
		private readonly player: PlayerModel,
		private readonly gameService: GameService
	) {}

	public get scoreText(): string {
		return `Score: ${this.player.score}`;
	}

	public onDebugRewardClicked(): void {
		this.gameService.defeatEnemy();
	}
}
```

### View

The View binds UI elements to the ViewModel.

```ts
export function Hud(viewModel: HudViewModel) {
	return {
		scoreLabel: viewModel.scoreText,
		rewardButton: () => viewModel.onDebugRewardClicked()
	};
}
```

Notice the flow:

```text
Player Input
	  ↓
View
	  ↓
ViewModel
	  ↓
Service
	  ↓
Model
	  ↓
UI Refresh
```

Each layer has a single responsibility, making the system easier to reason about, test, and extend.

If your game is expected to grow, MVVM is one of the most practical architectural patterns available for keeping that growth manageable.

