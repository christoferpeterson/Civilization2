define('Sound/SoundGroup', [], function() {
	var currentSound;

	var SoundGroup = function(sName, rSounds) {
		this.name = sName;
		this.sounds = rSounds;
		this.timers = [];
		this.loopLength = 0;

		for (var i = 0; i < this.sounds.length; i++) {
			this.sounds[i].start = this.sounds[i].start || 0;
			this.sounds[i].stop = this.sounds[i].stop || this.sounds[i].sound.duration * 1000;
			this.sounds[i].duration = this.sounds[i].stop - this.sounds[i].start;
			this.loopLength += this.sounds[i].duration;
		};
	}

	SoundGroup.prototype.playSound = function(audio) {
		audio.sound.pause();
		audio.sound.currentTime = audio.start;
		audio.sound.play();
	}

	SoundGroup.prototype.play = function() {
		var _this = this;

		if(currentSound) {
			currentSound.pause();
		}
		currentSound = this;

		var timeTracker = 0;
		for (var i = 0; i < this.sounds.length; i++) {

			if(i == 0) {
				this.playSound(this.sounds[i]);
			} else {
				this.timers.push(setTimeout((function(j) {
					return function() {
						_this.playSound(_this.sounds[j]);
					}
				})(i), timeTracker));
			}

			timeTracker += this.sounds[i].duration;

			this.timers.push(setTimeout((function(j) {
				return function() {
					_this.sounds[j].sound.pause(); 
				}
			})(i), timeTracker));
		};
	}

	SoundGroup.prototype.restart = function() {
		this.pause();
		this.play();
	}

	SoundGroup.prototype.pause = function() {
		for (var i = 0; i < this.timers.length; i++) {
			clearTimeout(this.timers[i]);
		};
		for (var i = 0; i < this.sounds.length; i++) {
			this.sounds[i].sound.pause();
		}
	}

	return SoundGroup;
});