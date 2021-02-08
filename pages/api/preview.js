import client from '@/lib/sanity'

export default async function preview(req, res) {
  if (
    req.query.secret !== process.env.SANITY_PREVIEW_SECRET ||
    !req.query.slug
  ) {
    return res.status(401).json({ message: 'Invalid token' })
  }

  let slug = req.query.slug
  
  const pageData = await client(true).fetch(`
    *[_type == "page" && slug.current == $slug][0]
  `, {slug})

  if (!pageData) {
    return res.status(401).json({ message: 'Invalid slug' })
  }

  if (slug === '/') slug = ``

  res.setPreviewData({})
  res.writeHead(307, { Location: `/${slug}` })
  res.end()
}