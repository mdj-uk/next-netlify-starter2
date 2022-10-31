import fs from 'fs'
import path from 'path'


export const onPreBuild = async function ({ utils }) {
   
   let imageManifestFile='./public/images/next-image-export-optimizer-hashes.json';
   let sizes = [10, 32, 1000];
   
   let imageManifestRestored = await utils.cache.restore(imageManifestFile)
   
   if (imageManifestRestored){
      console.log('Found image manifest. Will attempt to parse ... ');
      
      const fileContents = await fs.promises.readFile(imageManifestFile);
      const data = JSON.parse(fileContents);

      let preOptimisedImageFiles = Object.keys(data);
      for (let srcFile of preOptimisedImageFiles){
        
         // for each source file which has been optimised on a previous build, check if it is
         // still present locally - i.e. whether it was part of latest commit. If so, restore
         // the optimised versions of the file from the netlify cache
         
         let srcFileWithFullPath='./public/images/'+srcFile;
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
               + path.parse(srcFile).name + 
               '-opt-' + s + '.WEBP'
            ))
            
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
}

// Cache file/directory for future builds.
// Does not do anything if:
//  - the file/directory does not exist locally
export const onPostBuild = async function ({ utils }) {
   // Returns false if the file/directory does not exist. Returns true otherwise.
   let res = await utils.cache.save('./public/images')
   console.log(res);
}


async function exists (path) {  
   try {
     await fs.promises.access(path)
     return true
   } catch {
     return false
   }
} 
