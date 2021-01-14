# Dittobase

A Bulbapedia rip off.
Get information on your Pokémon, like stats and evolution charts

## Description

With Dittobase, you can search for Pokémon by name, type, and generation. Learn about their Pokédex entries, their stats at various levels, evolutions, and their movesets with Dittobase!

### Built with:

- React
- React-Router
- Bootstrap/Bootstrap React
- PokeAPI
- PokeAPI sprites

### Wireframes

Home Page
![Home](https://github.com/ryhuz/dittobase/blob/master/wireframes/Home.PNG)

Pokemon/Pokedex
![Home](https://github.com/ryhuz/dittobase/blob/master/wireframes/Pokemon-Pokedex.PNG)

Single Pokemon
![Home](https://github.com/ryhuz/dittobase/blob/master/wireframes/Single-Pokemon.PNG)

Damage Calculator
![Home](https://github.com/ryhuz/dittobase/blob/master/wireframes/Damage-Calculator.PNG)

Stats Calculator
![Home](https://github.com/ryhuz/dittobase/blob/master/wireframes/Stats-Calculator.PNG)


### User Stories

A story of the project user, that explains the use of the project.

Search pokemon by name
Search pokemon by index
Search pokemon by generation
Search pokemon by type
or any combination of the above

View Pokémon entries
View Pokémon stats by level
View Pokémon evolutions
View Pokémon moveset

---

## Planning and Development Process

The 3 main pages (home, search, and pokemon entry) were planned first and how the routing was going to be. Then, the search logic was set up by filtering through the results using the given filters.

The API relevant API calls had to be made at the correct points as PokeAPI segregates their information.

### Problems that arose

  * Debounce
  
    the debounce search was not running the search function after the debounce. Refactoring the code solved the problem

  * Level slider on Pokemon Profile page
  
    I learnt that slider inputs on react also rely on state changes to update itself
    
  * Slow API calls
  
    Due to the number of pokemon, and the photos required, the loading of the page on deployment was very slow. I attempted to solve this by storing the main profile picture locally instead of calling it from the API. However, the limitations of heroku meant that the app's startup was still very slow.
    
    I hope to deploy it on a server which can handle faster API requests, or come up with a solution that reduces the number of API requests for the purpose.

### Unsolved problems

- Move search and item search were left out due to the nature of the way the API stores the data. Will be a separate organisational project
- Evolution triggers are not included for the same reason.

## APIs Used

PokéAPI
PokéAPI Sprites

---

## Acknowledgments

Visual Boy Advanced, for all the times I never had a Game Boy (which is until now)

---

 ## References
