
var app = angular.module('tags-app',[]);

app.controller('MainController',["$scope",function ($scope) {
      $scope.removed = function ($tag) {

        console.log($tag);
      };

      $scope.formData = {
        email:"bb@gmail.com"
      };

      $scope.regex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

      $scope.added = function ($tag) {
        console.log($tag);
      }

	  $scope.tagList = [
          {id:1 ,email: 'aa@gmail.com'},
          {id:2 ,email: 'bb@gmail.com'},
          {id:3 ,email: 'cc@gmail.com'},
          {id:4 ,email: 'dd@gmail.com'},
		      {id:5 ,email: 'ee@gmail.com'},
        ];

      $scope.errorMessages = {
        maxTags: "Max tags count error",
        patternError: "Pattern error !!",
        duplicateTag: "Tag is already exists"
      };
	  
	  $scope.submit = function(){
		  console.log("invalid: ",$scope.submitForm.$invalid);
	  }
}]);