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
          firstName: data["First Name"],
          lastName: data["Last Name"],
          email: data["Email Address"],
          linkedinUrl: data["URL"],
          company: data["Company"],
          title: data["Position"],
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
