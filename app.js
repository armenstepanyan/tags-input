
var app = angular.module('tags-app',[]);

app.controller('MainController',["$scope",function ($scope) {
      $scope.removed = function ($tag) {

        console.log($tag);
      };

      $scope.formData = {
        email:"bb@gmail.com"
      };

      $scope.x = 5;

      $scope.added = function ($tag) {
        console.log($tag);
      }


      $scope.errorMessages = {
        maxTags: "Max tags count error",
        patternError: "Pattern error !!",
        duplicateTag: "Tag is already exists"
      }
}]);