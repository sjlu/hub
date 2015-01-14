admin.controller('addDeviceModal', function($scope, $modalInstance, $http) {

  $scope.sparkId;
  $scope.create = function() {
    $modalInstance.close($scope.sparkId);
  }

});