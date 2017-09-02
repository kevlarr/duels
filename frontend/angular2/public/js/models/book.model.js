(function(root) {

  var app = root.app || (root.app = {});
  app.models || (app.models = {})

  app.models.Book = Book;

  function Book(title, author, description) {
    this.title = title;
    this.author = author;
    this.description = description;
  }

})(window);
