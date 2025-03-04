const csv = require("csv-parser");
const { Readable } = require("stream");

function processCSVData(buffer) {
  return new Promise((resolve, reject) => {
    const results = [];

    // Create a readable stream from the buffer
    const stream = Readable.from(buffer);

    stream
      .pipe(csv())
      .on("data", (data) => {
        results.push({
          "First Name": data["First Name"],
          "Last Name": data["Last Name"],
          Company: data["Company"],
          Position: data["Position"],
          "Email Address": data["Email Address"],
          URL: data["URL"],
        });
      })
      .on("end", () => {
        resolve(results);
      })
      .on("error", (error) => {
        reject(error);
      });
  });
}

module.exports = { processCSVData };
