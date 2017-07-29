# tags-input

Custom tags-input directive angular@1.5.6

 
### Installation ###
* git clone https://github.com/armen5/tags-input.git
* npm install

### Use http-server ###
npm install http-server -g
Go to http://127.0.0.1:8080/
https://www.npmjs.com/package/http-server

# Usage

```sh
<custom-tags-input
            tag-list="tagList"	
            binded-data="formData"
            binded-key="email"           
            max-tags="15"
            read-only-index = "0"
            display-property="email"            
            on-tag-removed="removed($tag)"
            on-tag-added="added($tag)"
            allow-duplicate="false"
            place-holder='Enter email addresses'
            error-messages = "errorMessages"
    >
    </custom-tags-input>
   ```
   


  - tagList           - tag array to display
  - read-only-index   - disabled tag index, default -1
  - display-property  - tag object key (e.g. {id: 1, email: 'test@gmail.com'} )
  - on-tag-removed    - callback function on tag remove
  - on-tag-added      - callback function after tag added
  - error-messages    - custom error message to display (avaible {maxTags: '', patternError: '',duplicateTag: '' })
  
  # Example
  
  app.js
  
  ```code
   $scope.tagList = [
          {id:1 ,email: 'aa@gmail.com'},
          {id:2 ,email: 'bb@gmail.com'},
          {id:3 ,email: 'cc@gmail.com'},
          {id:4 ,email: 'dd@gmail.com'}		  
        ];
        
    $scope.errorMessages = {
        maxTags: "Max tags count error",
        patternError: "Pattern error !!",
        duplicateTag: "Tag is already exists"
      };
      
   $scope.added = function ($tag) {
        console.log($tag);
      }  
      
  $scope.removed = function ($tag) {
    console.log($tag);
  };   
      
  ```
    
