const fs = require("fs");
exports.verifyPath = (path) => {
	var result = false;

	try {
		if (fs.existsSync(path)) {
			result = true;
		}
	} catch (err) {
		console.error(err);
	}
	return result;
};