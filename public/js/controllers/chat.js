angular.module('chat', [])
.controller('chatController', function ($scope, socket) {

  // Socket listeners
  // ================
  $scope.isThisTheEnterKey = function(e){
    if(e.keyCode === 13){
      $scope.sendMessage();
    }
  }

  $scope.name;
  $scope.messages = $scope.messages || [];

  $scope.$watchCollection('messages', function() {
    console.log("change observed");
    $scope.scrollMessages();
  });

  $scope.scrollMessages = function(){
    setTimeout(function(){
      document.getElementById('messagesHolder').scrollTop = 9999999;
    }, 110);

  }

  // for(var i = 0; i < 50; i++){
  //   $scope.messages.push({name:"someName", text: "this is a message from PHMessages. It's very very long to ensure that Cooper can see what line wrapping is doing inside of the index.html"});
  // }

  socket.on('message', function (message) {
    $scope.messages.push(message);
    // $scope.scrollMessages();
    console.log(messages.length);
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
