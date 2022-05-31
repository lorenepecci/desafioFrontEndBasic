const fetchAPI = async () => {
  try {
    const response = await fetch('https://us-central1-squid-apis.cloudfunctions.net/test-front-basic');
    const data = await response.json();
    return data;
  } catch ( error ) {
    return error;
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchAPI,
  }; 
}
