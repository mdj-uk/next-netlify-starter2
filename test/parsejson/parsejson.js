import fs from 'fs'
let imageManifestFile='public/images/next-image-export-optimizer-hashes.json';
const fileContents = fs.readFileSync(imageManifestFile);
const data = JSON.parse(fileContents);
console.log(data);


