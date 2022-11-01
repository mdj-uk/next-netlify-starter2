import Image from "next/future/image"
import ExportedImageFuture from "next-image-export-optimizer/future/ExportedImage";
export default function Test() {
   let f_opt = '/images/test-export/nextImageExportOptimizer/600x500-opt-640.WEBP';
   let f_non = '/images/test-export/600x500.jpeg';
   // console.log(process.env);
   console.log(process.env.NETLIFY_DEV);
   console.log(process.env.CONTEXT);
   console.log(process.env.NODE_ENV);
   console.log(process.env.NETLIFY_LOCAL);

   let dev = process.env.NODE_ENV === 'development';
   console.log('dev');
   console.log(dev);
   return <>
      hi
      {/* <ExportedImageFuture
         src="/images/test-export/600x500.jpeg"
         alt="puppy"
         width={600}
         height={500}
         useWebp={process.env.nextImageExportOptimizer_storePicturesInWEBP}
      /> */}
      <img
         src={f_non}
         alt="puppy"
         width={600}
         height={500}
         srcSet={dev ? undefined : "/images/test-export/nextImageExportOptimizer/600x500-opt-640.WEBP 1x, /images/test-export/nextImageExportOptimizer/600x500-opt-1000.WEBP 2x"}
      />
      {/* <ExportedImageFuture
         src="/images/test-export/karthik-sreenivas-rsx-joaKYrk-unsplash.jpg"
         sizes={'640px'} alt="autumn"
         width={4527}
         height={3015}
         style={{ width: '50%', height: 'auto' }}
         priority
         useWebp={process.env.nextImageExportOptimizer_storePicturesInWEBP}
      /> */}

   </>

}