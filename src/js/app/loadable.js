import Loadable from 'react-loadable';
import Loading from '../common/Loading';

export const Search = Loadable({
  loader: () => import(/* webpackChunkName: "search" */ '../search'),
  loading: Loading,
});

export const Film = Loadable({
  loader: () => import(/* webpackChunkName: "film" */ '../film'),
  loading: Loading,
});
