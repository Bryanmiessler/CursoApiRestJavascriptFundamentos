const api = axios.create({
  baseURL: 'https://api.thecatapi.com/v1'
})
api.defaults.headers.common['X-API-KEY'] = 'live_IsosBZPWVknBjuAzHHN9nUnHgRniy2ZjMAydCAkUmwxKDWIjREXIxsU5Hf3MzU2v';

const API_KEY = 'live_IsosBZPWVknBjuAzHHN9nUnHgRniy2ZjMAydCAkUmwxKDWIjREXIxsU5Hf3MzU2v';
const API_URL_RANDOM = "https://api.thecatapi.com/v1/images/search?limit=2";
const API_URL_FAVORITES = `https://api.thecatapi.com/v1/favourites`;
const API_URL_FAVORITES_DELETE = (id) => `https://api.thecatapi.com/v1/favourites/${id}`;
const API_URL_UPLOAD = `https://api.thecatapi.com/v1/images/upload`;

const spanError = document.getElementById('error');

async function loadRandomMichis () {
  const res = await fetch(API_URL_RANDOM, {
    method: 'GET',
    headers: {
      'x-api-key': API_KEY,
    }
  });
  const data = await res.json();
  console.log('Random')
  console.log(data)

  if(res.status !== 200){
    spanError.innerHTML = "Hubo un error " + res.status;
  } else {
    const img1 = document.getElementById('img1');
    const img2 = document.getElementById('img2');
    const btn1 = document.getElementById('btn1');
    const btn2 = document.getElementById('btn2');
    
    img1.src = data[0].url;
    img2.src = data[1].url;

    btn1.onclick = () => saveFavoriteMichi(data[0].id);
    btn2.onclick = () => saveFavoriteMichi(data[1].id);
  }
}

async function loadFavoritesMichis () {
  const res = await fetch(API_URL_FAVORITES, {
    method: 'GET',
    headers: {
      'x-api-key': API_KEY,
    }
  });
  const data = await res.json();
  console.log('Favoritos')
  console.log(data)

  if(res.status !== 200){
    spanError.innerHTML = "Hubo un error en favoritos " + data.message;
  } else {
    const toRender = [];
    const section = document.querySelector('#favoriteMichis');

    section.innerHTML = "";
    const h2 = document.createElement('h2');
    const h2Text = document.createTextNode('Michis Favoritos');

    h2.append(h2Text);
    section. append(h2);

    data.forEach(element => {
      const art = document.createElement('article');
      const img = document.createElement('img');
      const btn = document.createElement('button');
      const textBtn = document.createTextNode('Sacar gatito de Favoritos');

      btn.append(textBtn);
      btn.onclick = () => deleteFavoriteMichi(element.id);
      img.src = element.image.url;
      img.width = 150;

      art.append(img, btn);
      toRender.push(art);
    });
    section.append(...toRender);
  }
}

async function saveFavoriteMichi (id) {

  const { data, status } = await api.post('/favourites', {
    image_id: id,
  })
  // const res = await fetch (API_URL_FAVORITES, {
  //   method: 'POST',
  //   headers: {
  //     "Content-Type": "application/json",
  //     'x-api-key': API_KEY,
  //   },
  //   body: JSON.stringify({
  //       image_id: id
  //   }),
  // })

  // const data = await res.json();
  
  console.log("Save");
  // console.log(res);

  if (status !== 200) {
    spanError.innerHTML = "Hubo un error: " + status + data.message;
  } else {
    console.log('Michi guardado en favoritos');
    loadFavoritesMichis();
  }
}

async function deleteFavoriteMichi(id) {
  const res = await fetch(API_URL_FAVORITES_DELETE(id), {
    method: 'DELETE',
    headers:{
      "Content-Type": "application/json",
      "x-api-key": API_KEY
    }
  })

  const data = await res.json();

  if (res.status !== 200) {
    spanError.innerHTML = "Hubo un error: " + res.status + data.message;
  } else {
    console.log('Michi eliminado de favoritos');
    loadFavoritesMichis();
  }
}

async function uploadMichiPhoto() {
  const form_data = new FormData(document.getElementById('uploadingForm'));

  console.log(form_data.get('file'));

  const res = await fetch(API_URL_UPLOAD, {
    method: 'POST',
    headers: {
      // 'Content-Type': 'multipart/form-data',
      'x-api-key': API_KEY,
    },
    body: form_data,
  })

  const data = await res.json();

  if (res.status !== 201) {
    spanError.innerHTML = `Hubo un error al subir michi: ${res.status} ${data.message}`
  }
  else {
      console.log("Foto de michi cargada :)");
      console.log({ data });
      console.log(data.url);
      saveFavoriteMichi(data.id) //para agregar el michi cargado a favoritos.
  }
}

loadRandomMichis()
loadFavoritesMichis()