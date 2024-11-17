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
  
    
    var audio = new Audio(songs[1]);
    audio.play();
  
    audio.addEventListener("loadeddata", () => {
      let duration = audio.duration;
     
      console.log(`Duration: ${duration} seconds`);
    });
  }
  
  main();
  
