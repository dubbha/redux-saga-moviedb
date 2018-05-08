import { delay } from 'redux-saga';

export default function* pingSaga() {
  while (true) {
    yield delay(1000);
    console.log('ping');  // eslint-disable-line
  }
}

