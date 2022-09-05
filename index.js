const moviesList = document.getElementById('movies-list')
const charactersList = document.getElementById('characters-list')
const movies = document.getElementById('movies')
const characters = document.getElementById('characters')
let elem = document.getElementById('s-t')
let elemento = document.getElementById('wr')

let moviesInfo = JSON.parse(localStorage.getItem('moviesInfo'))
let charactersInfo = JSON.parse(localStorage.getItem('charactersInfo'))


if(moviesInfo){
    renderFilmsAndCharacters()
}else{
    moviesInfo =[]
    charactersInfo =[]
    fetchFilms()
        .then(() => {
            fetchCharacters('https://swapi.dev/api/people/')
                .then(() => renderFilmsAndCharacters())
                .catch(error =>{
                    elem.innerHTML=`${error.message}`
                })
        })
        .catch(error =>{
            elem.innerHTML=`${error.message}`
        })
}


async function fetchFilms(){
    const resp = await fetch('https://swapi.dev/api/films/')
    if (!resp.ok) {
        const message = `An Error has occurred: ${resp.status}. Please try to reload the pag`;
        throw new Error(message);
    }
    const data = await resp.json()
    moviesInfo = data.results
    localStorage.setItem('moviesInfo', JSON.stringify(moviesInfo) )
}

async function fetchCharacters(pag){
    let res = await fetch(pag)
    if (!res.ok) {
        const message = `An Error has occurred: ${res.status}. Please try to reload the pag`;
        throw new Error(message);
    }
    let data = await res.json()
    charactersInfo = [...charactersInfo,...data.results ]
    if(data.next){
        await fetchCharacters(data.next)
    }else{
        localStorage.setItem('charactersInfo', JSON.stringify(charactersInfo) )
    }
}


function renderFilmsAndCharacters(){
    for(let i=0; i<moviesInfo.length; i++){
        moviesList.innerHTML+= `<div class="movOfList"> <a href="./movie.html" onclick="moviePag(${i})">${moviesInfo[i].title}</a></div>`
        movies.innerHTML += `
            <div class="movie" id=${moviesInfo[i].episode_id}>
                <h2 class="movie-title">${moviesInfo[i].title}</h2>
                <p class="description">${moviesInfo[i].opening_crawl}</p>
                <div class="movie-characters">
                    <h3>CHARACTERS IN THE FILM</h3>
                    ${charactersInMovie(moviesInfo[i].characters)}
                </div>
            </div>
        `
    }

    for(let i=0; i<charactersInfo.length; i++){
        
        charactersList.innerHTML+= `<div class="charOfList"> <a href="./character.html" onclick="chPag(${i})">${charactersInfo[i].name}</a></div>`
        characters.innerHTML+= `
            <div class="character" id=${charactersInfo[i].url}>
            <h2 class="character-name">${charactersInfo[i].name}</h2>
            <p>Hair Color: ${charactersInfo[i].hair_color} </p>
            <p class="by">Birth Year: ${charactersInfo[i].birth_year}</p>
            <div class="films-character">
                <h3>FILMS</h3>
                ${filmsIn(charactersInfo[i].films)}
                </div>
            </div>
        `
    }
}



function charactersInMovie(list){
    let nameList=''
    for(character of list){
        for (let i=0 ; i<charactersInfo.length; i++){
            if(character === charactersInfo[i].url){
                nameList+= `<div class="charOfMov"><a href="./character.html" onclick="chPag(${i})">${charactersInfo[i].name}</a></div>`
            }
        }
    }
    return nameList
}

function chPag(i){
    localStorage.setItem('characterInfo', JSON.stringify(charactersInfo[i]) )
}


function filmsIn(list){
    let filmList = ''
    
    for (film of list){
        for (let i=0 ; i<moviesInfo.length; i++){
            
            if(film === moviesInfo[i].url){
                filmList+= `<div class="filmsOfChar"><a href="./movie.html" onclick="moviePag(${i})">${moviesInfo[i].title}</a></div>`
            }
        }
    }
    return filmList
}

function moviePag(i){
    localStorage.setItem('movieInfo', JSON.stringify(moviesInfo[i]) )
}


window.addEventListener('scroll', () => {
    const current = window.scrollY
    console.log("y: ",current)
    elemento.style.transform = `translateY(${-34800+current}px ) rotateX(60deg)`
    elem.style.transform = ` translateZ(${23500-(current/1.5)}px) translateY(${27000-(current/1.3)}px) rotateX(${40+(current/69571)}deg)`
})