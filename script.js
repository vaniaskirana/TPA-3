// key_ap ku : 31925dc964dd291d1c9e38f82a6d0eb1

const api_key = 'api_key=31925dc964dd291d1c9e38f82a6d0eb1';
const base_url ='https://api.themoviedb.org/3';
const api_url = base_url + '/discover/movie?sort_by=popularity.desc&'
+api_key;

const img_url = 'https://image.tmdb.org/t/p/w500';
const search_url = base_url + '/search/movie?' + api_key;



const main = document.getElementById('main');


const form = document.getElementById('form');
const search = document.getElementById('search');

getMovies(api_url);

function getMovies(url){
    fetch(url).then(response => response.json()).then(data => {
        // console.log(data); untuk check berhasil oyee
        console.log(data.results)
        showMovies(data.results);
    })
}

function showMovies(data){
    main.innerHTML='';



    data.forEach(movie => {
        const {title, poster_path, release_date, vote_average, overview} = movie;
        const movieKu = document.createElement('div');
        movieKu.classList.add('movie');
        movieKu.innerHTML = `
            <img src="${img_url+poster_path}" alt="${title}">
            <div class="date">
                <p>Release Date : ${release_date}</p>
            </div>
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getColor(vote_average)}">${vote_average}</span> 
            </div>


            <div class="overview">
                <h3>Overview</h3>
                ${overview}
                </div>
        
        `


        main.appendChild(movieKu);
    })

}


function getColor(vote){
    if(vote >= 8){
        return 'green'
    } else if(vote >= 5){
        return "orange"
    } else {
        return 'red'
    }
}


form.addEventListener(`submit`, (e) => {
    e.preventDefault();

    const searchTerm = search.value;

    if(searchTerm){
        getMovies(search_url+'&query='+searchTerm)
    } else{
        getMovies(api_url);
    }

})