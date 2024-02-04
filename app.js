const express = require('express');
const http = require('http');
const cors = require('cors');
const app = express();
const server = http.createServer(app);

const io = require('socket.io')(server, { cors: {
  origin: '*',
  allowedHeaders: ["authorization"]
}
});


var allowedOrigins = [
    /^https:\/\/deploy-preview-\d+--frontend-dev-techsierra\.netlify\.app$/,
   /^http:\/\/localhost:3000/,
   "http://localhost:3000"
  ];
app.use(
    cors({
      origin: function (origin, callback) {
        // allow requests with no origin
        if (!origin) return callback(null, true);
  
        for (var i = 0; i < allowedOrigins.length; i++) {
          var allowedOrigin = allowedOrigins[i];
  
          // if origin matches an allowed origin, allow the request
          if (typeof allowedOrigin === "string" && allowedOrigin == origin) {
            return callback(null, true);
          } else if (
            allowedOrigin instanceof RegExp &&
            allowedOrigin.test(origin)
          ) {
            return callback(null, true);
          }
        }
  
        // if origin is not allowed
        var msg =
          "The CORS policy for this site does not " +
          "allow access from the specified Origin.";
        return callback(new Error(msg), false);
      },
      credentials: true,
      // allowedHeaders: ["Content-Type", "Authorization", "Access-Control-Allow-Origin", "Access-Control-Allow-Methods", "Access-Control-Allow-Headers"],
      // optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
      // transports: ['websocket']
    })
  );
  
  


io.on('connection', (socket) => {
    console.log('User connected');
  const socketId =  socket.id
  
  console.log("socketId---------",socketId)
      socket.on(`add-message`, async (data) => {
        console.log("data=============",data)
        io.emit(`add-message-response`,data); 

			});




  });
  

  server.listen(4000, () => {
    console.log('Server listening on port 4000');
  });