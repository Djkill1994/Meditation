// Different - разный
// Pick - выбрать
// width - ширина
// for each - для каждого
// Select - выбирать
// height - высота

const app = () => {
    const song = document.querySelector(".song");
    const play = document.querySelector(".play");
    const outline = document.querySelector(".moving-outline circle");
    const video = document.querySelector(".vid-container video");
    //const replay =

    // sounds
    const sounds = document.querySelectorAll(".sound-picker button");
    const timeDisplay = document.querySelector(".time-display");
    const timeSelect = document.querySelectorAll(".time-select button");
    const outlineLength = outline.getTotalLength();
    let fakeDuration = 600;

    outline.style.strokeDasharray = outlineLength;
    outline.style.strokeDashoffset = outlineLength;
    timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${Math.floor(
        fakeDuration % 60
    )}`;

    //Pick Different Sound

    sounds.forEach(sound => {
        sound.addEventListener("click" , function () {
            song.src = this.getAttribute("data-sound");
            video.src = this.getAttribute("data-video");
            checkPlaying(song);
        });
    });

// play sound
    play.addEventListener("click", function () {
        checkPlaying(song);
    });
    // replay.addEventListener("click", function() {
    //     restartSong(song);
    //
    // });
    // const restartSong = song =>{
    //     let currentTime = song.currentTime;
    //     song.currentTime = 0;
    //     console.log("ciao")
    // };

    //Select sound

    timeSelect.forEach(option =>{
        option.addEventListener("click", function (){
            fakeDuration = this.getAttribute("data-time");
            timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${Math.floor(fakeDuration % 60)}`;
        });
    });

    // Function play and pause
    function checkPlaying(song) {
        if (song.paused) {
            song.play();
            video.play();
            play.src="svg/pause.svg";
        } else {
            song.pause();
            video.pause();
            play.src = "svg/play.svg";
        }
    }
    // we can animation the circle

    song.ontimeupdate = function () {
        let currentTime = song.currentTime;
        let elapsed = fakeDuration - currentTime;
        let seconds = Math.floor(elapsed % 60);
        let minutes = Math.floor(elapsed / 60);

        //Animation the circle
        let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;
        outline.style.strokeDashoffset = progress;
        // Animate the text
        timeDisplay.textContent = `${minutes}:${seconds}`;

        if (currentTime >= fakeDuration) {
            song.pause ();
            song.currentTime = 0;
            play.src = "svg/play.svg";
            video.pause();
        }

    };
};

app();