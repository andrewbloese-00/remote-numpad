# Remote Numpad
A nodejs server that allows you to connect devices on your local network to send keystrokes to a host device. It launches an http server and websocket server hosted at your (host) device's IP address.

![Terminal Screen](https://firebasestorage.googleapis.com/v0/b/storeshit.appspot.com/o/numpad-js%2Fterm.png?alt=media&token=7f98635f-aaa7-4d87-bee9-688011acfca1)
## Features
### Numpad
![Number Keypad Inputs](https://firebasestorage.googleapis.com/v0/b/storeshit.appspot.com/o/numpad-js%2Fnums.jpg?alt=media&token=3972b7a6-08e6-440a-be4d-78317dc69086)
A 0...9 numpad with '.' and backspace capability. Useful for when you're on the go and don't have a full sized keyboard. 

### Basic Logging 
Log When Keystrokes are sent, as well as when socket connections are established / disconnected. 

### Navigation Keys 
![Navigation Arrows](https://firebasestorage.googleapis.com/v0/b/storeshit.appspot.com/o/numpad-js%2Farrows.jpg?alt=media&token=6d21ea4f-51f0-4c9d-85c0-8bcb6524e8d2)
 - Tab
 - ULDR Arrows (in Arrow Mode), 
 - Return/Enter Key



## Coming Soon!
### Customization
- Configure custom color themes for your numpad! 



****

# Guide 

### Install This Repo

```bash
git clone https://github.com/andrewbloese-00/remote-numpad.git
```
Install somewhere you will remember on your computer! After the repository is cloned `cd` into it and run 
```bash
npm install
```
to grab the dependencies `ws`,`robotjs`, and `dotenv`

### Configuration 
To configure a custom port to run the numpad server on, create a `.env` and attach your port like: 
```
PORT=8080
```
* Note: If you do not specifiy the port it will automatically select port `8080`



### Running It
Inside the project folder, run:
```bash
npm start
```
It will start up the numpad server and display the http and websocket urls for connection. On a seperate device (on the same network as the machine running the numpad server) go to the http url to access your numpad!


### Shutting it Down
In the terminal running the server simply `ctrl`+`c` to exit and close all connections. 

****

