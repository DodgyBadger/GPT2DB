exports = async function(dbName, collectionName) {
  
  const mongodb = context.services.get("ClusterFuck");
  const db = mongodb.db(dbName);
  const collection = db.collection(collectionName);

  try {
    // Fetch all records from the collection
    const records = await collection.find({}).toArray();

    // Return the fetched records
    return records;
  } catch (error) {
    console.error("Error in GetAllRecords: ", error);
    return { success: false, error: error.message };
  }
};
