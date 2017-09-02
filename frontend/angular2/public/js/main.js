(function(app) {
  document.addEventListener('DOMContentLoaded', function() {
    ng.platform.browser.bootstrap(
      app.components.App, [
        ng.http.HTTP_PROVIDERS,
        ng.router.ROUTER_BINDINGS,
        ng.core.bind(ng.router.LocationStrategy).toClass(ng.router.HashLocationStrategy)
      ]
    );
  });
})(window.app || (window.app = {}));
