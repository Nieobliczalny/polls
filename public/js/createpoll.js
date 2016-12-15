define([], function() {
    function CreatePollController($scope, $http) {
        $scope.questions = [];
        $scope.addSelect = function() {
            $scope.questions.push({ text: '', answers: [], type: 1 });
        };
        $scope.addRadio = function() {
            $scope.questions.push({ text: '', answers: [], type: 2 });
        };
        $scope.addFreeText = function() {
            $scope.questions.push({ text: '', answers: [], type: 3 });
        };
        $scope.addTable = function() {
            $scope.questions.push({ text: '', answers: [], type: 4 });
        };
        $scope.addAnswer = function(question) {
            question.answers.push({ text: '' });
        };
        $scope.removeAnswer = function(question, option) {
            question.answers.splice(question.answers.indexOf(option), 1);
        };
        $scope.addRow = function(question) {
            question.answers.push({ text: '', options: [], custom: false });
        };
        $scope.removeRow = function(question, option) {
            question.answers.splice(question.answers.indexOf(option), 1);
        };
        $scope.addSubAnswer = function(answer) {
            answer.options.push({ text: '' });
        };
        $scope.removeSubAnswer = function(answer, option) {
            answer.options.splice(answer.options.indexOf(option), 1);
        };
        $scope.removeQuestion = function(question) {
            $scope.questions.splice($scope.questions.indexOf(question), 1);
        };
        $scope.save = function() {
            var poll = {};
            poll.name = $scope.pollName;
            poll.questions = $scope.questions;
            $http.post('api.php/poll', poll)
                .then(function(response) {
                    console.info(response);
                }, function(error) {
                    console.error(error);
                });
        }
    };
    CreatePollController.$inject = ['$scope', '$http'];
    return CreatePollController;
});