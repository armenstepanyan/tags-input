app.directive('tagItem',[function () {

  return {
    restrict: 'E',
    trasnclude: true,
    scope: {
      tag: '=',
      $index: '@',
      readOnlyIndex: '@',
      hideTagInput: '=',
      selectedIndex: '@',
      removeTag: '&',
      tagList: '=',
      regex:'=',
      addedKeys: '=',
      bindedData: '=',
      bindedKey: '=',
      displayProperty:'@'
    },
    templateUrl: '/template/tag-item.html',

    link: function ($scope, $element) {

      init();

      $scope.removeCurrentTag = function () {
        $scope.removeTag({$index: $scope.$index});
      }

      $scope.currentTag.setEditable = function (t) {
        if($scope.$index == $scope.readOnlyIndex) return;
        // TODO
        // if(angular.element('.tags-input.tag-input-font.ng-invalid').length) {
        //   return
        // };

        if(document.querySelector('.tags-input.tag-input-font.ng-invalid')) {
          return;
        };
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

        var deleteKeys = { backspace: 8,  delete: 46 };

        if($scope.addedKeys.indexOf(keyCode) != -1){
          editTag();
        }

        if(keyCode == deleteKeys.backspace || keyCode == deleteKeys.delete){
          if(getCurrentInputValue() == ""){
            $scope.currentTag.setEditable(false);
            $scope.removeTag();
          }
        }

        setTimeout(function () {
          setInputItemWidth();
        }, 10);

      };

      function isValidInput() {
        if($scope.regex == undefined) return true;
        return ($scope.currentTagInputValue && $scope.regex.test( $scope.currentTagInputValue) );
      }

      $scope.currentInput.blur = function ($event) {
        editTag('blur');
      };


      function editTag(eventType) {
        $scope.currentTagInputValue = getCurrentInputValue();
        if(eventType == "blur"){
          if(! $scope.currentTagInputValue ) { // @TODO
            $scope.currentTag.setEditable(false);
            $scope.removeTag(); //If tag empty, remove current tag

          }
        }
        if(!isValidInput()) return;

        if($scope.bindedData){
          var key = $scope.bindedKey;
          var displayKey = $scope.displayProperty;
          if($scope.bindedData[key] == $scope.tagList[$scope.$index][displayKey]){
            $scope.bindedData[key] = $scope.currentTagInputValue;
          }

        }
        $scope.tagList[$scope.$index][displayKey] =  $scope.currentTagInputValue;
        $scope.currentTag.setEditable(false);
      }

      function getCurrentInputValue() {
        return  $element.find('input')[0].value;
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