admin.controller('viewDevice', function($scope, $http, $routeParams) {

  $scope.deviceId = $routeParams.device_id;
  $scope.device;
  $http.get('/api/devices/' + $scope.deviceId).success(function(data) {
    $scope.device = data;
  });

  $scope.spark;
  $http.get('/api/devices/' + $scope.deviceId + '/spark').success(function(data) {
    $scope.spark = data;
  });

});