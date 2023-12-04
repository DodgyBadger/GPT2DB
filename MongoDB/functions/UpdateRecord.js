exports = async function(payload, dbName, collectionName) {
  
  const mongodb = context.services.get("ClusterFuck");
  const db = mongodb.db(dbName);
  const collection = db.collection(collectionName);

  try {
    const jsonData = JSON.parse(payload.body.text());
    const documentId = jsonData._id;

    //console.log("Received JSON data: ", JSON.stringify(jsonData));


    // Create a copy of jsonData and remove _id from the copy
    const updateData = {...jsonData};
    delete updateData._id; // so _id field is not a field being updated

    //console.log("New JSON data: ", JSON.stringify(updateData));

    // Add a function to handle nested arrays or objects if needed
    context.functions.execute("addIdsToNestedObjects", updateData);

    const updateResult = await collection.updateOne(
      { _id: BSON.ObjectId(documentId) }, 
      { $set: {...updateData, updatedDate: new Date()} }
    );

    if (updateResult.modifiedCount === 1) {
      return {
        success: true,
        id: documentId,
        updatedObject: updateData
      };
    } else {
      throw new Error("Update operation did not modify any documents.");
    }
  } catch (error) {
    console.error("Error processing the update: ", error);
    return { success: false, error: error.message };
  }
};
