/* App Modules */

var answerValue = 0;

var pokeDex = angular.module('pokeDex', ['ngRoute', 'ngAnimate', 'ngTouch'])

/* Routes */

pokeDex.config(['$routeProvider',
  function($routeProvider) {
  //set up routes
  $routeProvider
    .when('/menu', {
      templateUrl: 'app_pages/menu.html',
      controller: 'pokeController'
    })

    .otherwise( {
    	templateUrl: 'app_pages/list.html',
      controller: 'pokeController'
    });
}]);



// $(window).load(function() {
//   var pokeItem = function(){
//     $('.itemitem').hammer().on('tap', function(){
//       $scope.nameValue++;
//       $scope.spriteValue++;
//       $scope.descriptionValue += 15;
//       $scope.$apply();
//       callAPokemon();
//       console.log('working'); 
//     });

//     $(".itemitem").hammer().on('swiperight', function(){
//       $scope.nameValue--;
//       $scope.spriteValue--;
//       $scope.descriptionValue -= 15;
//       $scope.$apply();
//       callAPokemon();
//       console.log('working right');
//     });
//     console.log('ahhhhh');
//   };
// pokeItem();
// });