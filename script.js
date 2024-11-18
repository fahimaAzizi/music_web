console.log("Let's write JavaScript");

async function gitSongs() {
    let a = await fetch("file:///C:/Users/Mcm/Desktop/DATA/desktop%20data/music/songs/");
    let response = await a.text();
    console.log(response);

    let div = document.createElement("div");
    div.innerHTML = response;
    let as = div.getElementsByTagName("a");
    let songs = [];

    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith(".mp3")) {
            songs.push(element.href);
        }
    }

    return songs
}

async function main() {

let songs = await getSongs();
console.log(songs);

let songUL = document.querySelector(".songlist").getElementsByTagName("ul")[0];
for (const song of songs) {
    songUL.innerHTML = songUL.innerHTML + `<li><img class="invert" width="34" src="music.svg" alt="">
    <div class="info">
        <div>${song.replaceAll("%20", " ")}</div>
        <div>Harry</div>
    </div>
    <div class="playnow">
        <span>Play Now</span>
        <img class="invert" src="play.svg" alt="">
    </div>
    </li>`;
}




audio.addEventListener("loadeddata", () => {
   console.log(audio.duration,audio.currentSrc, audio.currentTime)
});

  }
  
  main();
  
