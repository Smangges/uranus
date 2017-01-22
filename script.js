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

  /*
  |---------------------------------
  | Animation
  |---------------------------------
  */
  AOS.init();

  /*
  |---------------------------------
  | Dropdown
  |---------------------------------
  */
  $(document).on('click','.navbar-collapse.in',function(e) {
    if( $(e.target).is('a') && ( $(e.target).attr('class') != 'dropdown-toggle' ) ) {
      $(this).collapse('hide');
    }
  });

  /*
  |---------------------------------
  | Scroll Spy
  |---------------------------------
  */
  $('body').scrollspy({ target: '#site-navbar' });

  /*
  |---------------------------------
  | Tooltip
  |---------------------------------
  */
  $('[data-toggle="tooltip"]').tooltip();

  /*
  |---------------------------------
  | Countdown Timer
  |---------------------------------
  */
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

  /*
  |---------------------------------
  | Countdown's Clock
  |---------------------------------
  */
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

  /*
  |---------------------------------
  | Displaying Clock
  |---------------------------------
  */
  initializeClock('clockdiv', config.eventstart, config.eventend);

  /*
  |---------------------------------
  | Charts
  |---------------------------------
  */
  var survey1 = new Chart($("#survey-result-1"), {
    type: 'bar',
    data: {
      labels: [ 'Sangat Tidak Ingin', 'Tidak Ingin', 'Biasa Saja', 'Cukup Ingin', 'Sangat Ingin' ],
      datasets: [
        {
          label: 'Jumlah yang menyatakan (dalam persen)',
          backgroundColor: '#1abc9c',
          data: [0, 0, 8.3, 8.3, 83.3]
        }
      ]
    },
    options: {
      title: {
        display: true,
        text: 'Seberapa besar keinginan kamu untuk kuliah?'
      }
    }
  });

  var survey2 = new Chart($("#survey-result-2"), {
    type: 'pie',
    data: {
      labels: [ 'Sudah siap dari semester lalu', 'Sekarang sedang persiapan', 'Belum ada persiapan sama sekali' ],
      datasets: [
        {
          backgroundColor: ['#3498db', '#2ecc71', '#f1c40f'],
          data: [8.3, 66.7, 25]
        }
      ]
    },
    options: {
      title: {
        display: true,
        text: 'Seberapa siap kamu untuk Kuliah?'
      }
    }
  });

  var survey3 = new Chart($("#survey-result-3"), {
    type: 'pie',
    data: {
      labels: [ 'Di Jawa Barat', 'Di Luar Jawa Barat', 'Di Luar Negeri' ],
      datasets: [
        {
          backgroundColor: ['#1abc9c', '#e74c3c', '#8e44ad'],
          data: [33.3, 66.7, 0]
        }
      ]
    },
    options: {
      title: {
        display: true,
        text: 'Jika kamu sudah punya tujuan kuliah, mau kuliah dimana kah kamu?'
      }
    }
  });

  var survey4 = new Chart($("#survey-result-4"), {
    type: 'horizontalBar',
    data: {
      labels: [ 'Biaya kuliah', 'Biaya hidup', 'Ingin menganggur sementara', 'Tidak diizinkan orang tua', 'Jarak yang jauh', 'Belum yakin akan bisa mengikuti matakuliah' ],
      datasets: [
        {
          label: 'Jumlah yang menyatakan (dalam persen)',
          backgroundColor: '#e67e22',
          data: [25, 25, 0, 16.7, 16.7, 83.3]
        }
      ]
    },
    options: {
      title: {
        display: true,
        text: 'Apa saja sih yang menjadi kendala?'
      }
    }
  });

  var survey5 = new Chart($("#survey-result-5"), {
    type: 'horizontalBar',
    data: {
      labels: [ 'Sangat Tidak Siap', 'Tidak Siap', 'Antara Siap dan Tidak', 'Cukup Siap', 'Sangat Siap' ],
      datasets: [
        {
          label: 'Jumlah yang menyatakan (dalam persen)',
          backgroundColor: '#3498db',
          data: [16.7, 8.3, 66.7, 8.3, 0]
        }
      ]
    },
    options: {
      title: {
        display: true,
        text: 'Seberapa siap kamu menghadapi SBMPTN?'
      }
    }
  });

  var survey6 = new Chart($("#survey-result-6"), {
    type: 'pie',
    data: {
      labels: [ 'Ya', 'Tidak' ],
      datasets: [
        {
          backgroundColor: ['#2ecc71', '#e74c3c'],
          data: [91.7, 8.3]
        }
      ]
    },
    options: {
      title: {
        display: true,
        text: 'Apakah kamu mempertimbangkan mengikuti Ujian Mandiri?'
      }
    }
  });

  var survey7 = new Chart($("#survey-result-7"), {
    type: 'radar',
    data: {
      labels: [ 'Universitas', 'Institut', 'Sekolah Tinggi', 'Akademi', 'Politeknik' ],
      datasets: [
        {
          label: 'Jumlah yang menyatakan (dalam persen)',
          backgroundColor: 'rgba(142, 68, 173, 0.5)',
          borderColor: '#8e44ad',
          data: [83.3, 25, 8.3, 8.3, 16.7]
        }
      ]
    },
    options: {
      title: {
        display: true,
        text: 'Jenis perguruan tinggi mana saja yang kamu minati?'
      }
    }
  });

  var survey8 = new Chart($("#survey-result-8"), {
    type: 'horizontalBar',
    data: {
      labels: [ 'Bisa mendapat pekerjaan bergaji tinggi', 'Mencari ilmu pengetahuan lebih jauh', 'Menuruti keinginan orang tua', 'Mengikuti saran orang lain' ],
      datasets: [
        {
          label: 'Jumlah yang menyatakan (dalam persen)',
          backgroundColor: '#2ecc71',
          data: [50, 58.3, 8.3, 0]
        }
      ]
    },
    options: {
      title: {
        display: true,
        text: 'Kenapa kamu ingin kuliah?'
      }
    }
  });

});
