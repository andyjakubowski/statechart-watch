# Citizen Quartz Multi Alarm III

Check out the live demo at https://andyjakubowski.github.io/statechart-watch/

A pretty exact replica of the Citizen Quartz Multi Alarm III watch based on figure 31 in David Harel’s 1987 [paper](https://www.sciencedirect.com/science/article/pii/0167642387900359) introducing statecharts.

Built with [Create React App](https://github.com/facebook/create-react-app) and [XState](https://xstate.js.org/docs/).

![Overview of the watch](src/assets/readme/intro.gif)
![Figure 31 from Harel’s paper](src/assets/figure_31.png)

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
