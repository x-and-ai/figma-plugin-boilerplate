# Figma Plugin Boilerplate

An opinionated Figma plugin boilerplate built with React, TypeScript, ESLint, Prettier, Babel, Webpack, and Jest.

> This is still a work in progress. Currently, we have basic ESLint, Prettier, Babel, and Webpack setup. Will add in Jest soon ASAP.

## Usage

1. Clone this repo

   ```sh
   git clone git@github.com:x-and-ai/figma-plugin-boilerplate.git
   ```

2. Install dependencies

   ```sh
   yarn
   ```

3. Start type checking

   ```sh
    yarn type-check:watch
   ```

4. Start developing plugin

   ```sh
    yarn start
   ```

   Open Figma, create a new plugin by importing the `manifest.json`, then have fun hacking!

5. Build a production plugin

   ```sh
    yarn build
   ```

   Run the plugin in Figma!

## Minimum Browser Requirements

This plugin supports the same browsers as [Figma Minimum Browser Requirements](https://help.figma.com/article/10-supported-platforms-and-browsers#browser)

> **The minimum browser requirements are:**
>
> - Chrome 49+
> - Firefox 51+
> - Safari 10.1+ (Apple - macOS)
> - Edge 14+ (Windows)

## Contribution

We ❤️ PRs! Please send one if you would love to make this boilerplate better.
