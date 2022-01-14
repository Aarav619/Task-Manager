const fs = require("fs");

exports.delFile = (path) => {
	fs.unlinkSync(path);
};
