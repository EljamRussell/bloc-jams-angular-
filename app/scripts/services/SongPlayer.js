(function() {
  function SongPlayer(Fixtures) {
    var SongPlayer = {};

  var currentAlbum = Fixtures.getAlbum();

  /**
  * @desc Current Buzz object audio file
  * @type {Object}
  */
  var currentBuzzObject = null;

  /**
  * @function setSong
  * @desc Stops currently playing song and loads new audio file as currentBuzzObject
  * @param {Object} song
  */
  var setSong = function(song) {
    if (currentBuzzObject) {
      currentBuzzObject.stop();
      SongPlayer.currentSong.playing = null;
    }

    currentBuzzObject = new buzz.sound(song.audioUrl, {
      formats: ['mp3'],
      preload: true
    });

    SongPlayer.currentSong = song;
  };

  /**
  * @function playSong
  * @desc Plays the currentBuzzObject and sets the property of the song Object to true
  * @param {Object} song
  */
  var playSong = function(song){
    currentBuzzObject.play();
    song.playing = true;
  };

  /**
  * @function stopSong
  * @desc Stops current song and sets song.playing to null
  * @param {Object} song
  */
  var stopSong = function(song) {
    currentBuzzObject.stop();
    song.playing = null;
  };

  /**
  * @function getSongIndex
  * @desc Gets the index of the song in the album
  * @param {Object} song
  */

  var getSongIndex = function(song) {
    return currentAlbum.songs.indexOf(song);
  };

  /**
  * @desc Active song object from list of songs
  * @type {Object}
  */
  SongPlayer.currentSong = null;

  /**
  * @function SongPlayer.play
  * @desc Play current or new song
  * @param {Object} song
  */

  SongPlayer.play = function(song) {
    song = song || SongPlayer.currentSong;
    if (SongPlayer.currentSong !== song) {
      setSong(song);
      playSong(song);

    } else if (SongPlayer.currentSong === song) {
      if (currentBuzzObject.isPaused()) {
        playSong(song);

      }
    }
  };

  /**
  * @function SongPlayer.pause
  * @desc Pause current song
  * @param {Object} song
  */
  SongPlayer.pause = function(song) {
    song = song || SongPlayer.currentSong;
    currentBuzzObject.pause();
    song.playing = false;
  };

  /**
  * @function previous
  * @desc Plays previous song
  */
  SongPlayer.previous = function() {
    var currentSongIndex = getSongIndex(SongPlayer.currentSong);
    currentSongIndex--;

    if (currentSongIndex < 0) {
      currentBuzzObject.stop();
      SongPlayer.currentSong.playing = null;
    } else {
      var song = currentAlbum.songs[currentSongIndex];
      setSong(song);
      playSong(song);
    }
  };

  /**
  * @function next
  * @desc Plays next song
  */
  SongPlayer.next = function() {
    var currentSongIndex = getSongIndex(SongPlayer.currentSong);
    currentSongIndex++;

    if (currentSongIndex > currentAlbum.songs.length) {
      stopSong(SongPlayer.currentSong);
    } else {
      var song = currentAlbum.songs[currentSongIndex];
      setSong(song);
      playSong(song);
    }
  };


  return SongPlayer;
}

angular
.module('blocJams')
.factory('SongPlayer', SongPlayer);
})();
