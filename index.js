const moviesList = document.getElementById('movies-list')
const charactersList = document.getElementById('characters-list')
const movies = document.getElementById('movies')
const characters = document.getElementById('characters')
let moviesInfo = []
let charactersInfo = []

async function fetchFilms(){
    const resp = await fetch('https://swapi.dev/api/films/')
    const data = await resp.json()
    return data
}


fetchFilms()
    .then(data => {
        moviesInfo = data.results
        for(movie of data.results){
            moviesList.innerHTML+= `<div> <a href="#${movie.episode_id}">${movie.title}</a></div>`
            movies.innerHTML += `
                <div class="movie" id=${movie.episode_id}>
                    <h2 class="movie-title">${movie.title}</h2>
                    <p class="description">${movie.opening_crawl}</p>
                    <div class="movie-characters">
                        <h3>Characters that appear in the film</h3>
                        ${charactersInMovie(movie.characters)}
                    </div>
                </div>
            `
        }
    })

function charactersInMovie(list){
    let nameList
    for(character of list){
        for (let i=0 ; i<charactersInfo.length; i++){
            if(character === charactersInfo[i].url){
                nameList+= `<div><a href="#${character}">${charactersInfo[i].name}</a></div>`
            }
        }
    }
    // console.log(nameList)
    return nameList
}

fetch('https://swapi.dev/api/people/')
    .then(res => res.json())
    .then(data => {
        renderCharacters(data)
    })

async function renderCharacters(data){
    charactersInfo = [...charactersInfo,...data.results ]
    for(person of data.results){
        charactersList.innerHTML+= `<div><a href="#${person.url}">${person.name}</a></div>`
        characters.innerHTML+= `
            <div class="character" id=${person.url}>
            <h2 class="character-name">${person.name}</h2>
            <p>Hair Color: ${person.hair_color} </p>
            <p>Birth Year: ${person.birth_year}</p>
            <h3>Films</h3>
            ${filmsIn(person.films)}
            </div>
        `
    }
    if(data.next){
        const res = await fetch(data.next)
        const newPag = await res.json()
        renderCharacters(newPag)
    }
}

function filmsIn(list){
    let filmList
    
    for (film of list){
        console.log(film,'film')
        console.log(moviesInfo[0],'movieINFOurl')
        for (let i=0 ; i<moviesInfo.length; i++){
            
            if(film === moviesInfo[i].url){
                console.log('entre al if')
                filmList+= `<div><a href='#${film}'>${moviesInfo[i].title}</a></div>`
            }
        }
    }
    console.log(filmList)
    return filmList
}



    