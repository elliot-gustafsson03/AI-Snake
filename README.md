# AI-Snake

This is a simple implementation of the classic game "Snake", which can be controlled either by keyboard or a reinforcement learning-model.

## Installation

Running and developing this program requires the [Bun javascript runtime](https://github.com/oven-sh/bun). After cloning this repository, navigate into the top directory and run:

```bash
$ bun install
```

to install all necesarry packages.

## Running the program

To start a development server, run the following command:

```bash
$ bun run dev
```

then open a web browser and navigate to [localhost on port 5173](http://localhost:5173).

## About the AI

This AI-model uses a Q-table to store information about what it learns. Each row in the Q-table represents a state in the game. The columns represent the possible actions in that state (going left, forward or right) and each action has a weight. We will always pick the action with the greatest weight. Eating an apple (earning a point in the game) will increase the weight for the action that led to this. Similarly, Causing a game over will instead decrease that weight, making it less likely to be picked again.

In addition to the Q-table, an explore-rate is used to make sure the snake explores the game (instead of getting stuck in loops). This explore-rate decreases exponentially with the highscore.
