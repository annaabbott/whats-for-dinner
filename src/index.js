export const dinnerIdeas = [
  {
    id: 'sheet-pan-fajitas',
    title: 'Sheet Pan Chicken Fajitas',
    description: 'Juicy chicken and peppers with warm tortillas and a squeeze of lime.',
    ingredients: ['chicken', 'bell pepper', 'onion', 'tortillas', 'lime', 'cumin'],
    dietary: ['high-protein', 'family-friendly', 'gluten-free'],
    prepTime: 25,
    difficulty: 'easy',
    cuisine: 'Mexican'
  },
  {
    id: 'veggie-budgie-bowl',
    title: 'Veggie Buddha Bowl',
    description: 'A colorful grain bowl packed with roasted vegetables and a tahini drizzle.',
    ingredients: ['quinoa', 'broccoli', 'sweet potato', 'chickpeas', 'spinach', 'tahini'],
    dietary: ['vegetarian', 'vegan', 'high-fiber'],
    prepTime: 30,
    difficulty: 'easy',
    cuisine: 'Mediterranean'
  },
  {
    id: 'crispy-tofu-noodles',
    title: 'Crispy Tofu Noodles',
    description: 'A savory stir-fry with crisp tofu, noodles, and green vegetables.',
    ingredients: ['tofu', 'noodles', 'broccoli', 'soy sauce', 'garlic', 'ginger'],
    dietary: ['vegetarian', 'high-protein', 'dairy-free'],
    prepTime: 20,
    difficulty: 'easy',
    cuisine: 'Asian'
  },
  {
    id: 'salmon-rice-bowl',
    title: 'Lemon Herb Salmon Rice Bowl',
    description: 'Flaky salmon over rice with cucumber and a quick lemon yogurt sauce.',
    ingredients: ['salmon', 'rice', 'cucumber', 'lemon', 'greek yogurt', 'spinach'],
    dietary: ['high-protein', 'gluten-free', 'family-friendly'],
    prepTime: 22,
    difficulty: 'medium',
    cuisine: 'American'
  },
  {
    id: 'lentil-tomato-soup',
    title: 'Red Lentil Tomato Soup',
    description: 'Comforting soup with red lentils, tomatoes, and a touch of curry.',
    ingredients: ['lentils', 'tomato', 'onion', 'garlic', 'curry', 'spinach'],
    dietary: ['vegan', 'high-fiber', 'budget-friendly'],
    prepTime: 35,
    difficulty: 'easy',
    cuisine: 'Global'
  },
  {
    id: 'pesto-pasta',
    title: 'Pesto Pasta Primavera',
    description: 'Bright pasta tossed with pesto, peas, and roasted vegetables.',
    ingredients: ['pasta', 'peas', 'zucchini', 'basil', 'parmesan', 'olive oil'],
    dietary: ['vegetarian', 'quick'],
    prepTime: 15,
    difficulty: 'easy',
    cuisine: 'Italian'
  }
];

export function normalizeList(value) {
  if (Array.isArray(value)) {
    return value
      .flatMap((entry) => String(entry).split(','))
      .map((entry) => entry.trim().toLowerCase())
      .filter(Boolean);
  }

  if (typeof value === 'string') {
    return value
      .split(',')
      .map((entry) => entry.trim().toLowerCase())
      .filter(Boolean);
  }

  return [];
}

export function scoreDinner(dinner, { ingredients = [], dietary = [], maxPrepMinutes = Number.MAX_SAFE_INTEGER } = {}) {
  const normalizedIngredients = normalizeList(ingredients);
  const normalizedDietary = normalizeList(dietary);
  const hasPrepLimit = Number.isFinite(maxPrepMinutes);

  let score = 0;

  for (const ingredient of normalizedIngredients) {
    const ingredientMatches = dinner.ingredients.some((dinnerIngredient) =>
      dinnerIngredient.toLowerCase().includes(ingredient.toLowerCase())
    );

    if (ingredientMatches) {
      score += 5;
    }
  }

  for (const tag of normalizedDietary) {
    const dietMatch = dinner.dietary.some((entry) => entry.toLowerCase() === tag.toLowerCase());
    if (dietMatch) {
      score += 10;
    }
  }

  if (hasPrepLimit && dinner.prepTime <= maxPrepMinutes) {
    score += 4;
  }

  if (dinner.prepTime <= 20) {
    score += 2;
  }

  return score;
}

export function getDinnerSuggestions(options = {}) {
  const ingredients = normalizeList(options.ingredients);
  const dietary = normalizeList(options.dietary);
  const maxPrepMinutes = Number.isFinite(options.maxPrepMinutes) ? options.maxPrepMinutes : Number.MAX_SAFE_INTEGER;

  const scoredDinners = dinnerIdeas
    .map((dinner) => ({
      ...dinner,
      score: scoreDinner(dinner, { ingredients, dietary, maxPrepMinutes })
    }))
    .filter((dinner) => dinner.prepTime <= maxPrepMinutes)
    .sort((a, b) => b.score - a.score || a.prepTime - b.prepTime)
    .map(({ score, ...dinner }) => dinner);

  if (scoredDinners.length > 0) {
    return scoredDinners;
  }

  return [...dinnerIdeas]
    .filter((dinner) => dinner.prepTime <= maxPrepMinutes)
    .sort((a, b) => a.prepTime - b.prepTime);
}

export function pickDinner(options = {}) {
  return getDinnerSuggestions(options)[0] ?? null;
}

export function formatDinnerSuggestion(dinner) {
  if (!dinner) {
    return 'No dinner ideas match your current preferences. Try adding a few pantry staples.';
  }

  return `${dinner.title} (${dinner.prepTime} minutes)\n${dinner.description}\nBest for: ${dinner.dietary.join(', ')}`;
}
