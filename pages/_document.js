import React from 'react';
import { Html, Head, Main, NextScript } from 'next/document';


export default function Document() {
  return (
    <Html className="dark">
      <Head>
        <link rel="stylesheet" type="text/css" href="/css/style.css" />
        <link rel="stylesheet" type="text/css" href="/css/loading.css" />
        <link rel="stylesheet" type="text/css" href="/css/smallLoading.css" />
        <link rel="stylesheet" type="text/css" href="/css/nprogress.css" />
        <link href="https://fonts.googleapis.com/css?family=Quicksand:300,400,500,600,700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );

}
