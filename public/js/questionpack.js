define(['freetextquestion', 'selectquestion', 'tablequestion', 'rangequestion', 'simplequestion', 'rowselectionquestion'],
  function(FreeTextQuestion, SelectQuestion, TableQuestion, RangeQuestion, SimpleQuestion, RowSelectionQuestion) {
      var questionPack = {};
      questionPack.init = function(app){
        app.directive('freeTextQuestion', FreeTextQuestion);
        app.directive('selectQuestion', SelectQuestion);
        app.directive('tableQuestion', TableQuestion);
        app.directive('rangeQuestion', RangeQuestion);
        app.directive('simpleQuestion', SimpleQuestion);
        app.directive('rowSelectionQuestion', RowSelectionQuestion);
      };
      return questionPack;
  });