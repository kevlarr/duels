import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    createBook: function(params) {
      var self = this;

      this.model.save()
        .then((result) => self.transitionToRoute('index'))
    }
  }
});
