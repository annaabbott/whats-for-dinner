import test from 'node:test';
import assert from 'node:assert/strict';

import { getDinnerSuggestions, pickDinner } from '../src/index.js';

test('returns dinner ideas that match available ingredients and dietary goals', () => {
  const suggestions = getDinnerSuggestions({
    ingredients: ['chicken', 'bell pepper'],
    dietary: ['high-protein']
  });

  assert.ok(suggestions.length > 0);
  assert.equal(suggestions[0].title, 'Sheet Pan Chicken Fajitas');
});

test('respects the max prep time', () => {
  const suggestions = getDinnerSuggestions({
    ingredients: ['broccoli', 'tofu'],
    maxPrepMinutes: 20
  });

  assert.ok(suggestions.every((dinner) => dinner.prepTime <= 20));
});

test('returns a fallback when no exact matches are found', () => {
  const suggestions = getDinnerSuggestions({
    ingredients: ['mango', 'kiwi', 'dragonfruit'],
    dietary: ['vegan']
  });

  assert.ok(suggestions.length > 0);
  assert.ok(suggestions[0].title);
});

test('pickDinner picks the top-ranked result', () => {
  const dinner = pickDinner({
    ingredients: ['broccoli', 'spinach', 'quinoa'],
    dietary: ['vegetarian']
  });

  assert.equal(dinner.title, 'Veggie Buddha Bowl');
});
