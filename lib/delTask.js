const fs = require("fs");
exports.delTask = (result, all_task_list) => {
	var del_index = process.argv[3];
	if (result == true) {
		if (del_index > all_task_list.length || all_task_list[0] == "") {
			return console.log(
				`Error: task with index #${del_index} does not exist. Nothing deleted.`
			);
		}
		for (var i = 0; i < all_task_list.length; i++) {
			if (i + 1 == del_index) {
				all_task_list.splice(i, 1);
				console.log(`Deleted task #${del_index}`);
			}
		}
		fs.writeFile("task.txt", all_task_list.join("\n"), function (err) {
			if (err) {
				return console.error("error");
			}
		});
	}
};
