# Citizen Quartz Multi Alarm III

Make sure to play with the [**live demo**](https://andyjakubowski.github.io/statechart-watch/) of the watch! 💫

A pretty exact replica of the Citizen Quartz Multi Alarm III watch based on figure 31 in David Harel’s 1987 [paper](https://www.sciencedirect.com/science/article/pii/0167642387900359) introducing statecharts.

Built with [Create React App](https://github.com/facebook/create-react-app) and [XState](https://xstate.js.org/docs/). The live demo is deployed with GitHub Pages.

![Overview of the watch](src/assets/readme/intro.gif)
![Figure 31 from Harel’s paper](src/assets/figure_31.png)

## A few things to try in the [live demo](https://andyjakubowski.github.io/statechart-watch/):

The live demo includes an image of the statechart. The arrows labeled `a`, `b`, `c`, and `d` represent the watch buttons, and show you which ones will navigate you to the different features of the watch.

Try playing with the watch yourself, or try out some of the ideas below.

You can press the `a`, `b`, `c`, and `d` buttons you see on the screen, or use the keyboard. You’ll be faster with the keyboard, so I recommend that if you’re device has one.

- Press `d` to toggle between the current time and date.
- Starting with the current time, press `a` 4 times to go to the stopwatch. Then, press `b` to start the stopwatch. With the stopwatch running, press `a` again to loop back to the current time. Note how the stopwatch icon is still visible on the watch display.
- Hold down `b`. The display will light up 💡.
- Hold down `b` and `d` at the same time. The watch should beep 🔊!
- Press _Remove battery_ to transition the watch to the _dead_ state. Then press _Insert battery_ to start over.

Have fun! 👩‍🔬

## But what is it, _exactly_?

Statecharts are a visual way of expressing complex behavior, like a watch or some really complicated piece of UI. XState is a library that lets you implement statecharts with JavaScript. This project uses XState to implement a statechart describing the behavior of a watch. And it uses React to let you see and interact with the watch.

## Why should I care?

Statecharts are the key to implement really complex behavior in a way that’s easy to understand and really hard to break. They let you express what should be possible, and when. It’s easy to understand _and_ precise, making it a great way to express how something should work in your project.

Interactive devices and UIs have a surprising amount of complexity to them. This watch, for example, has a whole bunch of features:

- The watch face lights up when you press and hold the `b` button.
- The watch starts beeping if you press and hold `b` and `d` at the same time.
- There are two alarms that can be enabled or disabled.
- There’s a stopwatch.
- If you start updating the date on the watch and don’t do anything for 2 minutes, the watch should go back to showing the current time.

This is a lot of stuff to keep track of, especially when some of these features depend on _other features_ being on or off. If you’re not careful, you can easily end up with a complicated mess of conditional checks. The more complex the behavior you’re trying to represent, the harder it will get to maintain.

Statecharts are an answer to this problem. They let you express those behaviors visually in a way that’s understandable for humans.

## What do I do with it?

A few ideas:

- Play with the [demo](https://andyjakubowski.github.io/statechart-watch/) to test out the concepts defined in the [statecharts paper](https://www.sciencedirect.com/science/article/pii/0167642387900359).
- Read this [introductory _What is a statechart?_ article](https://statecharts.dev/what-is-a-statechart.html) instead if the paper feels too dense at first!
- Look at the statechart at the bottom of the demo as you play with the watch to figure out “where” in the statechart you can go. For example, hold down `b` and `d` at the same time to make the watch _Beep_.
- Clone this repo, and see how the statechart is implemented with [XState](https://xstate.js.org/docs/).

## Installation

1. Clone the repo
2. Install the project’s dependencies with `npm install`, or another package manager of your choice.

### Troubleshooting

`npm audit` might alert you of vulnerabilities. Some of the audited dependencies are developiment-only build-time dependencies like Create React App’s [`react-scripts`](https://www.npmjs.com/package/react-scripts). Run `npm audit --omit=dev` and continue if you get 0 vulnerabilities. For details, read [Help, npm audit says I have a vulnerability in react-scripts!](https://github.com/facebook/create-react-app/issues/11174)

## Running the project

`npm start` runs the app in the development mode at `https://localhost:3000` by default.

### Troubleshooting

When the server starts, you might see a deprecation warning message from the Webpack dev server. You can safely ignore it. There’s currently an open pull request that will fix it. For details, see [Use of deprecated webpack DevServer onBeforeSetupMiddleware and onAfterSetupMiddleware options](https://github.com/facebook/create-react-app/issues/11860) and [fix(webpackDevServer): fix deprecation warning](https://github.com/facebook/create-react-app/pull/11862).

## Learn more about statecharts and finite state machines

[Statecharts: a visual formalism for complex systems](https://www.sciencedirect.com/science/article/pii/0167642387900359)

Awesome overall intro to statecharts: [https://statecharts.github.io/](https://statecharts.github.io/)

[XState](https://xstate.js.org), a JavaScript framework that implements statecharts

## Learn more about the watch

[Citizen Quartz Multi Alarm III 41-3534](https://whichwatchtoday.blogspot.com/2013/02/citizen-quartz-multi-alarm-iii-41-3534.html)

## Deploying to GitHub Pages

1. Tweak the `homepage` field in `package.json` if you’re going to deploy to GitHub Pages.
2. Run `npm run deploy`.
3. Go to the Pages tab in your GitHub project’s settings, and make sure that the GitHub Pages site is being built from the `gh-pages` branch.

[Read more about deploying Create React App apps to GitHub Pages](https://create-react-app.dev/docs/deployment/#github-pages).
