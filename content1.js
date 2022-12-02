let movieData = []
let mainContainer= document.getElementsByClassName("main-content")[0]

function callSV(){
    let data = {pageNumber: 12}
    console.log("hello")
    fetch("https://mymovieshub.vercel.app/searchByGenre", {
        method: 'POST',
        body: JSON.stringify(data)
    }).then(response => {
        return response.json()
    }).then( data => {
        movieData = data.filter((currentValue, index) => {
            if(index < 12){
                return currentValue;
            }
        });
        
        console.log(movieData)
        mainContainer.innerHTML= "";
        movieData.forEach(data => {
            let genres= ""
            for(let index = 0; index < data.genres.length; index++) {
                const element = data.genres[index];
                genres += `<div class="movie-genre">${element}</div>`;
            }
            mainContainer.insertAdjacentHTML("beforeend", 
             `<div class="display-block" style="background-image: url(${data.thumbnail});">
                <div class="movie-info">
                <div class="movie-release"><span class="primary">Release: </span>${data.release_date}</div>
                <div class="movie-genre"><span class="primary">Genre: </span>${genres}
                </div>
                </div>
             </div>`
            )
        })
    }).catch(error => {
        console.log(error)
    })

}

document.addEventListener('DOMContentLoaded', callSV(), false);


// genres
// : 
// Array(3)
// 0
// : 
// "Action"
// 1
// : 
// "Fantasy"
// 2
// : 
// "Science Fiction"
// length
// : 
// 3
// [[Prototype]]
// : 
// Array(0)
// posterImage
// : 
// "https://image.tmdb.org/t/p/w500/bQXAqRx2Fgc46uCVWgoPz5L5Dtr.jpg"
// release_date
// : 
// "2022-10-19"
// synopsis
// : 
// "Nearly 5,000 years after he was bestowed with the almighty powers of the Egyptian gods—and imprisoned just as quickly—Black Adam is freed from his earthly tomb, ready to unleash his unique form of justice on the modern world."
// thumbnail
// : 
// "https://image.tmdb.org/t/p/w500/pFlaoHTZeyNkG83vxsAJiGzfSsa.jpg"
// title
// : 
// "Black Adam"