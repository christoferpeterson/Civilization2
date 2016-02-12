define('Audio', [], function() {
	var audio = Audio;

	audio.prototype.restart = function() {
		console.info('restartTime', this.currentTime);
		this.currentTime = 0;
	}

	return audio;
});

define('audioManager', ['Audio'], function() {
	var audioManager = function() {

	}

	audioManager.prototype.availableFiles = [

	]

	return audioManager;
});

define('mainmenu', ['Audio'], function(audio) {
	var menuMusic = new audio('content/sound/menuloop.wav');
	var musicLoop;

	menuMusic.addEventListener('play', function() {
		console.info(this.currentTime);
		if(this.currentTime == 0) {
			clearInterval(musicLoop);
			musicLoop = setInterval(function() {
				menuMusic.restart();
			}, 7200);
		}
	})

	window.addEventListener("focus", 
		function(event) {
			console.info('window in focus');
			menuMusic.restart();
			menuMusic.play();
		},
	false);

	menuMusic.play();
})