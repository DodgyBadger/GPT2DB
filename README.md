# GPT2DB

This a proof of concept for connecting a custom GPT to a database to create a personal, data retrieval assistant. In this case, a recipe assistant that can help you:

* create new recipes and store them in a database
* retrieve recipes using semantic search
* list all recipes in the database
* update and delete recipes

To recreate this assistant, you will need:

* ChatGPT Plus
* An openAI API account with a few credits loaded up (used only to retrieve vector embeddings which are cheap)
* An account at MongoDB Atlas (the free forever / shared tier works perfectly)
* 
