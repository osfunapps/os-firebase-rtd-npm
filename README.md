## os-firebase-rtd

Introduction
------------

This project meant to provide intuitive functions to use the Firebase Real Time Database, without wasting time.

 
## Installation

**make sure you have Service Account file (a json file):** 
- If you don't have one, just log in to Firebase -> your project -> settings -> at the top menu Service Account -> produce a new file.

**make sure to get your db address:**
- log in to Firebase -> your project -> database -> the address will be on top


## Quick start

Install via npm:
    
    npm i os-firebase-rtd
    
    
Require rtd:
```js
var rtd = require("os-firebase-rtd")
```        
            
Initiate the db:     
```js    
await rtd.initializeDB("https://your_database_url.com", "/path/to/your/service/account/json.json")    
```

Push:
```js    
await RTDHelper.push("people", {"Moshe": "12", "Itzik": "33"})
```

Read:
```js    
let peopleObj = await RTDHelper.read("people")
```
Delete:
```js
await RTDHelper.delete("people")
```    

It is also possible to save the read properties to a file, delete after read and more.

## Links
[npm os-firebase-rtd](https://www.npmjs.com/package/os-firebase-rtd)
## Licence
ISC


