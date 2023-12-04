exports = async function(payload, dbName, collectionName) {
  
  const mongodb = context.services.get("ClusterFuck");
  const db = mongodb.db(dbName);
  const collection = db.collection(collectionName);

  try {
    // Parse the incoming payload to get the document ID
    const jsonData = JSON.parse(payload.body.text());
    const documentId = BSON.ObjectId(jsonData._id); // Convert to ObjectId

    // Perform the delete operation
    const deleteResult = await collection.deleteOne({ _id: documentId });

    if (deleteResult.deletedCount === 1) {
      return {
        success: true,
        id: documentId, // Return the string format of the ObjectId
        message: "Document successfully deleted"
      };
    } else {
      throw new Error("Document not found or already deleted.");
    }
  } catch (error) {
    console.error("Error in DeleteRecord: ", error);
    return { success: false, error: error.message };
  }
};
