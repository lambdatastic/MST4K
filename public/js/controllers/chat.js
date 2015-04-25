angular.module('chat', [])
.controller('chatController', function ($scope, socket) {

  // Socket listeners
  // ================
  $scope.name;
  $scope.messages = $scope.messages || [];
  for(var i = 0; i < 50; i++){
    $scope.messages.push({name:"someName", text: "this is a message from PHMessages. It's very very long to ensure that Cooper can see what line wrapping is doing inside of the index.html"});
  }

  socket.on('message', function (message) {
    $scope.messages.push(message);
  });

  // Methods published to the scope
  // ==============================

  $scope.changeName = function (newName) {
    $scope.name = newName;
  };

  $scope.sendMessage = function () {
    socket.emit('message', {
      name: $scope.name,
      text: $scope.input
    });

    // add the message to our model locally
    $scope.messages.push({
      name: $scope.name,
      text: $scope.input
    });

    // clear message box
    $scope.input = '';
  };
});
