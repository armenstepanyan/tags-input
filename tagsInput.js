
  app.directive('customTagsInput', [function () {

    return {
      restrict: 'E',
      trasnclude: true,
      scope: {
        tagList: '=',
        displayProperty: '@',
        onTagRemoved: '&',
        onTagAdded: '&',
        readOnlyIndex: '@',
        bindedData: '=',
        bindedKey: '@',
        allowDuplicate: '&',
        placeHolder:'@',
        maxTags: '@',
        errorMessages: '='
      },
      templateUrl: '/template/tags-input.html',

      link: function ($scope, $element) {

        /*$scope.tagList = [
          {id:1 ,email: 'aa@gmail.com'},
          {id:2 ,email: 'bb@gmail.com'},
          {id:3 ,email: 'cc@gmail.com'},
          {id:4 ,email: 'dd@gmail.com'},
        ];
*/

        var KEYS = getHotKeys();

        $scope.$watch('tagList', function(value){
          if(value){
            validateWithOptions();
            setTimeout(function () {
              setInputWidth();
            },10);
          }
        });

        init();
        //Pattern for email
        $scope.regex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;


        $scope.input.keyDown = function ($event) {
          var keyCode = $event.keyCode;
          var isInputValueNull = ($scope.mailForm.input.$viewValue == undefined || $scope.mailForm.input.$viewValue == "");

          var hotKeys = [KEYS.backspace, KEYS.delete, KEYS.left,KEYS.right];

          if(hotKeys.indexOf(keyCode) != -1 && isInputValueNull){
            $event.preventDefault();
            $event.stopPropagation();
            attachEventsForItems(keyCode);
          }
          else{
            $scope.selectedIndex = -1;

            if($scope.addedKeys.indexOf(keyCode) != -1){
              if(!isValidInput()) return;
              addTagToList($event);
            }
          }

          setTimeout(function () {
            setInputWidth(true);
          },10);

          validateWithOptions();

        };

        $scope.input.blur = function ($event) {
          if(isValidInput()){
            addTagToList();
          }

        };

        $scope.input.focus = function($event){
          $scope.selectedIndex = -1;
        };

        $scope.input.click = function($event){
          $scope.selectedIndex = -1;
        };

        // $scope.isValidInputTest = function () {
        //   isValidInput();
        // }

        function isValidInput() {

          validateWithOptions();

          return (
            $scope.mailForm &&
            !$scope.mailForm.input.$error.pattern &&
            $scope.input.inputTag &&
            !$scope.mailForm.$error.isTagsMax &&
            !$scope.mailForm.$error.isDuplicate

          );
        };

        function validateWithOptions() {
          if($scope.allowDuplicate() == false){
            $scope.mailForm.input.$setValidity('isDuplicate', !hasItem($scope.input.inputTag));
          }

          if($scope.maxTags){
            $scope.mailForm.input.$setValidity('isTagsMax',isValidTagsCount());
          }

        }

        function hasItem(_tagValue) {

          var key = $scope.displayProperty;

          for(var i = 0; i < $scope.tagList.length; i++){
            if($scope.tagList[i][key] == _tagValue){
              return true;
            }
          };
          return false;
        }

        function isValidTagsCount() {

          var maxTags = $scope.maxTags ? $scope.maxTags : false;
          var tagCount = ($scope.input.inputTag) ? $scope.tagList.length+1 : $scope.tagList.length;
          return maxTags ? (tagCount < $scope.maxTags) : true;
        }

        function addTagToList($event) {
          var obj = {};
          obj[$scope.displayProperty] = $scope.input.inputTag;
          $scope.tagList.push(obj);
          //call parent scope callback function
          $scope.onTagAdded({$tag :obj});
          $scope.input.inputTag = '';

          //If clicked comma, semicolon, prevent current symbol adding
          if($event){
            $event.preventDefault();
            $event.stopPropagation();
          }

        }

        function attachEventsForItems(keyCode) {

          switch (keyCode) {
            case KEYS.right:
              moveRight();
              break;

            case KEYS.left:
              moveLeft();
              break;

            case KEYS.delete:
            case KEYS.backspace:
              if($scope.selectedIndex == -1){
                moveLeft();
              }
              else {
                $scope.removeTag( $scope.selectedIndex);
              }
              break;
          }
        }


        $scope.removeTag = function ($index) {

          if($index >= 0 && $index < $scope.tagList.length){
            if($index ==  $scope.readOnlyIndex) return;

            var _current_tag = $scope.tagList[$index];

            $scope.tagList.splice($index,1);
            $scope.selectedIndex = -1;
            $scope.data.hideTagInput = false;
            $scope.onTagRemoved({$tag :_current_tag});
            validateWithOptions();

          }

        };

        function moveLeft() {

          if($scope.selectedIndex < 0){
            $scope.selectedIndex = $scope.tagList.length - 1;
            return;
          }
          $scope.selectedIndex--;
          if($scope.selectedIndex == -1){
            $scope.selectedIndex = $scope.tagList.length - 1;
            return
          };
          if($scope.selectedIndex == $scope.readOnlyIndex){

            if($scope.tagList.length == 1){
              $scope.selectedIndex = -1;
              return;
            }
            $scope.selectedIndex = ($scope.readOnlyIndex == 0) ? $scope.tagList.length - 1 : --$scope.selectedIndex;
            return;

          }



        }


        function moveRight() {

          $scope.selectedIndex++;

          if($scope.selectedIndex == $scope.tagList.length){
            $scope.selectedIndex = 0;
          }

          if($scope.selectedIndex == $scope.readOnlyIndex)$scope.selectedIndex++;


        }


        $scope.onDivFocus = function () {
          $element[0].getElementsByClassName('tags-input')[0].focus();
        }

        function setInputWidth() {
          var el  = angular.element(document.querySelector('#inputTagDiv'));
          if(!el[0]) return;
          $scope.inputWidth = el[0].clientWidth + 8;
          $scope.$apply();
        }

        function init() {

          $scope.selectedIndex = -1;

          $scope.addedKeys = [KEYS.enter, KEYS.semicolon, KEYS.comma, KEYS.space];

          $scope.input = {
            inputTag:''
          };

          $scope.data = {
            hideTagInput: false
          };

        }


        function getHotKeys() {

          var keys = {
            backspace: 8,
            tab: 9,
            enter: 13,
            escape: 27,
            space: 32,
            up: 38,
            down: 40,
            left: 37,
            right: 39,
            delete: 46,
            comma: 188,
            semicolon: 186
          };


          if (isBrowserFirefox()) {
            keys.semicolon = 59;
          }

          function isBrowserFirefox() {
            return (navigator.userAgent.toLowerCase().indexOf('firefox') > -1)

          }
          return keys;
        }

      },

      controller: function ($scope) {

      }


    }

  }]);


