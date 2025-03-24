export function extractWeight(data) {
  const match = data.match(/[\d.]+/); // Extract numeric part
  if (match) {
    let weight = parseFloat(match[0]);
    return weight % 1 === 0 ? weight.toFixed(0) : weight.toFixed(2); // Remove decimals if whole number
  }
  return null;
}
