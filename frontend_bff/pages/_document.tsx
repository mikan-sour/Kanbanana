import Document, { Html, Head, Main, NextScript } from 'next/document'

import { resetServerContext } from "react-beautiful-dnd";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    resetServerContext();
    return { ...initialProps }
  }

  render() {
    return (
      <Html>
        <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Lato"
          rel="stylesheet"
        />
        </Head>
        <body>
          <Main />
          <div id='modal-portal'/>
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
