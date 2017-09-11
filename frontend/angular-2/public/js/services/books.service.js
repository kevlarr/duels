(function(root) {

  var app = root.app || (root.app = {});
  app.services || (app.services = {})

  app.services.Books = ng.core
    .Class({
      constructor: [ng.http.Http, function(http) {
        this._http = http;
      }],

      getBooks: function() {
        return this._http
          .get('api/v1/books')
          .map(function(res) {
            return res.json();
          });
      },

      getBook: function(id) {
        return this._http
          .get('api/v1/book/' + id)
          .map(function(res) {
            return res.json();
          });
      },

      postBook: function(book) {
        var headers = new Headers({'Content-Type': 'application/json'}); // This is not working, content-type stays at 'text/plain'
        var body = JSON.stringify(book);

        return this._http
          .post('api/v1/books/new', body, {headers: headers})
          .map(function(res) {
            return res.json();
          })
      }
    });

})(window);
