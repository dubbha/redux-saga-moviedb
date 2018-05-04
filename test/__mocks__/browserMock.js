const div = document.createElement('div');
Object.defineProperty(document, 'getElementById', {
  value: () => div,
});
