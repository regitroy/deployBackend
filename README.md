# Poll System Api Documentation

> Consideration
 1. Using Mongo DB
 2. Not implemented Cache module for this project.
 3. No UI available

# User

> Registration

**Host**: /register
**Method**: POST
**Body**: 
  ```
  {
		 "name": "Saheb",
		"handle": "saheb",
		"password": "123456"
 }
 ```
 **Response**
```
{
  "success": 1,
  "data": {}
}
```

> Login

**Host**: /login
**Method**: POST
**Body**: 
  ```
  {
	"handle": "saheb",
	"password": "123456"
}
```
 **Response**
```
{
  "success": 1,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZWUzNjEzZTg4ODZmNDM1ZDQ4ZGU3ZWEiLCJjcmVhdGVkQXQiOiJGcmksIDEyIEp1biAyMDIwIDExOjIwOjIzIEdNVCIsImlhdCI6MTU5MTk2MDgyM30.PJyigustXccMaTYM5F5IiuqgwwFRUn9qslGqLp4iqQo",
    "user": {
      "name": "Saheb",
      "handle": "saheb"
    }
  }
}
```

# Poll

> Create New Poll

**Host**: /poll
**Method**: POST
**header**: 
```
{
	token: <login token here>
}
```
**Body**: 
  ```
{
	"question": "Color of apple?",
	"options": "red, green, orange, red"
}
 ```
 **Response**
```
{
  "success": 1,
  "data": {}
}
```

> Add New Options

**Host**: /poll/option
**Method**: POST
**header**: 
```
{
	token: <login token here>
}
```
**Body**: 
  ```
{
	"pollId": "5ee379a9291caf3b1fbb2b09",
	"options": "light red, light green"
}
 ```
 **Response**
```
{
  "success": 1,
  "data": {}
}
```


> Delete Options

**Host**: /poll/option/delete
**Method**: POST
**header**: 
```
{
	token: <login token here>
}
```
**Body**: 
  ```
{
	"pollId": "5ee379a9291caf3b1fbb2b09",
	"optionId": "5ee379a9291caf3b1fbb2b0d"
}
 ```
 **Response**
```
{
  "success": 1,
  "data": {}
}
```

> Delete Poll

**Host**: /poll/delete
**Method**: POST
**header**: 
```
{
	token: <login token here>
}
```
**Body**: 
  ```
{
	"pollId": "5ee379a9291caf3b1fbb2b09"
}
 ```
 **Response**
```
{
  "success": 1,
  "data": {}
}
```
> Get Poll

**Host**: /poll/:page
**Method**: GET
**header**: 
```
{
	token: <login token here>
}
```
 **Response**
```
{
  "success": 1,
  "data": [
    {
      "_id": "5ee388f391ea223cf82e1d3c",
      "question": "Color of orange?",
      "update_date": "2020-06-12T13:53:56.998Z",
      "create_date": "2020-06-12T13:53:56.998Z"
    },
    {
      "_id": "5ee379a9291caf3b1fbb2b09",
      "question": "Color of apple?",
      "update_date": "2020-06-12T12:48:41.340Z",
      "create_date": "2020-06-12T12:48:41.340Z"
    }
  ]
}
```

> Get Poll Options

**Host**: /poll/option/:poll_Id
**Method**: GET
**header**: 
```
{
	token: <login token here>
}
```
 **Response**
```
{
  "success": 1,
  "data": [
    {
      "vote": 4,
      "_id": "5ee379a9291caf3b1fbb2b0b",
      "option": "red",
      "update_date": "2020-06-12T13:05:42.553Z",
      "create_date": "2020-06-12T12:48:41.000Z"
    },
    {
      "vote": 0,
      "_id": "5ee379a9291caf3b1fbb2b0c",
      "option": "green",
      "update_date": "2020-06-12T13:13:09.056Z",
      "create_date": "2020-06-12T12:48:41.000Z"
    },
    {
      "vote": 0,
      "_id": "5ee379a9291caf3b1fbb2b0e",
      "option": "red",
      "update_date": "2020-06-12T12:48:41.000Z",
      "create_date": "2020-06-12T12:48:41.000Z"
    },
    {
      "vote": 0,
      "_id": "5ee3821091ea223cf82e1d3a",
      "option": "light red",
      "update_date": "2020-06-12T13:24:32.000Z",
      "create_date": "2020-06-12T13:24:32.000Z"
    },
    {
      "vote": 0,
      "_id": "5ee3821091ea223cf82e1d3b",
      "option": "light green",
      "update_date": "2020-06-12T13:24:32.000Z",
      "create_date": "2020-06-12T13:24:32.000Z"
    }
  ]
}
```


> Vote Poll Option

**Host**: /poll/delete
**Method**: POST
**header**: 
```
{
	token: <login token here>
}
```
**Body**: 
  ```
{
	"pollId": "5ee379a9291caf3b1fbb2b09",
	"optionId": "5ee379a9291caf3b1fbb2b0d"
}
 ```
 **Response**
```
{
  "success": 1,
  "data": {}
}
```

