import App from 'next/app'
import Head from 'next/head'
import ErrorPage from 'next/error'

import Router, { useRouter } from 'next/router'
import NProgress from 'nprogress'
import { DefaultSeo } from 'next-seo'

import client, {urlFor} from '@/lib/sanity'
import StatusOff from '@/components/status-off'
import Layout from '@/components/layout'
import AppProvider from '@/context/app-context'

import 'nprogress/nprogress.css'
import '../styles/scss/globals.scss'

Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

function MyApp({ Component, pageProps }) {

  const router = useRouter()
  if (router.asPath === '[[...slug]]') return null

  const { global } = pageProps
  if (global == null) return <ErrorPage statusCode={404}/>

  if (!global.status)  return <StatusOff data={global}/>

  return (
    <>
      <Head>
        <link rel="shortcut icon" href={urlFor(global.favicon)} type="image/x-icon"/>
      </Head>
      {global.metadata &&
        <DefaultSeo
          titleTemplate = {`%s | ${global.title}`}
          title = {"Page"}
          description = {global.metadata.description ? global.metadata.description : ''}
          additionalMetaTags={[{
            name: 'keywords',
            content: global.metadata.keywords ? global.metadata.keywords : ''
          }]}
        />
      }
      <AppProvider>
        <Layout global={global}>
          <Component {...pageProps} />
        </Layout>
      </AppProvider>
    </>
  )
}

const globalQuery = `
  *[_type == "global"] {
    ...,
    cookie_consent_notification {
      ...,
      text[] {
        ...,
        markDefs[] {
          ...,
          _type == "internalLink" => {
            "slug": @ .reference-> slug
          }
        }
      }
    },
    footer {
      ...,
      links[] {
        ...,
        _type == "page_link" => {
          "text": @ .reference-> title,
          "slug": @ .reference-> slug
        }
      }
    }
  }[0]
`

MyApp.getInitialProps = async (ctx) => {
  const appProps = await App.getInitialProps(ctx)
  const global = await client(false).fetch(globalQuery)

  return {
    ...appProps,
    pageProps: {
      global,
      path: ctx.pathname
    }
  }

}

export default MyApp
