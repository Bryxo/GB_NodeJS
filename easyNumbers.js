import colors from 'colors'
import readline from 'readline'

let digitCount = 0
const colorsSet = [colors.green, colors.yellow, colors.red]

const rl = readline.createInterface({ //создание интерфейса
   input: process.stdin,         //получение входных данных
   output: process.stdout        //получение выходных данных
});
rl.question ('Введите число нижнего предела диапазона: ', (digitLow) => {   //в digitLow попадает stdin
   rl.question ('Введите число верхнего предела диапазона: ', (digitHigh) => {   //в digitHigh попадает stdin
         console.log(`Простые числа в указанном диапазоне от ${digitLow} до ${digitHigh} следующие: `);
            if (digitLow < 2) {
               digitLow = 2
            }
               for (let i = digitLow; i <= digitHigh; i++) {
                  let isPrime = true
                     for (let j = 2; j < i; j++) {
                        if (i % j === 0) {
                           isPrime = false
                        }
                     }
                        if (isPrime) {
                     console.log(colorsSet[digitCount % 3](i))
                     digitCount++
                  }
               }
            if (!digitCount) {
               console.log(colors.red('Не найдено простых чисел в диапазоне'))
            }
      rl.close();
   });
});
