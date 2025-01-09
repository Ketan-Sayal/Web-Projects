const searchBox = document.getElementById("search-box");
const searchBtn = document.getElementById("search-btn");
const movieSection = document.querySelector(".movie-section");
const form = document.getElementById('form');
const descArea = document.getElementById("desc-area");
const Desc = document.getElementById("desc");
const closeBtn = document.getElementById("close-btn");

function genere(data) {
    let genres = data.Genre.split(", ");
    return genres.join(" | ");
}
fetchMovieData= async(name)=>{
    try {
        movieSection.innerHTML ='<h1 class="text-3xl font-bold">Fetching Movie...<h1>';
        let data = await fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=b99da10&t=${name}`);
        let response = await data.json();
        console.log(response);
        Desc.textContent = response.Plot;
        movieSection.innerHTML = `<img src="${response.Poster}" alt="img" class="w-[25%] h-[47%] md:w-[19%] md:h-[56%]">
             <p class="font-bold my-3 ml-3">Genre: ${genere(response)}</p>
             <p class="font-bold my-3 ml-3">Rating: ${response.imdbRating}</p>
             <p class="font-bold my-3 ml-3">Year: ${response.Year}</p>
             <button class="my-3 hover:text-black hover:bg-white text-sm cursor-pointer bg-transparent border-2 border-white px-2 py-1 rounded-md font-semibold transition-all delay-300 ease-in-out ml-3" id="desc-btn">Description</button>`;
        const descBtn = document.getElementById("desc-btn");
        descBtn.addEventListener("click", function () { 
            descArea.classList.toggle("hidden");
        });
        if (response.Error == "Movie not found!") {
            movieSection.innerHTML = `<h1 class="text-3xl font-bold">Movie not found!</h1>`;
            return;
        }
    } catch (error) {
        movieSection.innerHTML = `<h1 class="text-3xl font-bold">Some error has occured!</h1>`; 
    }
}

form.addEventListener("submit", function (e) { 
    e.preventDefault();
    let searchTerm = searchBox.value;
    // console.log(searchTerm);
    fetchMovieData(searchTerm);
});

closeBtn.addEventListener("click", function () { 
    descArea.classList.toggle("hidden");
});