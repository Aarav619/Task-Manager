exports.readTasks = (path, property) => {
	try {
		all_task_list = fs.readFileSync(path).toString().split("\n");
		return all_task_list;
	} catch (err) {
		switch (property) {
			case "done":
				console.error("First add some task to mark them as done!");
				break;
			case "ls":
				console.error("First add some task to list them...");
				break;
			case "del":
				console.error("First add some task to delete them!");
				break;
			case "report":
				console.error(
					"First add some task to list them, Report can't be generated..."
				);
				break;
		}
	}
};
