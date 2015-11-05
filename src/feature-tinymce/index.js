import tinymce from "tinymce";
import superagent from "superagent";

export function configure(aurelia) {
	aurelia.globalResources('./tiny-mce');

	// TinyMCE Plugin image_upload
	tinymce.PluginManager.add('insert_image', function (editor, url) {

		function upload() {
			let file_field = document.querySelector('#mce-image-upload-file');
			let request = superagent.post('/api/upload');
			if (editor.hasOwnProperty('insert_image_params')) {
				for (var prop in editor.insert_image_params) {
					if (editor.insert_image_params.hasOwnProperty(prop))
						request.field(prop, editor.insert_image_params[prop]);
				}
			}
			request
				.attach("file", file_field.files[0], file_field.value)
				.on('progress', evt => {
					console.debug(evt.percent);
				})
				.end((err, res) => {
					if (err) {
						console.error(err);
					}
					console.info(res);
					editor.insertContent(`<img class="inserted-image" src="${res.body.url}" />`);
					editor.windowManager.close()
				})
		}

		let dialogHtml = `
			<form id="mce-image-upload-form" method="post" enctype="multipart/form-data">
				<div class="mce-container-body mce-abs-layout">
					<input type="file" name="file" id="mce-image-upload-file">
				</div>
				<div class="mce-container-body mce-abs-layout">
					<p>Uploaded images will be deployed at uploads/*</p>
				</div>
			</form>
			<style>
				#mce-image-upload-form {
					padding: 20px;
					> div {
						margin-bottom: 20px;
						line-height: 20px;
					}
				}
			</style>
		`;

		editor.addButton('insert_image', {
			text: '画像を挿入',  // insert an image
			icon: 'image',
			onclick: () => {
				editor.windowManager.open({
					title: '画像をアップロードして挿入', // upload and insert the image.
					html: dialogHtml,
					width: 400,
					height: 160,
					buttons: [
						{text: 'アップロードして挿入', onclick: upload},	// upload and insert
						{text: 'キャンセル', onclick: 'close'}			// cancel
					]
				});
			}
		})

	});
}

