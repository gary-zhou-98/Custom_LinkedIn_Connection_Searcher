const { classifyConnectionsInBatches } = require("../services/gptService");

const filterConnections = async (req, res) => {
  const { connections, criteria } = req.body;
  if (!connections || !criteria) {
    return res
      .status(400)
      .json({ error: "Connections and criteria are required" });
  }
  try {
    const filteredConnections = await classifyConnectionsInBatches(
      connections,
      criteria
    );
    res.status(200).json(filteredConnections);
  } catch (error) {
    console.error("Error filtering connections:", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { filterConnections };
