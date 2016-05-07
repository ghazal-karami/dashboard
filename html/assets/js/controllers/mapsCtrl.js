'use strict';
/**
 * controllers for GoogleMap
 * AngularJS Directive
 */


app.controller('mapsCtrl', ['$scope', '$http', '$interval', 'NgMap', function ($scope, $http, $interval, NgMap) {
  var vm = this;
  NgMap.getMap().then(function (map) {
    //    [144.8889,-37.8917,145.0453,-37.7325]


    /**
     * Get features names from geojson dataset
     **/
    vm.map = map;
    vm.onClick = function (event) {
      vm.geoType = event.feature.getGeometry().getType();
      vm.geoArray = event.feature.getGeometry().getArray();
      vm.regionName = event.feature.getProperty('REGION_NAME');
      console.dir('geoArray', event.feature.getGeometry().getArray());
    };


    /**
     * Get tweets with the language = "en" and
     * display them on the map
     **/
    var preurl = "http://115.146.95.99:5984/_utils/database.html?tweets_test/_design/erica_design_test/";
    var preurltest = "http://115.146.95.99:5984/tweets_test/_design/erica_design_test/";
    $http({
      method: "GET",
      url: preurltest + "_view/lang_geo_view?key=%22en%22"
    }).then(function mySucces(response) {
      $scope.data = response.data;
      $scope.GenerateMapMarkers = function () {
        $scope.date = Date(); // Just to show that we are updating

        response.data.rows.forEach(function (entry) {
          var marker = new google.maps.Marker();
          var latlng = new google.maps.LatLng(entry.value.geo.coordinates[0], entry.value.geo.coordinates[1]);
          marker.setPosition(latlng);
          marker.setMap(vm.map);
        });
      };
      $interval($scope.GenerateMapMarkers, 2000);
    }, function myError(response) {
      $scope.statusText = response.statusText;
    });
  });
}
]);
