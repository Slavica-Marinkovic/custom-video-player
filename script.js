const media = document.querySelector('video');
const play = document.querySelector('.play');
const playImg = document.querySelector('.play-img');
const volume = document.querySelector('.volume-up');
const volumeRange = document.getElementById('range');
const rwd = document.querySelector('.rewind');
const fwd = document.querySelector('.forward');
const settings = document.querySelector('.settings');
const fullScreen = document.querySelector('.full-screen');
const videoTime = document.querySelector('.time');
const timeDisplay = document.querySelector('.time-display');
const videoDuration = document.querySelector('.duration');
const controleBar = document.querySelector('.control-bar');
const controleBarFill = document.querySelector('.control-bar-fill');
const controls = document.querySelector('.controls');
const showSpeed = document.querySelector('.show-speed');
const speed = document.querySelector('.speed');
const speedVal = document.querySelectorAll('.speed-val');
const timeSpan = document.getElementById('set-time');

media.addEventListener('click', function(){
    if(media.paused){
        media.play();
        playImg.setAttribute("src", "media/pause_white_36dp.svg");
        timeDisplay.style.display = "block";
    } else {
        media.pause();
        playImg.setAttribute("src", "media/play_arrow_white_36dp.svg");
    }
});

play.addEventListener('click', function(){
    if(media.paused){
        playImg.setAttribute("src", "media/pause_white_36dp.svg");
        media.play();
    } else {
        playImg.setAttribute("src", "media/play_arrow_white_36dp.svg");
        media.pause();
    }
    timeDisplay.style.display = "block";
});
window.addEventListener('keydown', (event) =>{
    event.preventDefault();
    if (event.code === "Space") {
        if (media.paused){
          media.play();
          playImg.setAttribute("src", "media/pause_white_36dp.svg");
        }else {
            media.pause();
            playImg.setAttribute("src", "media/play_arrow_white_36dp.svg");
        }
        timeDisplay.style.display = "block";  
    }
});

media.addEventListener('mouseenter', showControls);
media.addEventListener('mouseleave', hideControls);
controls.addEventListener('mouseenter', showControls);
controls.addEventListener('mouseleave', hideControls);

function showControls(){
    controls.style.opacity = 1;
}
function hideControls() {
   controls.style.opacity = 0.5;
}
volume.addEventListener('click', function(){
    media.muted = !media.muted;
    if(media.muted){
        volume.setAttribute("src", "media/volume_off_white_24dp.svg");
    } else{
        volume.setAttribute("src", "media/volume_up_white_24dp.svg");
    }
   
});
volumeRange.addEventListener('input', function(){
    var volumeRangeVal = volumeRange.value;
    media.volume = volumeRangeVal/100;
    if(media.volume < 0.01){
        media.muted;
        volume.setAttribute("src", "media/volume_off_white_24dp.svg");
     }else {
         volume.setAttribute("src", "media/volume_up_white_24dp.svg");
        }
});
    
media.addEventListener('timeupdate', function(){
    videoTime.textContent = countTime(media.currentTime);
    let bar = controleBar.clientWidth * (media.currentTime/media.duration);
    controleBarFill.style.width = bar + 'px';
    videoDuration.textContent = countTime(media.duration);
});

function countTime(timeValue){
    let minutes = Math.floor(timeValue / 60);
    let seconds = Math.floor(timeValue - minutes * 60);
    let minuteValue;
    let secondValue;
  
    if (minutes < 10) {
      minuteValue = '0' + minutes;
    } else {
      minuteValue = minutes;
    }
  
    if (seconds < 10) {
      secondValue = '0' + seconds;
    } else {
      secondValue = seconds;
    }
    let time = minuteValue + ':' + secondValue;
    return time;
}

controleBar.addEventListener('click', setMedia);
controleBarFill.addEventListener('click', setMedia);
controleBarFill.addEventListener('mousemove', setTime);
controleBar.addEventListener('mousemove', setTime);
controleBarFill.addEventListener('mouseleave', removeTime);
controleBar.addEventListener('mouseleave', removeTime);

function setMedia(e) {
    media.currentTime = e.offsetX/controleBar.offsetWidth * media.duration;
    timeSpan.style.display = "none";
}
function setTime(e){
    var currentTim = e.offsetX/controleBar.offsetWidth * media.duration;
    timeSpan.style.display = "block";
    timeSpan.textContent =countTime(currentTim);
}

function removeTime(e) {
    timeSpan.style.display = "none"
}

rwd.addEventListener('click', videoBack);
fwd.addEventListener('click', videoForward);

function videoBack(){
    media.currentTime += -10;
}
function videoForward(){
    media.currentTime+= 10;
}

fullScreen.addEventListener('click', setFullScren);

function setFullScren(){
        if(media.requestFullScreen){
            media.requestFullScreen();
        } else if(media.webkitRequestFullScreen){
            media.webkitRequestFullScreen();
        } else if(media.mozRequestFullScreen){
            media.mozRequestFullScreen();
        }
        controls.style.display = "block";
}
media.addEventListener('dblclick', setFullScren);

settings.addEventListener('click', function(){
   if(showSpeed.classList.contains("showing")){
       showSpeed.classList.remove("showing");
       speed.classList.remove("showing");
       return;
   }
   else {
       showSpeed.classList.add("showing");
   }
});
showSpeed.addEventListener('click', function(){
    if(speed.classList.contains("showing")){
        speed.classList.remove("showing");
        return;
    }
    else {
        speed.classList.add("showing");
    }
});

speedVal.forEach(item => {
    item.addEventListener('click', ()=>{
        speedVal.forEach((current)=>{
            current.classList.remove("current");
        });
        item.classList.add("current");
        media.playbackRate = parseFloat(item.textContent);
        showSpeed.classList.remove("showing");
        speed.classList.remove("showing");
    });
});
