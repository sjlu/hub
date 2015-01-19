client.controller('overview', function($scope, $http) {

  $scope.alarm;
  $scope.getUser = function() {
    $http.get('/api/users/me').success(function(data) {
      $scope.user = data;
      $scope.alarm = data.alarm;
    })
  }
  $scope.getUser();

  $scope.saveAlarm = function() {
    var alarm = moment($scope.alarm, 'hh:mmA');
    $http.put('/api/users/me/alarm', {alarm: alarm.format('HHmm')}).success(function() {
      $scope.getUser();
    });
  }

  $('.clockpicker').clockpicker({
      autoclose: true,
      twelvehour: true
  });

});