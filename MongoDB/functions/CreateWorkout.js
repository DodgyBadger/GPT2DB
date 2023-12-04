exports = async function(payload) {
  try {
    // Call the CreateRecord function with necessary parameters
    const result = await context.functions.execute("CreateRecord", payload, "WorkoutAssistant", "Workouts");
    return result;
  } catch (error) {
    console.error("Error calling CreateRecord: ", error);
    return { success: false, error: error.message };
  }
};
