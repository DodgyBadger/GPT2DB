exports = async function() {
  
    const mongodb = context.services.get("ClusterFuck");
    const db = mongodb.db("RecipeAssistant");
    const collection = db.collection("Recipes");

  try {

    // Fetch all records excluding the title_embeddings field
    const allRecipes = await collection.find({}, { title_embeddings: 0 }).sort({ title: 1 }).toArray();

    return allRecipes;
  } catch (error) {
    console.error("Error in ListAllRecipes: ", error);
    return { success: false, error: error.message };
  }
};
