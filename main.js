// import keys from 'environment'; 
// const {keys} = require("./environment"); 
// console.log(keys.privateKey)

var characters = [];

function getCharacters() {
	// getting keys from environment.js
	const publicKey = environmentKeys.publicKey;
	const privateKey = environmentKeys.privateKey;


	const ts = Date.now();
	// encryption library spark MD5
  const hash = SparkMD5.hash(ts + privateKey + publicKey);
	const URL = `http://gateway.marvel.com:80/v1/public/series/24229/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}`;
	

  fetch(URL).then(response =>
		response.json().then((res) => {
			characters = res.data.results;
			console.log(characters);
			insertCharacters();
	}));
}

function insertCharacters() {
	var cardGroup = document.querySelector(".card-group");
	var cards = "";

	for(i = 0; i < characters.length; i++){
		cards = cards + `
		<div class="flex card">
			<img src="${characters[i].thumbnail.path + '/standard_fantastic.' + characters[i].thumbnail.extension}" alt="${characters[i].name} imagem">
			<h2>${characters[i].name}</h2>
		</div>`
		// standard_fantastic is the size of the image. https://developer.marvel.com/documentation/images
	}
	// inserting the images on index
	cardGroup.innerHTML = cards;
}