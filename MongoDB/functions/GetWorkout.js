exports = async function() {
  const mongodb = context.services.get("ClusterFuck");
  const db = mongodb.db("FitnessAssistant");
  const collection = db.collection("Workouts");

  try {
    // Find the latest workout record for the user
    const latestWorkout = await collection.find({}) // Add user filter if needed
                               .sort({ workoutDate: -1 })
                               .limit(1)
                               .toArray();
                               
    if (!latestWorkout.length) {
      return { success: false, message: "No workout sessions have been created yet." };
    }

    console.log("Workout:", JSON.stringify(latestWorkout[0]));

    // Return the entire latest workout record
    return { success: true, workout: latestWorkout[0] };
    
  } catch (error) {
    console.error("Error retrieving the workout data: ", error);
    return { success: false, error: error.message };
  }
};
