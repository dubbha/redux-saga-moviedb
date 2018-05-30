### Redux Saga MovieDB app

- [x] Redux-Saga client side
- [x] Redux-Saga server side rendering
- [x] Async Rendering safe lifecycle hooks
- [x] SafeMode
- [x] ErrorBoundaries
- [x] Code splitting, lazy loading
- [ ] Context API
- [ ] styled-components

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
 common/config                     |      100 |      100 |      100 |      100 |                   |
  api.config.js                    |      100 |      100 |      100 |      100 |                   |
 common/errorBoundary              |      100 |      100 |      100 |      100 |                   |
  ErrorBoundary.jsx                |      100 |      100 |      100 |      100 |                   |
  ErrorStub.jsx                    |      100 |      100 |      100 |      100 |                   |
 common/filmHeader                 |      100 |      100 |      100 |      100 |                   |
  FilmButton.jsx                   |      100 |      100 |      100 |      100 |                   |
  FilmHeader.jsx                   |      100 |      100 |      100 |      100 |                   |
 common/footer                     |      100 |      100 |      100 |      100 |                   |
  Footer.jsx                       |      100 |      100 |      100 |      100 |                   |
 common/list                       |      100 |      100 |      100 |      100 |                   |
  EmptyList.jsx                    |      100 |      100 |      100 |      100 |                   |
  Error.jsx                        |      100 |      100 |      100 |      100 |                   |
  List.jsx                         |      100 |      100 |      100 |      100 |                   |
  ListItem.jsx                     |      100 |      100 |      100 |      100 |                   |
  Spinner.jsx                      |      100 |      100 |      100 |      100 |                   |
 common/loading                    |      100 |      100 |      100 |      100 |                   |
  Loading.jsx                      |      100 |      100 |      100 |      100 |                   |
 common/logo                       |      100 |      100 |      100 |      100 |                   |
  Logo.jsx                         |      100 |      100 |      100 |      100 |                   |
 common/result                     |      100 |      100 |      100 |      100 |                   |
  FilmResult.jsx                   |      100 |      100 |      100 |      100 |                   |
  Result.jsx                       |      100 |      100 |      100 |      100 |                   |
  SearchResult.jsx                 |      100 |      100 |      100 |      100 |                   |
  SearchSortByLink.jsx             |      100 |      100 |      100 |      100 |                   |
 common/searchHeader               |      100 |      100 |      100 |      100 |                   |
  SearchHeader.jsx                 |      100 |      100 |      100 |      100 |                   |
 common/searchHeader/searchToolbar |      100 |      100 |      100 |      100 |                   |
  SearchButton.jsx                 |      100 |      100 |      100 |      100 |                   |
  SearchBySwitch.jsx               |      100 |      100 |      100 |      100 |                   |
  SearchToolbar.jsx                |      100 |      100 |      100 |      100 |                   |
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
 search                            |      100 |      100 |      100 |      100 |                   |
  Search.jsx                       |      100 |      100 |      100 |      100 |                   |
-----------------------------------|----------|----------|----------|----------|-------------------|

Test Suites: 31 passed, 31 total
Tests:       195 passed, 195 total
Snapshots:   37 passed, 37 total
Time:        12.317s
Ran all test suites.
```
