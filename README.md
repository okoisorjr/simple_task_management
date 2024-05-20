# About the Project

This is a simple task management api which can be used to manage daily tasks or activities as the case may be. This project was implemented with the nestjs framework leveraging the web socket gateway provided by the framework to enable real time update to clients when new tasks are created or existing tasks are updated. This project was built as an assessment exercise for a recruitment purpose.

# Built With

Nestjs, MongoDB

## Prerequisite

node, npm, nest cli and yarn

```bash
  npm install @nestjs/cli yarn
```

## Installation

Clone the repo

```bash
  git clone https://github.com/okoisorjr/simple_task_management.git
```

Go to the project directory

```bash
  cd project-name
```

Install dependencies

```bash
  yarn
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`MONGO_URI `

`ACCESS_TOKEN_SECRET`

`PORT`

`CLIENT_PORT`

# Getting started

Start Server

```bash
  nest start
  or
  yarn start: dev
```
## Features

- Users
- Tasks
- Auth

# Users Module

You can list registered users, create new users, update users, view a users detail and delete a user.

# Tasks Module

You can create new tasks, update a task, list tasks, delete tasks.

# Auth Module

Tasks can only be created and updated by authenticated users, a task can only be updated by the user who created the task, a user can list only tasks created by themselves. However a user with an ADMIN role can do all.

## Documentation
Visit the [Documentation](http://34.229.222.203:5000/api-docs)

Or 
While the server is running locally you can access it from here
```bash
  `http://localhost:${PORT}/api-docs`
```
## Optimizations (WebSocket Gateway)

Implementation of a Websocket Gateway to enable realtime data updates on the client from the server in the event that a new task is added or an exisiting task is updated

To connect to the socket using the react library 
```bash
  npm install socket.io-client
```
Set Up the WebSocket Connection in React

Create a WebSocket connection in your React application. You can use a hook to manage the WebSocket connection and handle events.
```Javascript
  // src/hooks/useSocket.js
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const useSocket = (url) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socketInstance = io(url);

    setSocket(socketInstance);

    socketInstance.on('connect', () => {
      console.log('Connected to WebSocket server');
    });

    socketInstance.on('disconnect', () => {
      console.log('Disconnected from WebSocket server');
    });

    return () => {
      socketInstance.disconnect();
    };
  }, [url]);

  return socket;
};

export default useSocket;

```
Use the WebSocket Connection in a Component
Use the useSocket hook in a component to interact with the WebSocket server.

This custom hook, useSocket, initializes a WebSocket connection to the specified URL and manages the connection lifecycle.
```Javascript
  // src/App.js
import React, { useState, useEffect } from 'react';
import useSocket from './hooks/useSocket';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const socket = useSocket('http://localhost:PORT_NO'); // Update the URL to your server

  useEffect(() => {
    if (!socket) return;

    // Listen for messages from the server
    socket.on('task_updates', (data) => {
      setTasks((prevTasks) => [...prevTasks, data]);
    });

    // Cleanup the event listener on unmount
    return () => {
      socket.off('task_updates');
    };
  }, [socket]);

  return (
    <div>
      <h1>WebSocket Messages</h1>
      
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>{task.task}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;

```
## 🛠 Skills

Javascript, HTML, CSS, Nodejs, Nestjs, React, Angular, tailwind, bootstrap...

## Feedback

If you have any feedback, please reach out to me at okoisorjr@gmail.com
