exports = async function(changeEvent) {
  try {
    const recipe = changeEvent.fullDocument;
    const title = recipe.title;
    const description = recipe.description || ""; // Fallback to an empty string if description is not present

    // Concatenate title and description
    const combinedText = title + ": " + description;

    // Fetch embeddings for the combined text
    const embeddings = await context.functions.execute("GetEmbeddings", combinedText);

    // Ensure embeddings are fetched successfully
    if (!embeddings) {
      throw new Error("Failed to fetch embeddings");
    }

    // Update the MongoDB document with the fetched embeddings
    const mongodb = context.services.get("ClusterFuck");
    const db = mongodb.db("RecipeAssistant");
    const collection = db.collection("Recipes");
    
    await collection.updateOne(
      { _id: recipe._id },
      { $set: { title_embeddings: embeddings } }
    );

  } catch (error) {
    // Log and handle any errors
    console.error("Error in trigger function: ", error);
    // Additional error handling as needed
  }
};
