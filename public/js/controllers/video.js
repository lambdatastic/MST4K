angular.module('video', [])
.controller('videoController', function ($scope, socket) {
  $scope.video = document.getElementById('movie');

  socket.on('movie:play', function() {
    $scope.video.play();
  });

  socket.on('movie:pause', function() {
    $scope.video.pause();
  });

  socket.on('movie:sync', function(data) {
    var current = $scope.video.currentTime;
    if (Math.abs(data-current) > 5) {
      $scope.video.fastseek(data);
    }

    // TODO: Make client option to ignore server sync
  });



});
