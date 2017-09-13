"use strict";

var App = {
  range: function range(lower, upper) {
    var arr = [];
    for (var i = lower; i <= upper; i++) {
      arr.push(i);
    }
    return arr;
  },
  transitionTo: function transitionTo(route) {
    this.hashHistory.push(route);
  },


  // Import React Router dependencies

  Router: ReactRouter.Router,
  Route: ReactRouter.Route,
  IndexRoute: ReactRouter.IndexRoute,
  Link: ReactRouter.Link,
  hashHistory: ReactRouter.hashHistory,

  // General settings

  pollInterval: 1000 * 60 * 5 // 5 minutes
};