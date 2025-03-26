export const ingredientDensities = {
  flour: {
    "all-purpose": 120,
    "bread": 127,
    "cake": 114,
    "whole-wheat": 130
  },
  sugar: {
    "granulated": 200,
    "brown": 220,
    "powdered": 120
  },
  butter: 227,
  milk: 240,
  oil: 224,
  honey: 340,
  "cocoa powder": 84,
  "baking powder": 4.6,
  salt: 6,
  // Add more ingredients as needed
} as const;

export function convertToGrams(amount: number, unit: string, ingredient: string): number {
  const density = getDensity(ingredient);
  
  switch (unit.toLowerCase()) {
    case "cup":
    case "cups":
      return amount * density;
    case "tablespoon":
    case "tbsp":
      return (amount * density) / 16;
    case "teaspoon":
    case "tsp":
      return (amount * density) / 48;
    case "ounce":
    case "oz":
      return amount * 28.35;
    case "pound":
    case "lb":
      return amount * 453.59;
    default:
      return amount; // If already in grams or unknown unit
  }
}

function getDensity(ingredient: string): number {
  const densityMap = ingredientDensities as Record<string, number | Record<string, number>>;
  
  if (typeof densityMap[ingredient] === "number") {
    return densityMap[ingredient] as number;
  }
  
  if (typeof densityMap[ingredient] === "object") {
    // Default to first value if specific type not specified
    const values = Object.values(densityMap[ingredient] as Record<string, number>);
    return values[0];
  }
  
  return 0; // Unknown ingredient
}