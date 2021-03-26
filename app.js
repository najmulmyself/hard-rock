const searchBtn = () => {
    let searchArea = document.getElementById('searchArea').value;
    let url = `https://api.lyrics.ovh/suggest/${searchArea}`
    fetch(url)
    .then(res => res.json())
    .then(data => displaySongs(data.data))
}

const displaySongs = songs => {
    let songContainer = document.getElementById('song-container');
    songContainer.innerHTML = ''; // to clean the previous search result ;
    songs.forEach(song => {
        let Div = document.createElement('div');
        Div.className = 'single-result row align-items-center my-3 p-3';
        Div.innerHTML = `<div class="col-md-9">
            <h3 class="lyrics-name">${song.title}</h3>
            <p class="author lead">Album by <span>${song.artist.name}</span></p>
            </div>
            <div class="col-md-3 text-md-right text-center">
            <button onClick="getLyric('${song.artist.name}','${song.title}')" class="btn btn-success">Get Lyrics</button>
            </div>
            <audio controls>
            <source src="${song.preview}" type="audio/ogg">
            </audio>
        `;
        songContainer.appendChild(Div);
    });
}

let getLyric = (artist,title) =>{
    let url = `https://api.lyrics.ovh/v1/${artist}/${title}`
    fetch(url)
    .then(res => res.json())
    .then(data => {
        let showLyric = document.getElementById('lyrics');
        showLyric.innerText = data.lyrics;
    }
    )
}