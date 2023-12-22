exports = async function(payload) {

  const dbName = "RecipeAssistant"; // Specify the database name
  const collectionName = "Recipes"; // Specify the collection name

  try {
    // Call the CreateRecord function with necessary parameters
    const result = await context.functions.execute("CreateRecord", payload, dbName, collectionName);
    return result;
  } catch (error) {
    console.error("Error calling CreateRecord: ", error);
    return { success: false, error: error.message };
  }
};
