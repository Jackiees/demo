angular.module('starter.controllers', [])

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

      document.getElementById('countdown').innerHTML = days + 'days ';
      document.getElementById('countdown').innerHTML += hours + 'hrs ';
      document.getElementById('countdown').innerHTML += minutes + 'mins ';
      document.getElementById('countdown').innerHTML += seconds + 'secs';
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
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});
