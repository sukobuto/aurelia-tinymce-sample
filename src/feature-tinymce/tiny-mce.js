import tinymce from "tinymce";
import {inject, bindable} from "aurelia-framework";
import {ObserverLocator} from "aurelia-binding";
import uuid from "uuid";

@inject(ObserverLocator)
export class TinyMce {

	@bindable value = "";
	@bindable height = 250;
	@bindable convert_urls = false;
	@bindable menubar = false;
	@bindable toolbar = "undo redo | styleselect | bold forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link plugin_sample insert_image";
	@bindable contextmenu = "copy paste | link image inserttable | cell row column deletetable";
	@bindable statusbar = false;
	@bindable language = 'ja';

	editor_id = null;
	editor = null;

	constructor(observerLocator) {
		this.editor_id = "tiny-mce-" + uuid.v4();
		this.value_subscription = observerLocator
			.getObserver(this, 'value')
			.subscribe((newValue, oldValue) => {
				if (this.editor) this.editor.setContent(newValue);
			});
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
			menubar: this.menubar,
			statusbar: this.statusbar,
			toolbar: this.toolbar,
			contextmenu: this.contextmenu,
			//content_css: "/tinymce/editor_content.css",
			height: this.height,
			convert_urls: this.convert_urls,
			setup: editor => {
				editor.on('init', e => {
					this.editor = editor;
					editor.setContent(this.value);
				});
				editor.on('change redo undo', e => {
					this.value = editor.getContent();
				});
			}
		});
		window.tmce = this;
	}

	detached() {
		this.editor.destroy();
	}

}