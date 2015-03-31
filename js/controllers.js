//when clicked on button then task gets created
// $(document).ready(function() {
// 	$('.menuicon').click(function() {
// 		console.log("it kinda works.");
// 	});
// });

$(document).ready(function() {
	$('.updateData').click(function() {
		callAPokemon();
	});
});


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

    $('.menuicon').click(function() {

    	if ($scope.currentPage == 0) {
		$scope.currentPage = 2;}

		else {
		$scope.currentPage = 0;}
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


  generateLIST();



//generates Pokemon ID
function generateId(urlinput, id) {
  var generateurl = "http://pokeapi.co/api/v1/" + urlinput + $scope.idValue;

  $.ajax({
    type: "GET",
    url: generateurl,
    // Set the data to fetch as jsonp to avoid same-origin policy
    dataType: "jsonp",
    async: true,
    success: function(data) {
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
    }
  });
}

//generates Pokemon NAME
function generateName(urlinput, id) {
  var generateurl = "http://pokeapi.co/api/v1/" + urlinput + $scope.nameValue;

  $.ajax({
    type: "GET",
    url: generateurl,
    // Set the data to fetch as jsonp to avoid same-origin policy
    dataType: "jsonp",
    async: true,
    success: function(data) {
      // If the ajax call is successfull, add the name to the "name" span
      $(id).text(data.name);
    }
  });
}


//generates Pokemon TYPE
function generateType(urlinput, id) {
  var generateurl = "http://pokeapi.co/api/v1/" + urlinput + $scope.typeValue;

  $.ajax({
    type: "GET",
    url: generateurl,
    // Set the data to fetch as jsonp to avoid same-origin policy
    dataType: "jsonp",
    async: true,
    success: function(data) {
        var types = "";
              // Loop over all the types contained in an array
              for (var i = 0; i < data.types.length; i++) {
                // Set the current type we will add to the "types" span
                var typetoAdd = (data.types[i].name);
                // Capitalise the first letter of the current ability
                typetoAdd = typetoAdd.toUpperCase();
                // Append the current type to the overall "types" variable
                types += typetoAdd + " ";
              }
      // If the ajax call is successfull, add the name to the "name" span
      $(id).text(types);
    }
  });
}


//generates Pokemon HP
function generateHP(urlinput, id) {
  var generateurl = "http://pokeapi.co/api/v1/" + urlinput + $scope.hpValue;

  $.ajax({
    type: "GET",
    url: generateurl,
    // Set the data to fetch as jsonp to avoid same-origin policy
    dataType: "jsonp",
    async: true,
    success: function(data) {
      // If the ajax call is successfull, add the name to the "name" span
      $(id).text(data.hp);
    }
  });
}


//generates Pokemon ATTACK
function generateATK(urlinput, id) {
  var generateurl = "http://pokeapi.co/api/v1/" + urlinput + $scope.atkValue;

  $.ajax({
    type: "GET",
    url: generateurl,
    // Set the data to fetch as jsonp to avoid same-origin policy
    dataType: "jsonp",
    async: true,
    success: function(data) {
      // If the ajax call is successfull, add the name to the "name" span
      $(id).text(data.attack);
    }
  });
}

//generates Pokemon DEFENSE
function generateDEF(urlinput, id) {
  var generateurl = "http://pokeapi.co/api/v1/" + urlinput + $scope.defValue;

  $.ajax({
    type: "GET",
    url: generateurl,
    // Set the data to fetch as jsonp to avoid same-origin policy
    dataType: "jsonp",
    async: true,
    success: function(data) {
      // If the ajax call is successfull, add the name to the "name" span
      $(id).text(data.defense);
    }
  });
}

//generates Pokemon SP ATK
function generateSPATK(urlinput, id) {
  var generateurl = "http://pokeapi.co/api/v1/" + urlinput + $scope.spatkValue;

  $.ajax({
    type: "GET",
    url: generateurl,
    // Set the data to fetch as jsonp to avoid same-origin policy
    dataType: "jsonp",
    async: true,
    success: function(data) {
      // If the ajax call is successfull, add the name to the "name" span
      $(id).text(data.sp_atk);
    }
  });
}

//generates Pokemon SP DEF
function generateSPDEF(urlinput, id) {
  var generateurl = "http://pokeapi.co/api/v1/" + urlinput + $scope.spdefValue;

  $.ajax({
    type: "GET",
    url: generateurl,
    // Set the data to fetch as jsonp to avoid same-origin policy
    dataType: "jsonp",
    async: true,
    success: function(data) {
      // If the ajax call is successfull, add the name to the "name" span
      $(id).text(data.sp_def);
    }
  });
}

//generates Pokemon SPEED
function generateSPEED(urlinput, id) {
  var generateurl = "http://pokeapi.co/api/v1/" + urlinput + $scope.spdValue;

  $.ajax({
    type: "GET",
    url: generateurl,
    // Set the data to fetch as jsonp to avoid same-origin policy
    dataType: "jsonp",
    async: true,
    success: function(data) {
      // If the ajax call is successfull, add the name to the "name" span
      $(id).text(data.speed);
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
  generateId("pokemon/", "#id");
  generateName("pokemon/", "#name");
  generateDESCRIPTION("description/", "#description");
  generateSprite("sprite/", "#sprite")
  generateType("pokemon/", "#type");
  generateHP("pokemon/", "#hp");
  generateATK("pokemon/", "#attack");
  generateDEF("pokemon/", "#defense");
  generateSPATK("pokemon/", "#sp_atk");
  generateSPDEF("pokemon/", "#sp_def");
  generateSPEED("pokemon/", "#speed");
}

});
