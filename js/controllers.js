//manages the interaction within the controller
pokeDex.controller('pokeController', function($scope) {
  $scope.pokemonList = [];
  $scope.idValue = 0;
  $scope.nameValue = 0;
  $scope.spriteValue = 0;
  $scope.typeValue = 0;
  $scope.descriptionValue = 0;
  $scope.hpValue = 0;
  $scope.atkValue = 0;
  $scope.defValue = 0;
  $scope.spatkValue = 0;
  $scope.spdefValue = 0;
  $scope.spdValue = 0;

  $scope.currentPage = 0;

    //when click a button on list, data will update
  $scope.updateOutput = function (btn) {
        $scope.idValue = btn;
        $scope.nameValue = btn;
        $scope.spriteValue = btn + 1;
        $scope.typeValue = btn;
        $scope.descriptionValue = btn * 15;
        $scope.hpValue = btn;
        $scope.atkValue = btn;
        $scope.defValue = btn;
        $scope.spatkValue = btn;
        $scope.spdefValue = btn;
        $scope.spdValue = btn;

        $scope.currentPage = 1;

		    console.log("Current Page " + $scope.currentPage);
        callAPokemon();
    };


  $('#menuicon').click(function() {

  	if ($scope.currentPage == 0) {
	    $scope.currentPage = 2;
      $scope.$apply();
    } else if ($scope.currentPage == 1) {
      $scope.currentPage = 0;
      $scope.$apply();
    } else {
      $scope.currentPage = 0;
      $scope.$apply();
    }
      console.log("Current Page " + $scope.currentPage);
	});


 //generates Pokemon LIST
  function generateLIST() {
    var listNumber = 0;
    for (var i = 0; i >= 0 && i < 151; i++) {
      listNumber++;
      var generateurl = "http://pokeapi.co/api/v1/pokemon/" + listNumber;

      $.ajax({
        type: "GET",
        url: generateurl,
        // Set the data to fetch as jsonp to avoid same-origin policy
        dataType: "jsonp",
        async: true,
        success: function(data) {
          // If the ajax call is successfull, add the name to the "name" span
          $scope.pokemonList.push({ID: data.national_id, name: data.name});
          $scope.$apply();
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