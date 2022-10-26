import Head from 'next/head'
import Header from '@components/Header'
import Footer from '@components/Footer'
import Image from "next/future/image";
import { getPlaiceholder } from "plaiceholder";

export const getStaticProps = async () => {
  let src = "/sample.png";
  let size = 10;

  const p1 = await getPlaiceholder(
    src,
    {
      size,
      removeAlpha: true,
    }
  );
  const p2 = await getPlaiceholder(
    src,
    {
      size,
      removeAlpha: false,
    }
  );

  return {
    props: {
      imageProps: {
        ...p1.img,
        blurDataURL: p1.base64,
      },
      imageProps2: {
        ...p2.img,
        blurDataURL: p2.base64,
      },
    },
  };
};

export default function Home({ imageProps, imageProps2 }) {
  return (
    <div className="container">
      <Head>
        <title>Next.js Starter!</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Header title="Welcome to my app!" />
        <p className="description">
          Get started by editing <code>pages/index.js</code>
        </p>
        removeAlpha=true:
        <Image {...imageProps} placeholder="blur" style={{ width: "200px", height: "auto" }} />
        removeAlpha=false:
        <Image {...imageProps2} placeholder="blur" style={{ width: "200px", height: "auto" }} />
      </main>

      <Footer />
    </div>
  )
}
