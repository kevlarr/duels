import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.store.createRecord('book');
  },
  deactivate() {
    var model = this.get('currentModel');
    if (model && model.get('isDirty')) {
      model.deleteRecord();
    }
  }
});
