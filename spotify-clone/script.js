let currentSong = new Audio();
let songs;
let currFolder;
function formattime(seconds) {
    if (isNaN(seconds) || seconds < 0) return "00:00";

    let mins = Math.floor(seconds / 60);
    let secs = Math.floor(seconds % 60);

    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}

async function getSongs(folder) {



    // let a= await fetch(`http://127.0.0.1:5500/spotify-clone/songs`)
    currFolder = folder;
    let a = await fetch(`/web-development-projects/spotify-clone/${folder}`)
    let response = await a.text()
    let div = document.createElement("div")
    div.innerHTML = response
    let as = div.getElementsByTagName("a");
    songs = []
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith("mp3")) {
            songs.push(element.href.split(`/${folder}/`)[1])
            // songs.push(element.href.split(`/songs/`)[1])

        }

    }
    let songul = document.querySelector(".listsongs").getElementsByTagName("ul")[0];
    songul.innerHTML = ""
    for (const song of songs) {
        songul.innerHTML = songul.innerHTML + `<li>
        <img class="invert" src="icons/music.svg" alt="musicicon">
                <div class="songinfo">
                    <div>${song.replaceAll("%20", "")}</div>
                    <div >~Dinesh</div>
                </div>
                <div  class="playmusic" >
                    <span style="color:white">Play Now</span>
                    <img class="invert" src="icons/playicon.svg" alt=""></div>
        
        
        
        </li>`;
    }



    Array.from(document.querySelector(".listsongs").getElementsByTagName("li")).forEach(e => {
        e.addEventListener("click", element => {
            console.log(e.querySelector(".songinfo").firstElementChild.innerHTML)
            playMusic(e.querySelector(".songinfo").firstElementChild.innerHTML)

        })
    })
}



const playMusic = (track, pause) => {
    // currentSong.src = `/${currFolder}/` + track
    currentSong.src = `/web-development-projects/spotify-clone/${currFolder}/` + track
    // currentSong.src=`/songs/`+track

    if (pause == true) {
        play.src = "icons/playicon.svg"
        pause = false
        currentSong.play()

        document.getElementById("playersonginfo").innerHTML = track
        document.querySelector(".songtime").innerHTML = "00:00/00:00"

    }
    else {
        currentSong.play()
        play.src = "icons/pause.svg"
        document.getElementById("playersonginfo").innerHTML = track
        document.querySelector(".songtime").innerHTML = "00:00/00:00"

    }



}


async function displayAlbums() {


    let a = await fetch(`/web-development-projects/spotify-clone/songs/`)
    let response = await a.text()
    let div = document.createElement("div")
    div.innerHTML = response
    let anchors = div.getElementsByTagName("a")
    let array=Array.from(anchors)
    let cardcontainer=document.querySelector(".cardcontainer")
for (let index = 0; index < array.length; index++) {
    const e = array[index];
    

    
        if (e.href.includes("/songs/")) {
            let folder = e.href.split("/").slice(-2)[1];
            console.log(folder);

            let a = await fetch(`/web-development-projects/spotify-clone/songs/${folder}/info.json`)
            let response = await a.json()
            console.log(response);
            cardcontainer.innerHTML = cardcontainer.innerHTML + ` <div class="card" data-folder="ncs">
                        <div class="play">
                            <svg width='16' height='16' viewbox="0 0 24 24" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path d="M5 20V4L19 12L5 20Z" fill="#000" stroke="#141B34" stroke-width="1.5"
                                    stroke-linejoin="round">
                            </svg>
                        </div>

                        <img src="songs/${folder}/cover.jfif" alt="">
                        <h2>${response.title}</h2>
                        <p>${response.description}</p>

                    </div>`

        }
    }


    //load playlist whenever it is clicked
  Array.from(document.getElementsByClassName("card")).forEach((e) => {
        e.addEventListener("click", async item => {
            console.log(item.currentTarget.dataset);

            songs = await getSongs(`songs/${item.currentTarget.dataset.folder}`)
        })
    })

}

async function main() {

    await getSongs("songs/ncs")

    // currentSong.src = `songs/${songs[0]}`
    currentSong.src = `/web-development-projects/spotify-clone/${currFolder}/` + songs[0]
    document.getElementById("playersonginfo").innerHTML = songs[0]
    document.querySelector(".songtime").innerHTML = "00:00/00:00"


    // add card containers dynamically when page load
    displayAlbums()


    play.addEventListener("click", () => {
        if (currentSong.paused) {
            currentSong.play()
            play.src = "icons/pause.svg"
        }
        else {
            currentSong.pause()
            play.src = "icons/playicon.svg"

        }
    })

    currentSong.addEventListener("timeupdate", () => {
        // console.log(currentSong.currentTime,currentSong.duration)
        document.querySelector(".songtime").innerHTML = `${formattime(currentSong.currentTime)}/${formattime(currentSong.duration)}`
        document.querySelector(".circle").style.left = (currentSong.currentTime / currentSong.duration) * 100 + "%"

    })


    document.querySelector(".seekbar").addEventListener("click", (e) => {
        let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;          //getBoundingClientRect():get the position and size of an HTML element on the screen.
        document.querySelector(".circle").style.left = percent + "%";
        currentSong.currentTime = ((currentSong.duration) * percent) / 100;

    })




    document.querySelector(".hamburger").addEventListener("click", (e) => {

        document.querySelector(".left").style.left = "0"

    })

    document.querySelector(".cross img").addEventListener("click", (e) => {

        document.querySelector(".left").style.left = "-120%"

    })

    prev.addEventListener("click", () => {
        let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0]);
        if (index - 1 >= 0) {
            playMusic(songs[index - 1])
        }
        else {
            playMusic(songs[songs.length - 1])
        }

    })

    next.addEventListener("click", () => {
        let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0]);
        if (index + 1 >= songs.length) {
            playMusic(songs[0])
        }
        else {
            playMusic(songs[index + 1])
        }

    })

    document.querySelector(".volume").getElementsByTagName("input")[0].addEventListener("input", (e) => {
        currentSong.volume = e.target.value / 100;
        if (currentSong.volume == 0) {
            document.querySelector(".volume").getElementsByTagName("img")[0].src = "icons/volumemute.svg"
        }
        else {
            document.querySelector(".volume").getElementsByTagName("img")[0].src = "icons/volume.svg"
        }


    })

    // adding eent listenere for mute the music
  document.querySelector(".volume>img").addEventListener("click",(e)=>{
console.log(e.target);
if(e.target.src.includes("icons/volume.svg")){
    e.target.src=e.target.src.replace("icons/volume.svg","icons/volumemute.svg")
    currentSong.volume=0;
    document.querySelector(".volume").getElementsByTagName("input")[0].value=0;
}
else{
     e.target.src=e.target.src.replace("icons/volumemute.svg","icons/volume.svg")
     currentSong.volume=0.1;
     document.querySelector(".volume").getElementsByTagName("input")[0].value=10;
}
  

  })

}

main()