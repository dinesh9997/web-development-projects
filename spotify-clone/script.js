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
        songs.push(element.href)
    }    

}



return songs
}
async function main(){

    let songs=await getSongs()
    console.log(songs)
    var x=0;

    var audio=new Audio(songs[x])
    audio.play()
    audio.addEventListener("loadeddata", () => {
        let dur=audio.duration;
        console.log(dur)
    })
}

main()