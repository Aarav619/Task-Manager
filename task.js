const fs = require("fs");
const process = require("process");

const usage_help = () => {
	let usage = `
	---------------------------------------------------     WELCOME TO     ------------------------------------------------- 
	                                                     CLI TASK MANAGER 
	
	Usage :-
	
	=========================================================================================================================
	|                                                                                                                       |
	|	$ ./task help                 # Show usage                                                                      |
	|	$ ./task add 2 hello world    # Add a new item with priority 2 and text "hello world" to the list               |
	|	$ ./task ls                   # Show incomplete priority list items sorted by priority in ascending order       |
	|	$ ./task del INDEX            # Delete the incomplete item with the given index                                 | 
	|	$ ./task done INDEX           # Mark the incomplete item with the given index as complete                       |
	|	$ ./task report               # Statistics                                                                      |
	|                                                                                                                       |
	=========================================================================================================================`;

	console.log(usage);
};

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

const readTasks = (path) => {
	try {
		all_task_list = fs.readFileSync(path).toString().split("\n");
		return all_task_list;
	} catch (err) {
		console.error("First add some task to list them");
	}
};

const addTask = (result) => {
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
			console.log(
				`Added task: "${task_without_priority}" with priority ${priority}`
			);
		});
	}
	if (result != true) {
		fs.writeFile("task.txt", task_to_add, function (err) {
			if (err) {
				return console.error("error");
			}
			console.log(
				`Added task: "${task_without_priority}" with priority ${priority}`
			);
		});
	}
};

const completedTask = (result, done_tasks) => {
	var done_task_index = process.argv[3];

	if (result == true) {
		done_tasks.sort();
		for (var i = 1; i < done_tasks.length + 1; ++i) {
			if (done_task_index == i) {
				if (result != true) {
					var to_add_task = done_tasks[i - 1].slice(2);
					fs.writeFile("completed.txt", to_add_task, function (err) {
						if (err) {
							return console.error("error");
						}
						console.log("Marked item as done.");
					});
				}
				if (result == true) {
					var to_add_task = done_tasks[i - 1].slice(2);
					fs.appendFile("completed.txt", "\n" + to_add_task , function (err) {
							if (err) {
								return console.error("error");
							}
							console.log("Marked item as done.");
						}
					);
				}
			}
		}
		if (done_task_index != done_tasks.length && done_task_index > done_tasks.length) {
			console.log(`Error: no incomplete item with index #${done_task_index} exists.`);
		}
	}
};

const lsTask = (result, all_task) => {
	var all_task_list = new Array();

	if (result == true) {
		all_task.sort();

		for (var i = 0; i < all_task.length; ++i) {
			var all_task_without_index = all_task[i].slice(2);
			all_task_list.push(all_task_without_index);
		}
		var iterator = 1;
		for (i in all_task_list) {
			console.log(`${iterator}. ` + all_task_list[i] + ` [${iterator}]`);
			iterator += 1;
		}
	}
	if (result != true) {
		console.log("There are no pending tasks!");
	}
};

const reportTask = (result1, result2, tasks, completed_tasks) => {
	var intermediate_tasks = new Array();
	if (result1 == true) {
		for (var i = 0; i < tasks.length; ++i) {
			var all_task_without_index = tasks[i].slice(2);
			intermediate_tasks.push(all_task_without_index);
		}
		if (result2 == true) {
			var incomplete_tasks = intermediate_tasks.filter(
				(x) => !completed_tasks.includes(x)
			);
			console.log("Pending :", incomplete_tasks.length);

			for (var i = 0; i < incomplete_tasks.length; ++i) {
				console.log(`${i + 1}. ` + incomplete_tasks[i] + ` [${i + 1}]`);
			}
			console.log("\nCompleted :", completed_tasks.length);
			for (var i = 0; i < completed_tasks.length; ++i) {
				console.log(`${i + 1}. ` + completed_tasks[i]);
			}
		}
		if (result2 != true) {
			for (var i = 0; i < tasks.length; ++i) {
				var all_task_without_index = tasks[i].slice(2);
				intermediate_tasks.push(all_task_without_index);
			}
			console.log("Pending :", intermediate_tasks.length);
			for (var i = 0; i < intermediate_tasks.length; ++i) {
				console.log(`${i + 1}. ` + intermediate_tasks[i] + ` [${i + 1}]`);
			}
			console.log("Comepleted : 0");
		}
	}
};

const delTask = (result, all_task_list) => {
	var del_index = process.argv[3];
	if (result == true) {
		for (var i = 0; i < all_task_list.length; ++i) {
			if (i + 1 == del_index) {
				all_task_list.splice(i, 1);
				console.log(`Deleted task #${del_index}`);
			}
		}
		for (var i = 0; i < all_task_list.length; ++i) {
			fs.writeFile("task.txt", all_task_list[i] + "\n", function (err) {
				if (err) {
					return console.error("error");
				}
			});
		}
		if (del_index != all_task_list.length && del_index > all_task_list.length) {
			console.log(
				`Error: task with index #${del_index} does not exist. Nothing deleted.`
			);
		}
	}
};

function main() {
	var argLength = process.argv.length;
	const argument = process.argv[2];

	if (argument === "help") {
		usage_help();
	} else if (argument === "add") {
		if (argLength == 3) {
			console.log("Error: Missing tasks string. Nothing added!");
		}
		if (argLength > 3) {
			const path = "task.txt";
			var result = verifyPath(path);
			addTask(result);
		}
	} else if (argument === "done") {
		if (argLength == 3) {
			console.log("Error: Missing NUMBER for marking tasks as done.");
		}
		if (argLength > 3) {
			const path = "task.txt";
			var result = verifyPath(path);
			var done_tasks = readTasks(path);
			completedTask(result, done_tasks);
		}
	} else if (argument === "ls") {
		const path = "task.txt";
		const result = verifyPath(path);
		var all_tasks = readTasks(path);
		lsTask(result, all_tasks);
	} else if (argument === "report") {
		path1 = "task.txt";
		path2 = "completed.txt";
		result1 = verifyPath(path1);
		result2 = verifyPath(path2);
		var tasks = readTasks(path1);
		var completed_tasks = readTasks(path2);
		reportTask(result1, result2, tasks, completed_tasks);
	} else if (argument === "del") {
		if (argLength == 3) {
			console.log("Error: Missing NUMBER for deleting tasks.");
		}
		if (argLength == 4) {
			const path = "task.txt";
			const result = verifyPath(path);
			var all_task_list = readTasks(path);
			delTask(result, all_task_list);
		}
	} else if (argLength < 3) {
		usage_help();
	} else {
		console.log(
			`Invalid command ${argument}, Select the appropiate command from menu below: \n`
		);
		usage_help();
	}
}

main();
