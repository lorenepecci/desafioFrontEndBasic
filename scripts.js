// import { fetchAPI } from './fetchAPI';
const avisoCarregando = document.querySelector( '.loading' );

const fetchAPI = async () => {
  try {
    const response = await fetch('https://us-central1-squid-apis.cloudfunctions.net/test-front-basic');
    const data = await response.json();
    return data;
  } catch ( error ) {
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

function openInNewTab( link ) {
  var win = window.open(link, '_blank');
  win.focus();
}

function itemClickListener (event, link) {
  openInNewTab( link );
}

function createProductItemElement({link, usuario, upvotes, comentarios, criadoEm, img}) {
  const section = document.createElement('section');
  section.className = 'sectionItem';
  section.appendChild(createCustomElement('span', 'item_link', link));
  section.appendChild(createCustomElement('span', 'item_usuario', usuario));
  section.appendChild( createCustomElement( 'span', 'item_upvotes', upvotes ) );
  section.appendChild( createCustomElement( 'span', 'item_comentarios', comentarios ) );
  section.appendChild( createCustomElement( 'span', 'item_criadoEm', criadoEm ) );
  const sectionImage = document.createElement('section');
  sectionImage.className = ' sectionImage';
  sectionImage.appendChild( createProductImageElement( img ) )
  sectionImage.addEventListener( 'click', ( event ) => itemClickListener( event, link ) );
  section.appendChild(sectionImage)
  return section;
}

async function addImages() {
  const data = await fetchAPI();
  console.log( data[0] );
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
} );

