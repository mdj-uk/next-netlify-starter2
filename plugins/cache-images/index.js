import fs from 'fs'
import path from 'path'
import nextConfig from '../../next.config.js';

//  read settings from next config file - make sure this is imported correctly above
const defaultSizes = [10, 16, 32, 48, 64, 96, 128, 256, 384, 640, 750, 828, 1080, 1200, 1920, 2048, 3840];
let parsedSizes = getSizes();
let sizes = parsedSizes ? parsedSizes : defaultSizes;
let imageFolder = nextConfig.env.nextImageExportOptimizer_imageFolderPath;

// let imageFolder = 'public/images';

export const onPreBuild = async function ({ utils }) {

   
   // Restore manifest of source files which have been optimised on previous builds
   let imageManifestFile = imageFolder + '/next-image-export-optimizer-hashes.json';
   let imageManifestRestored = await utils.cache.restore(imageManifestFile)

   if (imageManifestRestored) {
      console.log('Found image manifest. Will attempt to parse ... ');

      let preOptimisedImageFiles = [];
      try {
         const fileContents = await fs.promises.readFile(imageManifestFile);
         const data = JSON.parse(fileContents);
         preOptimisedImageFiles = Object.keys(data);
      } catch (error) {
         console.log('Error attempting to read ' + imageManifestFile);
         console.error(error);         
         return
      }

      for (let srcFile of preOptimisedImageFiles) {

         // for each source file which has been optimised on a previous build, check if it is
         //  present locally - i.e. whether it was part of latest commit. If so, restore
         // the optimised versions of the file from the netlify cache

         let srcFileWithFullPath = path.join(imageFolder, srcFile);
         let found = await exists(srcFileWithFullPath);
         if (found) {
            console.log(`${srcFileWithFullPath} found in image manifest and local files`);
         }
         else {
            console.log(`${srcFileWithFullPath} found in image manifest but not in local files`);
         }
         if (found) {
            let files = sizes.map((s) => (
               imageFolder + '/' +
               path.dirname(srcFile)
               + '/nextImageExportOptimizer/'
               + path.parse(srcFile).name +
               '-opt-' + s + '.WEBP'
            ))

            for (let f of files) {
               
               try {
                  let res = await utils.cache.restore(f)
                  if (res){
                     console.log('restored ' + f + ' from netlify cache');
                  }
               } catch (error) {
                  console.log('Error restoring ' + f + ' from netlify cache');
                  console.error(error);
               }
            }
         }

      }

   }
   else {
      console.log('Did not find image manifest.');
   }
}

export const onPostBuild = async function ({ utils }) {
   // Cache file/directory for future builds.
   // let imageFolder = './public/images'
   try {
      await utils.cache.save(imageFolder)
      console.log(imageFolder + ' cached for future builds.');
   } catch (error) {
      console.log('Error attempting to cache ' + imageFolder + ' for future builds.');
      console.error(error);
   }

}


async function exists(path) {
   try {
      await fs.promises.access(path)
      return true
   } catch {
      return false
   }
} 

function getSizes(){
   try {
      let s= nextConfig.images.imageSizes;
      let d= nextConfig.images.deviceSizes;
      let sizes = [...s,...d];
      return sizes;      
   } catch (error) {
      return false;
   }

}