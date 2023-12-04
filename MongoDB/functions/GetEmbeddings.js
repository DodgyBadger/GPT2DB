// Function to fetch embeddings for a given text
exports = async function(inputText) {
  const gptKey = context.values.get("GPT_Key_String");
  const payload = {
    model: "text-embedding-ada-002",
    input: inputText
  };

  try {
    const response = await context.http.post({
      url: "https://api.openai.com/v1/embeddings",
      headers: {
        "Authorization": [`Bearer ${gptKey}`],
        "Content-Type": ["application/json"]
      },
      body: payload,
      encodeBodyAsJSON: true
    });

    const responseBody = response.body.text();
    const embeddingsResponse = EJSON.parse(responseBody);

    if (!embeddingsResponse.data || embeddingsResponse.data.length === 0) {
      throw new Error("Embedding data is empty or undefined.");
    }

    return embeddingsResponse.data[0].embedding;
  } catch (error) {
    console.error("Error fetching embeddings: ", error);
    return null;
  }
};
