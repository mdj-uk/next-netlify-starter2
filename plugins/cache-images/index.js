import fs from 'fs'

export const onPreBuild = async function ({ utils }) {

   // let res2 = await utils.cache.restore('./public/images/test-export/600x500.jpeg')
   // console.log(res2);
   ls('.next/images');
   

}

// Cache file/directory for future builds.
// Does not do anything if:
//  - the file/directory does not exist locally
export const onPostBuild = async function ({ utils }) {

   // let res2 = await utils.cache.save('./public/images/test-export/600x500.jpeg')
   // console.log(res2);
   fs.appendFile('.next/images/test.txt', 'Hello content!', function (err) {
      if (err) throw err;
      console.log('Saved!');
    });
   ls('.next/images');

}

async function ls(dir){
   // directory path

   // list all files in the directory
   fs.readdir(dir, (err, files) => {
      if (err) {
         throw err
      }

      // files object contains all files names
      // log them on console
      files.forEach(file => {
         console.log(file)
      })
   })
}