# Remote JS
A nodejs server that allows you to connect devices on your local network to control your computer. It launches an http server and websocket server hosted at your devices ip. 

## Usage 
The default port is 8080, to update which port is used, create an `.env` file containing `PORT=<your port #>`. Run `npm install` to install required dependencies, then `node server.js`. Then with your phone connect to the ip printed on launch in a web browser to start remote controlling!


## Features

### Numpad
A 0...9 numpad with '.' and backspace capability. Useful for when you're on the go and don't have a full sized keyboard. 

- Navigation Keys (Tab,ULDR Arrows, Return/Enter) Coming Soon!

