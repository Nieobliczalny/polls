define([], function() {
    function EditPollController($scope, $http, $routeParams) {
        $scope.poll = {};
        $scope.questionModel = [];
        $http.get('api/poll/' + $routeParams.id)
            .then(function(response) {
                $scope.poll = response.data;
            }, function(error) {
                console.error(error);
            });
        $scope.editPollName = function(){
            $http.put('api/poll/' + $scope.poll.id, {name: $scope.poll.name})
                .then(function(response) {
                    $scope.poll = response.data;
                }, function(error) {
                    console.error(error);
                });
        };
        $scope.addQuestion = function(id){
            $http.post('api/poll', {name: $scope.newPollName, user: 1})
                .then(function(response) {
                    $scope.poll.questions.push(response.data);
                }, function(error) {
                    console.error(error);
                });
        };
    };
    EditPollController.$inject = ['$scope', '$http', '$routeParams'];
    return EditPollController;
});