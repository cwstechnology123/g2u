import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>

        <link href="https://fonts.googleapis.com/css?family=PT+Sans:400,700&display=swap" rel="stylesheet" />

        {/* <script src="/assets/js/jquery-2.2.4.min.js"></script> */}
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.4/jquery.min.js"></script>

        <link rel="stylesheet" href="/assets/css/bootstrap-3.3.7.min.css" />
        <link rel="stylesheet" type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick.min.css" />
        <link rel="stylesheet" type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick-theme.min.css" />
        <link rel="stylesheet" href="/assets/css/font-awesome-4-latest.min.css" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
        <link rel="stylesheet" href="/assets/css/foundation.css" />

        <link rel="stylesheet" href="/assets/css/modal.css" />
        <script src="/assets/js/bootstrap-3-latest.min.js"></script>

      </Head>
      <body>

        <Main />

        <NextScript />

      </body>
    </Html>
  )
}
