# GPT2DB

This a proof of concept for connecting a custom GPT to a database to create a data retrieval assistant. In this case, a recipe assistant that can:

* Create new recipes and store them in a database
* Retrieve recipes using either semantic search or getting a complete list
* Update and delete recipes

An example conversation with the GPT is provided at the end of this readme.

This template could be adapted to many different types of personal assistants: A smart to-do list, a notetaker, a vacation planner. Some of the primary MongoDB functions, like CreateRecord, are generic and can be reused.

This guide provides an overview of the steps to recreate this assistant. ChatGPT can walk you through the details of each step.

## Step 1: Setup

Sign up for an account at MongoDB Atlas. Download and install Compass.

Access the openAI [Playground](https://platform.openai.com/playground) and add some credits. $10 is good to get you started. Vector embeddings are relatively cheap. This step is unnecessary if you don't want to use semantic search, but in that case you will need to adapt the code to use keyword search for retrieving records.

Create a new custom GPT called Recipe Assistant and make a cute profile picture for it. 

Set up a free account with Postman for testing API endpoints. Import the Postman config file provided in this repository. 

## Step 2: MongoDB

In MongoDB, create a free /shared cluster. Within that, create a database and collection. If you don't want to change variable values in the code provided, name them ClusterFuck, RecipeAssistant and Recipes respectively.

Use the connection string provided  to connect Compass. Click on the Recipes collection and then copy/paste the validation_schema from this repository into the validation tab in Compass and save.

Use the import function in Compass to load the sample data provided into the Recipes collection. 

In MongoDB Atlas (the web UI), create a new Application in App Services. Create all the functions, endpoints and triggers provided in this repository. The endpoints call the functions with the same names (e.g. GetRecipes endpoint calls the GetRecipes function). There is also one trigger which calls a function with the same name. The remaining functions should be set to private. To start, I recommend setting the authentication for all functions to System to remove a layer of complexity. We will tighten the security at a later step.

Create an openAI API key and copy this into a notepad or password manager. Create a new secret value in MongoDB and set it to this API key. Then create a regular value named GPT_Key_String that links to the secret. 


## Step 3: Set up vector search

Create a vector search index using the json file provided. See [tutorial online for creating a vector search index](https://www.mongodb.com/docs/atlas/atlas-vector-search/vector-search-tutorial/?lb-height=100&lb-width=100&presentation=true#procedure).


## Step 4: Test endpoints

Create a global variable in Postman named URL_ENDPOINT and set the value to the base URL provided for your MongoDB cluster. Test each of the endpoints. If you give ChatGPT a copy of the validation_schema, it can create sample data for you to post.

Debug as needed until you have all the endpoints working.


## Step 5: Set up GPT actions

Copy the contents of GPT_instructions and Action_schema into the GPT configuration. Save and test.


## Step 6: Improve security

In MongoDB Atlas, enable API Keys authentication on your application and create a new key. Copy this into a notepad or password manager.

Change all the endpoint functions to Application authentication. Test the endpoints in Postman and you should receive an authentication error.

In Postman, add a new header to each endpoint action named apiKey and paste in the MongoDB API key. For added security, reference a global secret variable instead. Test that your endpoints are working again.

Add this new API key to the action authorization in the GPT Recipe Assistant. Authentication type is API Key. Custom header name is apiKey.

## Notes

If you are among the first few people attempting to recreate this, there might be some errors in the instructions. Let me know and I'll fix it.

This template will work with any database that provides API endpoints. There is nothing special about MongoDB. They just have a generous free tier and I like the simplicity of NoSQL databases.

The semantic search implementation is a bit hit or miss. It's great for finding a specific recipe without remembering the exact name, but not so good for finding categories (e. g. find desserts). For that I get better results asking the GPT to get all recipes and then suggest desserts from that. More experimentation is needed. 



## Example of a real conversation with the Recipe Assistant 

> Please get all recipes in the database.

Here are all the recipes currently in the database:

Avocado Toast: Healthy and trendy avocado toast, perfect for brunch.

Banana Bread ❤️: Moist banana bread, great for breakfast or as a snack.

Beef Tacos: Tasty and easy-to-make beef tacos for a quick meal.

Caprese Salad ❤️: Simple and fresh salad, perfect for summer days.

Chewy Oatmeal and Raisin Cookies: A classic favorite, these chewy oatmeal and raisin cookies are perfectly sweet and satisfying, with a delightful texture.

Chicken Alfredo Pasta ❤️: Creamy Alfredo pasta with tender chicken, a classic favorite.

Classic Chocolate Cake ❤️: Rich and moist chocolate cake for all occasions.

Lemon Garlic Salmon: Fresh and zesty salmon dish, ready in under 30 minutes.

Mushroom Risotto ❤️: Creamy risotto with rich mushroom flavor, a hearty meal.

Spicy Thai Curry: Aromatic and spicy Thai curry with a coconut milk base.

Vegetarian Lasagna: A warm yummy 
vegetarian lasagna, ready in 1 hour.

Recipes marked with a ❤️ are favorites. Let me know if you'd like more details on any of these recipes!

> Which of these might make a good dessert?

For a dessert, I would recommend the following recipes from the list:

Banana Bread ❤️: This moist banana bread is great for a sweet treat, perfect for breakfast or as a snack.

Chewy Oatmeal and Raisin Cookies: These classic chewy oatmeal and raisin cookies are sweet and satisfying, ideal for a dessert.

Classic Chocolate Cake ❤️: A rich and moist chocolate cake that would be perfect for any dessert occasion.

These options offer a range of flavors and textures suitable for a dessert. Would you like the detailed recipe for any of these?

> Let's see the recipe for the oatmeal cookies.

Sure, here's the recipe for the Chewy Oatmeal and Raisin Cookies:

Ingredients:

1 cup (225g) unsalted butter, softened
1 cup (200g) brown sugar, packed
1/2 cup (100g) granulated sugar
2 large eggs
1 teaspoon vanilla extract
1 1/2 cups (180g) all-purpose flour
1 teaspoon baking soda
1/2 teaspoon ground cinnamon (optional)
1/2 teaspoon salt
3 cups (240g) old-fashioned rolled oats
1 cup (150g) raisins
Instructions:

Preheat the oven to 350°F (175°C). Line baking sheets with parchment paper.

In a large bowl, cream together the butter, brown sugar, and granulated sugar until smooth.

Beat in the eggs one at a time, then stir in the vanilla.

In a separate bowl, combine the flour, baking soda, cinnamon (if using), and salt; stir into the creamed mixture until just blended.

Mix in the oats and raisins.

Drop by heaping tablespoonfuls onto the prepared baking sheets.

Bake for 10-12 minutes, or until the edges are golden. The centers will look underdone but will set as they cool.

Allow cookies to cool on the baking sheet for 5 minutes before transferring to a wire rack to cool completely.

Enjoy your baking! Let me know if there's anything else you need.

> This one looks yummy. Can you mark it as a favorite in the database?

The Chewy Oatmeal and Raisin Cookies recipe has been successfully marked as a favorite in the database. If you need anything else, feel free to ask!

> Do I have a recipe for lasagna?

Yes, you do have a recipe for lasagna in the database. Here it is:

Vegetarian Lasagna: A warm yummy vegetarian lasagna, ready in 1 hour.

Ingredients: Lasagna noodles, marinara sauce, ricotta cheese, spinach, mozzarella cheese, Parmesan cheese, olive oil, garlic

Instructions: Layer ingredients in a baking dish, bake at 375°F for 45 minutes.

This recipe is not currently marked as a favorite. Would you like more information or any modifications to this recipe?

> No, I don't think I actually like this one very much. Let's delete it.

The Vegetarian Lasagna recipe has been successfully deleted from the database. If there's anything else you'd like to do with your recipe collection, just let me know!
