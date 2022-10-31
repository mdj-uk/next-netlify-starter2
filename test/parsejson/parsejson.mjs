import fs from 'fs'
import path from 'path'
import Path from 'path'
let imageManifestFile='../../public/images/next-image-export-optimizer-hashes.json';
const fileContents = fs.readFileSync(imageManifestFile);
const data = JSON.parse(fileContents);
console.log(data);

// let preOptimisedImageFiles = Object.keys(data);

let sizes = [10,16,32];
let f = './public/images/test-export/600x500.jpeg';

console.log(path.basename(f));
console.log(path.dirname(f));

// let b = './public/images/test-export/nextImageExportOptimizer/600x500-opt-10.WEBP'
let b = './public/images/test-export/nextImageExportOptimizer/600x500'

let files = sizes.map((s) => (
   path.dirname(f) + '/nextImageExportOptimizer/' + Path.parse(f).name + '-opt-' + s + '.WEBP'
))
console.log(files);