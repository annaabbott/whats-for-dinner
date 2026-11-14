#!/usr/bin/env node

import { formatDinnerSuggestion, getDinnerSuggestions, pickDinner } from '../src/index.js';

function parseArgs(argv) {
  const config = {
    ingredients: [],
    dietary: [],
    maxPrepMinutes: Number.MAX_SAFE_INTEGER,
    json: false,
    count: 3
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];

    if (arg === '--ingredients' || arg === '-i') {
      config.ingredients = argv[index + 1]?.split(',').map((item) => item.trim()).filter(Boolean) ?? [];
      index += 1;
    } else if (arg === '--dietary' || arg === '-d') {
      config.dietary = argv[index + 1]?.split(',').map((item) => item.trim()).filter(Boolean) ?? [];
      index += 1;
    } else if (arg === '--max-prep' || arg === '-m') {
      const value = Number(argv[index + 1]);
      config.maxPrepMinutes = Number.isFinite(value) ? value : config.maxPrepMinutes;
      index += 1;
    } else if (arg === '--json') {
      config.json = true;
    } else if (arg === '--count' || arg === '-c') {
      const value = Number(argv[index + 1]);
      config.count = Number.isFinite(value) && value > 0 ? value : config.count;
      index += 1;
    }
  }

  return config;
}

const config = parseArgs(process.argv.slice(2));
const suggestions = getDinnerSuggestions({
  ingredients: config.ingredients,
  dietary: config.dietary,
  maxPrepMinutes: config.maxPrepMinutes
}).slice(0, config.count);

if (config.json) {
  console.log(JSON.stringify(suggestions, null, 2));
  process.exit(0);
}

const selected = pickDinner({
  ingredients: config.ingredients,
  dietary: config.dietary,
  maxPrepMinutes: config.maxPrepMinutes
});

console.log(formatDinnerSuggestion(selected ?? suggestions[0] ?? null));

if (suggestions.length > 1) {
  console.log('\nOther ideas:');
  suggestions.slice(1).forEach((dinner) => {
    console.log(`- ${dinner.title} (${dinner.prepTime} minutes)`);
  });
}
