export class App {
  configureRouter(config, router) {
    config.title = 'Aurelia + TinyMCE';
    config.map([
      { route: ['', 'editor'], name: 'editor',      moduleId: 'editor',      nav: true, title: 'Editor' },
      { route: ['editor-with-params'], name: 'editor-with-params', moduleId: 'editor-with-params', nav: true, title: 'Upload Image With Params'}
    ]);

    this.router = router;
  }
}
