# What's for Dinner?

A small dinner suggestion app that picks meal ideas based on the ingredients you have on hand and any dietary preferences you want to honor.

## Features

- Suggest meals by ingredient overlap
- Filter by dietary preferences such as vegetarian, vegan, high-protein, or gluten-free
- Respect a maximum prep time
- Provide a quick CLI experience for everyday meal planning

## Quick start

```bash
npm install
npm start -- --ingredients "chicken, bell pepper, onion" --dietary "high-protein" --max-prep 30
```

## Library usage

```js
import { getDinnerSuggestions, pickDinner } from './src/index.js';

const suggestions = getDinnerSuggestions({
  ingredients: ['chicken', 'bell pepper'],
  dietary: ['high-protein'],
  maxPrepMinutes: 30
});

console.log(suggestions[0]);
```

## Testing

```bash
npm test
```
