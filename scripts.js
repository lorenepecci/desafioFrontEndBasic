const avisoCarregando = document.querySelector('.loading');


const fetchAPI = async () => {
  try {
    const response = await fetch('https://us-central1-squid-apis.cloudfunctions.net/test-front-basic');
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

async function addImages() {
  const data = await fetchAPI();
  console.log( data );
  avisoCarregando.remove();
}

document.addEventListener( "DOMContentLoaded", function () {
  addImages();
});