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

function createProductImageElement(imageSquid) {
  const img = document.createElement('img');
  img.className = 'item_image';
  img.src = imageSquid;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function createProductItemElement({link, usuario, upvotes, comentarios, criadoEm, img}) {
  const section = document.createElement('section');
  section.className = 'item';
  section.appendChild(createCustomElement('span', 'item_link', link));
  section.appendChild(createCustomElement('span', 'item_usuario', usuario));
  section.appendChild( createCustomElement( 'span', 'item_upvotes', upvotes ) );
  section.appendChild( createCustomElement( 'span', 'item_comentarios', comentarios ) );
  section.appendChild( createCustomElement( 'span', 'item_criadoEm', criadoEm ) );
  section.appendChild(createProductImageElement(img))
  return section;
}

async function addImages() {
  const data = await fetchAPI();
  console.log( data );
  avisoCarregando.remove();
  const sectionItem = document.querySelector('.body-images');
  for (let index = 0; index < data.length; index += 1) {
    const { link, usuario, upvotes, comentarios, criadoEm,imagens } = data[ index ];
    const img = imagens.thumbnail.url;
    sectionItem.appendChild(
      createProductItemElement({ link, usuario: usuario.username, upvotes, comentarios, criadoEm, img }),
    );
  }
}

document.addEventListener( "DOMContentLoaded", function () {
  addImages();
});