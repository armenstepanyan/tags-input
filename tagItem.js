app.directive('tagItem',[function () {

  return {
    restrict: 'E',
    trasnclude: true,
    scope: {
      tag: '=',
      $index: '=',
      readOnlyIndex: '=',
      hideTagInput: '=',
      removeTag: '&',
      tagList: '=',
      regex:'=',
      addedKeys: '='
    },
    templateUrl: '/template/tag-item.html',

    link: function ($scope, $element) {

      init();

      $scope.removeCurrentTag = function () {
        $scope.removeTag({$index: $scope.$index});
      }

      $scope.currentTag.setEditable = function (t) {
        $scope.currentTag.isEditable = t;
        $scope.hideTagInput = t;
      }

      $scope.currentInput.keyDown = function ($event) {

        var keyCode = $event.keyCode;

          if($scope.addedKeys.indexOf(keyCode) != -1){
            editTag();
          }

        //$scope.onKeydown({$event: $event});
      };

      function isValidInput() {
        if($scope.regex == undefined) return true;
        return ($scope.currentTagInputValue && $scope.regex.test( $scope.currentTagInputValue) );
      }

      $scope.currentInput.blur = function ($event) {
        editTag('blur');
      }


      function editTag(eventType) {
        $scope.currentTagInputValue = $element.find('input')[0].value;
        if(eventType == "blur"){
          if(! $scope.currentTagInputValue) {
            $scope.currentTag.setEditable(false);
            $scope.removeTag(); //If tag empty, remove current tag

          }
        }
        if(!isValidInput()) return;

        $scope.tagList[$scope.$index].email =  $scope.currentTagInputValue;
        $scope.currentTag.setEditable(false);
      }

      function init() {
        $scope.currentTag = {
          isEditable: false
        };
        $scope.currentInput = {};
      }

    }
  }

}]);