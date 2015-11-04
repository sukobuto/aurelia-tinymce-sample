export class App {
  configureRouter(config, router) {
    config.title = 'Aurelia + TinyMCE';
    config.map([
      { route: ['', 'editor'], name: 'editor',      moduleId: 'editor',      nav: true, title: 'Editor' }
    ]);

    this.router = router;
  }
}
