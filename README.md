# Trial of Valor

This is a **companion app** for a prototype **board game** called Trial of Valor. The game is based on the concept of the [Talisman](https://en.wikipedia.org/wiki/Talisman_(board_game)) game and expands on its ideas. The app helps with **micromanagement**, which is somewhat problematic in board games played IRL. It serves as a **game master** and a virtual **character sheet** with a **quest log**.

You can check out the app [here](https://m-biernat.github.io/trial-of-valor/) or download it as a **single HTML file** from the releases.

## Features

- The single multipurpose companion app for online and offline use;
- **Game Master** mode serves as a NPC controller;
- **Character Manager** mode manages character sheet and quests;
- **Deck Preview** shows all cards in the deck (and you can print them);

*The Game Master should be running on the one 'main' device and the Character Manager should be running on separate devices, e.g., smartphones.*

From developer perspective:
- deploying a static single-page app into GitHub Pages;
- fetching data from Google Sheets;
- building a single HTML file for offline use.

## Tools & Dependencies

- [Node.js](https://nodejs.org/) and [vite](https://www.npmjs.com/package/vite) for development;
- [solid.js](https://www.solidjs.com/) and [bootstrap](https://www.npmjs.com/package/bootstrap) to create the app;
- [gh-pages](https://www.npmjs.com/package/gh-pages) for deployment;
- [node-fetch](https://www.npmjs.com/package/node-fetch) and [csvjson-csv2json](https://www.npmjs.com/package/csvjson-csv2json) for data fetching from Google Docs.

## Development

Use `npm install` to set up the project after cloning repository.

List of useful scripts/commands:
- `npm start` or `npm dev` to run the app in a development mode at `http://localhost:3000`;
- `npm fetch-data` to fetch data from Google Sheets;
- `npm predeploy` to build before deployment;
- `npm deploy` to deploy into GitHub Pages.

## Credits

- **Michał Biernat** @[m-biernat](https://github.com/m-biernat) - app developer and board game co-creator;
- **Anna Hosumbek** @[An-Hos](https://github.com/An-Hos) - board game co-creator.

Some icons used in the app are licensed under [CC0](https://creativecommons.org/publicdomain/zero/1.0/).

## License

All rights reserved ([no license](https://choosealicense.com/no-permission/)):
 - You **can** view (peek into the code and assets) and fork this repository;
 - You **cannot** reproduce, distribute, or create derivative works;
 - You **can** use the app (*"Trial of Valor"*) free of charge via the provided channels.
