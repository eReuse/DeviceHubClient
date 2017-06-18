/**
 * A directive. Use it to instantiate directives.
 * @property tempalte - The html directive tag: <my-directive parameter1="p1" parameter2="p2"></my-directive>
 * @property $scope - The directive's scope.
 * @property element - The directive's element (jquery or jqlite object representing the directive).
 */
class Directive {
  /**
   * This uses inject, so do it **after** your `angular.mock.module()`
   * @param {string} template - he html directive tag: <my-directive parameter1="p1" parameter2="p2"></my-directive>
   */
  constructor (template) {
    const self = this
    this.template = template
    this.$scope = null
    this.element = null
    beforeEach(inject((_$compile_, _$rootScope_) => {
      self.$compile = _$compile_
      self.$rootScope = _$rootScope_
    }))
  }

  /**
   * Creates the directive.
   * @param {Object} parameters - An object representing the passed-in parameters: {p1: value, p2: value}
   * @return {[Object,Object]} - First, the $scope of the project, and then the element.
   */
  compile (parameters) {
    const self = this
    let scope = this.$rootScope.$new()  // Creates isolated scope
    scope = _.assign(scope, parameters)
    this.element = this.$compile(this.template)(scope)  // Create directive
    this.$rootScope.$digest()
    this.$scope = this.element.isolateScope()
    it('should have the data', () => {
      expect(self.$scope).toEqual(jasmine.objectContaining(parameters))
    })
  }

  /**
   * As `create`, plus checking that the directive has been created.
   */
  compileAndCheck (parameters) {
    this.compile(parameters)
    expect(this.$scope).toBeNonEmptyObject()
    expect(this.$scope.resource).toBeNonEmptyObject()
  }
}

module.exports = Directive
