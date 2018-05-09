import { delay } from 'redux-saga';
import { all } from 'redux-saga/effects';

function* pingSaga() {
  while (true) {
    yield delay(1000);
    console.log('ping');  // eslint-disable-line
  }
}

export default function* rootSaga() {
  yield all([
    pingSaga(),
  ]);
}
