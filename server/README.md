# Real-Time Chat Server Application

## Overview

This is a real-time chat server application built using Node.js, Express, and Socket.IO. It allows users to join different chat rooms, send messages within those rooms, and view active chat rooms. The server also maintains a global chat room for all users.

## Features

- Real-time communication using Socket.IO.
- Users can join and leave chat rooms.
- Messages are sent and received in real-time within rooms.
- Active chat rooms are tracked and can be listed.
- A global chat room is available for messages not specific to any room.
- Old messages in the global chat are cleared after one hour.

## API Endpoints

GET /: A simple test route.
GET /active-rooms: Returns a list of currently active chat rooms.
GET /global-messages: Returns the messages from the global chat.

## Socket.IO Events

Connection: Handles new client connections.
joinRoom: Allows a user to join a specific room.
leaveRoom: Allows a user to leave a room.
sendMessage: Sends a message to a specific room.
disconnect: Handles client disconnection and updates room statuses.
