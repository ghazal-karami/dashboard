'use strict';
/**
 * controllers for GoogleMap
 * AngularJS Directive
 */


app.controller('mapsCtrl', ['$scope', 'NgMap', function ($scope, NgMap) {
  var vm = this;
  var infowindow = new google.maps.InfoWindow({
    content: 'hi sfdhkd'
  });

  NgMap.getMap().then(function (map) {

    vm.map = map;
    console.log(map.getBounds());

    vm.map.data.addListener('click', function(event) {
      var myHTML = event.feature.getProperty('REGION_NAME');
      infowindow.setContent(myHTML);
      infowindow.setPosition(vm.map.getCenter());
      infowindow.setOptions({pixelOffset: 10});
      infowindow.open(vm.map);
    });

//    vm.onClick = function (event) {
//      vm.geoType = event.feature.getGeometry().getType();
//      vm.geoArray = event.feature.getGeometry().getArray();
//      vm.geoName = event.feature.R.REGION_NAME;
//      console.dir('geoArray', event.feature.getGeometry().getArray());
//    };

  });
}]);

