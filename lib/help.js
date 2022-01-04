exports.usage_help = () => {
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
