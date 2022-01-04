const process = require("process");
const help = require("./lib/help");
const read = require("./lib/readTasks");
const add = require("./lib/addTask");
const completed = require("./lib/completedTask");
const ls = require("./lib/lsTask");
const report = require("./lib/reportTask");
const del = require("./lib/delTask");
const verify = require("./lib/verifyPath");

function main() {
	var argLength = process.argv.length;
	const argument = process.argv[2];

	if (argument === "help") {
		help.usage_help();
	}
	else if (argument === "add") {
		if (argLength == 3) {
			console.log("Error: Missing tasks string. Nothing added!");
		}
		if (argLength > 3) {
			const path = "task.txt";
			var result = verify.verifyPath(path);
			add.addTask(result);
		}
	}
	else if (argument === "done") {
		if (argLength == 3) {
			console.log("Error: Missing NUMBER for marking tasks as done.");
		}
		if (argLength > 3) {
			const path1 = "task.txt";
			const path2 = "completed.txt";
			property = "done";
			var result1 = verify.verifyPath(path1);
			var result2 = verify.verifyPath(path2);
			var done_tasks = read.readTasks(path1, property);
			completed.completedTask(result1, result2, done_tasks);
		}
	}
	else if (argument === "ls") {
		const path = "task.txt";
		const result = verify.verifyPath(path);
		property = "ls";
		var all_tasks = read.readTasks(path, property);
		ls.lsTask(result, all_tasks);
	} 
	else if (argument === "report") {
		path1 = "task.txt";
		path2 = "completed.txt";
		property = "report";
		result1 = verify.verifyPath(path1);
		result2 = verify.verifyPath(path2);
		var tasks = read.readTasks(path1, property);
		report.reportTask(result1, result2, tasks, path2, property);
	} 
	else if (argument === "del") {
		if (argLength == 3) {
			console.log("Error: Missing NUMBER for deleting tasks.");
		}
		if (argLength == 4) {
			const path = "task.txt";
			const result = verify.verifyPath(path);
			property = "del";
			var all_task_list = read.readTasks(path, property);
			del.delTask(result, all_task_list);
		}
	}
	else if (argLength < 3) {
		help.usage_help();
	} 
	else {
		console.log(
			`Invalid command ${argument}, Select the appropriate command from menu below: \n`
		);
		help.usage_help();
	}
}

main();
