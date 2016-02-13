require.config({
	baseUrl: 'src',
	paths: {
		'requireLib': 'require',
		'jquery': 'jquery.2.2.0'
	},
	shim: {
		'jquery': 'jquery-private'
	}
})


define('civ2', ['Sound/SoundManager', 'Sound/SoundGroup', 'jquery'], function(SoundManager, SoundGroup, $) {
	var civ2 = function(oSettings) {
		var _this = this;

		this.settings = oSettings || { sound: {} };
	}

	civ2.prototype.init = function() {
		this.audio = new SoundManager({
			settings: this.settings.sound, 
			files: {
				airCombat_raw: {file: 'aircombt.wav', display: 'Air Combat'},
				bigGun_raw: { file: 'biggun.wav', display: 'Big Gun Fire'},
				boatSink_raw: {file: 'boatsink.wav', display: 'Boat Sink'},
				builtAqueduct_raw: {file: 'aqueduct.wav', display: 'Built Aqueduct'},
				builtBarracks_raw: {file: 'barracks.wav', display: 'Built Barracks'},
				builtCity_raw: {file: 'bldcity.wav', display: 'Built City'},
				builtSpaceShip_raw:  {file: 'bldspcsh.wav', display: 'Built Space Ship'},
				fire_raw: {file: 'fire---.wav', display: 'Fire!'},
				menuMusic_raw: {file: 'menuloop.wav', loopLength: 7200, display: 'Menu Music'},
				nuclearExplosion_raw: {file: 'nukexplo.wav', display: 'Nuclear Explosion'}
			}
		});
	}

	civ2.prototype.load = function() {
		var _this = this;
		
		this.audio.loadAll(function() {_this.run()});
	}

	civ2.prototype.run = function() {
		var _this = this;

		this.audio.sounds.howitzer = new SoundGroup('Howitzer', [
			{ sound: this.audio.files.fire_raw.sound, start: 0, stop: 1075 },
			{ sound: this.audio.files.bigGun_raw.sound, start: 0, stop: 1025 },
			{ sound: this.audio.files.bigGun_raw.sound, start: 0, stop: 1025 },
			{ sound: this.audio.files.bigGun_raw.sound, start: 0 }
		]);

		var drawAudio = function(sounds) {
			var $body = $('body');
			var $list = $('<ul></ul>');
			var sound;

			$body.prepend($list);

			for(var key in sounds) {
				sound = sounds[key];
				$list.append($('<li><a href="javascript:void(0);" data-audio="' + key + '">' + sound.name + '</a></li>'));
			}

			$body.on('click', 'a[data-audio]', function() {
				_this.audio.sounds[$(this).data('audio')].play();
			});
		}

		drawAudio(this.audio.sounds);
	}

	return civ2;
});

require(['civ2'], function(civ2) {
	var game = new civ2({
		sound: {
			dir: 'content/sound/'
		}
	}); 

	game.init();
	game.load();
});