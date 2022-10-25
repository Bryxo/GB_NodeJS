import fs from 'fs';
import { Transform } from 'stream';

const ACCESS_LOG = './access.log';
// const data = fs.readFileSync('./access.log', 'utf8') //синхронно

// fs.readFile(ACCESS_LOG, 'utf8' , (err, data) => { //на промисах
//   console.log(data)
// })

const requests = [
  `127.0.0.1 - - [25/May/2021:00:07:17 +0000] "GET /foo HTTP/1.1" 200 0 "-" "curl/7.47.0"`,
  `127.0.0.1 - - [25/May/2021:00:07:24 +0000] "POST /baz HTTP/1.1" 200 0 "-" "curl/7.47.0"`,
];

// fs.writeFile( //запись значений в файл
//   ACCESS_LOG,
//   requests[0] + '\n',   // + '\n' - это перенос на новую строку
//   { encoding: 'utf8', flag: 'a' },
//   (err) => {
//     if (err) console.log(err);
//   }
// );

// fs.appendFile(ACCESS_LOG, requests[0] + '\n', 'utf8', (err) => { //добавление значений в файл
//   if (err) console.log(err);
// });

// fs.ReadStream() // class

// fs.createReadStream()

// const readStream = fs.createReadStream(ACCESS_LOG, {
//   encoding: 'utf8',
//   // autoClose  //автозакрытие
//   // start //с какого байта начинать чтение
//   // end //до какого байта начинать чтение
//   highWaterMark: 32, //количество байт по которому читать 
// });

// readStream.on('data', (chunk) => {  //chunk - кусок (часть) считанный из файла
//   console.log('chunk:', chunk)
// })

// end, error,

// const writeStream = fs.createWriteStream(
//   ACCESS_LOG,
//   {
//     encoding: 'utf8',
//     flags: 'a'  //дозаписывать
//   }
// )

// requests.forEach((logString) => {
//   writeStream.write(logString + '\n')
// })

// writeStream.end()

const payedAccount = true

const readStream = fs.createReadStream(ACCESS_LOG)

const tStream = new Transform({
  transform(chunk, enconfig, callback) {
    if(!payedAccount) {
      const transformed = chunk.toString().replace(/\d+\.\d+\.\d+\.\d+/g, '[Hidden IP]')
      this.push(transformed)
    } else {
      this.push(chunk)
    }

    callback()
  }
})

readStream.pipe(tStream).pipe(process.stdout)