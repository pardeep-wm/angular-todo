'use strict';

// AngularJS E2E Testing Guide:
// https://docs.angularjs.org/guide/e2e-testing

describe('Todo App', function() {

  describe('Todo list view', function(){
    beforeEach(function(){
      browser().navigateTo('../../app/index.html')
    });

    it('should filter the phone list as user types into the serach box', function(){
      expect(repeater('.todos li').count()).toBe(3);

      input('query').enter('angular');
      expect(repeater('.todos li').count()).toBe(1);

      input('query').enter('github');
      expect(repeater('.todos li').count()).toBe(1)
    })

    it('should redirect index.html to index.html#/todos', function() {
      browser().navigateTo('../../app/index.html');
      expect(browser().location().url()).toBe('/todos');
    });

  })




});
