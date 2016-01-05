angular.module('starter.controllers', ['ionic']).constant('FORECASTIO_KEY', '0250858eac2128a369e90dea6a893431') // email id for forcast.io 'foorfmaoegea@dropmail.me'
  .controller('HomeCtrl', function($scope, $state, Weather, DataStore) {
    //read default settings into scope
    console.log('inside home');
    $scope.city = DataStore.city;
    var latitude = DataStore.latitude;
    var longitude = DataStore.longitude;
    //call getCurrentWeather method in factory ‘Weather’
    Weather.getCurrentWeather(latitude, longitude).then(function(resp) {
      $scope.current = resp.data;
      //var minutedata = resp.data.minutely.data;
      console.log('GOT CURRENT', $scope.current);
      //  console.log('GOT MINUTEDATA', $scope.current.minutely.data);
      //debugger;
    }, function(error) {
      alert('Unable to get current conditions');
      console.error(error);
    });
  }).controller('LocationsCtrl', function($scope, $state, Cities, DataStore) {
    $scope.cities = Cities.all();
    $scope.changeCity = function(cityId) {
      //get lat and longitude for seleted location
      var lat = $scope.cities[cityId].lat; //latitude
      var lgn = $scope.cities[cityId].lgn; //longitude
      var city = $scope.cities[cityId].name; //city name
      DataStore.setCity(city);
      DataStore.setLatitude(lat);
      DataStore.setLongitude(lgn);
      $state.go('tab.home');
    }
  }).controller('SettingsCtrl', function($scope) {
    //manages app settings
  });
