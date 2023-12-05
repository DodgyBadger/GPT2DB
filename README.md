# GPT2DB

This a proof of concept for connecting a custom GPT to a database to create a personal, data retrieval assistant. In this case, a recipe assistant that can help you:

* Create new recipes and store them in a database
* Retrieve recipes using semantic search
* List all recipes in the database
* Update and delete recipes

This guide provides an overview of the steps to recreate this assistant. I'll leave detailed instructions to Google and ChatGPT. 

## Step 1: Setup

Sign up for an account at MongoDB Atlas. Download and install Compass.

Access the openAI [Playground](https://platform.openai.com/playground) and add some credits. $10 is good to get you started. Vector embeddings are relatively cheap.

Create a new custom GPT called Recipe Assistant and make a cute profile picture for it. 

Set up a free account with Postman for testing API endpoints. Import the Postman config file provided in this repository. 

## Step 2: MongoDB

In MongoDB, create a free /shared cluster. Within that, create a database and collection. If you don't want to change variable values in the code provided, then name them ClusterFuck, RecipeAssistant and Recipes respectively.

Use the connection string provided  to connect Compass. Click on the Recipes collection and then copy/paste the validation_schema from this repository into the validation tab in Compass and save.

Use the import function in Compass to load the sample data provided into the Recipes collection. 

In MongoDB Atlas (the web UI), create a new Application in App Services. Create all the functions, endpoints and triggers provided in this repository. To start, I recommend setting the authentication for each function to System to remove a layer of complexity. We will tighten the security at a later step.

Create an openAI API key and copy this into a notepad or password manager. Create a new secret value in MongoDB and set it to this API key. Then create a regular value named GPT_Key that links to the secret. 


## Step 3: Set up vector search
... 



## Step 4: Test endpoints

Create a global variable in Postman named URL_ENDPOINT and set the value to the URL provided for your MongoDB cluster. Test each of the endpoints. If you give ChatGPT a copy of the validation_schema, it can create sample data for you to post in the body of the requests that send a payload.

Debug as needed until you have all the endpoints working.


## Step 5: Set up GPT actions

Copy the contents of GPT_instructions and Action_schema into the GPT configuration. Save and test.


## Step 6: Improve security

In MongoDB Atlas, enable API Keys authentication on your application and create a new key. Copy this into a notepad or password manager.

Change all the endpoint facing functions to Application authentication. Test the endpoints in Postman and you should receive an authentication error.

In Postman, add a new header to each endpoint action named apiKey and paste in the MongoDB API key. For added security, reference a global secret variable instead. Test that your endpoints are working again.

Add this new API key to the action authorization in the GPT Recipe Assistant. Authentica type is API Key. Custom header name is apiKey.

## Notes

This template could be adapted to many different types of personal assistants: A smart to-do list, a parts inventory, a notetaker, a vacation planner. Some of the primary MongoDB functions, like CreateRecord, are generic and can be reused.

This template will work with any database that provides API endpoints. There is nothing special about MongoDB. They just have a generous free tier and I like the simplicity of NoSQL databases.

I'm a pretty novice programmer and there are better, more secure ways to do lots of things. Open to PRs on this repository. 
