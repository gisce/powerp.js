/**
 * Utility functions for handling BigInt values in JSON serialization
 */

/**
 * Recursively processes a value to convert BigInt-like objects to actual BigInt values.
 * This handles cases where JSON.parse with context.source returns objects like:
 * { parsedValue: number, source: string } instead of BigInt values.
 *
 * @param value - The value to process
 * @returns The processed value with BigInt-like objects converted to BigInt
 */
export function normalizeBigIntValues(value: any): any {
  if (value === null || value === undefined) {
    return value;
  }

  // Check if this is a BigInt-like object from json-with-bigint
  if (
    typeof value === "object" &&
    "parsedValue" in value &&
    "source" in value &&
    typeof value.source === "string"
  ) {
    // Convert the source string to BigInt
    try {
      return BigInt(value.source);
    } catch {
      // If conversion fails, return the parsedValue
      return value.parsedValue;
    }
  }

  // Handle arrays
  if (Array.isArray(value)) {
    return value.map((item) => normalizeBigIntValues(item));
  }

  // Handle plain objects
  if (typeof value === "object" && value.constructor === Object) {
    const normalized: Record<string, any> = {};
    for (const key in value) {
      if (Object.prototype.hasOwnProperty.call(value, key)) {
        normalized[key] = normalizeBigIntValues(value[key]);
      }
    }
    return normalized;
  }

  // Return other values as-is
  return value;
}
