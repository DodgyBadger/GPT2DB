exports = async function(payload) {
  // Access the MongoDB service
  const mongodb = context.services.get("ClusterFuck");
  const db = mongodb.db("FitnessAssistant");
  const collection = db.collection("Workouts");

  let jsonData;

  try {
    // Parse the payload to JSON
    jsonData = JSON.parse(payload.body.text());

    // Log the parsed data
    console.log("Received update data:", JSON.stringify(jsonData));

    // Ensure _id is provided for the update
    if (!jsonData._id) {
      throw new Error("Missing _id for update operation");
    }

    // Convert _id from string to ObjectId
    const documentId = new ObjectId(jsonData._id);
    delete jsonData._id; // Remove _id from jsonData to avoid conflicts in the update

    // Perform an update operation
    const updateResult = await collection.updateOne(
      { _id: documentId },
      { $set: jsonData }
    );

    // Check the result and return an appropriate response
    if (updateResult.matchedCount === 0) {
      return { status: "error", message: "No document found with the provided _id" };
    } else if (updateResult.modifiedCount === 0) {
      return { status: "warning", message: "Document not modified" };
    } else {
      return { status: "success", id: documentId };
    }
  } catch (error) {
    // Log and return any errors
    console.error("Error processing the update:", error);
    return { status: "error", message: error.message };
  }
};
