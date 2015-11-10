import tinymce from "tinymce";
import {inject, bindable} from "aurelia-framework";
import {ObserverLocator} from "aurelia-binding";
import uuid from "uuid";

@inject(ObserverLocator)
export class TinyMce {

	/*
	  bindable properties of tiny-mce custom element.
	  camelCase properties are presented as snake-case attributes on the view.
	 */
	@bindable value = "";
	@bindable height = 250;
	@bindable convertUrls = false;	// i.e. convert-urls.bind="true"
	@bindable menuBar = false;
	@bindable toolBar = "undo redo | styleselect | bold forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link plugin_sample insert_image";
	@bindable contextMenu = "copy paste | link image inserttable | cell row column deletetable";
	@bindable statusBar = false;
	@bindable language = 'ja';
	@bindable insertImageParams = {};

	editor_id = null;
	editor = null;

	constructor(observerLocator) {
		this.editor_id = "tiny-mce-" + uuid.v4();
		this.subscriptions = [
			observerLocator
					.getObserver(this, 'value')
					.subscribe(newValue => this.editor && this.editor.setContent(newValue)),
			observerLocator
					.getObserver(this, 'insertImageParams')
					.subscribe(newValue => this.editor && (this.editor.insertImageParams = newValue))
		];
	}

	attached() {
		tinymce.init({
			selector: `#${this.editor_id}`,
			language_url: this.language && `/tinymce/langs/${this.language}.js`,
			plugins: [
				"advlist autolink lists link image charmap print preview anchor",
				"searchreplace visualblocks code fullscreen",
				"textcolor table contextmenu paste",
				"insert_image"
			],
			menubar: this.menuBar,
			statusbar: this.statusBar,
			toolbar: this.toolBar,
			contextmenu: this.contextMenu,
			//content_css: "/tinymce/editor_content.css",
			height: this.height,
			convert_urls: this.convertUrls,
			setup: editor => {
				editor.on('init', e => {
					this.editor = editor;
					editor.setContent(this.value);
				});
				editor.on('change redo undo', e => {
					this.value = editor.getContent();
				});
				editor.insertImageParams = this.insertImageParams;
			}
		});
		window.tmce = this;
	}

	detached() {
		this.editor.destroy();
		while (this.subscriptions.length) {
			this.subscriptions.pop()();
		}
	}

}