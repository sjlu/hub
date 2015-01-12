admin.controller('devices', function($scope, $http) {
  $http.get('/api/devices').success(function(data) {
    $scope.devices = data;
  });
});