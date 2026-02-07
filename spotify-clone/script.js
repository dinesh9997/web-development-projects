let currentSong=new Audio();

function formattime(seconds) {
    if (isNaN(seconds) || seconds < 0) return "00:00";

    let mins = Math.floor(seconds / 60);
    let secs = Math.floor(seconds % 60);

    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}

async function getSongs(){

    
    let a= await fetch("http://127.0.0.1:5500/spotify-clone/songs/")
    let response=await a.text()
    let div=document.createElement("div")
   div.innerHTML=response
 let as=div.getElementsByTagName("a");
 let songs=[]
 for (let index = 0; index < as.length; index++) {
    const element = as[index];
    if(element.href.endsWith("mp3")){
        songs.push(element.href.split("/songs/")[1])
    }    

}
 return songs
}



const playMusic=(track,pause)=>{
currentSong.src=`/spotify-clone/songs/${track}`
if(pause==true){
    play.src="icons/playicon.svg"
    pause=false
currentSong.play()
  
document.getElementById("playersonginfo").innerHTML = track
 document.querySelector(".songtime").innerHTML="00:00/00:00"

}
   else{     
    currentSong.play()
    play.src="icons/pause.svg"
document.getElementById("playersonginfo").innerHTML = track
 document.querySelector(".songtime").innerHTML="00:00/00:00"

 }
 
    }



async function main(){

    let songs=await getSongs()
    
    playMusic(songs[0],true)    
    
    var songul=document.querySelector(".listsongs").getElementsByTagName("ul")[0];            
    for (const song of songs) {
        songul.innerHTML=songul.innerHTML+`<li>
        <img class="invert" src="icons/music.svg" alt="musicicon">
                <div class="songinfo">
                    <div>${song.replaceAll("%20","")}</div>
                    <div >~Dinesh</div>
                </div>
                <div  class="playmusic" >
                    <span style="color:white">Play Now</span>
                    <img class="invert" src="icons/playicon.svg" alt=""></div>
        
        
        
        </li>`;
    }



    Array.from(document.querySelector(".listsongs").getElementsByTagName("li")).forEach(e=>{
      e.addEventListener("click",element=>{
          console.log(e.querySelector(".songinfo").firstElementChild.innerHTML)
          playMusic(e.querySelector(".songinfo").firstElementChild.innerHTML)

      })
  })


   play.addEventListener("click",()=>{
      if(currentSong.paused){
        currentSong.play()
        play.src="icons/pause.svg"
      }
      else{
        currentSong.pause()
        play.src="icons/playicon.svg"

      }
   })
   
   currentSong.addEventListener("timeupdate",()=>{
// console.log(currentSong.currentTime,currentSong.duration)
document.querySelector(".songtime").innerHTML=`${formattime(currentSong.currentTime)}/${formattime(currentSong.duration)}`
document.querySelector(".circle").style.left=(currentSong.currentTime/currentSong.duration)*100 +"%"

   })


   document.querySelector(".seekbar").addEventListener("click",(e)=>{
    let percent=(e.offsetX/e.target.getBoundingClientRect().width)*100;          //getBoundingClientRect():get the position and size of an HTML element on the screen.
       document.querySelector(".circle").style.left=percent+"%";
       currentSong.currentTime=((currentSong.duration)*percent)/100;    

   })


}




main()