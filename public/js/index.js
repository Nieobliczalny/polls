define([], function() {
    function IndexController($scope, $http) {
        $scope.polls = [];
        $http.get('api/polls')
            .then(function(response) {
                $scope.polls = response.data;
            }, function(error) {
                console.error(error);
            });
        /*$scope.tmp = [{value: 1, text: 'Jeden'}, {value: '2', text: 'Dwa'}];
        $scope.printScope = function(){
            console.info($scope, $scope.q1, $scope.q2, $scope.q3, $scope.q4, $scope.q5, $scope.q6)
        }
        $scope.postForm = function(){
            console.info($scope, arguments);
        }*/
    }
    IndexController.$inject = ['$scope', '$http'];
    return IndexController;
});