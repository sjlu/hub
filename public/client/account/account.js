client.controller('account', function($scope, $http) {
  $http.get('/api/users/me').success(function(data) {
    $scope.user = data;
  });

  $scope.save = function() {
    $http.put('/api/users/me', $scope.user).success(function(data) {
      $scope.user = data;
    });
  }

  $scope.saveTimezone = function() {
    $http.put('/api/users/me/timezone', {timezone: $scope.user.timezone}).success(function(data) {
      $scope.user = data;
    });
  }
});