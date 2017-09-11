import DS from 'ember-data';

export default DS.Model.extend({
  reviews: DS.hasMany('review', { async: true }),

  title: DS.attr('string'),
  author: DS.attr('string'),
  description: DS.attr('string'),
  reviewScore: DS.attr('string')
});
