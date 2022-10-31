import fs from 'fs';
// import Fs from 'fs'
// import path from 'path'
// import Path from 'path'
let imageManifestFile='../../public/images/next-image-export-optimizer-hashes.json';
const fileContents = await fs.promises.readFile(imageManifestFile);
const data = JSON.parse(fileContents);
console.log(data);

let x = await exists('a')  
console.log(x);



async function exists (path) {  
   try {
     await fs.promises.access(path)
     return true
   } catch {
     return false
   }
 } 