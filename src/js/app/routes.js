import Loadable from 'react-loadable';
import Loading from '../common/Loading';
// import Search from '../search';
// import Film from '../film';

const Search = Loadable({
  loader: () => import(/* webpackChunkName: "search" */ '../search'),
  loading: Loading,
});

const Film = Loadable({
  loader: () => import(/* webpackChunkName: "film" */ '../film'),
  loading: Loading,
});

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
