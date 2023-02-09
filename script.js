console.log("Welcome To Spotify");

//Initialize the variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myPrgBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songsItems = Array.from(document.getElementsByClassName('songItem'));


let songs = [
    { songName: "Hall Of Fame - The Script", filePath: "songs/1.mp3", coverPath: "covers/cover1.jpg" },
    { songName: "Namo Namo - Amit Trivedi", filePath: "songs/2.mp3", coverPath: "covers/cover2.jpg" },
    { songName: "Danza Kuduro - Lucenzo", filePath: "songs/3.mp3", coverPath: "covers/cover3.jpg" },
    { songName: "Apna Bana Le - Arjit Singh and Sachin Jigar", filePath: "songs/4.mp3", coverPath: "covers/cover4.jpg" },
    { songName: "Maan Meri Jaan - King", filePath: "songs/5.mp3", coverPath: "covers/cover5.jpg" },
    { songName: "Locked Away - R. City", filePath: "songs/6.mp3", coverPath: "covers/cover6.jpg" },
    { songName: "God's Plan - Drake", filePath: "songs/7.mp3", coverPath: "covers/cover7.jpg" },
    { songName: "Stressed Out - twenty one pilots", filePath: "songs/8.mp3", coverPath: "covers/cover8.jpg" },
    { songName: "Club Can't Handle Me - Flo Rida", filePath: "songs/9.mp3", coverPath: "covers/cover9.jpg" },
    { songName: "She Doesn't Mind - Sean Paul", filePath: "songs/10.mp3", coverPath: "covers/cover10.jpg" },
]

songsItems.forEach((element, i) => {

    element.getElementsByTagName('img')[0].src = songs[i].coverPath;
    element.getElementsByClassName('songName')[0].innerText = songs[i].songName;
})

//audioElement.play();

//handle play/pause click
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})

//listen to events
audioElement.addEventListener('timeupdate', () => {

    // update seekbar
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100)

    myPrgBar.value = progress;
})

myPrgBar.addEventListener('change', () => {
    audioElement.currentTime = (myPrgBar.value * audioElement.duration) / 100
})

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        audioElement.src = `songs/${songIndex + 1}.mp3`;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        masterSongName.innerText = songs[songIndex].songName;

    })
})

document.getElementById('next').addEventListener('click', () => {
    if (songIndex >= 9) {
        songIndex = 0;
    }
    else {
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex + 1}.mp3`;
    audioElement.currentTime = 0;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

})

document.getElementById('previous').addEventListener('click', () => {
    if (songIndex < 0) {
        songIndex = 0;
    }
    else {
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex + 1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');


})