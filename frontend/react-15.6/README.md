# React 0.14 [2016-02]

**Updated to 15.6.0 [2017-09] as part of containerization**

## TODO

- [ ] Improve `bundle.js` size
- [ ] Set up basic server
- [ ] Proxy API calls


# OLD README
## Functionality

`book-list`
- [x] Retrieve a list of books from API
- [x] Link to `book-details` for each book
- [x] Link to adding new book

`book-details`
- [x] Display all data
- [x] Links back to `book-list`
- [x] Show `review-list` and retrieve from API
- [x] Add `review-form`
- [x] Post to reviews API

`book-form`
- [x] Links back to `book-list`
- [x] Requires input
- [x] Posts to API
- [x] Redirects to `book-list`

## Discussion

### JSX Transformation

As most resources involve JSX rather than JS (and given that the syntax is *so*
sugary anyways), I opted to use Facebook's syntax extension.

This means, of course, that the JSX needs to be transpiled back down to
JavaScript. This is supposedly easy to do using Babel's `browser.js`<sup>1,
2</sup>, but I had difficulties in getting any of the translated components into
my global namespace.

><sup>1</sup>In-browser transformation is intended *only* for development.
For performance reasons, it is **not** intended for production).

><sup>2</sup>Additionally, Babel's page says that `browser` is no longer
supported.

As a result, I wound up using NPM to run a build task using the Babel CLI module
locally per [these instructions](https://babeljs.io/docs/setup/#babel_cli). The
one addition I had to make was to include the `babel-preset-react` module (as
both a `devDependency` and a preset within the `.babelrc` file).

After setting up the directories properly (I used `public` rather than `lib`,
since I was planning on included the files directly rather than concatenating),
transpiling to JS is as simple as typing `npm run build` whenever I want to
reload the page after making changes to JSX files.

#### Build Errors

The one part of `npm run build` that I don't particularly enjoy is the lack of
informative error messaging if a build fails. There are no indications as to
what column, line, or even file is failing to build.

This is Babel, though, not React, so...

>**Update:** As it turns out, the build errors *are* useful. I can't repliate
the workflow that was leading to useless errors. Syntax errors in a file will
actually be displayed in the command line, along with a descriptive message.
Yay, Babel!!

### React Components

omg can haz foreverz?

Loving the way React components are set up and nested within parent components.

Also, the way that these components handle properties, state, and rerendering is
remarkably intuitive. Lifecycle callbacks are logical and rather easy to reason
about. While I'm not entirely clear on the theoretical distinction between `props`
and `state` (the former are for data passed down from parent, and the latter is to
manage *changing* data and conditions..?), relying on `component.setState({ ...  })`
to **automatically** force a re-render feels much cleaner and more intuitive than
I initially expected it to.

### React Router

#### Index Route

React Router, despite not having good documentation on the website, has fairly
solid documentation on the [GitHub page](https://github.com/reactjs/react-router/blob/latest/docs/Introduction.md).
To use hash-based location routing, the only changes I had to make were adding a
boot file:

**boot.js**
```
ReactDOM.render((
  <App.Router history={ App.hashHistory }>
    <App.Route path='/'>
      <App.IndexRoute component={ App.BookList } />
    </App.Route>
  </App.Router>
), document.getElementById('app'));
```

Rather than using the `import ... from '...'` approach, I chose to namespace
everything under `App` to control the global namespace a little better (as well
as preferring to call `ReactDOM.render` normally, rather than importing `render`
into `global`):

**app.js**
```
var App = {
  // Import React Router dependencies

  Router:      ReactRouter.Router,
  Route:       ReactRouter.Route,
  IndexRoute:  ReactRouter.IndexRoute,
  Link:        ReactRouter.Link,
  hashHistory: ReactRouter.hashHistory,
}
```

Upon save and build... everything just **worked**. My index route displayed the
book list as usual!

#### Adding Routes

When it came time to adding a new route (eg. to display a BookDetails page), the
only addition necessary was:

```
<App.Route path='books/:bookId' component={ App.BookDetails } />
```

... and the `BookDetails` component handles everything else. Linking back and
forth is as easy as adding:

```
<App.Link to="/">back to index</App.Link>
```

Or, to link to a specific book details page:

```
<App.Link to={ `books/${ this.props.id }`  } >
```

The use of ES6 template strings there is perhaps a little gratuitous, but.. it
was helpful practice for inline JS statements.

#### URLS and the Query Key

With the ReactRouter set up in this fashion, the URLs for each component so far
would look like `localhost:4567/#/?_k=de9ltt` (for the **book list**) and
`localhost:4567/#/books/15?_k=de9ltt` (for the **book details**).

URLs follow the `host/#/` hash location strategy. Great, as changing hash
fragments does not prompt the page to reload, and this is a pretty common SPA
strategy. The `?_k=de9ltt` is unique to React, though, and that's called the
`query key`. TBH, I don't know entirely what's it's useful for, but I'm under
the impression it can be used to provide history for state.

Meaning, I believe, that when combined with the `#/` location strategy, a user
can save session-based history for not only what components are rendered, but also for the
state of the components at the time.

### Modularity

What else can I say, other than 'React modularity is beautiful'? React's pattern
of composition (breaking the UI into logical, modular pieces) is simply
stunning as well as incredibly intuitive. Combined with the various lifecycle
callbacks inherent to any React component, creating new pieces of functionality
is so straightforward it almost feels like cheating.

### Data Flow

A work in progress, right now each component is responsible for controlling its
own state. The `BookList` retrieves the list of books, the `BookForm` submits
itself...

There is some measure of flow, in the sense that the `BookList` shares a subset
of its state with each `BookListing` object (by way of their `props`), and the
`BookDetails` does the same with the `ReviewList` and `ReviewForm` components.

Currently, there is a bit of an obnoxious situation where a child component is
submitting and receiving information per user input (the `ReviewForm`) but does
not know what to do with it. This component has no knowledge of the
`ReviewListing`s being displayed, so it can't just automatically append to it
(as it's a different component), and there does not occur to be any
functionality in ReactRouter to refresh an entire page (vs the typical single
component re-render that happens on `setState`), so... Whereas adding a new book
transitioned to a different route, which then renders the list of books again,
adding a new review does **not** transition to a new route, so re-rendering the
page is difficult.

The goal is to eventually follow the **Flux** pattern where, rather than alter
the state of the component performing the request, a data store is updated. How
this would help is that the moment the data store updates, it triggers a cascade
of rendering the components that inherit data from it. If the `ReviewForm`
updates the store that `ReviewList` draws from, that change would then propagate
down to `ReviewList`... As it is, this is yet to be implemented (and it's also
less documented), so the workaround is to transition to index and immediately
transition back to the book details page (which makes it flicker and it adds an
extra event into the history).
