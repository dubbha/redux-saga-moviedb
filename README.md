### Redux Saga MovieDB app

Run development server
```
npm run dev
```

Run production server
```
npm run build && npm start
```

Test coverage
```
-----------------------------------|----------|----------|----------|----------|-------------------|
File                               |  % Stmts | % Branch |  % Funcs |  % Lines | Uncovered Line #s |
-----------------------------------|----------|----------|----------|----------|-------------------|
All files                          |      100 |      100 |      100 |      100 |                   |
 app                               |      100 |      100 |      100 |      100 |                   |
  App.jsx                          |      100 |      100 |      100 |      100 |                   |
  configureStore.js                |      100 |      100 |      100 |      100 |                   |
  routes.js                        |        0 |        0 |        0 |        0 |                   |
 common/config                     |      100 |      100 |      100 |      100 |                   |
  api.config.js                    |      100 |      100 |      100 |      100 |                   |
 common/errorBoundary              |      100 |      100 |      100 |      100 |                   |
  ErrorBoundary.jsx                |      100 |      100 |      100 |      100 |                   |
  ErrorStub.jsx                    |      100 |      100 |      100 |      100 |                   |
  index.js                         |        0 |        0 |        0 |        0 |                   |
 common/filmHeader                 |      100 |      100 |      100 |      100 |                   |
  FilmButton.jsx                   |      100 |      100 |      100 |      100 |                   |
  FilmHeader.jsx                   |      100 |      100 |      100 |      100 |                   |
  index.js                         |        0 |        0 |        0 |        0 |                   |
 common/footer                     |      100 |      100 |      100 |      100 |                   |
  Footer.jsx                       |      100 |      100 |      100 |      100 |                   |
  index.js                         |        0 |        0 |        0 |        0 |                   |
 common/list                       |      100 |      100 |      100 |      100 |                   |
  EmptyList.jsx                    |      100 |      100 |      100 |      100 |                   |
  Error.jsx                        |      100 |      100 |      100 |      100 |                   |
  List.jsx                         |      100 |      100 |      100 |      100 |                   |
  ListItem.jsx                     |      100 |      100 |      100 |      100 |                   |
  Spinner.jsx                      |      100 |      100 |      100 |      100 |                   |
  index.js                         |        0 |        0 |        0 |        0 |                   |
 common/logo                       |      100 |      100 |      100 |      100 |                   |
  Logo.jsx                         |      100 |      100 |      100 |      100 |                   |
  index.js                         |        0 |        0 |        0 |        0 |                   |
 common/result                     |      100 |      100 |      100 |      100 |                   |
  FilmResult.jsx                   |      100 |      100 |      100 |      100 |                   |
  Result.jsx                       |      100 |      100 |      100 |      100 |                   |
  SearchResult.jsx                 |      100 |      100 |      100 |      100 |                   |
  SearchSortByLink.jsx             |      100 |      100 |      100 |      100 |                   |
  index.js                         |        0 |        0 |        0 |        0 |                   |
 common/searchHeader               |      100 |      100 |      100 |      100 |                   |
  SearchHeader.jsx                 |      100 |      100 |      100 |      100 |                   |
  index.js                         |        0 |        0 |        0 |        0 |                   |
 common/searchHeader/searchToolbar |      100 |      100 |      100 |      100 |                   |
  SearchButton.jsx                 |      100 |      100 |      100 |      100 |                   |
  SearchBySwitch.jsx               |      100 |      100 |      100 |      100 |                   |
  SearchToolbar.jsx                |      100 |      100 |      100 |      100 |                   |
  index.js                         |        0 |        0 |        0 |        0 |                   |
 common/store                      |      100 |      100 |      100 |      100 |                   |
  actions.js                       |      100 |      100 |      100 |      100 |                   |
  reducer.js                       |      100 |      100 |      100 |      100 |                   |
  sagas.js                         |      100 |      100 |      100 |      100 |                   |
  selectors.js                     |      100 |      100 |      100 |      100 |                   |
  store.config.js                  |      100 |      100 |      100 |      100 |                   |
 common/utils                      |      100 |      100 |      100 |      100 |                   |
  displayCast.js                   |      100 |      100 |      100 |      100 |                   |
  mapGenres.js                     |      100 |      100 |      100 |      100 |                   |
  parseYear.js                     |      100 |      100 |      100 |      100 |                   |
  propShapes.js                    |      100 |      100 |      100 |      100 |                   |
 film                              |      100 |      100 |      100 |      100 |                   |
  Film.jsx                         |      100 |      100 |      100 |      100 |                   |
  index.js                         |        0 |        0 |        0 |        0 |                   |
 search                            |      100 |      100 |      100 |      100 |                   |
  Search.jsx                       |      100 |      100 |      100 |      100 |                   |
  index.js                         |        0 |        0 |        0 |        0 |                   |
-----------------------------------|----------|----------|----------|----------|-------------------|

Test Suites: 30 passed, 30 total
Tests:       195 passed, 195 total
Snapshots:   36 passed, 36 total
Time:        6.574s
Ran all test suites.
```

Things to try
- [x] redux-saga client-side
- [ ] redux-saga based SSR
- [ ] v16.3 lifecycle hooks
- [ ] styled-components
- [ ] lazy loading
