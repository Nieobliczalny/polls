define([], function() {
    function PollController($scope, $routeParams, $http) {
        $scope.pollID = $routeParams.pollId;
        $scope.polls = [];
        $http.get('api.php/poll/' + $scope.pollID)
            .then(function(response) {
                console.info(response);
                $scope.polls = response.data;
            }, function(error) {
                console.error(error);
            });
        $scope.sendAnswer = function(poll) {
            var msg = '';
            for (var i = 0; i < poll.questions.length; i++) {
                msg = msg + '[Q] ' + poll.questions[i].text + "\r\n";
                for (var j = 0; j < poll.questions[i].answers.length; j++) {
                    var answer = poll.questions[i].answers[j].text && poll.questions[i].answers[j].text.length > 0 ? poll.questions[i].answers[j].text : poll.questions[i].answers[j].textOther;
                    msg = msg + '[' + poll.questions[i].answers[j].id + ']' + answer + "\r\n";
                }
            }
            alert(msg);
        };
    };
    PollController.$inject = ['$scope', '$routeParams', '$http'];
    return PollController;
});