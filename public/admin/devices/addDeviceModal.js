admin.controller('addDeviceModal', function($scope, $modalInstance, $http) {

  $scope.deviceId;
  $scope.createServer = function() {
    $http.post('/api/devices', {
      device_id: $scope.deviceId
    }).success(function(data) {
      $modalInstance.close();
    });
  }

});