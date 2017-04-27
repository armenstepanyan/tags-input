
  app.directive('tagsInput', [function () {

    return {
      restrict: 'E',
      trasnclude: true,
      scope: {
        list: '=',
        displayProperty: '@',
        onTagRemoved: '&',
        onTagAdded: '&',
        readOnlyIndex: '@'
      },
      templateUrl: '/template/tags-input.html',
      link: function ($scope, $element) {

        $scope.tagList = [
          {id:1 ,email: 'aa@gmail.com'},
          {id:2 ,email: 'bb@gmail.com'},
          {id:3 ,email: 'cc@gmail.com'},
          {id:4 ,email: 'dd@gmail.com'},
        ];

        var KEYS = {
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

        $scope.input = {};
        $scope.newTag = {
          newTag: false
        };



        //Pattern for email
        $scope.regex = "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$";

        //Set items readOnly
       // $scope.readOnlyIndex = 0;

        $scope.selectedIndex = -1;

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
            var addedKeys = [KEYS.enter, KEYS.semicolon, KEYS.comma, KEYS.space];

            if(addedKeys.indexOf(keyCode) != -1){
              if(!isValidInput()) return;
              addTagToList($event);
            }
          }

        };

        $scope.input.blur = function ($event) {
          if(isValidInput()){
            addTagToList();
          }
        }


        function isValidInput() {
          return (!$scope.mailForm.input.$error.pattern &&  $scope.inputTag);
        }

        function addTagToList($event) {
          var obj = {};
          obj[$scope.displayProperty] = $scope.inputTag;
          $scope.tagList.push(obj);
          $scope.onTagAdded({$tag :obj});
          $scope.inputTag = '';

          //If clicked comma, semicolon, prevent current symbol adding
          if($event){
            $event.preventDefault();
            $event.stopPropagation();
          }

        }

        function attachEventsForItems(keyCode) {
          var itemLength = $scope.tagList.length;

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
                $scope.selectedIndex = -1;
              }

              break;
          }
        }


        $scope.removeTag = function ($index) {

          if($index > 0 && $index < $scope.tagList.length){
            if($index ==  $scope.readOnlyIndex) return;

            var _current_tag = $scope.tagList[$index];

            $scope.tagList.splice($index,1);
            $scope.selectedIndex = -1;

            $scope.onTagRemoved({$tag :_current_tag});

          }

        };

        function moveLeft() {

          if($scope.selectedIndex == -1){
            $scope.selectedIndex = $scope.tagList.length - 1;
            return;
          }
          $scope.selectedIndex--;
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



      }

    }

  }]);