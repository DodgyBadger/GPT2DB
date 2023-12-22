exports = async function(payload) {
  
  const dbName = "RecipeAssistant"; // Specify the database name
  const collectionName = "Recipes"; // Specify the collection name

  try {
    // Call the generic UpdateRecord function
    return await context.functions.execute("DeleteRecord", payload, dbName, collectionName);
  } catch (error) {
    console.error("Error in UpdateRecipe function: ", error);
    return { success: false, error: error.message };
  }
};