app.directive('tagItem',[function () {

  return {
    restrict: 'E',
    trasnclude: true,
    scope: {
      tag: '=',
      $index: '=',
      readOnlyIndex: '=',
      hideTagInput: '=',
      selectedIndex: '=',
      removeTag: '&',
      tagList: '=',
      regex:'=',
      addedKeys: '=',
      bindedData: '=',
      bindedKey: '='
    },
    templateUrl: '/template/tag-item.html',

    link: function ($scope, $element) {

      init();

      $scope.removeCurrentTag = function () {
        $scope.removeTag({$index: $scope.$index});
      }

      $scope.currentTag.setEditable = function (t) {
        if($scope.$index == $scope.readOnlyIndex) return;
        $scope.selectedIndex = -1;
        $scope.currentTag.isEditable = t;
        $scope.hideTagInput = t;
        if(t){
          setTimeout(function () {
            $element.find('input')[0].focus();
            setInputItemWidth();
          },10)

        }
      }

      $scope.currentInput.keyDown = function ($event) {

        var keyCode = $event.keyCode;

          if($scope.addedKeys.indexOf(keyCode) != -1){
            editTag();
          }

          setTimeout(function () {
            setInputItemWidth();
          }, 10);

        //$scope.onKeydown({$event: $event});
      };

      function isValidInput() {
        if($scope.regex == undefined) return true;
        return ($scope.currentTagInputValue && $scope.regex.test( $scope.currentTagInputValue) );
      }

      $scope.currentInput.blur = function ($event) {
        editTag('blur');
      };


      function editTag(eventType) {
        $scope.currentTagInputValue = $element.find('input')[0].value;
        if(eventType == "blur"){
          if(! $scope.currentTagInputValue) {
            $scope.currentTag.setEditable(false);
            $scope.removeTag(); //If tag empty, remove current tag

          }
        }
        if(!isValidInput()) return;

        if($scope.bindedData){
          var key = $scope.bindedKey;
          if($scope.bindedData[key] == $scope.tagList[$scope.$index].email){
            $scope.bindedData[key] = $scope.currentTagInputValue;
          }

        }
        $scope.tagList[$scope.$index].email =  $scope.currentTagInputValue;
        $scope.currentTag.setEditable(false);
      }

      function setInputItemWidth() {
        var el  = angular.element(document.querySelector('#inputTagItemDiv'));
        if(!el[0]) return;
        $scope.inputTagWidth = el[0].clientWidth + 8;
        $scope.$apply();
      }

      function init() {
        $scope.currentTag = {
          isEditable: false
        };
        $scope.currentInput = {};
      }

    },

    controller: function($scope){

    }
  }



}]);