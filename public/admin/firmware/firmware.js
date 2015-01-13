admin.controller('firmware', function($scope, $http) {
  $scope.firmware;
  $http.get('/api/firmware').success(function(data) {
    $scope.firmware = data;
  });
});