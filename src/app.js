import {inject} from 'aurelia-framework'
import {Toaster} from 'resources/toaster'

@inject(Toaster)
export class App {

	toaster;

	constructor(toaster) {
		this.toaster = toaster;
		window.app = this;
	}

	configureRouter(config, router) {
		config.title = 'Aurelia + TinyMCE';
		config.map([
			{route: ['', 'editor'], name: 'editor', moduleId: 'editor', nav: true, title: 'Editor'},
			{
				route: ['editor-with-params'],
				name: 'editor-with-params',
				moduleId: 'editor-with-params',
				nav: true,
				title: 'Upload Image With Params'
			},
			{route: ['lets-toast'], name: 'lets-toast', moduleId: 'lets-toast', nav: true, title: 'Let\'s Toast'},
			{route: ['can-i-paging'], name: 'can-i-paging', moduleId: 'can-i-paging', nav: true, title: 'Can I Paging?'}
		]);

		this.router = router;
	}
}
