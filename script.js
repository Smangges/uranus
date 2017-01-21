$(function () {
  var config = {
    eventstart: new Date('January 21 2017 07:00:00 GMT+0700'),
    eventend: new Date('January 21 2017 12:00:00 GMT+0700'),
    transdays: 'Hari',
    transhours: 'Jam',
    transminutes: 'Menit',
    transseconds: 'Detik',
    say : {
      coming: 'Lagi...!!!',
      running: 'Berjalan...',
      finished: 'Berlalu...'
    }
  }

  AOS.init();

  $(document).on('click','.navbar-collapse.in',function(e) {
    if( $(e.target).is('a') && ( $(e.target).attr('class') != 'dropdown-toggle' ) ) {
      $(this).collapse('hide');
    }
  });

  $('body').scrollspy({ target: '#site-navbar' });

  function getTime(starttime, endtime) {
    if (Date.parse(starttime) > Date.parse(new Date())) {
      var t = Date.parse(starttime) - Date.parse(new Date());
      var status = 'coming';
    } else if (Date.parse(endtime) > Date.parse(new Date())) {
      var t = Date.parse(endtime) - Date.parse(new Date());
      var status = 'running';
    } else {
      var t = Date.parse(new Date()) - Date.parse(endtime);
      var status = 'finished';
    }
    var seconds = Math.floor((t / 1000) % 60);
    var minutes = Math.floor((t / 1000 / 60) % 60);
    var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
    var days = Math.floor(t / (1000 * 60 * 60 * 24));
    return {
      'total': t,
      'days': days,
      'hours': hours,
      'minutes': minutes,
      'seconds': seconds,
      'status': status
    };
  }

  function initializeClock(id, starttime, endtime) {
    var clock = document.getElementById(id);

    function updateClock() {
      var t = getTime(starttime, endtime);

      clock.innerHTML = t.days+' '+config.transdays+' '+
                        t.hours+' '+config.transhours+' '+
                        t.minutes+' '+config.transminutes+' '+
                        t.seconds+' '+config.transseconds+' '+
                        config.say[t.status];
      if (t.total <= 0) {
        clearInterval(timeinterval);
      }
    }

    updateClock();
    var timeinterval = setInterval(updateClock, 1000);
  }

  initializeClock('clockdiv', config.eventstart, config.eventend);
});
