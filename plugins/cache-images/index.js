import fs from 'fs'
import path from 'path'
import Path from 'path'

export const onPreBuild = async function ({ utils }) {
   let imageManifestFile='./public/images/next-image-export-optimizer-hashes.json';
   // Returns false if the file/directory was not cached yet. Returns true otherwise.
   let imageManifestRestored = await utils.cache.restore(imageManifestFile)
   if (imageManifestRestored){
      let sizes = [10, 32, 640];
      // let path = './public/images/test-export/nextImageExportOptimizer/600x500-opt-*.WEBP'
      // await utils.cache.restore(path)
      
      console.log('Found image manifest. Will attempt to parse ... ');
      
      const fileContents = fs.readFileSync(imageManifestFile);
      const data = JSON.parse(fileContents);
      console.log(data);

      let preOptimisedImageFiles = Object.keys(data);
      for (let srcFile of preOptimisedImageFiles){
         // add here check to see if srcFile file still present (i.e is in lates commit)

         let files = sizes.map((s) => (
            './public/images/' + 
            path.dirname(srcFile) 
            + '/nextImageExportOptimizer/' 
            + Path.parse(srcFile).name + 
            '-opt-' + s + '.WEBP'
         ))
         console.log(files);
         
         for (let f of files){
            await utils.cache.restore(f)
         }

      }



   }
   else{
      console.log('Did not find image manifest.');
   }
   
   // let res3 = await utils.cache.restore('./public/images/test-export/karthik-sreenivas-rsx-joaKYrk-unsplash.jpg')
   // console.log(res3);
   // // ls('.next');

   // let res4 = await utils.cache.restore('./public/images/test-export')
   // console.log(res4);


}

// Cache file/directory for future builds.
// Does not do anything if:
//  - the file/directory does not exist locally
export const onPostBuild = async function ({ utils }) {

   // Returns false if the file/directory does not exist. Returns true otherwise.
   // let res2 = await utils.cache.save('./public/images/test-export/600x500.jpeg')
   // console.log(res2);

   // fs.appendFile('.next/images/test.txt', 'Hello content!', function (err) {
   //    if (err) throw err;
   //    console.log('Saved!');
   //  });
   // ls('.next');
   let res4 = await utils.cache.save('./public/images')
   console.log(res4);

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