import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('index', { path: '/' });

  this.route('books', { path: '/books' }, function() {
    this.route('new', { path: '/new' });
    this.route('book', { path: '/:id' }, function() {
      this.route('reviews');
    });
  });
});

export default Router;
