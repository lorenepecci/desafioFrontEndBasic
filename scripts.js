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

function createProductImageElement(imageSquid, name) {
  const img = document.createElement('img');
  img.className = name;
  img.src = imageSquid;
 /*  img.height = '150px';
  img.width = '150px';  */
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


function createProductItemElement ( { link, usuario, upvotes, comentarios, criadoEm, imgObj } ) {
  const section = document.createElement('section');
  section.className = 'sectionItem';
  section.appendChild(createCustomElement('div', 'item_usuario', `@${usuario}`));
  const votes = createCustomElement( 'div', 'item_upvotes', upvotes );
  votes.appendChild( createProductImageElement('./assets/icon2.png' , 'icon'))
  section.appendChild( votes);
  const coment = createCustomElement( 'div', 'item_comentarios', comentarios );
  coment.appendChild(createProductImageElement('./assets/icon1.png' , 'icon')  );
  section.appendChild( coment );
  const d = new Date(criadoEm)
  const date = d.toLocaleTimeString( [], { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' } );
  const criado = createCustomElement( 'div', 'item_criadoEm', date);
  criado.appendChild( createProductImageElement( './assets/icon3.png', 'icon' ) );
  section.appendChild( criado );
  const divImage = document.createElement('div');
  divImage.className = 'divImage';
  divImage.appendChild( createProductImageElement( imgObj, 'item_image' ) );
  divImage.addEventListener( 'click', ( event ) => itemClickListener( event, link ) );
  section.appendChild( divImage );
  return section;
}

async function addImages() {
  const data = await fetchAPI();
  console.log( data );
  avisoCarregando.remove();
  const sectionBody = document.querySelector('.body-images');
  for (let index = 0; index < data.length; index += 1) {
    const { link, usuario, upvotes, comentarios, criadoEm,imagens } = data[ index ];
    const imgObj = imagens.thumbnail.url;
    sectionBody.appendChild(
      createProductItemElement({ link, usuario: usuario.username, upvotes, comentarios, criadoEm, imgObj}),
    );
  }
}

document.addEventListener( "DOMContentLoaded", function () {
  addImages();
} );

