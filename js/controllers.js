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
        $scope.descriptionValue = btn * 15 + 1;
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
      // If the ajax call is successfull, add the name to the "name" span
      $(id).text(data.national_id);
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

//generates Pokemon DESCRIPTION
// function generateDescription(urlinput, id) {

// 	var addDesc = $scope.descriptionValue + 10;

//   var generateurl = "http://pokeapi.co/api/v1/" + urlinput + 10;

//   $.ajax({
//     type: "GET",
//     url: generateurl,
//     // Set the data to fetch as jsonp to avoid same-origin policy
//     dataType: "jsonp",
//     async: true,
//     success: function(data) {
//       // If the ajax call is successfull, add the name to the "name" span
//       $(id).html(data.description);
//     }
//   });
// }

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
  // generateDescription("description/", "#description");
  generateSprite("sprite/", "#sprite")
}

callAPokemon();

 });