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
      $scope.getDevices();
    });
  }

  $scope.selectFirmware = function(deviceId) {
    var modal = $modal.open({
      templateUrl: 'selectFirmwareModal.html',
      controller: 'selectFirmwareModal',
      device_id: deviceId
    });
    modal.result.then(function(firmware) {
      $http.post('/api/devices/'+deviceId+'/firmware', {
        firmware: firmware
      }).success(function(data) {
        $scope.getDevices();
      });
    });
  }

});