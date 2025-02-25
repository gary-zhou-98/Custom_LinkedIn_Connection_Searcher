const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

/**
 * Process a single batch of connection data.
 * @param {Array} batch - Array of connection objects.
 * @param {String} criteria - Filtering criteria (e.g., "tech start-up, Series A or earlier").
 * @returns {Promise<Array>} - Filtered connection objects.
 */
async function classifyBatch(batch, criteria) {
  const prompt = `
Given the following list of connections, filter and return only those connections whose current company meeting the follwoing criteria: ${criteria}. 
Return the result as a JSON array of objects containing the connection details. Each object in the JSON array should have the same structure as the example object below.

An example of a connection object is:
{
  "name": "John Doe",
  "company": "Tech Corp",
}


Data:
${JSON.stringify(batch, null, 2)}

Return only the JSON array.
  `;

  try {
    const completion = await openai.chat.completions.create({
      model: "chatgpt-4o-latest",
      messages: [
        {
          role: "developer",
          content:
            "You are an expert in evaluating companies and checking if they meet a certain criteria.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      max_tokens: 1000, // Adjust as needed
      temperature: 0.3,
    });

    const resultText = completion.data.choices[0].text.trim();
    const filteredConnections = JSON.parse(resultText);
    return filteredConnections;
  } catch (error) {
    console.error("Error processing batch:", error);
    throw error;
  }
}

/**
 * Processes all connections in batches and aggregates the filtered results.
 * @param {Array} connections - Array of connection objects.
 * @param {String} criteria - Filtering criteria.
 * @param {Number} batchSize - Size of each batch.
 * @returns {Promise<Array>} - Aggregated filtered results.
 */
async function classifyConnectionsInBatches(
  connections,
  criteria,
  batchSize = 10
) {
  const { chunkArray } = require("../utils/batchUtils");
  const batches = chunkArray(connections, batchSize);
  let allFiltered = [];

  for (const batch of batches) {
    try {
      const filteredBatch = await classifyBatch(batch, criteria);
      allFiltered = allFiltered.concat(filteredBatch);
    } catch (error) {
      console.error("Error in batch classification:", error);
      // Optionally, handle errors per batch or continue to next batch.
    }
  }
  return allFiltered;
}

module.exports = { classifyConnectionsInBatches };
