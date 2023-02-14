# PokéDex From Scratch
PokéDex from Scratch is een Pokémon Fire Red geïnspireerde web-app die je helpt je Pokédex te vullen. Dit project is gemaakt voor het vak Web App From Scratch van CMD Amsterdam. De web-app kan bekeken worden via [deze link](https://pokedex-from-scratch.vercel.app/). <!-- als ik niet gecopyright striked wordt door nintendo lol -->
## Table of contents
- [Voortgang](#voortgang)
  - [Week 1](#week-1)
- [Features](#features)
- [Installation](#installation)
- [API](#api)
- [License](#license)
- [Bronnen](#bronnen)

## Voortgang
(Placeholder verplaatsen naar aparte subdirectory)
### Week 1
In week 1 ben ik bezig geweest met bedenken van een user story en een bijpassende api. Uiteindelijk ben ik gekomen op de volgende user story: 'Je bent een [Pokémon (Fire Red)](https://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9mon_FireRed_and_LeafGreen_Versions) speler en wilt een tool gebruiken om jou te helpen je <dfn>Pokédex</dfn> te vullen' (Pokédex is een verzameling van alle Pokémon die je hebt gevangen / gezien).

Om deze web-app te realiseren maak ik gebruik van de [PokeApi](https://pokeapi.co/). Deze api bevat alle data over de Pokémon die in de verschillende games voorkomen. De game waar ik me op richt is Pokémon Fire Red / Leaf Green.

## Features

## Installation
1. Clone de repository via de terminal met `git clone git@github.com:Laurens256/web-app-from-scratch-2223.git`
2. Navigeer naar de gedownloade folder met `cd your_folder_name/web-app-from-scratch-2223/pokedex`
3. Gebruik `npm i` om de benodigde dependencies te installeren.
4. Gebruik `npm run dev` om de web-app lokaal te start.
5. Open de web-app in je browser via `http://localhost:3000/`

## API
De PokeApi is een uitgebreide api die (bijna) alle data bevat over de Pokémon die in de verschillende games voorkomen. De api bevat data over de Pokémon zelf, maar ook over bijvoorbeeld de verschillende moves, types, abilities en items. De api is gratis zonder api key te gebruiken. De data is opgedeeld in verschillende endpoints. De endpoints die ik gebruik zijn:
- [Pokémon per generatie](https://pokeapi.co/docs/v2#generations)
- [Specifieke Pokémon](https://pokeapi.co/docs/v2#pokemon)
- [Pokémon soorten](https://pokeapi.co/docs/v2#pokemon-species)
- [Pokémon types](https://pokeapi.co/docs/v2#types)
- [Pokémon abilities](https://pokeapi.co/docs/v2#abilities)
- [Pokémon moves](https://pokeapi.co/docs/v2#moves)
- [Pokémon items](https://pokeapi.co/docs/v2#items)

## License
PokéDex from scratch is gelicenseerd onder de Creative Commons Attribution-NonCommercial-ShareAlike 3.0 International Public License. Meer over deze licentie is te vinden op [Creative Commons](https://creativecommons.org/licenses/by-nc-sa/3.0/).

Folders die niet onder de `pokedex` folder vallen zijn gelicenseerd onder de MIT license. Meer over deze licentie is te vinden op [MIT](https://opensource.org/licenses/MIT).

## Bronnen