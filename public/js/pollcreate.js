define([], function() {
    function CreatePollController($scope, $http, $location) {
        $scope.newPollName = null;
        $scope.addPoll = function(){
            $http.post('api/poll', {name: $scope.newPollName, user: 1})
                .then(function(response) {
                    $location.path('/editpoll/' + response.data.id);
                }, function(error) {
                    console.error(error);
                });
        }
    };
    CreatePollController.$inject = ['$scope', '$http', '$location'];
    return CreatePollController;
});