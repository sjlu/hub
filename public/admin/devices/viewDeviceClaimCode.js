admin.controller('viewDeviceClaimCode', function($scope, $http, $modalInstance, deviceId) {

  $scope.claimCode;
  $http.get('/api/admin/devices/'+deviceId+'/claim_code').success(function(data) {
    $scope.claimCode = data.claim_code;
  });

  $scope.close = function() {
    $modalInstance.dismiss('cancel');
  }

});