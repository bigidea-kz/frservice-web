import { NextSeo } from 'next-seo'

const Seo = ({ data }) => {
  if (!data) return null

  return (
    <NextSeo
      title={data.title}
      description={data.description ? data.description : ''}
      additionalMetaTags={[{
        name: 'keywords',
        content: data.keywords ? data.keywords : ''
      }]}
    />
  )
}

export default Seo