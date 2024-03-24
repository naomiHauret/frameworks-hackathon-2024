[`frameworks` 2024 hackathon](https://ethglobal.com/events/frameworks) entry.

**Puzzlemon** is a Pokémon trivia puzzle game packed in a [Farcaster frame](https://docs.farcaster.xyz/learn/what-is-farcaster/frames). The puzzle is a 3x3 grid, with different criteria on each row and column (for instance "Must be a fire type", "Must be a legendary", "Can mega evolve"...), and for each cells the player has to correctly guess a pokémon species that would fit the cell criterias.

The game can be played through a Farcaster frame on a compatible client, or on the main webapp.

## Tech stack

- database: [Supabase](https://supabase.com/) ; we use this database to store the pokémons, puzzles and games.
- frame development stack: [Pinata Frames SDK](https://docs.pinata.cloud/farcaster/fdk) and [frames.js](https://framesjs.org/) debugger
- wallet/identity management: [Privy](https://privy.io/)

## Source of Pokémon data

The pokémon database was built using public CSV files from both the [PokeAPI](https://github.com/PokeAPI/pokeapi/tree/master/data/v2/csv) repository and ["The Complete Pokédex" dataset](https://www.kaggle.com/datasets/cristobalmitchell/pokedex?rvi=1). It covers generations 1, 2, 3, 4, 5, 6, 7 and 8.


---
 
 > This project was bootstrapped using Astro minimal template.

# Astro Starter Kit: Minimal

```sh
npm create astro@latest -- --template minimal
```

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/withastro/astro/tree/latest/examples/minimal)
[![Open with CodeSandbox](https://assets.codesandbox.io/github/button-edit-lime.svg)](https://codesandbox.io/p/sandbox/github/withastro/astro/tree/latest/examples/minimal)
[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/withastro/astro?devcontainer_path=.devcontainer/minimal/devcontainer.json)

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
├── src/
│   └── pages/
│       └── index.astro
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).
