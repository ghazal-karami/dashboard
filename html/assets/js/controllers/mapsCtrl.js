'use strict';
/**
 * controllers for GoogleMap
 * AngularJS Directive
 */


app.controller('mapsCtrl', ['$scope', 'NgMap', function ($scope, NgMap) {
  var vm = this;

  NgMap.getMap().then(function (map) {
    //    [144.8889,-37.8917,145.0453,-37.7325]

    vm.map = map;
    console.log(map.getBounds());
  });

  vm.onClick = function (event) {
    vm.geoType = event.feature.getGeometry().getType();
    vm.geoArray = event.feature.getGeometry().getArray();
    vm.geoName = event.feature.R.REGION_NAME;
    console.dir('geoArray', event.feature.getGeometry().getArray());
  };
}]);
