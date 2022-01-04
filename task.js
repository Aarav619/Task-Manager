const fs = require("fs");
const process = require("process");
const help = require("./lib/help");
const read = require("./lib/readTasks");
const add = require("./lib/addTask")

const verifyPath = (path) => {
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

const completedTask = (result1, result2, done_tasks) => {
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
					fs.appendFile("completed.txt","\n" + to_add_task, function (err) {
							if (err) {
								return console.error("error");
							}
							console.log("Marked item as done.");
						}
					);
				}
			}
		}
		if (done_task_index != done_tasks.length &&done_task_index > done_tasks.length) {
			console.log(`Error: no incomplete item with index #${done_task_index} exists.`);
		}
	}
};

const lsTask = (result, all_task) => {
	var all_task_list = new Array();
	var integer_array = new Array();
	if (result == true) {
		all_task.sort();
		for (var i = 0; i < all_task.length; ++i) {
			var all_task_without_index = all_task[i].slice(2);
			var integer_part  = all_task[i].slice(0,1);
			integer_array.push(integer_part)
			all_task_list.push(all_task_without_index);
		}
		for (var i = 0; i < all_task_list.length; i++) {
			console.log(`${i+1}. ` + all_task_list[i] + ` [${integer_array[i]}]`);
		}
	}
	if (result != true) {
		console.log("There are no pending tasks!");
	}
};

const reportTask = (result1, result2, tasks, path2, property) => {
	var intermediate_tasks = new Array();
	var integer_array = new Array();
	if (result1 == true) {
		for (var i = 0; i < tasks.length; ++i) {
			var all_task_without_index = tasks[i].slice(2);
			intermediate_tasks.push(all_task_without_index);
			var integer_part  = tasks[i].slice(0,1);
			integer_array.push(integer_part)
		}
		if (result2 == true) {
			var completed_tasks = read.readTasks(path2, property);
			var incomplete_tasks = intermediate_tasks.filter(
				(x) => !completed_tasks.includes(x)
			);
			console.log("Pending :", incomplete_tasks.length);
			for (var i = 0; i < incomplete_tasks.length; ++i) {
				console.log(`${i + 1}. ` + incomplete_tasks[i] + ` [${integer_array[i]}]`);
			}
			console.log("\nCompleted :", completed_tasks.length);
			for (var i = 0; i < completed_tasks.length; ++i) {
				console.log(`${i + 1}. ` + completed_tasks[i]);
			}
		}
		if (result2 != true || completed_tasks[0]=="") {
			console.log("Pending :", intermediate_tasks.length);
			for (var i = 0; i < intermediate_tasks.length; ++i) {
				console.log(`${i + 1}. ` + intermediate_tasks[i] + ` [${integer_array[i]}]`);
			}
			console.log("\nCompleted : 0");
		}
	}
};

const delTask = (result, all_task_list) => {
	var del_index = process.argv[3];
	if (result == true) {
		if (del_index > all_task_list.length || all_task_list[0] == "") {
			return console.log(`Error: task with index #${del_index} does not exist. Nothing deleted.`);
		}
		for (var i = 0; i < all_task_list.length; i++) {
			if (i + 1 == del_index) {
				all_task_list.splice(i,1);
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

function main() {
	var argLength = process.argv.length;
	const argument = process.argv[2];

	if (argument === "help") {
		help.usage_help()
	} 
	else if (argument === "add") {
		if (argLength == 3) {
			console.log("Error: Missing tasks string. Nothing added!");
		}
		if (argLength > 3) {
			const path = "task.txt";
			var result = verifyPath(path);
			add.addTask(result);
		}
	} 
	else if (argument === "done") {
		if (argLength == 3) {
			console.log("Error: Missing NUMBER for marking tasks as done.");
		}
		if (argLength > 3) {
			const path1 = "task.txt";
			const path2 = "completed.txt"
			property = "done";
			var result1 = verifyPath(path1);
			var result2 = verifyPath(path2)
			var done_tasks = read.readTasks(path1, property);
			completedTask(result1, result2, done_tasks);
		}
	} 
	else if (argument === "ls") {
		const path = "task.txt";
		const result = verifyPath(path);
		property = "ls";
		var all_tasks = read.readTasks(path, property);
		lsTask(result, all_tasks);
	} 
	else if (argument === "report") {
		path1 = "task.txt";
		path2 = "completed.txt";
		property = "report";
		result1 = verifyPath(path1);
		result2 = verifyPath(path2);
		var tasks = read.readTasks(path1, property);
		reportTask(result1, result2, tasks, path2, property);
	} 
	else if (argument === "del") {
		if (argLength == 3) {
			console.log("Error: Missing NUMBER for deleting tasks.");
		}
		if (argLength == 4) {
			const path = "task.txt";
			const result = verifyPath(path);
			property = "del"
			var all_task_list = read.readTasks(path, property);
			delTask(result, all_task_list);
		}
	}
	 else if (argLength < 3) {
		help.usage_help();
	}
	 else {
		console.log(`Invalid command ${argument}, Select the appropriate command from menu below: \n`);
		help.usage_help();
	}
}

main();
