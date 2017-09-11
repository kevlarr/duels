(function(root) {

  var app = root.app || (root.app = {});
  app.components || (app.components = {})

  app.components.App = ng.core
    .Component({
      directives: [ ng.router.ROUTER_DIRECTIVES ],

      selector: 'ng-app',
      templateUrl: 'templates/app.component.html'
    })

    .Class({
      constructor: function() {
        this.title = "Angular2 Book Reviews";
      }
    });

  ng.router.RouteConfig([

    {path: '/books',     as: 'Books',   component: app.components.BookList, useAsDefault: true},
    {path: '/books/:id', as: 'Book',    component: app.components.BookDetails},
    {path: '/books/new', as: 'NewBook', component: app.components.BookForm}

  ])(app.components.App);

})(window);
