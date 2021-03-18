//import imageMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];

exports.getData = async (req, res) => {
	res.send(req.user);
};

exports.post = async (req, res) => {
	const fileName = req.file != null ? req.file.filename : null;
	const post = new Post({
		title: req.body.title,
		body: req.body.body,
	});
	saveImage(image, req.body.cover);

	try {
		const newPost = post.save();
	} catch {}
};

function saveImage(image, coverEncoded) {
	if (coverEncoded == null) return;
	const cover = JSON.parse(coverEncoded);
	if (cover != null && imageMimeTypes.includes(cover.type)) {
		image.coverImage = new Buffer.from(cover.data, 'base64');
		image.coverImageType = cover.type;
	}
}
