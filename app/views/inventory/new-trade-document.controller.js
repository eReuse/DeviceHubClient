/**
 *
 * @param $scope
 * @param $stateParams
 * @param {module:resourceFields} resourceFields
 * @param {module:resources.Action} $stateParams.action
 */

function newTradeDocumentCtrl ($scope, $stateParams, resourceFields, $state) {
  const tradeDocument = $scope.tradeDocument = $stateParams.doc

  function leave () {
    $state.go('^')
  }

  class NewTradeDocumentForm extends resourceFields['TradeDocument'] {
    _submit (op) {
      return super._submit(op).then(leave)
    }

    cancel () {
      leave()
    }
  }

  $scope.form = new NewTradeDocumentForm(tradeDocument)
}

module.exports = newTradeDocumentCtrl

