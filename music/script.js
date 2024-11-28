
async function main() {
    console.log('Lets write JavaScript');

    let currentSong = new Audio();
    let songs = [];
    let currFolder = 'music/songs'; // Set your folder path here
    let currentSongIndex = 0; // Keep track of the current song index

    // Convert seconds to minutes:seconds format
    function secondsToMinutesSeconds(seconds) {
        if (isNaN(seconds) || seconds < 0) {
            return "00:00";
        }

        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);

        return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
    }

    // Fetch songs from the folder (assuming you're using specific URLs like song3.mp3)
    async function getSongs(folder) {
        currFolder = folder;
        let response = await fetch(`/${folder}/`);
        if (!response.ok) {
            console.error("Failed to fetch folder content");
            return [];
        }

        let text = await response.text();
        let div = document.createElement("div");
        div.innerHTML = text;
        let as = div.getElementsByTagName("a");
        
        // Update this line if songs are not directly in the folder but need a specific URL
        songs = Array.from(as).filter(a => a.href.endsWith(".mp3")).map(a => a.href.split(`/${folder}/`)[1]);

        let songUL = document.querySelector(".songList ul");
        if (!songUL) {
            console.error("songList UL element not found");
            return [];
        }

        songUL.innerHTML = songs.map(song => {
            // Check if the song is song2.mp3
            const isSadVibesSong = song === "song2.mp3"; // Check if it's song2.mp3
        
            return `
                <li>
                    <img class="invert" width="34" src="music.svg" alt="">
                    <div class="info">
                        <div>${song.replaceAll("%20", " ")}</div>
                        <div>${isSadVibesSong ? "Sad Vibes" : "Artist Name"}</div> <!-- Show Sad Vibes for song2 -->
                    </div>
                    <div class="playnow">
                        <span>Play Now</span>
                        <img class="invert" src="play.svg" alt="">
                    </div>
                </li>
            `;
        }).join("");
        

        Array.from(songUL.getElementsByTagName("li")).forEach((e, index) => {
            e.addEventListener("click", () => {
                playMusic(songs[index]);
            });
        });

        return songs;
    }

    // Play the music with the track passed to it
    const playMusic = (track, pause = false) => {
        // Directly use your song URL here
        currentSong.src = `http://127.0.0.1:5500/music/songs/${track}`;
        if (!pause) {
            currentSong.play().catch(err => console.error("Playback failed:", err));
            document.getElementById('play').src = "pause.svg"; // Change to pause icon
        }

        document.querySelector(".songinfo").textContent = decodeURI(track);
        document.querySelector(".songtime").textContent = "00:00 / 00:00";
    };

    // Play next song
    const playNextSong = () => {
        currentSongIndex = (currentSongIndex + 1) % songs.length; // Wrap around to the first song if at the end
        playMusic(songs[currentSongIndex]);
    };

    // Play previous song
    const playPreviousSong = () => {
        currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length; // Wrap around to the last song if at the beginning
        playMusic(songs[currentSongIndex]);
    };

    // Handle Play/Pause button click
    document.querySelector("#play").addEventListener("click", () => {
        if (currentSong.paused) {
            currentSong.play().catch(err => console.error("Playback failed:", err));
            document.getElementById('play').src = "pause.svg"; // Change to pause icon
        } else {
            currentSong.pause();
            document.getElementById('play').src = "play.svg"; // Change to play icon
        }
    });

    // Update song time on play
    currentSong.addEventListener("timeupdate", () => {
        let currentTime = secondsToMinutesSeconds(currentSong.currentTime);
        let duration = secondsToMinutesSeconds(currentSong.duration);
        document.querySelector(".songtime").textContent = `${currentTime} / ${duration}`;

        document.querySelector(".circle").style.left = (currentSong.currentTime / currentSong.duration) * 100 + "%";
    });

    // Handle seekbar click event
    document.querySelector(".seekbar").addEventListener("click", e => {
        let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
        document.querySelector(".circle").style.left = percent + "%";
        currentSong.currentTime = (currentSong.duration * percent) / 100;
    });

    // Initialize songs and albums (example with song3.mp3)
    await getSongs("music/songs");  // Update with your folder path
    await displayAlbums();
    playMusic(songs[0]);  // Play the first song on load

    // Event listeners for next and previous buttons
    document.querySelector("#next").addEventListener("click", playNextSong);
    document.querySelector("#prev").addEventListener("click", playPreviousSong);
}

main().catch(err => console.error("Error initializing app:", err));
