#Angular Book Reviews

(Part 1 of JS comparisons)

Single page application approach using Angular 2 (beta2.0) on top of a Sinatra backend for a basic CRUD app.

The project was timeboxed at two work days for all setup, learning, and implementation.

##Functionality

`book-list`
- [x] Retrieve a list of books from API
- [x] Link to `book-details` for each book
- [x] Link to adding new book

`book-details`
- [x] Display all data
- [x] Links back to `book-list`
- [ ] Show `review-list` and retrieve from API
- [ ] Add `review-form`
- [ ] Post to reviews API

`book-form`
- [x] Links back to `book-list`
- [x] Requires input
- [x] Posts to API
- [x] Redirects to `book-list`
- [x] \(Extra\) Verification screen

##Problem Areas

###Beta...

... Very, very beta.

I am using Beta 2.0.0 (available on CDN) and I was unable to update to any
version after that, receiving JS errors that I am (so far) unable to determine
the cause of, despite my code matching all relevant documentation.

(Is the documentation deprecated from changes that, according to versioning,
shouldn't be backwards incompatible?)

###Typescript vs ES5

The goal was to use ES5 as well as avoiding features that are unavailable in common browsers
(e.g. `Promises` being unsupported in Internet Explorer).

The vast majority of resources (docs, blogs, and SO questions) are in Typescript, and angular.io's
"Angular 2 for Javascript" set of docs is woefully incomplete compared to the "Angular 2 for
Typescript" docs, and they reference Typescript half the time anyways.

That being said, aside from having to translate a lot of documentation, deciding to use ES5
instead of Typescript was *painless*. There is no setup to perform (it just
works!) and Angular 2's library is, by default, very usable and readable inside
your components. Additionally, ES5-based components weren't noticeably more verbose
than Typescript-based ones.

(This is all in *stark* contrast to attempting using React without JSX...)

###Testing

Feature tests (run through Capybara) are currently broken, difficulties with getting Angular
resources to load (even when they were locally stored).

Unit tests for Angular components are TODO.

###Dependency Injection

Inside `.Component`, using `providers` versus `injectables` for dependency injection was a vast
source of confusion - several hours were spent pouring through scarce docs, only to find
`injectables` randomly in an unrelated SO question.

```
app.components.BookDetails = ng.core
  .Component({
    providers:   [ app.services.Books ],
    injectables: [ ng.router.RouteParams ],
    ...
  })

  .Class({
    constructor: [app.services.Books, ng.router.RouteParams, function(books, params) {
      ...
    }]
  });
```

###HTTP

####GET

The `Observables` pattern was very unfamiliar, but docs (and SO questions) were all pretty much
in agreement on how to use them - set up a `Service` that `gets` (or posts, etc) which returns
an `Observable`, which you then `map` over (since the observable can have multiple http
requests in process), then `subscribe` to get the response.
in the `Component`.

`books.services.js`:

```
getBooks: function() {
  return this._http
    .get('api/v1/books')
    .map(function(res) {
      return res.json();
    });
},
```

`book-list.component.js`:

```
.Class({
  constructor: [app.services.Books, function(bookService) {
    this._bookService = bookService;
    this._bookService
      .getBooks()
      .subscribe(function(res) {
        ...
      });
  }]
});
```

A small problem here is that they all indicated the following pattern...

```
.subscribe(function(res) {
  this.books = res;
});
```

... to set the books obtained through the API call to the `books` property on
the `BookList` component. The problem was, `this` refers to the `Subscriber`
object, rather than the `BookList` that's calling it, but maybe (as this pattern
was adapted from Typescript), it's fine in Typescript..?

I just did this as a hack-around:

```
var component = this;

...

  .subscribe(function(res) {
    components.books = res;
  });

...
```

####POST

The POST request did not hit the API endpoint properly. The 'Content-Type' was
always set to 'text/plain', despite the approach below (which is the
'official' way of setting up the request header)...

```
postBook: function(book) {
  var headers = new Headers({'Content-Type': 'application/json'});
  var body = JSON.stringify(book);

  return this._http
    .post('api/v1/books/new', body, {headers: headers})
    .map(function(res) {
      return res.json();
    })
}
```

... so the server file did not parse the request body automatically, which took
some time to trace down. (It seemed like it was not hitting the endpoint with
any payload whatsoever, but it was in fact buried in the request object, which just had to be parsed
manually.)

##Final Thoughts

Overall, I enjoyed the (very, very beta) framework more than I expected to. The
documentation grated on my nerves half (or most of) the time, but... it's beta, so what else
could I expect?

Despite any confusion over dependency injection techniques, I was surprisingly
pleased by the method of breaking the app into components, each of which can
either directly have a template string or link to an external HTML template.
Much more maintaneable than having the component markup embedded in a larger
HTML file.

Beyond that, you actually have a variety of options for view encapsulation, so you have some
choice how you want to control styling, etc. (I think you can even tie into
Shadow DOM if you want to..?)

Curious to see how this framework progresses, as there was a lot of untapped
power to it (particularly the reasons behind the observable/subscriber pattern)

Pros:

- Composability
- Templates
- Clear separation of concerns
- Observable/Subscriber pattern for http requests

Cons:

- Documentation
- Beta status (when is release?)
- Documentation
- Observable/Subscriber pattern for http requests
