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
      DataStore.data = $scope.current;
      var minutedata = DataStore.data.minutely.data;
      var hoursdata = DataStore.data.hourly.data;
      console.log('GOT CURRENT', DataStore.data);
      console.log('GOT MINTUEDATA', minutedata);
      console.log('GOT HOURSDATA', hoursdata);
      // chart min 
      c3.generate({
        bindto: '#chartmin',
        data: {
          type: 'area-spline',
          json: minutedata,
          keys: {
            // x: 'name', // it's possible to specify 'x' when category axis
            value: ['precipIntensity'],
          }
        },
        axis: {
          x: {
            // type: 'category'
          }
        },
        point: {
          show: false
        }
      });
      // chart hrs 
      c3.generate({
        bindto: '#charthrs',
        data: {
          type: 'area-spline',
          json: hoursdata,
          keys: {
            // x: 'name', // it's possible to specify 'x' when category axis
            value: ['apparentTemperature'],
          }
        },
        axis: {
          x: {
            // type: 'category'
          }
        },
        point: {
          show: false
        }
      });
      //debugger;
    }, function(error) {
      alert('Unable to get current conditions');
      console.error(error);
    });
    $scope.changePage = function() {
      $state.go('tab.settings')
    }
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
  }).controller('SettingsCtrl', function($scope, $state, Weather, DataStore) {
    console.log("hi from settings");
    $scope.current = DataStore.data;
    console.log('GOT CURRENT', $scope.current);
  });
