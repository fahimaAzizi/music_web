
console.log("Let's write JavaScript");

async function main() {
    let a = await fetch("http://127.0.0.1:5500/music/songs/");
    let response = await a.text();
    console.log(response);

    let div = document.createElement("div");
    div.innerHTML = response;

    let tds = div.getElementsByTagName("td");
    console.log(tds);
}

main();














// async function main() {
//     console.log('Lets write JavaScript');

//     let currentSong = new Audio();
//     let songs = [];
//     let currFolder = '';

//     function secondsToMinutesSeconds(seconds) {
//         if (isNaN(seconds) || seconds < 0) {
//             return "00:00";
//         }

//         const minutes = Math.floor(seconds / 60);
//         const remainingSeconds = Math.floor(seconds % 60);

//         return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
//     }

//     async function getSongs(folder) {
//         currFolder = folder;
//         let response = await fetch(`/${folder}/`);
//         if (!response.ok) {
//             console.error("Failed to fetch folder content");
//             return [];
//         }

//         let text = await response.text();
//         let div = document.createElement("div");
//         div.innerHTML = text;
//         let as = div.getElementsByTagName("a");
        
//         songs = Array.from(as).filter(a => a.href.endsWith(".mp3")).map(a => a.href.split(`/${folder}/`)[1]);

//         let songUL = document.querySelector(".songList ul");
//         if (!songUL) {
//             console.error("songList UL element not found");
//             return [];
//         }

//         songUL.innerHTML = songs.map(song => `
//             <li>
//                 <img class="invert" width="34" src="img/music.svg" alt="">
//                 <div class="info">
//                     <div>${song.replaceAll("%20", " ")}</div>
//                     <div>Harry</div>
//                 </div>
//                 <div class="playnow">
//                     <span>Play Now</span>
//                     <img class="invert" src="img/play.svg" alt="">
//                 </div>
//             </li>
//         `).join("");

//         Array.from(songUL.getElementsByTagName("li")).forEach((e, index) => {
//             e.addEventListener("click", () => {
//                 playMusic(songs[index]);
//             });
//         });

//         return songs;
//     }

//     const playMusic = (track, pause = false) => {
//         currentSong.src = `/${currFolder}/` + track;
//         if (!pause) {
//             currentSong.play().catch(err => console.error("Playback failed:", err));
//             document.getElementById('play').src = "img/pause.svg";
//         }

//         document.querySelector(".songinfo").textContent = decodeURI(track);
//         document.querySelector(".songtime").textContent = "00:00 / 00:00";
//     };

//     async function displayAlbums() {
//         let response = await fetch(`/songs/`);
//         if (!response.ok) {
//             console.error("Failed to fetch albums");
//             return;
//         }

//         let text = await response.text();
//         let div = document.createElement("div");
//         div.innerHTML = text;
//         let anchors = div.getElementsByTagName("a");
//         let cardContainer = document.querySelector(".cardContainer");
//         if (!cardContainer) {
//             console.error("cardContainer not found");
//             return;
//         }

//         for (let anchor of anchors) {
//             if (anchor.href.includes("/songs") && !anchor.href.includes(".htaccess")) {
//                 let folder = anchor.href.split("/").slice(-2)[0];
//                 let metadata = await fetch(`/songs/${folder}/info.json`).then(res => res.json()).catch(() => null);

//                 if (metadata) {
//                     cardContainer.innerHTML += `
//                         <div data-folder="${folder}" class="card">
//                             <div class="play">
//                                 <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
//                                     <path d="M5 20V4L19 12L5 20Z" stroke="#141B34" fill="#000" stroke-width="1.5" stroke-linejoin="round" />
//                                 </svg>
//                             </div>
//                             <img src="/songs/${folder}/cover.jpg" alt="">
//                             <h2>${metadata.title}</h2>
//                             <p>${metadata.description}</p>
//                         </div>`;
//                 }
//             }
//         }

//         document.querySelectorAll(".card").forEach(e => {
//             e.addEventListener("click", async () => {
//                 let folder = e.dataset.folder;
//                 songs = await getSongs(`songs/${folder}`);
//                 if (songs.length) playMusic(songs[0]);
//             });
//         });
//     }

//     currentSong.addEventListener("timeupdate", () => {
//         let currentTime = secondsToMinutesSeconds(currentSong.currentTime);
//         let duration = secondsToMinutesSeconds(currentSong.duration);
//         document.querySelector(".songtime").textContent = `${currentTime} / ${duration}`;

//         document.querySelector(".circle").style.left = (currentSong.currentTime / currentSong.duration) * 100 + "%";
//     });

//     document.querySelector(".seekbar").addEventListener("click", e => {
//         let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
//         document.querySelector(".circle").style.left = percent + "%";
//         currentSong.currentTime = (currentSong.duration * percent) / 100;
//     });

//     await getSongs("songs/ncs");
//     await displayAlbums();
//     playMusic(songs[0], true);
// }

// main().catch(err => console.error("Error initializing app:", err));
