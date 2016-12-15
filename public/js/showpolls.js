define([], function() {
    function ShowPollsController($scope, $http) {
        $scope.polls = [];
        $http.get('api/polls/user/1')
            .then(function(response) {
                $scope.polls = response.data;
            }, function(error) {
                console.error(error);
            });
    };
    ShowPollsController.$inject = ['$scope', '$http'];
    return ShowPollsController;
});