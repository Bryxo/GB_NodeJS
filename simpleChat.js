import http from 'http';
import { Server } from 'socket.io';
import fs from 'fs';
import path from 'path';
//const CHAT_HTML = path.join(path.resolve(), 'simpleChat.html');
const host = 'localhost';
const port = 4444;

const server = http.createServer((req, res) => {
   //const readStream = fs.createReadStream(CHAT_HTML);
   const readStream = fs.createReadStream('./simpleChat.html');
   res.writeHead(200, { 'Content-Type': 'text/html'});
   readStream.pipe(res);
})
//listen(4444, 'localhost');
server.listen(port, host, () => console.log(`Server running at http://${host}:${port}`))

const io = new Server(server);

io.on('connection', (client) => {
   const userCount = io.engine.clientsCount;
   const userName = generateUserName();

    //пересчитываем количество пользователей в чате
   client.broadcast.emit('changeUserCount', userCount);
   client.emit('changeUserCount', userCount);

    //указываем для пользователя его имя
   client.emit('setName', userName);

    //сообщаем в чат, что зашел новый пользователь
   client.broadcast.emit('addUser', userName);

    //сообщаем в чат, что зашел новый пользователь
   client.on('disconnect', () => {
      client.broadcast.emit('leftUser', userName);
      client.broadcast.emit('changeUserCount', io.engine.clientsCount);
   });

   client.on('newMessage', (payload) => {
      const msg = {
            user: userName,
            text: payload
      };
      client.broadcast.emit('newChatMessage', msg);
      client.emit('newChatMessage', msg);
   });
});

const generateUserName = () => {
   return 'user#'+(Date.now()).toString().substring(9);
};