const { OpenAI } = require("openai");
const { chunkArray } = require("../utils/batchCSVUtils");
const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_API_KEY,
});

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
  "First Name": "John",
  "Last Name": "Doe",
  Company: "Tech Corp",
  Position: "Software Engineer"
  "Email Address": "john.doe@example.com",
  URL: "https://www.linkedin.com/in/john-doe",
}
    


Data:
${JSON.stringify(batch, null, 2)}

Return only the JSON array without any additionl text.
  `;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
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
      temperature: 0.3,
    });

    const resultText = completion.choices[0].message.content;
    let cleanedString = resultText;
    cleanedString = "[" + cleanedString.split("[")[1];
    cleanedString = cleanedString.split("]")[0] + "]";
    if (!resultText && completion.choices[0].message.refusal) {
      throw error(
        "Model refused to answer with refusal:",
        completion.choices[0].message.refusal
      );
    }
    const filteredConnections = JSON.parse(cleanedString);
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
  batchSize = 20,
  concurrencyLimit = 4
) {
  const batches = chunkArray(connections, batchSize);
  let allFiltered = [];

  // Process batches in chunks to control concurrency
  for (let i = 0; i < batches.length; i += concurrencyLimit) {
    const batchChunk = batches.slice(i, i + concurrencyLimit);
    const batchPromises = batchChunk.map((batch) =>
      classifyBatch(batch, criteria).catch((error) => {
        console.error("Error in batch classification:", error);
        return [];
      })
    );

    try {
      const results = await Promise.all(batchPromises);
      results.forEach((filteredBatch) => {
        allFiltered = allFiltered.concat(filteredBatch);
      });
    } catch (error) {
      console.error("Error in batch classification:", error);
      throw error;
    }
  }
  return allFiltered;
}

module.exports = { classifyConnectionsInBatches };
