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
        $scope.descriptionValue = btn;
        $scope.currentPage = 2;

		    console.log("Current Page " + $scope.currentPage);
        callAPokemon();
    };

  //when menu icon is clicked, change currentPage
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

  //swiping left to change to the next pokemon
  $scope.next = function() {
    if ($scope.nameValue <= 150) {
      $scope.nameValue++;
      $scope.spriteValue++;
      $scope.descriptionValue++;
      callAPokemon();
      console.log('working right');
    };
  };
  //swiping right to change to the previous pokemon
  $scope.prev = function() {
    if (2 <= $scope.nameValue) {
      $scope.nameValue--;
      $scope.spriteValue--;
      $scope.descriptionValue--;
      callAPokemon();
      console.log('working left');
    };
  };

//This function creates a queue for ajax calls so that the pokemon list would not go out of order
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
    for (var i = 0; i >= 0 && i < 11; i++) {
      listNumber++;
      var generateurl = "http://pokeapi.co/api/v1/pokemon/" + listNumber;
      var count = 0;
      //using the ajaxQueue
      $.ajaxQueue({
        type: "GET",
        url: generateurl,
        // Set the data to fetch as jsonp to avoid same-origin policy
        dataType: "jsonp",
        async: true,
        success: function(data) {
          count++;
          console.log(count);
          // If the ajax call is successfull, add to pokemonList array and apply
          $scope.pokemonList.push({ID: data.national_id, name: data.name});
          $scope.$apply();
        }
      });
    };
  }


  //generates Pokemon information
  function generatePokemon(urlinput, id, name, type, type2, hp, hpID, atk, atkID, def, defID, spatk, spatkID, spdef, spdefID, spd, spdID) {
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
            //add 00 before the ID
            $(id).text('00' + data.national_id);
          } else if (9 < data.national_id && data.national_id < 100) {
            //add 0 before the ID
            $(id).text('0' + data.national_id);
          } else {
            //add the ID
            $(id).text(data.national_id);
          }

        //FOR GENERATING NAME
        $(name).text(data.name);

        //FOR GENERATING TYPES
        var firstType = "";
        var secondType = "";
        //Loop over all the types contained in an array
        for (var i = 0; i < data.types.length; i++) {
          //Set the current type we will add to the "types" span
          var typetoAdd1 = (data.types[i].name);
          //Capitalise the letters of the current type
          typetoAdd1 = typetoAdd1.toUpperCase();
          //Append the current type to the overall "types" variable
          firstType += typetoAdd1.toString();
          console.log(firstType);
          //Add the types
          if (firstType == 'NORMAL'){
            $(type).html("<div class='item_type' id='typeBoxID'>"+ firstType +"</div>");
            $(typeBoxID).css({"background-color": '#FFF4E9', "color": '#665138', "display": 'inline-block'});
          } else if (firstType == 'FIGHTING') {
            $(type).html("<div class='item_type' id='typeBoxID'>"+ firstType +"</div>");
            $(typeBoxID).css({"background-color": '#EF7320', "color": '#FFFFFF', "display": 'inline-block'});
          } else if (firstType == 'FLYING') {
            $(type).html("<div class='item_type' id='typeBoxID'>"+ firstType +"</div>");
            $(typeBoxID).css({"background-color": '#5082FF', "color": '#FFFFFF', "display": 'inline-block'});
          } else if (firstType == 'POISON') {
            $(type).html("<div class='item_type' id='typeBoxID'>"+ firstType +"</div>");
            $(typeBoxID).css({"background-color": '#B139B7', "color": '#FFFFFF', "display": 'inline-block'});
          } else if (firstType == 'GROUND') {
            $(type).html("<div class='item_type' id='typeBoxID'>"+ firstType +"</div>");
            $(typeBoxID).css({"background-color": '#A87B48', "color": '#FFFFFF', "display": 'inline-block'});
          } else if (firstType == 'ROCK') {
            $(type).html("<div class='item_type' id='typeBoxID'>"+ firstType +"</div>");
            $(typeBoxID).css({"background-color": '#665138', "color": '#FFFFFF', "display": 'inline-block'});
          } else if (firstType == 'BUG') {
            $(type).html("<div class='item_type' id='typeBoxID'>"+ firstType +"</div>");
            $(typeBoxID).css({"background-color": '#7AC943', "color": '#665138', "display": 'inline-block'});
          } else if (firstType == 'GHOST') {
            $(type).html("<div class='item_type' id='typeBoxID'>"+ firstType +"</div>");
            $(typeBoxID).css({"background-color": '#535399', "color": '#FFFFFF', "display": 'inline-block'});
          } else if (firstType == 'STEEL') {
            $(type).html("<div class='item_type' id='typeBoxID'>"+ firstType +"</div>");
            $(typeBoxID).css({"background-color": '#666666', "color": '#FFFFFF', "display": 'inline-block'});
          } else if (firstType == 'FIRE') {
            $(type).html("<div class='item_type' id='typeBoxID'>"+ firstType +"</div>");
            $(typeBoxID).css({"background-color": '#FF0000', "color": '#FFFFFF', "display": 'inline-block'});
          } else if (firstType == 'WATER') {
            $(type).html("<div class='item_type' id='typeBoxID'>"+ firstType +"</div>");
            $(typeBoxID).css({"background-color": '#0060B7', "color": '#FFFFFF', "display": 'inline-block'});
          } else if (firstType == 'GRASS') {
            $(type).html("<div class='item_type' id='typeBoxID'>"+ firstType +"</div>");
            $(typeBoxID).css({"background-color": '#689F49', "color": '#FFFFFF', "display": 'inline-block'});
          } else if (firstType == 'ELECTRIC') {
            $(type).html("<div class='item_type' id='typeBoxID'>"+ firstType +"</div>");
            $(typeBoxID).css({"background-color": '#FFFF00', "color": '#665138', "display": 'inline-block'});
          } else if (firstType == 'PSYCHIC') {
            $(type).html("<div class='item_type' id='typeBoxID'>"+ firstType +"</div>");
            $(typeBoxID).css({"background-color": '#F66FA0', "color": '#FFFFFF', "display": 'inline-block'});
          } else if (firstType == 'ICE') {
            $(type).html("<div class='item_type' id='typeBoxID'>"+ firstType +"</div>");
            $(typeBoxID).css({"background-color": '#6BE3E8', "color": '#665138', "display": 'inline-block'});
          } else if (firstType == 'DRAGON') {
            $(type).html("<div class='item_type' id='typeBoxID'>"+ firstType +"</div>");
            $(typeBoxID).css({"background-color": '#6A58DB', "color": '#FFFFFF', "display": 'inline-block'});
          } else if (firstType == 'DARK') {
            $(type).html("<div class='item_type' id='typeBoxID'>"+ firstType +"</div>");
            $(typeBoxID).css({"background-color": '#303030', "color": '#FFFFFF', "display": 'inline-block'});
          } else if (firstType == 'FAIRY') {
            $(type).html("<div class='item_type' id='typeBoxID'>"+ firstType +"</div>");
            $(typeBoxID).css({"background-color": '#FF99D6', "color": '#FFFFFF', "display": 'inline-block'});
          }

          if (data.types.length == 2){
            var typetoAdd2 = (data.types[i + 1].name);
            //Capitalise the letters of the current type
            typetoAdd2 = typetoAdd2.toUpperCase();
            //Append the current type to the overall "types" variable
            secondType += typetoAdd2.toString();
            console.log(data.types.length);
          
            if (secondType == 'NORMAL'){
              $(type2).html("<div class='item_type2' id='typeBoxID2'>"+ secondType +"</div>");
              $(typeBoxID2).css({"background-color": '#FFF4E9', "color": '#665138', "display": 'inline-block'});
            } else if (secondType == 'FIGHTING') {
              $(type2).html("<div class='item_type2' id='typeBoxID2'>"+ secondType +"</div>");
              $(typeBoxID2).css({"background-color": '#EF7320', "color": '#FFFFFF', "display": 'inline-block'});
            } else if (secondType == 'FLYING') {
              $(type2).html("<div class='item_type2' id='typeBoxID2'>"+ secondType +"</div>");
              $(typeBoxID2).css({"background-color": '#5082FF', "color": '#FFFFFF', "display": 'inline-block'});
            } else if (secondType == 'POISON') {
              $(type2).html("<div class='item_type2' id='typeBoxID2'>"+ secondType +"</div>");
              $(typeBoxID2).css({"background-color": '#B139B7', "color": '#FFFFFF', "display": 'inline-block'});
            } else if (secondType == 'GROUND') {
              $(type2).html("<div class='item_type2' id='typeBoxID2'>"+ secondType +"</div>");
              $(typeBoxID2).css({"background-color": '#A87B48', "color": '#FFFFFF', "display": 'inline-block'});
            } else if (secondType == 'ROCK') {
              $(type2).html("<div class='item_type2' id='typeBoxID2'>"+ secondType +"</div>");
              $(typeBoxID2).css({"background-color": '#665138', "color": '#FFFFFF', "display": 'inline-block'});
            } else if (secondType == 'BUG') {
              $(type2).html("<div class='item_type2' id='typeBoxID2'>"+ secondType +"</div>");
              $(typeBoxID2).css({"background-color": '#7AC943', "color": '#665138', "display": 'inline-block'});
            } else if (secondType == 'GHOST') {
              $(type2).html("<div class='item_type2' id='typeBoxID2'>"+ secondType +"</div>");
              $(typeBoxID2).css({"background-color": '#535399', "color": '#FFFFFF', "display": 'inline-block'});
            } else if (secondType == 'STEEL') {
              $(type2).html("<div class='item_type2' id='typeBoxID2'>"+ secondType +"</div>");
              $(typeBoxID2).css({"background-color": '#666666', "color": '#FFFFFF', "display": 'inline-block'});
            } else if (secondType == 'FIRE') {
              $(type2).html("<div class='item_type2' id='typeBoxID2'>"+ secondType +"</div>");
              $(typeBoxID2).css({"background-color": '#FF0000', "color": '#FFFFFF', "display": 'inline-block'});
            } else if (secondType == 'WATER') {
              $(type2).html("<div class='item_type2' id='typeBoxID2'>"+ secondType +"</div>");
              $(typeBoxID2).css({"background-color": '#0060B7', "color": '#FFFFFF', "display": 'inline-block'});
            } else if (secondType == 'GRASS') {
              $(type2).html("<div class='item_type2' id='typeBoxID2'>"+ secondType +"</div>");
              $(typeBoxID2).css({"background-color": '#689F49', "color": '#FFFFFF', "display": 'inline-block'});
            } else if (secondType == 'ELECTRIC') {
              $(type2).html("<div class='item_type2' id='typeBoxID2'>"+ secondType +"</div>");
              $(typeBoxID2).css({"background-color": '#FFFF00', "color": '#665138', "display": 'inline-block'});
            } else if (secondType == 'PSYCHIC') {
              $(type2).html("<div class='item_type2' id='typeBoxID2'>"+ secondType +"</div>");
              $(typeBoxID2).css({"background-color": '#F66FA0', "color": '#FFFFFF', "display": 'inline-block'});
            } else if (secondType == 'ICE') {
              $(type2).html("<div class='item_type2' id='typeBoxID2'>"+ secondType +"</div>");
              $(typeBoxID2).css({"background-color": '#6BE3E8', "color": '#665138', "display": 'inline-block'});
            } else if (secondType == 'DRAGON') {
              $(type2).html("<div class='item_type2' id='typeBoxID2'>"+ secondType +"</div>");
              $(typeBoxID2).css({"background-color": '#6A58DB', "color": '#FFFFFF', "display": 'inline-block'});
            } else if (secondType == 'DARK') {
              $(type2).html("<div class='item_type2' id='typeBoxID2'>"+ secondType +"</div>");
              $(typeBoxID2).css({"background-color": '#303030', "color": '#FFFFFF', "display": 'inline-block'});
            } else if (secondType == 'FAIRY') {
              $(type2).html("<div class='item_type2' id='typeBoxID2'>"+ secondType +"</div>");
              $(typeBoxID2).css({"background-color": '#FF99D6', "color": '#FFFFFF', "display": 'inline-block'});
            }
          } else {
            $(type2).html("<div class='' id='typeBoxID2'></div>");
            $(typeBoxID2).css({});
          }

        //FOR GENERATING HP
        if (data.hp >= 190){
          $(hp).text('*'+ data.hp);
          $(hpID).css({"width": 180});
        } else {
          $(hp).text(data.hp);
          $(hpID).css({"width": data.hp});
        }

        //FOR GENERATING ATTACK
        $(atk).text(data.attack);
        $(atkID).css({"width": data.attack});

        //FOR GENERATING DEFENSE
        $(def).text(data.defense);
        $(defID).css({"width": data.defense});

        //FOR GENERATING SP ATK
        $(spatk).text(data.sp_atk);
        $(spatkID).css({"width": data.sp_atk});

        //FOR GENERATING SP DEF
        $(spdef).text(data.sp_def);
        $(spdefID).css({"width": data.sp_def});

        //FOR GENERATING SPEED
        $(spd).text(data.speed);
        $(spdID).css({"width": data.speed});

        //FOR GENERATING BOX
        $(boxbox1).html("<input type='checkbox' value='"+ (data.national_id + 1) +"' id='caughtBox"+ (data.national_id + 1) +"' ng-model='checkboxModel.value1'><label for='caughtBox"+ (data.national_id + 1) +"'></label>");
        }
      }
    });
  }


  //generates Pokemon DESCRIPTION
  function generateDESCRIPTION(id) {
    var generateurl = "http://pokeapi.co/api/v1/pokemon/" + $scope.descriptionValue;

    $.ajax({
      type: "GET",
      url: generateurl,
      // Set the data to fetch as jsonp to avoid same-origin policy
      dataType: "jsonp",
      async: true,
      success: function(data) {
        var descriptionLink = "";
          //Loop over all the descriptions contained in an array
          for (var i = 0; i < 1; i++) {
            //Adding the first description link
            var descToAdd = (data.descriptions[i].resource_uri);
            //Append the current description to the descriptionLink variable
            descriptionLink += descToAdd;
            //generate a 2nd URL for the ajax call to get the description text
            var generateurl2 = "http://pokeapi.co" + descriptionLink;
            $.ajax({
              type: "GET",
              url: generateurl2,
              //Set the data to fetch as jsonp to avoid same-origin policy
              dataType: "jsonp",
              async: true,
              success: function(data) {
                //If the ajax call is successfull, add the description to the "description" span
                $(id).text(data.description);
              }
             });
          };
        }
    });
  }

  //generating the Sprite for pokemon
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
    generatePokemon("pokemon/", "#id", "#name", "#type", "#type2", "#hp", "#hp_bar", "#attack", "#atk_bar", "#defense", "#def_bar", "#sp_atk", "#spatk_bar", "#sp_def", "#spdef_bar", "#speed", "#spd_bar");
    generateDESCRIPTION("#description");
    generateSprite("sprite/", "#sprite")

  }


$scope.checkboxModel = {
  value1 : false
};


var checked, checkedValues, boxboxArray = new Array();
$(document).on("change", "input[type=checkbox]", function(e) {

  checked = $("input[type=checkbox]:checked");
  checkedValues = checked.map(function(i) { 
    return $(this).val();
  }).get();
  checkedValues.join();
  console.log(boxboxArray);
});




//generates pokemon list
generateLIST();

});