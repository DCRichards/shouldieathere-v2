import { register } from 'register-service-worker';

const { BASE_URL, NODE_ENV } = process.env;

if (NODE_ENV === 'production') {
  register(`${BASE_URL}service-worker.js`, {
    ready() {},
    registered() {},
    cached() {},
    updatefound() {},
    updated() {},
    offline() {},
    error() {},
  });
}
