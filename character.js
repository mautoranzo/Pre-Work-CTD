const character = JSON.parse(localStorage.getItem('characterInfo'))
const ch = document.getElementById('s-t-ch')
const fetchAll = character.films.map(ch=> fetch(ch))
let filmList 

let moviesInfo = []


renderCharacter()


async function renderCharacter(){
    ch.innerHTML= `
        <div class="character" id=${character.url}>
            <h2 class="character-name">${character.name}</h2>
            <p>Hair Color: ${character.hair_color} </p>
            <p>Birth Year: ${character.birth_year}</p>
            <h3>FILMS</h3>
            ${await getFilms()}
            </div>
    `
}


async function getFilms(){
    let htmlList = ''
    await Promise.all(fetchAll)
        .then(res => {
            return Promise.all(res.map(r => r.json()))
        })
        .then(data => {
            console.log(data)
            moviesInfo = data
            filmList = data.map(film => film.title)
            console.log(filmList)
            for (let i=0; i<filmList.length; i++){
                htmlList += `<div class="filmsOfCh"><a href="./movie.html" onclick="moviePag(${i})">${filmList[i]}</a></div>`
            }
        })
        console.log(htmlList,'html')
        return htmlList
}

function moviePag(i){
    localStorage.setItem('movieInfo', JSON.stringify(moviesInfo[i]) )
}