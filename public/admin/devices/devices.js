admin.controller('devices', function($scope, $http, $modal) {
  $scope.devices;
  $scope.getDevices = function() {
    $http.get('/api/devices').success(function(data) {
      $scope.devices = data;
    });
  }
  $scope.getDevices();

  $scope.claimDevice = function() {
    var modal = $modal.open({
      templateUrl: 'addDeviceModal.html',
      controller: 'addDeviceModal'
    });
    modal.result.then(function() {
      $scope.getServers();
    });
  }
});