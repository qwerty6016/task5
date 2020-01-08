'use strict';

function uploadAudio(audioPlayerId) {

};

function muteUnmuteBtnPressed(audioPlayerId, button) {
  let audioPlayer = document.getElementById(audioPlayerId);

  if (audioPlayer.muted) {
    audioPlayer.muted = false;
    button.innerHTML = 'Mute';
  } else {
    audioPlayer.muted = true;
    button.innerHTML = 'Unmute';
  };
};

function playPauseBtnPressed(audioPlayerId, button) {
  let audioPlayer = document.getElementById(audioPlayerId);

  if (audioPlayer.paused) {
    audioPlayer.play();
    button.innerHTML = 'Pause';
    audioPlayerUpdate(audioPlayer);
    audioPlayer.timeout = setTimeout(audioPlayerUpdate, 1000, audioPlayer);
  } else {
    audioPlayer.pause();
    button.innerHTML = 'Play';
    clearTimeout(audioPlayer.timeout);
  };
};

function audioPlayerProgressBarInput(audioPlayerId, progressBar) {
  let audioPlayer = document.getElementById(audioPlayerId);
  audioPlayer.currentTime = audioPlayer.duration / progressBar.max * progressBar.value;
};

function audioPlayerUpdate(audioPlayer) {
  let durationPassed = document.getElementById(audioPlayer.id + 'DurationPassed');
  let durationRemained = document.getElementById(audioPlayer.id + 'DurationRemained');
  let progressBar = document.getElementById(audioPlayer.id + 'ProgressBar');

  let passedSeconds = Math.floor(audioPlayer.currentTime % 60);
  durationPassed.innerHTML = Math.floor(audioPlayer.currentTime / 60) + (passedSeconds > 9 ? ':' + passedSeconds : ':0' + passedSeconds);

  let remainedSeconds = Math.floor((audioPlayer.duration - audioPlayer.currentTime) % 60) || '0';
  durationRemained.innerHTML = (Math.floor((audioPlayer.duration - audioPlayer.currentTime) / 60) || '0') + (remainedSeconds > 9 ? ':' + remainedSeconds : ':0' + remainedSeconds);

  progressBar.value = audioPlayer.currentTime / (audioPlayer.duration / progressBar.max);

  audioPlayer.timeout = setTimeout(audioPlayerUpdate, 1000, audioPlayer);
};
