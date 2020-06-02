#!/bin/bash
# Website Automate
gnome-terminal --tab --title="mongodb" --command="bash -c 'sudo mongod; $SHELL'"
gnome-terminal --tab --title="server" --command="bash -c 'cd server; npm start; $SHELL'"
gnome-terminal --tab --title="cors-anywhere" --command="bash -c 'cd server/node_modules/cors-anywhere; node server.js; $SHELL'"
gnome-terminal --tab --title="website" --command="bash -c 'cd website; npm start; $SHELL'"

