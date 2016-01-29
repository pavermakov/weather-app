var weatherApp = angular.module('weather', ['ngAnimate']);

weatherApp.controller('MainController', ['$scope', '$http', function ($scope, $http) {
   $scope.isSearching = false;
   $scope.weatherData = [];
   $scope.currentLocation = {
      x: null,
      y: null
   }

   $scope.getLocation = function () {
      $scope.isSearching = true;
      if (navigator.geolocation) {
         navigator.geolocation.getCurrentPosition($scope.recordLocation);
      } else {
         console.log("Geolocation is not supported!");
      }
   }

   $scope.recordLocation = function (position) {
      $scope.currentLocation.x = position.coords.latitude;
      $scope.currentLocation.y = position.coords.longitude;
      $scope.getWeather();
   }

   $scope.getWeather = function () {
      $http({
            method: 'GET',
            url: 'http://api.openweathermap.org/data/2.5/weather',
            params: {
               'APPID': '1ea4cceb1b03e16a4324b1c9d3fa342f',
               'lat': $scope.currentLocation.x,
               'lon': $scope.currentLocation.y,
               'units': 'metric'
            }
         })
         .then(function (response) {
            $scope.weatherData = response.data;

         }, function (error) {
            console.log('Unable to gather data( ' + error.status + ' )');
         });
   }
}]);