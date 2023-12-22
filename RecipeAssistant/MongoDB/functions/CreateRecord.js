exports = async function(payload, dbName, collectionName) {
  
  // Set up the MongoDB connection
  const mongodb = context.services.get("ClusterFuck");
  const db = mongodb.db(dbName);
  const collection = db.collection(collectionName);

  try {
    // Parse the incoming payload
    const jsonData = JSON.parse(payload.body.text());

    // Log the received JSON data
    //console.log("Received JSON data: ", JSON.stringify(jsonData));

    // Check if createdDate is provided, convert it to a date; otherwise, set to current date
    if (jsonData.createdDate) {
      jsonData.createdDate = new Date(jsonData.createdDate);
    } else {
      jsonData.createdDate = new Date();
    }

    // Add a function to handle nested arrays or objects if needed
    context.functions.execute("addIdsToNestedObjects", jsonData);

    // Insert the parsed JSON into the specified collection
    const insertResult = await collection.insertOne(jsonData);

    // Check if the insert was successful and return the inserted ID
    if (insertResult.insertedId) {
      return {
        success: true,
        id: insertResult.insertedId,
        insertedObject: jsonData // Return the entire modified JSON object
      };
    }
  } catch (error) {
    // Log and return the error
    console.error("Error processing the data: ", error);
    return { success: false, error: error.message };
  }
};
