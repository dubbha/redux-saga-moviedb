import Search from '../search';
import Film from '../film';

export default [
  {
    path: '/search/:query?',
    component: Search,
  },
  {
    path: '/film/:id/:title?',
    component: Film,
  },
  {
    path: '/',
    exact: true,
    component: Search,
  },
];
