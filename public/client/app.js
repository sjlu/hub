client.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

  $locationProvider.html5Mode(false);

  var routes = {
    '/': 'overview',
    '/account': 'account',
    '/devices': 'devices'
  };

  for (var route in routes) {
    var controller = routes[route];
    $routeProvider.when(route, {
      templateUrl: controller + '.html',
      controller: controller
    });
  }

  $routeProvider.otherwise({
    redirectTo: '/'
  });

}]);