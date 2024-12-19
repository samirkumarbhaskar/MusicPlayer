console.log("Welcome to spotify");

// Initialize the Variables
let songIndex=0;
let audioElement = new Audio("songs/1.mp3");
// console.log(audioElement)

let masterPlay=document.getElementById("masterPlay");
let myProgressbar=document.getElementById("myProgressbar");
let gif=document.getElementById("gif");
let masterSongName=document.getElementById("masterSongName");
let songItems = Array.from(document.getElementsByClassName("songItem"));

let songs=[
    {songName:"Hasbi-Rabbi",filePath:"songs/1.mp3",coverPath:"covers/1.jpg"},
    {songName:"Aadat",filePath:"songs/2.mp3",coverPath:"covers/2.jpg"},
    {songName:"Mere pass Tum ho",filePath:"songs/3.mp3",coverPath:"covers/3.jpg"},
    {songName:"Tere Liye",filePath:"songs/4.mp3",coverPath:"covers/4.jpg"},
    {songName:"Kana Yaari",filePath:"songs/5.mp3",coverPath:"covers/image.png"},
    {songName:"Janam Fida-e-Haideri",filePath:"songs/6.mp3",coverPath:"covers/6.jpg"},
]

songItems.forEach((element,i) => {
    
    element.getElementsByTagName("img")[0].src=songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText=songs[i].songName;
});
// audioElement.play();


//Handle play/pause click
masterPlay.addEventListener('click',()=>{
    if(audioElement.paused||audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity=1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity=0;
    }
})
//Listen to events
audioElement.addEventListener('timeupdate',()=>{

    //update Seekbar
    progress=parseInt((audioElement.currentTime/audioElement.duration)*100)
    // console.log(progress);
    myProgressBar.value=progress;
})

myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime=(myProgressBar.value * audioElement.duration)/100;
})
const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');

    })
}
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        makeAllPlays();
        Index=parseInt(e.target.id);
        // console.log(Index)
        songIndex=Index
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        // console.log(songs[Index].songName)
        masterSongName.innerText=songs[Index].songName;
        audioElement.src=`songs/${Index+1}.mp3`;
        audioElement.currentTime=0;
        audioElement.play();
        gif.style.opacity=1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
})

document.getElementById('next').addEventListener('click',()=>{
if(songIndex>=5){
    songIndex =0
}
else{
    songIndex +=1;
}
audioElement.src=`songs/${songIndex+1}.mp3`;
// console.log(audioElement.src)
masterSongName.innerText=songs[songIndex].songName;
// console.log(songs[songIndex].songName)
audioElement.currentTime=0;
audioElement.play();
masterPlay.classList.remove('fa-play-circle');
masterPlay.classList.add('fa-pause-circle');
});

document.getElementById('previous').addEventListener('click',()=>{
if(songIndex<=0){
    songIndex =5;
}
else{
    songIndex -=1;
}
audioElement.src=`songs/${songIndex+1}.mp3`;
masterSongName.innerText=songs[songIndex].songName;
// console.log(songs[songIndex].songName);
audioElement.currentTime=0;
audioElement.play();
masterPlay.classList.remove('fa-play-circle');
masterPlay.classList.add('fa-pause-circle');
});