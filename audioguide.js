;(function($, doc, win) {
  "use strict";

  var name = 'js-audio-guide';
  var step = 0;

  function AudioGuide(el, opts) {
    this.$el  = $(el);

    this.defaults = {
      auto_play: false,
      position: 'bottom',
      volume: 50,
      preload_all: false,
      steps: [
        {}
      ]
    };

    this.opts = $.extend(this.defaults, opts);  // maybe this.$el.data('audioguide-options')?

    console.log('Audio Guide', this.opts);

    // TODO: Raise some .on init event, see trigger and triggerhandler docs
    this.$next = this.$el.find('.js-audio-guide-next');
    this.$play = this.$el.find('.js-audio-guide-play');
    this.$pause = this.$el.find('.js-audio-guide-pause');
    this.$previous = this.$el.find('.js-audio-guide-previous');
    this.$dismiss = this.$el.find('.js-audio-guide-dismiss');
    soundManager.useHTML5Audio = true;
    soundManager.html5Only = true;
    
    var self = this;
    soundManager.setup({
      url: './swf',
      useHTML5Audio: true,
      preferFlash: false,
      useFlashBlock: false,
      onready: function() {
        self.init();
      }
    });
    // TODO: Raise some .on ready event, see trigger and triggerhandler docs
  }

  AudioGuide.prototype.init = function() {
    var self = this;
    console.log('init');
    // TODO: Add presence checks. I guess.

    
    if (this.opts.auto_play) this.play();

    var clickEvent = 'click.' + name;

    this.$next.on(clickEvent, function(event) {
      self.next();
    });

    this.$play.on(clickEvent, function(event) {
      self.play();
    });

    this.$pause.on(clickEvent, function(event) {
      self.pause();
    });

    this.$previous.on(clickEvent, function(event) {
      self.previous();
    });

    // TODO: add dismis and destroy, which I think should do seperate things :P
  };

  AudioGuide.prototype.play = function(name) {
    // Do some thing where we change the class for state

    var self = this;
    if (!this.opts.steps[step]) return;
    var id = name || this.opts.steps[step].name;
    //var sound = soundManager.getSoundById(id);
    var sound;

    console.log(sound);

  //   if (!sound) {
  //     var url = this.opts.steps[step].url;

      sound = soundManager.createSound({
        id: '1',
        url: 'http://upload.wikimedia.org/wikipedia/commons/6/61/DescenteInfinie.ogg'
      });
  // }
    sound.play(id);
  };

  AudioGuide.prototype.previous = function() {
    step--;
    this.play();
  };

  AudioGuide.prototype.next = function() {
    console.log('next',step);
    step++;
    this.play();
  };

  AudioGuide.prototype.dismiss = function() {
    // TODO: hid eosme shit
  };

  AudioGuide.prototype.destroy = function() {
    var eventPrefix = '.' + name;
    this.$el.find('*').off(eventPrefix);

  };

  $.fn.audioGuide = function(opts) {
    return this.each(function() {
      new AudioGuide(this, opts);
    });
  };

})(jQuery, document, window);