<h1 align="center">:fork_and_knife:Tasty Recipes</h1>

## :memo: Description

In this Project, a Recipes app was developed, using tools from the React ecosystem: Hooks and Context API.

## :books: Functionalities
### <b>Login</b>
* Email and password validations
* Using react-toastify library for notification popups in case of incorrectly filled input.

### <b>Access to recipes</b>
* Access to recipes in two categories: Drinks and Meals
 * Possibility of listing by All and by subcategories through buttons in the menu.
 * Possibility to list recipes by Name, first letter or ingredient through the search button available in the header.

### <b>Recipe details</b>
* Clicking on a recipe card will redirect you to the recipe details page
* You can see the list of ingredients and instructions on how to prepare
* It is possible to share the recipe through the buttom share.
* It is possible to favorite the recipe through the favorite button.
* It is possible to start the recipe through the Continue Recipe button.

### <b>Start recipe</b>
* When clicking on the continue Recipe button of any recipe, you are redirected to the recipe in progress page
* It is possible to mark the list of ingredients as completed through a checkbox.
* It is possible to finalize the recipe through the finalize button.

### <b>Done recipes</b>
* When you click on the finish button, you are redirected to the finished recipes page
* It is possible to see the finished recipes divided into categories: all, drinks and meals
* It is possible to see details of completion date of each recipe.

### <b>Profile</b>
* It is possible to see the profile through the button located in the header.
* It is possible to see email logged in.
* It is possible to access links to finished recipes, favorite recipes and logout pages.

### <b>Favorites recipes</b>
* You can see the list of all favorite recipes in the application.
* To save this information, localStorage was used.

### <details><summary><b> APIs :gear:</b></summary><br/>

* <details><summary><b> TheMealDB API</b></summary>

  [TheMealDB](https://www.themealdb.com/) is an open, community-maintained database of recipes and ingredients from around the world.

  The end-points are quite rich, you can [see them here](https://www.themealdb.com/api.php)
      
  The response model for a `meal` is as follows:
  * <details><summary><b>Response model for a meal</b></summary>

        ```json
          {
            "meals":[
                {
                  "idMeal":"52882",
                  "strMeal":"Three Fish Pie",
                  "strDrinkAlternate":null,
                  "strCategory":"Seafood",
                  "strArea":"British",
                  "strInstructions":"Preheat the oven to 200C\/400F\/Gas 6 (180C fan).\r\nPut the potatoes into a saucepan of cold salted water. Bring up to the boil and simmer until completely tender. Drain well and then mash with the butter and milk. Add pepper and taste to check the seasoning. Add salt and more pepper if necessary.\r\nFor the fish filling, melt the butter in a saucepan, add the leeks and stir over the heat. Cover with a lid and simmer gently for 10 minutes, or until soft. Measure the flour into a small bowl. Add the wine and whisk together until smooth.\r\nAdd the milk to the leeks, bring to the boil and then add the wine mixture. Stir briskly until thickened. Season and add the parsley and fish. Stir over the heat for two minutes, then spoon into an ovenproof casserole. Scatter over the eggs. Allow to cool until firm.\r\nSpoon the mashed potatoes over the fish mixture and mark with a fork. Sprinkle with cheese.\r\nBake for 30-40 minutes, or until lightly golden-brown on top and bubbling around the edges.",
                  "strMealThumb":"https:\/\/www.themealdb.com\/images\/media\/meals\/spswqs1511558697.jpg",
                  "strTags":"Fish,Seafood,Dairy,Pie",
                  "strYoutube":"https:\/\/www.youtube.com\/watch?v=Ds1Jb8H5Sg8",
                  "strIngredient1":"Potatoes",
                  "strIngredient2":"Butter",
                  "strIngredient3":"Milk",
                  "strIngredient4":"Gruy\u00e8re",
                  "strIngredient5":"Butter",
                  "strIngredient6":"Leek",
                  "strIngredient7":"Plain Flour",
                  "strIngredient8":"White Wine",
                  "strIngredient9":"Milk",
                  "strIngredient10":"Parsley",
                  "strIngredient11":"Salmon",
                  "strIngredient12":"Haddock",
                  "strIngredient13":"Smoked Haddock",
                  "strIngredient14":"Eggs",
                  "strIngredient15":"",
                  "strIngredient16":"",
                  "strIngredient17":"",
                  "strIngredient18":"",
                  "strIngredient19":"",
                  "strIngredient20":"",
                  "strMeasure1":"1kg",
                  "strMeasure2":"Knob",
                  "strMeasure3":"Dash",
                  "strMeasure4":"50g",
                  "strMeasure5":"75g",
                  "strMeasure6":"2 sliced",
                  "strMeasure7":"75g",
                  "strMeasure8":"150ml",
                  "strMeasure9":"568ml",
                  "strMeasure10":"2 tbs chopped",
                  "strMeasure11":"250g",
                  "strMeasure12":"250g",
                  "strMeasure13":"250g",
                  "strMeasure14":"6",
                  "strMeasure15":"",
                  "strMeasure16":"",
                  "strMeasure17":"",
                  "strMeasure18":"",
                  "strMeasure19":"",
                  "strMeasure20":"",
                  "strSource":"https:\/\/www.bbc.co.uk\/food\/recipes\/three_fish_pie_58875",
                  "dateModified":null
                }
            ]
          }
        ```
      </details>
    
           The ingredients follow a logical order where their name (<code>strIngredient1</code>) and quantity (<code>strMeasure1</code>) have the same       number at the end (1 in this case).

      It is possible to list all `categories`, `nationalities` (from the API as "areas") and `ingredients`:
      ```
      categories: https://www.themealdb.com/api/json/v1/1/list.php?c=list
      nationalities: https://www.themealdb.com/api/json/v1/1/list.php?a=list
      Ingredients: https://www.themealdb.com/api/json/v1/1/list.php?i=list
      ```

      Ingredient photos come from a standardized end-point with the following logic:

      ```
      https://www.themealdb.com/images/ingredients/{ingredient-name}-Small.png
      // example with "Lime"
      https://www.themealdb.com/images/ingredients/Lime-Small.png
      ```
</details>

* <details><summary><b> The CockTailDB API</b></summary>
      Very similar (even maintained by the same entity) to TheMealDB API, but focused on drinks.

      The end-points are also quite rich, you can [see them here](https://www.thecocktaildb.com/api.php)

      The answers follow the same structure, with some particularities related to drinks (how to be alcoholic or not, for example)
      
      The ingredients follow a logical order where their name (<code>strIngredient1</code>) and quantity (<code>strMeasure1</code>) have the same      number at the end (1 in this case).

   * <details><summary><b> Response model for a drink</b></summary>

        ```json
          {
            "drinks":[
                {
                  "idDrink":"17256",
                  "strDrink":"Martinez 2",
                  "strDrinkAlternate":null,
                  "strDrinkES":null,
                  "strDrinkDE":null,
                  "strDrinkFR":null,
                  "strDrinkZH-HANS":null,
                  "strDrinkZH-HANT":null,
                  "strTags":null,
                  "strVideo":null,
                  "strCategory":"Cocktail",
                  "strIBA":null,
                  "strAlcoholic":"Alcoholic",
                  "strGlass":"Cocktail glass",
                  "strInstructions":"Add all ingredients to a mixing glass and fill with ice.\r\n\r\nStir until chilled, and strain into a chilled coupe glass.",
                  "strInstructionsES":null,
                  "strInstructionsDE":"Alle Zutaten in ein Mischglas geben und mit Eis f\u00fcllen. Bis zum Abk\u00fchlen umr\u00fchren und in ein gek\u00fchltes Coup\u00e9glas abseihen.",
                  "strInstructionsFR":null,
                  "strInstructionsZH-HANS":null,
                  "strInstructionsZH-HANT":null,
                  "strDrinkThumb":"https:\/\/www.thecocktaildb.com\/images\/media\/drink\/fs6kiq1513708455.jpg",
                  "strIngredient1":"Gin",
                  "strIngredient2":"Sweet Vermouth",
                  "strIngredient3":"Maraschino Liqueur",
                  "strIngredient4":"Angostura Bitters",
                  "strIngredient5":null,
                  "strIngredient6":null,
                  "strIngredient7":null,
                  "strIngredient8":null,
                  "strIngredient9":null,
                  "strIngredient10":null,
                  "strIngredient11":null,
                  "strIngredient12":null,
                  "strIngredient13":null,
                  "strIngredient14":null,
                  "strIngredient15":null,
                  "strMeasure1":"1 1\/2 oz",
                  "strMeasure2":"1 1\/2 oz",
                  "strMeasure3":"1 tsp",
                  "strMeasure4":"2 dashes",
                  "strMeasure5":null,
                  "strMeasure6":null,
                  "strMeasure7":null,
                  "strMeasure8":null,
                  "strMeasure9":null,
                  "strMeasure10":null,
                  "strMeasure11":null,
                  "strMeasure12":null,
                  "strMeasure13":null,
                  "strMeasure14":null,
                  "strMeasure15":null,
                  "strCreativeCommonsConfirmed":"No",
                  "dateModified":"2017-12-19 18:34:15"
                }
            ]
          }
        ```
   </details>
        
  </details>
 </details>
 
## :wrench: Technologies
  * _Redux_ to manage state
  * biblioteca _React-Redux_
  * Context API do _React_ to manage state
  * _React Hook useState_
  * _React Hook useContext_
  * _React Hook useEffect_
  - Create custom Hooks

## :rocket: Running Project
To run the repository it is necessary to clone it, give the following command to start the project:
```
npm install
```
To start the project:
```
npm start
```

## :soon: Future implementation
* In the future, an API will be developed to manage the application.

## :handshake: Collaborators
<table>
  <tr>
    <td align="center">
      <a href="https://github.com/jhmorais">
        <img src="https://avatars.githubusercontent.com/u/769141?v=4" width="100px;" alt="Foto de Tati Alves no GitHub"/><br>
        <sub>
          <b>João Morais</b>
        </sub>
      </a>
    </td>
  </tr>
</table>

## :dart: Project status
* Refactoring the save method to localStorade from the favorite recipes page and styling it with css.
  
 
 
