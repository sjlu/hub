client.controller('addDeviceModal', function($scope, $modalInstance, $http) {

  $scope.code;
  $scope.add = function() {
    $modalInstance.close($scope.code);
  }

});