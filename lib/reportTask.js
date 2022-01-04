exports.reportTask = (result1, result2, tasks, path2, property) => {
	var intermediate_tasks = new Array();
	var integer_array = new Array();
	if (result1 == true) {
		for (var i = 0; i < tasks.length; ++i) {
			var all_task_without_index = tasks[i].slice(2);
			intermediate_tasks.push(all_task_without_index);
			var integer_part = tasks[i].slice(0, 1);
			integer_array.push(integer_part);
		}
		if (result2 == true) {
			var completed_tasks = read.readTasks(path2, property);
			var incomplete_tasks = intermediate_tasks.filter(
				(x) => !completed_tasks.includes(x)
			);
			console.log("Pending :", incomplete_tasks.length);
			for (var i = 0; i < incomplete_tasks.length; ++i) {
				console.log(
					`${i + 1}. ` +
						incomplete_tasks[i] +
						` [${integer_array[i]}]`
				);
			}
			console.log("\nCompleted :", completed_tasks.length);
			for (var i = 0; i < completed_tasks.length; ++i) {
				console.log(`${i + 1}. ` + completed_tasks[i]);
			}
		}
		if (result2 != true || completed_tasks[0] == "") {
			console.log("Pending :", intermediate_tasks.length);
			for (var i = 0; i < intermediate_tasks.length; ++i) {
				console.log(
					`${i + 1}. ` +
						intermediate_tasks[i] +
						` [${integer_array[i]}]`
				);
			}
			console.log("\nCompleted : 0");
		}
	}
};
