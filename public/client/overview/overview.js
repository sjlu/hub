client.controller('overview', function($scope) {

  $scope.newDevice = function() {
    var modal = $modal.open({
      templateUrl: 'addDeviceModal.html',
      controller: 'addDeviceModal'
    });
    modal.result.then(function() {
      $scope.getDevices();
    });
  }

});