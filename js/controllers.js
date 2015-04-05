//manages the interaction within the controller
pokeDex.controller('pokeController', function($scope) {
  $scope.pokemonList = [];
  $scope.nameValue = 0;
  $scope.spriteValue = 0;
  $scope.descriptionValue = 0;
  $scope.currentPage = 1;


    //when click a button on list, data will update
  $scope.updateOutput = function (btn) {

        $scope.nameValue = btn;
        $scope.spriteValue = btn + 1;
        $scope.descriptionValue = btn * 15;
        $scope.currentPage = 2;

		    console.log("Current Page " + $scope.currentPage);
        callAPokemon();
        
    };

  $('#menuicon').click(function() {

      if ($scope.currentPage == 2) {
        $scope.currentPage = 1;
        $scope.$apply();
      } else if ($scope.currentPage == 1) {
        $scope.currentPage = 0;
        $scope.$apply();
      } else {
        $scope.currentPage = 1;
        $scope.$apply();
      }
        console.log("Current Page " + $scope.currentPage);
    });

 //  $('#menuicon').click(function() {

 //  	if ($scope.currentPage == 2) {
	//     $scope.currentPage = 1;
 //      $scope.$apply();
 //    } else if ($scope.currentPage == 1) {
 //      $scope.currentPage = 0;
 //      $scope.$apply();
 //    } else {
 //      $scope.currentPage = 1;
 //      $scope.$apply();
 //    }
 //      console.log("Current Page " + $scope.currentPage);
	// });

  $scope.next = function() {
    $scope.nameValue++;
    $scope.spriteValue++;
    $scope.descriptionValue += 15;
    callAPokemon();
    console.log('working right');
  };
  $scope.prev = function() {
    $scope.nameValue--;
    $scope.spriteValue--;
    $scope.descriptionValue -= 15;
    callAPokemon();
    console.log('working left');
  };


(function($) {

// jQuery on an empty object, we are going to use this as our Queue
var ajaxQueue = $({});

  $.ajaxQueue = function( ajaxOpts ) {
      var jqXHR,
          dfd = $.Deferred(),
          promise = dfd.promise();

      // queue our ajax request
      ajaxQueue.queue( doRequest );

      // add the abort method
      promise.abort = function( statusText ) {

          // proxy abort to the jqXHR if it is active
          if ( jqXHR ) {
              return jqXHR.abort( statusText );
          }

          // if there wasn't already a jqXHR we need to remove from queue
          var queue = ajaxQueue.queue(),
              index = $.inArray( doRequest, queue );

          if ( index > -1 ) {
              queue.splice( index, 1 );
          }

          // and then reject the deferred
          dfd.rejectWith( ajaxOpts.context || ajaxOpts,
              [ promise, statusText, "" ] );

          return promise;
      };

      // run the actual query
      function doRequest( next ) {
          jqXHR = $.ajax( ajaxOpts )
              .then( next, next )
              .done( dfd.resolve )
              .fail( dfd.reject );
      }

      return promise;
  };
})(jQuery);




 //generates Pokemon LIST
  function generateLIST() {
    var listNumber = 0;
    for (var i = 0; i >= 0 && i < 15; i++) {
      listNumber++;
      var generateurl = "http://pokeapi.co/api/v1/pokemon/" + listNumber;
      var count = 0;
      $.ajaxQueue({
        type: "GET",
        url: generateurl,
        // Set the data to fetch as jsonp to avoid same-origin policy
        dataType: "jsonp",
        async: true,
        success: function(data) {
          count++;
            console.log(count);
            //if (data.national_id == count){
              // If the ajax call is successfull, add the name to the "name" span
              $scope.pokemonList.push({ID: data.national_id, name: data.name});
             // if (data.national_id == listNumber){
                $scope.$apply();
              //}
            //}
        }
      });
    };
    // console.log(working);
  }


  //generates Pokemon
  function generatePokemon(urlinput, id, name, type, hp, hpID, atk, atkID, def, defID, spatk, spatkID, spdef, spdefID, spd, spdID) {
    var generateurl = "http://pokeapi.co/api/v1/" + urlinput + $scope.nameValue;

    $.ajax({
      type: "GET",
      url: generateurl,
      // Set the data to fetch as jsonp to avoid same-origin policy
      dataType: "jsonp",
      async: true,
      success: function(data) {
        //FOR GENERATING ID
        if (0 < data.national_id && data.national_id < 10) {
            // If the ajax call is successfull, add the name to the "name" span
            $(id).text('00' + data.national_id);
          } else if (9 < data.national_id && data.national_id < 100) {
            // If the ajax call is successfull, add the name to the "name" span
            $(id).text('0' + data.national_id);
          } else {
            // If the ajax call is successfull, add the name to the "name" span
            $(id).text(data.national_id);
          }

        //FOR GENERATING NAME
        $(name).text(data.name);

        //FOR GENERATING TYPES
        var types = "";
          // Loop over all the types contained in an array
          for (var i = 0; i < data.types.length; i++) {
            // Set the current type we will add to the "types" span
            var typetoAdd = (data.types[i].name);
            // Capitalise the letters of the current ability
            typetoAdd = typetoAdd.toUpperCase();
            // Append the current type to the overall "types" variable
            types += typetoAdd + " ";
          }
        // If the ajax call is successfull, add the name to the "name" span
        $(type).text(types);

        //FOR GENERATING HP
        $(hp).text(data.hp);
        $(hpID).css({"width": data.hp*0.7});

        //FOR GENERATING ATTACK
        $(atk).text(data.attack);
        $(atkID).css({"width": data.attack*0.7});

        //FOR GENERATING DEFENSE
        $(def).text(data.defense);
        $(defID).css({"width": data.defense*0.7});

        //FOR GENERATING SP ATK
        $(spatk).text(data.sp_atk);
        $(spatkID).css({"width": data.sp_atk*0.7});

        //FOR GENERATING SP DEF
        $(spdef).text(data.sp_def);
        $(spdefID).css({"width": data.sp_def*0.7});

        //FOR GENERATING SPEED
        $(spd).text(data.speed);
        $(spdID).css({"width": data.speed*0.7});

      }
    });
  }


  //generates Pokemon DESCRIPTION
  function generateDESCRIPTION(urlinput, id) {
    var generateurl = "http://pokeapi.co/api/v1/" + urlinput + $scope.descriptionValue;

        $.ajax({
          type: "GET",
          url: generateurl,
          // Set the data to fetch as jsonp to avoid same-origin policy
          dataType: "jsonp",
          async: true,
          success: function(data) {
            // If the ajax call is successfull, add the name to the "name" span
            $(id).text(data.description);
          }
        });
  }


  function generateSprite(urlinput, id) {
    var generateurl = "http://pokeapi.co/api/v1/" + urlinput + $scope.spriteValue;

    $.ajax({
      type: "GET",
      url: generateurl,
      dataType: "jsonp",
      async: true,
      success: function(data) {
        var href = "http://pokeapi.co" + data.image;
        // Add random image source to the sprite image source
        $(id).attr("src", href);
      }
    });
  }


  //gathers data
  function callAPokemon() {
    generatePokemon("pokemon/", "#id", "#name", "#type", "#hp", "#hp_bar", "#attack", "#atk_bar", "#defense", "#def_bar", "#sp_atk", "#spatk_bar", "#sp_def", "#spdef_bar", "#speed", "#spd_bar");
    generateDESCRIPTION("description/", "#description");
    generateSprite("sprite/", "#sprite")
  }

//generates pokemon list
generateLIST();

});