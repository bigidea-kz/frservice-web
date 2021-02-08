import ErrorPage from 'next/error'
import { useRouter } from 'next/router'
import client from '@/lib/sanity'
import Seo from '@/components/seo'
import ContentSections from '@/components/content-sections'

const DynamicPage = ({ metadata, title, sections, preview }) => {
  const router = useRouter()

  if (!router.isFallback && !sections) {
    return <ErrorPage statusCode={404} />
  }

  if (router.isFallback) {
    return <div>Loading...</div>
  }

  return (
    <>
      <Seo data={{...metadata, title}}/>
      <ContentSections preview={preview} sections={sections}/>
    </>
  )
}

export async function getStaticPaths() {
  const pages = await client(false).fetch(`
    *[_type == "page"]
  `)

  const paths = pages.map((page) => {
    const slugArray = page.slug.current.split('__')
    return {
      params: {
        slug: slugArray
      }
    }
  })

  /*
    paths = [
      {
        params: {
          slug: ['/']
        }
      },
      {
        params: {
          slug: ['/test']
        }
      }
    ]
  */

  return {
    paths,
    fallback: "blocking"
  }
}

export async function getStaticProps({ params, preview = false }) {
  let chainedSlugs

  if (params === {} || !params.slug) {
    chainedSlugs = `/`
  } else {
    chainedSlugs = params.slug.join('__')
  }

  const pageData = await client(preview).fetch(`
    *[_type == "page" && slug.current == $chainedSlugs][0]
  `, {chainedSlugs})

  if (pageData == null) return { notFound: true }

  return {
    props: {
      preview,
      title: pageData.title,
      sections: pageData.content_sections ? pageData.content_sections : null,
      metadata: pageData.metadata ? pageData.metadata : null
    },
    revalidate: 1,
  }
}

export default DynamicPage