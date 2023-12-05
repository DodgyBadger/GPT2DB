# GPT2DB

This a proof of concept for connecting a custom GPT to a database to create a personal, data retrieval assistant. In this case, a recipe assistant that can help you:

* Create new recipes and store them in a database
* Retrieve recipes using semantic search
* List all recipes in the database
* Update and delete recipes

This guide provides an overview of the steps to recreate this assistant. I'll leave detailed instructions to Google and ChatGPT. 

**Step 1: Setup**

Sign up for an account at MongoDB Atlas. Download and install Compass.

Access the openAI [Playground](https://platform.openai.com/playground) and add some credits. $10 is good to get you started. Vector embeddings are relatively cheap.

Create a new custom GPT called Recipe Assistant and make a cute profile picture for it. 

Set up a free account with Postman for testing API endpoints. Import the Postman config file provided in this repository. 

**Step 2: MongoDB**

In MongoDB, create a free /shared cluster. Within that, create a database and collection. If you don't want to change variable values in the code provided, then name them ClusterFuck, RecipeAssistant and Recipes respectively.

Use the connection string provided  to connect Compass. Click on the Recipes collection and then copy/paste the validation_schema from this repository into the validation tab in Compass and save.

Use the import function in Compass to load the sample data provided into the Recipes collection. 

In MongoDB Atlas (the web UI), create a new Application. Create all the functions, endpoints and triggers provided in this repository. To start, I recommend setting the authentication for each function to System to remove a layer of complexity. We will tighten the security at a later step.

Create an openAI API key and copy this into a notepad or password manager. Create a new secret value in MongoDB and set it to this API key. Then create a regular value named GPTKey that links to the secret. 


**Step 3: Set up vector search**




**Step 4: Test endpoints**

Create a global variable in Postman named BASE_URL and set the value to the URL provided for your MongoDB cluster. Test each of the endpoints. If you give ChatGPT a copy of the validation_schema, it can create sample data for you to post in the body of the requests that send a payload.

Debug as needed until you have all the endpoints working.


**Step 5: Set up GPT actions**

Copy the GPT instructions and action schema into the GPT configuration. Save and test.


**Step 6: Improve security**

In MongoDB Atlas, enable API Key authentication on your application and create a new key. Copy this into a notepad or password manager. Change all the endpoint facing functions to Application authentication. Test the endpoints in Postman and you should receive an authentication error.

Add the API key as a header value 