angular.module('videoAdmin', [])
.controller('videoAdminController', function ($scope, socket) {
  $scope.video = document.getElementById('movie');

  $scope.video.addEventListener('playing', function() {
    socket.emit('movie:play', $scope.video.currentTime);
  });

  $scope.video.addEventListener('pause', function() {
    socket.emit('movie:pause', $scope.video.currentTime);
  });

  $scope.video.addEventListener('timeupdate', function() {
    socket.emit('movie:sync', $scope.video.currentTime);
  });

});

  /*
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
  */

