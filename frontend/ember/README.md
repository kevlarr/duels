# Ember 2.3.0 Book Reviews

(Part 2 of JS comparisons)

Single page application approach using Ember on top of a Sinatra backend for a basic CRUD app.

The project was timeboxed at two work days for all setup, learning, and implementation.

## Functionality

`books index`
- [x] Retrieve books from API
- [x] Link to book details
- [x] Link to add new book
- [x] \(Extra\) Book filter

`book details`
- [x] Retrieve book from API
- [ ] Retrieve book reviews from API
- [ ] Form to add new review

`create book`
- [x] POST to API
- [X] Validate form and display errors

## Discussion

### Organization

Overall, the organization of an Ember app makes sense, but it also just seems a little
too segmented. For a single model corresponding to a single route and having a single template
and maybe only a single action to perform, this functionality (including the
route) is split across 5+ files.

```
| APP
  | ADAPTERS
    - model.js
  | CONTROLLERS
    - model.js
  | HELPERS
    - model-helper.js
  | MODELS
    - model.js
  | ROUTES
    - model.js
  | TEMPLATES
    - model.hbs
  - router.js
```

Anything I want to reference in the view (models, variables, etc) goes in the template's
specific `routes/model.js` file. Any *actions* that I want to take go in the
`controllers/model.js` file. If this specific model has any special network
operations that differ from the default adapter, it goes in
`adapters/model.js`...

Again, the organization follows logic, but it also prevents anything from feeling like a
consolidated component. Especially given that many of these files are importing
the same Ember objects and might only have a couple of lines of code.

### AJAX Request Proxying

Ember CLI's request proxying has been mindblowingly convenient,
providing a hilariously easy way to send all API requests to another local server. The
only issues I dealt with involved Ruby servers, not Ember.

`ember serve --proxy http://localhost:4567` was the command I used to start the
frontend server that would issue all AJAX requests to my backend server. The connections
to my Sinatra app kept getting refused:

```
Error proxying to http://localhost:4567
connect ECONNREFUSED 127.0.0.1:4567
Error: connect ECONNREFUSED 127.0.0.1:4567
```

After some time struggling with this, I finally tracked it down (thank you,
internet) to a problem with the Puma server. Running the backend with Unicorn
was also problematic:

```
Error proxying to http://localhost:4567
socket hang up
```

... but running the backend with WEBrick was successful. (I've read that Thin
also works, and it would probably be preferable to WEBrick because it's such a strong
server, but I have not tried it yet.)

**Update: Thin does, in fact, work for proxying, but I continually had timeout
issues connecting to my Postgres database, so I continued to use WEBrick**

### /tmp Folder

Whatever you do, *do not* forget to add the `/tmp` folder to `.gitignore`, or
your commits will be full of chaff.

### Helpers

Handlebars' inability to perform simple JS operations was frustrating initially,
but it definitely encourages good practice - even just to slice a string, I had
to make a helper method outside of the view. While this encourages good practice
in removing logic from views, it took awhile to get the format right since the
documentation for 2.3.0 has been... lacking (and innaccurate) thus far... and
generally just backwards-incompatible with previous versions of Ember (and
related docs).

### API Querying

Convention over configuration strikes! Creating a `book` model defaults to
looking at `/books` for a `findAll`, `/books/:id` for a `findRecord`, etc... This
made setting up index and show page **incredibly** straightforward.

The biggest hassle here was making sure the API endpoints format JSON
**in a way Ember expects**<sup>1</sup> (they didn't) and **conform to RESTful routes**<sup>2</sup>
(they didn't - not entirely, at least).

This was fine, as I could edit the endpoints accordingly. If I was consuming
an exteral api that I had no control over, at least Ember would allow me to
override its default data structure expectations, but (judging from the
documentation) it might or might not be a simple process, involving setting up a
customer serializer to consume the data.

><sup>1</sup>JSON responses are expected to be nested under the model name (singular or plural) as follows: `{ "books": [ { ... attributes ... }, { ... }, ... ] }` for multiple records and `{ "book": { ... attributes ... } }` for single records, and validation errors are expected to be returned in a hash with a top level key of errors: `{ errors: { title: "Title cannot be blank", ... } }`

><sup>2</sup>API endpoints are expected to all be plural: `/books`, `/books/:id`, etc (whereas our backend had been set up as `/book/:id`)

One of the areas where convention over configuration hurts a lot, though, had
to do with model errors on an unsuccessful new book submission. As long as the
API returned a precisely formatted errors JSON (and *not* one that matched the
2.3.0 docs, but one found on a random blog post sigh...) it would automatically
update the model's `errors` attribute that I could iterate over.

### Reloading

Ember CLI's reloading is **simply awesome**. Any change to a JS file (route,
controller, etc), template, CSS, etc automatically reloads once saved, and it
reloads *fast*.

### Error Messages

Ember's error messages are (generally) remarkably informative - they show in the view (if a
template breaks), they show in the developer tools console, and they show in the
command line window running `ember serve`. That latter is *particularly* useful
for debugging HTTP requests, etc.

That is, to say, if you can see any errors in the console through the
**massive** list of `Deprecation Warning`s on every route action.

### ... Associations

Attempting to set up relationships as follows...

`models/book.js`
```
export default DS.Model.extend({
  reviews: DS.hasMany('review'),

  title: DS.attr('string'),
  author: DS.attr('string'),
  description: DS.attr('string'),
  reviewScore: DS.attr('string')
});

```

`models/review.js`
```
export default DS.Model.extend({
  book: DS.belongsTo('book'),

  score: DS.attr('number'),
  description: DS.attr('string')
});

```
... results in the following error:

```
Error while processing route: index
Assertion Failed: Passing classes to store methods has been removed.
Please pass a dasherized string instead of undefined
```

Um.. wat?

As it turns out, this is an issue with the JSON response - it includes reviews
as objects...

```
{
  "books": [
    {
      "id": "1",
      "title": "some title",
      "author": "some author",
      "reviews": [
        {
          "id": 1,
          "description": "some review",
          "score": "4"
        },
        {
          "id": 2,
          "description": "another review",
          "score": "5"
        }
      ]
    }
  ]
}
```

... but, in reality, Ember expects an array of IDs for `belongsTo`, instead...

```
{
  "books": [
    {
      "id": "1",
      "title": "some title",
      "author": "some author",
      "reviews": ["1", "2"]
    }
  ]
}
```

... and somehow that error message makes sense as a result.

The biggest issue is that similar error messages are obtained through radically
different workflows (i.e. not attempting to define relationships), so searching
the web to find a relevant answer took a fair bit of time.

*Note:* There appears to be an `embedded: true` option to specify that the JSON
response will contain objects, rather than an array of IDs, but I haven't tried
this. (Additionally, depending on which version of Ember you're using, this
apparently goes in one of several different places, and the docs are currently
very inconsistent.)

Additionally, as I'm not retrieving `reviews` when I'm querying for `books`, I
needed to define my `hasMany` as `async`...

`models/book.js`
```
export default DS.Model.extend({
  reviews: DS.hasMany('review', { async: true }),

  title: DS.attr('string'),
  author: DS.attr('string'),
  description: DS.attr('string'),
  reviewScore: DS.attr('string')
});

```

... but in this case, Ember's error message was immediate and told me
**exactly** what to do. Cheers again to Ember's error messaging.

### Loading Associations

Yeah, still haven't gotten this to work...
