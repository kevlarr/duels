(function(root) {

  var app = root.app || (root.app = {});
  app.components || (app.components = {})

  app.components.BookDetails = ng.core
    .Component({
      providers:   [ app.services.Books ],
      injectables: [ ng.router.RouteParams ],
      directives:  [ ng.router.ROUTER_DIRECTIVES ],

      templateUrl: 'templates/book-details.component.html'
    })

    .Class({
      constructor: [app.services.Books, ng.router.RouteParams, function(bookService, params) {
        this._bookService = bookService;
        this._params = params;

        var component = this;
        this._bookService.getBook(params.get('id')).subscribe(function(res) {
          component.book = res;
        });
      }]
    });

})(window);
