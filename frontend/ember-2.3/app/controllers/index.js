import Ember from 'ember';

export default Ember.Controller.extend({
  filteredList: null,
  actions: {
    autoComplete(param) {
      if (param !== '') {
        this.store.query('book', { title: param })
          .then((result) => { this.set('filteredList', result); });
      }
      else {
        this.set('filteredList', null);
      }
    },
    search(param) {
      if (param !== '') {
        this.store.query('book', { title: param })
          .then((result) => {
            this.set('filteredList', null);
            this.set('model', result);
          });
      }
      else {
        this.set('model', this.store.findAll('book'));
      }
    }
  }
});
