querystring = [
  '?',
  'limit=2',
].join('');

const API_URL_RANDOM = `https://api.thecatapi.com/v1/images/search${querystring}&api_key=live_sRIdx3vgCveYbZH5ES1E2pcs1sq0AwdmMhpruYEj7JJT0cYeYbahedl7ohhwXlQb`;
const API_URL_FAVORITES = `https://api.thecatapi.com/v1/favourites?api_key=live_sRIdx3vgCveYbZH5ES1E2pcs1sq0AwdmMhpruYEj7JJT0cYeYbahedl7ohhwXlQb`;

const spanError = document.getElementById('error');

async function loadRandomMichis () {
  const res = await fetch(API_URL_RANDOM);
  const data = await res.json();
  console.log(data);

  if(res.status !== 200){
    spanError.innerText = "Hubo un error" + res.status;
  } else {
    const img1 = document.getElementById('img1');
    const img2 = document.getElementById('img2');
    
    img1.src = data[0].url;
    img2.src = data[1].url;
  }
}

async function loadFavoritesMichis () {
  const res = await fetch(API_URL_FAVORITES);
  const data = await res.json();

  if(res.status !== 200){
    spanError.innerText = "Hubo un error" + res.status + data.message;
  }
}

async function saveFavoriteMichis () {
  const res = fetch (API_URL_FAVORITES, {
    method: 'POST',
  })
  
  console.log("save");
  console.log(res);
}

loadRandomMichis()
loadFavoritesMichis()