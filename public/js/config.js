define([], function () {
	function config($locationProvider, $routeProvider) {
		$locationProvider.hashPrefix('');

		$routeProvider.
			when('/index', {
				templateUrl: './views/index.html',
				controller: 'IndexController'
			}).
			when('/poll/:pollId', {
				templateUrl: './views/poll.html',
				controller: 'PollController'
			}).
			when('/createpoll', {
				templateUrl: './views/pollcreate.html',
				controller: 'CreatePollController'
			}).
			when('/polls', {
				templateUrl: './views/showpolls.html',
				controller: 'ShowPollsController'
			}).
			when('/editpoll/:id', {
				templateUrl: './views/editpoll.html',
				controller: 'EditPollController'
			}).
			otherwise('/index');
	}
	config.$inject = ['$locationProvider', '$routeProvider'];

	return config;
});