import fs from 'fs'
import path from 'path'
import Path from 'path'

export const onPreBuild = async function ({ utils }) {
   let imageManifestFile='./public/images/next-image-export-optimizer-hashes.json';
   // Returns false if the file/directory was not cached yet. Returns true otherwise.
   let imageManifestRestored = await utils.cache.restore(imageManifestFile)
   if (imageManifestRestored){
      let sizes = [10, 32, 1000];
      
      console.log('Found image manifest. Will attempt to parse ... ');
      
      const fileContents = await fs.promises.readFile(imageManifestFile);
      const data = JSON.parse(fileContents);
      // console.log(data);

      let preOptimisedImageFiles = Object.keys(data);
      for (let srcFile of preOptimisedImageFiles){
         let srcFileWithFullPath='./public/images/'+srcFile;
         // add here check to see if srcFile file still present (i.e is in lates commit)
         let found = await exists(srcFileWithFullPath);
         if (found){
            console.log(`${srcFileWithFullPath} found in image manifest and local files`);
         }
         else {
            console.log(`${srcFileWithFullPath} found in image manifest but not in local files`);

         }
         if (found){
            let files = sizes.map((s) => (
               './public/images/' + 
               path.dirname(srcFile) 
               + '/nextImageExportOptimizer/' 
               + Path.parse(srcFile).name + 
               '-opt-' + s + '.WEBP'
            ))
            // console.log(files);
            
            for (let f of files){
               console.log('restoring ' +f + ' from netlify cache');
               await utils.cache.restore(f)
            }
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


async function exists (path) {  
   try {
     await fs.promises.access(path)
     return true
   } catch {
     return false
   }
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