const data = require('./data');


const ENDPOINT = 'https://us-central1-squid-apis.cloudfunctions.net/test-front-basic';

const TIME_IN_MILLISECONDS = 200;

const fetchSimulator = (url) => {
  if (typeof url === undefined ) {
    return Promise.reject(new Error('Failed to fetch'));
  }
  const validUrl = ENDPOINT.includes(url);
  return Promise.resolve({
    status: validUrl ? 200 : 404,
    ok: validUrl,
    json: () => new Promise((resolve) => {
      setTimeout(() => {
        if ( url === ENDPOINT ) {
          return resolve(data);
        }

        return resolve({ results: [] });
      }, TIME_IN_MILLISECONDS);
    }),
  });
};

window.fetch = jest.fn(fetchSimulator);
afterEach(jest.clearAllMocks);

module.exports = fetchSimulator;
