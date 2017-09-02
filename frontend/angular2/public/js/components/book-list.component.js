(function(root) {

  var app = root.app || (root.app = {});
  app.components || (app.components = {})

  app.components.BookList = ng.core
    .Component({
      providers:  [ app.services.Books ],
      directives: [ ng.router.ROUTER_DIRECTIVES ],

      templateUrl: 'templates/book-list.component.html'
    })

    .Class({
      constructor: [app.services.Books, function(bookService) {
        this._bookService = bookService;

        var component = this;
        this._bookService.getBooks().subscribe(function(res) {
          component.books = res;
        });
      }]
    });

})(window);
