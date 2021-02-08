import Document, { Html, Head, Main, NextScript } from 'next/document'
import client from '../lib/sanity'

export default class MyDocument extends Document {
  
  static async getInitialProps(ctx) {

    const initialProps = await Document.getInitialProps(ctx)

    const lang = await client(false).fetch(`*[_type == "global"].lang[0]`)
    
    return {
      ...initialProps,
      lang
    }
  }

  render () {
    return (
      <Html lang={this.props.lang || 'en'}>
        <Head>
          <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"/>
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap" rel="stylesheet" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}