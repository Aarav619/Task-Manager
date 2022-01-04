const fs = require("fs");
exports.addTask = (result) => {
	let task = "";
	for (var i = 3; i < process.argv.length; ++i) {
		task += process.argv[i] + " ";
	}
	task = task.trim();
	var task_length = task.length;
	var priority = process.argv[3];
	var task_without_priority = task.slice(2, task_length);
	var task_to_add = task;
	if (result == true) {
		fs.appendFile("task.txt", "\n" + task_to_add, function (err) {
			if (err) {
				return console.error("error");
			}
			console.log(`Added task: "${task_without_priority}" with priority ${priority}`);
		});
	}
	if (result != true) {
		fs.writeFile("task.txt", task_to_add, function (err) {
			if (err) {
				return console.error("error");
			}
			console.log(`Added task: "${task_without_priority}" with priority ${priority}`);
		});
	}
};
