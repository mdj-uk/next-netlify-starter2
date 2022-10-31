import Image from "next/future/image"
import ExportedImageFuture from "next-image-export-optimizer/future/ExportedImage";
export default function Test(){
   return <>
      hi
      <ExportedImageFuture src="/images/test-export/600x500.jpeg" alt="puppy" width={600} height={500} useWebp={process.env.nextImageExportOptimizer_storePicturesInWEBP}/>
   </>
   
}