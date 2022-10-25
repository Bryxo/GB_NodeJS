
const yargs = require ('yargs');
const fs = require ('fs/promises');
const { lstatSync } = require ('fs');
const path = require ('path');
const inquirer = require ('inquirer');

let currentDirrectory = process.cwd();

const options = yargs
      .positional ('d', {
            describe:'Path to directory',
            default: process.cwd(),
      })
      .positional ('p', {
      describe:'Pattern',
      default: '',
      }).argv;
console.log(options)

class ListItem {
      constructor(path, fileName) {
            this.path = path;
            this.fileName = fileName;
      }

      get isDir() {
            return lstatSync(this.path).isDirectory();
      }
}

const run = async() => {
      const list = await fs.readdir(currentDirrectory);
      const items = list.map(fileName => 
            new ListItem(path.join(currentDirrectory, fileName), fileName));
      const item = await inquirer
            .prompt([
                  {
                        name: 'fileName',
                        type: 'list',
                        message: `Choose ${currentDirrectory}`,
                        choices: items.map(item => ({name: item.fileName, value: item})),
                  }
            ])
            .then(answer => answer.fileName);

      if (item.isDir) {
            currentDirrectory = item.path;
            return await run();
      } else {
            const data = await fs.readFile(item.path, 'utf-8');

            if (options.p == null) console.log(data)
            else {
                  const regExp = new RegExp(options.p, '');
                  console.log(data.match(regExp));
            }
      }
}
run();
