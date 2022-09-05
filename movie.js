const movie = JSON.parse(localStorage.getItem('movieInfo'))
const film = document.getElementById('s-t-m')
const film123 = document.getElementById('wr-m')
const fetchAll = movie.characters.map(ch=> fetch(ch))
let chList 

let charactersInfo = []

renderMovie()

async function renderMovie(){
    if(movie.episode_id>3){
        film.innerHTML= `
            <div class="movie" id=${movie.episode_id}>
            <h2 class="movie-title">${movie.title}</h2>
            <p class="description">${movie.opening_crawl}</p>
            <div class="movie-characters">
                <h3>CHARACTERS IN THE FILM</h3>
                ${await getCharacters()}
            </div>
            </div>
        `
    } else{
        film123.innerHTML= `
            <div class="ep123">
                <div class="movie" id=${movie.episode_id}>
                    <h2 class="movie-title">${movie.title}</h2>
                    <p class="description">${movie.opening_crawl}</p>
                    <div class="movie-characters">
                        <h3>CHARACTERS IN THE FILM</h3>
                        ${await getCharacters()}
                    </div>
                </div>
            </div>
        `
    }
    
}

async function getCharacters(){
    let htmlList = ''
    await Promise.all(fetchAll)
        .then(res => {
            return Promise.all(res.map(r => r.json()))
        })
        .then(data => {
            console.log(data,'data')
            charactersInfo = data
            chList = data.map(ch => ch.name)
            console.log(chList)
            for (let i=0; i<chList.length; i++){
                htmlList += `<div class="charOfFilm"><a href="./character.html" onclick="chPag(${i})">${chList[i]}</a></div>`
            }
        })
        console.log(htmlList,'html')
        return htmlList
}

function chPag(i){
    localStorage.setItem('characterInfo', JSON.stringify(charactersInfo[i]) )
}