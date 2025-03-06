/**
 * Chunks an array into smaller arrays of a specified size.
 * @param {Array} array - The array to be chunked.
 * @param {Number} size - The size of each chunk.
 * @returns {Array} - An array of smaller arrays.
 */
function chunkArray<T>(array: T[], size: number): T[][] {
  const results: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    if (i + size > array.length) {
      results.push(array.slice(i));
      break;
    } else {
      results.push(array.slice(i, i + size));
    }
  }
  return results;
}

export default chunkArray;
