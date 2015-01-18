admin.controller('selectFirmwareModal', function($scope, $modalInstance, $http) {

  $scope.deviceId;

  $scope.firmware;
  $http.get('/api/admin/firmware').success(function(data) {
    $scope.firmware = data;
  });

  $scope.selectedFirmware;

  $scope.submit = function() {
    $modalInstance.close($scope.selectedFirmware);
  }

  $scope.close = function() {
    $modalInstance.dismiss('cancel');
  }

});