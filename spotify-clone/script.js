let currentSong=new Audio();



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



const playMusic=(track)=>{
currentSong.src=`/spotify-clone/songs/${track}`
     currentSong.play()
        play.src="/spotify-clone/icons/pause.svg"
 }



async function main(){

    let songs=await getSongs()
    console.log(songs)
    
    
    var songul=document.querySelector(".listsongs").getElementsByTagName("ul")[0];            
    for (const song of songs) {
        songul.innerHTML=songul.innerHTML+`<li>
        <img class="invert" src="/spotify-clone/icons/music.svg" alt="musicicon">
                <div class="songinfo">
                    <div>${song.replaceAll("%20","")}</div>
                    <div >~Dinesh</div>
                </div>
                <div  class="playmusic" >
                    <span style="color:white">Play Now</span>
                    <img class="invert" src="/spotify-clone/icons/playicon.svg" alt=""></div>
        
        
        
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
        play.src="/spotify-clone/icons/pause.svg"
      }
      else{
        currentSong.pause()
        play.src="/spotify-clone/icons/playicon.svg"

      }
   })


}


main()