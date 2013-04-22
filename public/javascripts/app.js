var myApp = angular.module('librariesHub', ['infinite-scroll']);
myApp.controller('Search', function($scope, $http) {
    $scope.query = '';
    $scope.books = new Array();
    $scope.busy = false;

    $scope.submit = function(){
        getBooks();
    }

    $scope.next = function(){
        getBooks();
    }

    var getBooks = function(){
        if($scope.query && !$scope.busy){
            $scope.busy = true;
            $http.get('/api/search', {
                params:{
                    q: $scope.query,
                    offset: $scope.books.length
                }
            })
            .success(function(data) {
                $scope.books.push.apply($scope.books, data.books);
                console.log($scope.books.length);
                $scope.busy = false;
            })
            .error(function(data, status){
                $scope.books = new Array();
                $scope.busy = false;
            });
        }
    }
});
