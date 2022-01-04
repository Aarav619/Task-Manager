exports.lsTask = (result, all_task) => {
	var all_task_list = new Array();
	var integer_array = new Array();
	if (result == true) {
		all_task.sort();
		for (var i = 0; i < all_task.length; ++i) {
			var all_task_without_index = all_task[i].slice(2);
			var integer_part = all_task[i].slice(0, 1);
			integer_array.push(integer_part);
			all_task_list.push(all_task_without_index);
		}
		for (var i = 0; i < all_task_list.length; i++) {
			console.log(
				`${i + 1}. ` + all_task_list[i] + ` [${integer_array[i]}]`
			);
		}
	}
	if (result != true) {
		console.log("There are no pending tasks!");
	}
};
