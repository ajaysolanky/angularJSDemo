var app = angular.module('StopWatch', []);

var controllers ={};

controllers.StopWatchController = function ($scope, watchFactory) {
  $scope.currTime=watchFactory;
  
  $scope.save = function () {
    watchFactory.data.saved.push({
      time:watchFactory.data.time,
      name:$scope.name
    });
    watchFactory.data.time=0;
    $scope.name="";
  }
};

app.controller(controllers);

app.factory('watchFactory', function ($timeout) {
  var data = {
    time:0,
    saved:[]
  }, stopClock=null;
  
  function begin () {
    stopClock = $timeout(function () {
      data.time++;
      begin();
    },100);
  }
  
  function end() {
    $timeout.cancel(stopClock);
  }
  
  return {
    data:data,
    begin:begin,
    end:end
  };  
});