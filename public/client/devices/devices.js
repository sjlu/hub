client.controller('devices', function($scope, $http, $modal) {

  $scope.getDevices = function() {
    $http.get('/api/devices').success(function(data) {
      $scope.devices = data;
    });
  }
  $scope.getDevices();

  $scope.newDevice = function() {
    var modal = $modal.open({
      templateUrl: 'addDeviceModal.html',
      controller: 'addDeviceModal'
    });
    modal.result.then(function(code) {
      $http.post('/api/devices', {code: code}).success(function(data) {
        $scope.getDevices();
      });
    });
  }

});