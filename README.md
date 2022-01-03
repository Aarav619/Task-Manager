
# Task-Manager

![task-cli](/../assets/screenshots/ss1.png)

## Description
A Command Line based Task Manager, which allows you to manage your tasks in a minimalistic way.


## Requirements
- NodeJs

## Installation

Install Task-Manager via

```bash
  git clone https://github.com/Aarav619/Task-Manager.git
  cd Task-Manager && npm i
```
    
## Usage

### 1. Help
Executing the command without any arguments, or with a single argument help prints the CLI usage.

![help-cmd](/../assets/screenshots/ss2.png)

### 2. List all pending items

Use the ls command to see all the items that are not yet complete, in ascending order of priority.

Every item should be printed on a new line. with the following format

```
[index] [task] [priority]
```

Example:

![ls-cmd](/../assets/screenshots/ss3.png)

### 3. Add a new item

Use the add command. The text of the task should be enclosed within double quotes (otherwise only the first word is considered as the item text, and the remaining words are treated as different arguments).

![add-cmd](/../assets/screenshots/ss4.png)

### 4. Delete an item

Use the del command to remove an item by its index.

![del-cmd](/../assets/screenshots/ss5.png)

### 5. Mark a task as completed

Use the done command to mark an item as completed by its index.

![done-cmd](/../assets/screenshots/ss6.png)

### 6. Generate a report

Show the number of complete and incomplete items in the list. and the complete and incomplete items grouped together.

![report-cmd](/../assets/screenshots/ss7.png)



## FAQ

#### 1. What are the features of this Task-Manager ?

This is a CLI based Task-Manager which allows one to add, delete & view their pending and completed tasks.

#### 2. Why CLI based ?
It's faster than an ordinary GUI based application also gives better control to the user, btw it lacks frontend so easy to maintain :sweat_smile:.



## Support

For support, email aaravmishra619@gmail.com. 
