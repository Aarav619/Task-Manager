const fs = require("fs");
exports.completedTask = (result1, result2, done_tasks) => {
	var done_task_index = process.argv[3];
	if (result1 == true) {
		done_tasks.sort();
		for (var i = 1; i < done_tasks.length + 1; ++i) {
			if (done_task_index == i) {
				if (result2 != true) {
					var to_add_task = done_tasks[i - 1].slice(2);
					fs.writeFile("completed.txt", to_add_task, function (err) {
						if (err) {
							return console.error("error");
						}
						console.log("Marked item as done.");
					});
				}
				if (result2 == true) {
					var to_add_task = done_tasks[i - 1].slice(2);
					fs.appendFile(
						"completed.txt",
						"\n" + to_add_task,
						function (err) {
							if (err) {
								return console.error("error");
							}
							console.log("Marked item as done.");
						}
					);
				}
			}
		}
		if (
			done_task_index != done_tasks.length &&
			done_task_index > done_tasks.length
		) {
			console.log(
				`Error: no incomplete item with index #${done_task_index} exists.`
			);
		}
	}
};
