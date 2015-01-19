client.controller('account', function($scope, $http) {
  $http.get('/api/users/me').success(function(data) {
    $scope.user = data;
  });

  $http.put('/api/users/me').success(function(data) {
    $scope.user = data;
    $scope.nameChanged = false;
  });
});