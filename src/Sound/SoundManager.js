define('Sound/SoundManager', ['Sound/Audio', 'Sound/SoundGroup'], function(audio, SoundGroup) {
	var SoundManager = function(oInputs) {
		oInputs = oInputs || {};
		this.files = oInputs.files || {};
		this.settings = oInputs.settings || {};
		this.sounds = oInputs.sounds || {};
	}

	SoundManager.prototype.loadAll = function(callback) {
		var _this = this;
		var needToLoad = 0;
		for(var key in this.files) {
			var file = this.files[key];
			needToLoad++;
			file.sound = new audio(this.settings.dir + file.file);

			file.sound.addEventListener('canplaythrough', function() {
				needToLoad--;
				if(needToLoad == 0) {
					_this.stageAudio()
					callback();
				}
			});
		}
	}

	SoundManager.prototype.stageAudio = function() {
		for(var key in this.files) {
			this.sounds[key] = new SoundGroup(this.files[key].display, [
				{
					sound: this.files[key].sound,
					start: 0,
					stop: this.files[key].sound.duration * 1000
				}
			]);
		}
	}

	SoundManager.prototype.play = function(audio) {
		if(audio) {
			audio.play();
		}
	}

	SoundManager.prototype.loop = function(audio, start, stop) {
		var _this = this;

		audio.sound.addEventListener('play', function() {
			_this.loop_handler(audio);
		});

		audio.play();

		window.addEventListener("focus", 
			function(event) {
				clearInterval(audio.loopTracker);
				audio.restart();
			},
		false);
	}

	SoundManager.prototype.loop_handler = function(audio) {
		if(!audio.loopTracker || audio.sounds[0].sound.currentTime == 0) {
			clearInterval(audio.loopTracker);
			audio.loopTracker = setInterval(function() {
				audio.restart();
			}, audio.loopLength);
		}
	}

	SoundManager.prototype.stopLoop = function(audio) {
		clearInterval(audio.loopTracker);
	}

	return SoundManager;
});