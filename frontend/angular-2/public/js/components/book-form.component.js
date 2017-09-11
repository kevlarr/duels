(function(root) {

  var app = root.app || (root.app = {});
  app.components || (app.components = {})

  app.components.BookForm = ng.core
    .Component({
      providers:  [ app.services.Books ],
      directives: [ ng.router.ROUTER_DIRECTIVES ],

      selector: 'ng-book-form',
      templateUrl: 'templates/book-form.component.html'
    })

    .Class({
      constructor: [app.services.Books, ng.router.Router, function(bookService, router) {
        this._bookService = bookService;
        this._router = router;

        this.book = new app.models.Book();
        this.submitted = false;
      }],

      onSubmit: function() {
        this.submitted = true;
      },

      postBook: function() {
        this._bookService
          .postBook(this.book)
          .subscribe(function(res) {});

        this._router.navigate(['Books'])
      }
    });

})(window);
