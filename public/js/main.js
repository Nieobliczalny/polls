define(['config', 'index', 'poll', 'pollcreate', 'questionpack', 'showpolls', 'editpoll'],
  function (config, IndexController, PollController, CreatePollController, QuestionPack, ShowPollsController, EditPollController) {
    var app = angular.module('OnlinePollCreator', ['ngRoute']);
    app.config(config);
    app.controller('IndexController', IndexController);
    app.controller('PollController', PollController);
    app.controller('CreatePollController', CreatePollController);
    app.controller('ShowPollsController', ShowPollsController);
    app.controller('EditPollController', EditPollController);
    QuestionPack.init(app);

    angular.element(function () {
      angular.bootstrap(document, ['OnlinePollCreator']);
    });
  });