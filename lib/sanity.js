import sanity from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import BlockContent from '@sanity/block-content-to-react'

const options = {
  dataset: process.env.SANITY_DATASET || 'production',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  useCdn: process.env.NODE_ENV === 'production'
}

const builder = imageUrlBuilder(options)

const standartClient = sanity(options)

const tokenClient = sanity({
  ...options,
  token: process.env.NEXT_PUBLIC_SANITY_API_TOKEN
})

const client = (useToken) => (useToken ? tokenClient : standartClient)

export const urlFor = (source) => {
  return builder.image(source)
}

export const RichText = BlockContent

export default client
