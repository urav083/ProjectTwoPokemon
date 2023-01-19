// create namespaced object
const pokemon = {};

// define endpoint
// filter array down to 3 types(water, fire, grass)
pokemon.urls = ['https://pokeapi.co/api/v2/type/10/', 'https://pokeapi.co/api/v2/type/11/', 'https://pokeapi.co/api/v2/type/12/'];
pokemon.urlPokeSprite = ['https://pokeapi.co/api/v2/pokemon/'];


// fetch url, sorted by map so to interact as an array with objects within
pokemon.myResult = pokemon.urls.map((url) => {
    return fetch(url)
        .then(response => {
            return response.json()
        })
        .then(data => {
            console.log(data);
            return data;
        })
});

// since fetch is returned, need to use promise so to open fulfilled array from pokemon.myResult
pokemon.promise = function() {
    Promise.all(pokemon.myResult)
        .then(pokedata => {

            //function to display/hide enemy pokemon before battle starts
            // pokemon.enemyDisplayer(finalPoke, finalPokeType);

        });
}

// Function to display enemy pokemon, before battle starts to show player
pokemon.enemyDisplayer = function(finalPoke, finalPokeType) {
    const enemyName = (finalPoke.pokemon.name);
    const enemyPic = document.querySelectorAll('.enemyPic');

    fetch(`https://pokeapi.co/api/v2/pokemon/${enemyName}`)
        .then((response) => {
            return response.json();
        }).then(data => {
            const sprites = data.sprites;
            const spritesURL = sprites.other.home.front_default;
            enemyPic[0].src = spritesURL;
            enemyPic[1].src = spritesURL;
            enemyPic[2].src = spritesURL;
        })
        .catch(error => console.error(error));
    const enemyTypeSpan = document.querySelector(".enemyType");
    enemyTypeSpan.textContent = `${finalPokeType}`;
    const enemyNameSpan = document.querySelector(".enemyName");
    enemyNameSpan.textContent = `${finalPoke.pokemon.name}`;
}

//randomizing function
pokemon.getRandomInt = function(max) {
    return Math.floor(Math.random() * max);
}

// function to help hide certain queries, so to progress on the same page
pokemon.pageTurnerOne = function() {

    const button1 = document.querySelector("#continueToFight");
    const pageOne = document.querySelector(".testWrapper");
    const pageTwo = document.querySelector(".indexBattleScreen");

    button1.addEventListener('click', () => {
        pageOne.style.display = "none"
        pageTwo.style.display = "flex"

    });
}

pokemon.init = function() {
    pokemon.promise();
    // should not be called at beginning. delete after calling later.
    // pokemon.pageTurnerOne();
};

pokemon.init();