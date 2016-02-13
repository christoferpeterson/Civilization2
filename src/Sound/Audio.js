define('Sound/Audio', [], function() {
	var audio = Audio;

	audio.prototype.restart = function() {
		this.currentTime = 0;
	}

	return audio;
});