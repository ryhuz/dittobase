# Dittobase

A Bulbapedia rip off.
Get information on your Pokémon, like stats and evolution charts

## Description

With Dittobase, you can search for Pokémon by name, type, and generation. Learn about their Pokédex entries, their stats at various levels, evolutions, and their movesets with Dittobase!

### Technical Used

Built with:
- React
- React-Router
- Bootstrap/Bootstrap React
- PokeAPI
- PokeAPI sprites

### Wireframes

![Home](https://git.generalassemb.ly/ryhuz/dittobase/blob/master/Home.PNG)
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

### Problem-Solving Strategy

I built it component by component, and passing in the props one at a time so as to be clear of where an error arises from if it does.

### Unsolved problems

- Not all the sprites are loaded due to the holes in the API. They can be hard-loaded into the src folder to rectify the problem
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
