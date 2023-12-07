exports = async function(payload) {
  try {
    
    // Extract the json object from the payload object
    const data = JSON.parse(payload.body.text());
    const queryString = data.query;
    
    //JSON.parse(payload.body.text())
    
    //console.log("Query: ", JSON.stringify(data)); // Debugging
    
    // Convert the search query into embeddings
    const queryEmbeddings = await context.functions.execute("GetEmbeddings", queryString);
    
    //console.log("Embeddings: ", queryEmbeddings); // Debugging

    // Define the vector search pipeline
    const vectorSearchPipeline = [
      {
        "$vectorSearch": {
          "index": "recipe_title_embeddings",
          "path": "title_embeddings",
          "queryVector": queryEmbeddings,
          "numCandidates": 100, // Adjust based on your dataset
          "limit": 5, // Number of results to return
          // Optional filter, e.g., based on 'favorite' field
          //"filter": { "favorite": true }
        }
      },
      {
        "$project": {
          "title_embeddings": 0, // Exclude title_embeddings
          "search_score": { "$meta": "vectorSearchScore" } // Include vector search score          
          // Other fields are included by default
        }
      }
      
      // Additional pipeline stages as needed
    ];

    const mongodb = context.services.get("ClusterFuck");
    const db = mongodb.db("RecipeAssistant");
    const collection = db.collection("Recipes");
    
    // Execute the vector search
    const searchResults = await collection.aggregate(vectorSearchPipeline).toArray();

    return searchResults;
  } catch (error) {
    console.error("Error in GetRecipes function: ", error);
    return [];
  }
};
