angular.module('starter.controllers', [])

.directive('myEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.myEnter);
                });

                event.preventDefault();
            }
        });
    };
})

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope) {

  var today = new Date();
  var dd = today.getDate();
  var yyyy = today.getFullYear();

  if(dd<10) {
      dd='0'+dd
  } 

  var monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
  ];

  var d = new Date();
  var month = monthNames[d.getMonth()];

  today = dd+' ' + month + ' ' + yyyy;
  console.log(today);
  
  $scope.today = "today: " + today;
  $scope.endDate = "departure: 24 February 2016";

  var end = new Date('02/24/2016 00:00 AM');

  var _second = 1000;
  var _minute = _second * 60;
  var _hour = _minute * 60;
  var _day = _hour * 24;
  var timer;

  function showRemaining() {
      var now = new Date();
      var distance = end - now;
      if (distance < 0) {

          clearInterval(timer);
          document.getElementById('countdown').innerHTML = 'EXPIRED!';

          return;
      }
      var days = Math.floor(distance / _day);
      var hours = Math.floor((distance % _day) / _hour);
      var minutes = Math.floor((distance % _hour) / _minute);
      var seconds = Math.floor((distance % _minute) / _second);

      document.getElementById('countdown').innerHTML = days + ' days';
      // document.getElementById('countdown').innerHTML += hours + 'hrs <br/>';
      // document.getElementById('countdown').innerHTML += minutes + 'mins ';
      // document.getElementById('countdown').innerHTML += seconds + 'secs';
  }

  timer = setInterval(showRemaining, 1000);
  // $scope.playlists = [
  //   { title: 'Reggae', id: 1 },
  //   { title: 'Chill', id: 2 },
  //   { title: 'Dubstep', id: 3 },
  //   { title: 'Indie', id: 4 },
  //   { title: 'Rap', id: 5 },
  //   { title: 'Cowbell', id: 6 }
  // ];
  
  // Calendar
  console.log(dd);
  for (var x=4; x <= dd; x++) {
    console.log(dd);
    console.log(x);
    if (x === 7) {
      $scope.n7 = "selected";
    } else if (x === 8) {
      $scope.n8 = "selected";
    } else if (x === 9) {
      $scope.n9 = "selected";
    } else if (x === 10) {
      $scope.n10 = "selected";
    } else if (x === 11) {
      $scope.n11 = "selected";
    } else if (x === 12) {
      $scope.n12 = "selected";
    } else if (x === 13) {
      $scope.n13 = "selected";
    } else if (x === 14) {
      $scope.n14 = "selected";
    } else if (x === 15) {
      $scope.n15 = "selected";
    } else if (x === 16) {
      $scope.n16 = "selected";
    } else if (x === 17) {
      $scope.n17 = "selected";
    } else if (x === 18) {
      $scope.n18 = "selected";
    } else if (x === 19) {
      $scope.n19 = "selected";
    } else if (x === 20) {
      $scope.n20 = "selected";
    } else if (x === 21) {
      $scope.n21 = "selected";
    }
  }

  $scope.past12 = "selected";
})

.controller('MusicCtrl', function($scope,$state,$stateParams) {

  SC.initialize({
    client_id: 'b80d3102f512d040b46a881dacbb2526'
  });

  SC.get('/resolve', {
  url: 'https://soundcloud.com/jackiees85'
  }, function(user) {
    console.log(user.id);
  });

  $scope.search = {};
  var trackslist;
  
  // display playlist
  $(document).ready(function() {
      SC.get('https://api.soundcloud.com/users/56585724/playlists', function(playlists) {
        console.log(playlists[0].tracks);
        $scope.tracks = playlists[0].tracks;
        trackslist = playlists[0].tracks;
        $scope.tracks = playlists[0].tracks;
      });
  });


  // search songs

  $scope.doSomething = function() {

  $(document).ready(function() {

    console.log($scope.search.name);
    var x = $scope.search.name;
      SC.get('https://api.soundcloud.com/tracks', { genres: x }, function(tracks) {
        console.log(tracks);
        // trackslist = tracks;
        // $scope.tracks = tracks;
        // $(tracks).each(function(index, track) {
        //   $('#results').append($('<li></li>').html(track.title + ' - ' + track.genre));
        // });
      });
      $state.reload();
    });
  };

  $scope.loadMusic = function(index) {
    console.log(trackslist[index].title);
  // $scope.loadMusic = function() {
    $state.go('app.musicplayer',{id:trackslist[index].id});
    // $state.go('app.musicplayer');
  }

})

.controller('MusicPlayerCtrl', function($scope,$state,$location,$sce,$stateParams) {

  SC.initialize({
    client_id: 'b80d3102f512d040b46a881dacbb2526'
  });

  console.log($stateParams);
  var trackUrl = "https://api.soundcloud.com/tracks/" + $stateParams.id;
  console.log(trackUrl);


  $(document).ready(function() {
    SC.get(trackUrl, function(track) {
        console.log(track);
        // $('#player').html(track.title);
        SC.oEmbed(track.permalink_url,
        document.getElementById('player'));
    });
  });

  //   $(document).ready(function() {
  //   SC.get('/tracks/224375276', function(track) {
  //       console.log(track);
  //       // $('#player').html(track.title);
  //       SC.oEmbed(track.permalink_url,
  //       document.getElementById('player'));
  //   });
  // });

  // var url = $location.search();
  // console.log(url.url);
  // var x = url.url;
  // var res = x.replace(/%2F/g, "/");
  // console.log(res);
  // $scope.url = $sce.trustAsResourceUrl(res);
});
