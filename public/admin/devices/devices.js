admin.controller('devices', function($scope, $http, $modal) {

  $scope.devices;
  $scope.getDevices = function() {
    $http.get('/api/admin/devices').success(function(data) {
      $scope.devices = data;
    });
  }
  $scope.getDevices();

  $scope.claimDevice = function() {
    var modal = $modal.open({
      templateUrl: 'addDeviceModal.html',
      controller: 'addDeviceModal'
    });
    modal.result.then(function(sparkId) {
      $http.post('/api/admin/devices', {
        spark_id: sparkId
      }).success(function(data) {
        $scope.getDevices();
      });
    });
  }

  $scope.selectFirmware = function(deviceId) {
    var modal = $modal.open({
      templateUrl: 'selectFirmwareModal.html',
      controller: 'selectFirmwareModal',
      device_id: deviceId
    });
    modal.result.then(function(firmware) {
      $http.post('/api/admin/devices/'+deviceId+'/firmware', {
        firmware: firmware
      }).success(function(data) {
        $scope.getDevices();
      });
    });
  }

  $scope.getClaimCode = function(deviceId) {
    var modal = $modal.open({
      templateUrl: 'viewDeviceClaimCode.html',
      controller: 'viewDeviceClaimCode',
      resolve: {
        deviceId: function() {
          return deviceId;
        }
      }
    });
  }

});