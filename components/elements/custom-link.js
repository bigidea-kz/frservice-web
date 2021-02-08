import Link from 'next/link'

const CustomLink = ({ data, children }) => {
  const isPageLink = data._type === 'page_link' ? true : false
  const isAnchorLink = data._type === 'anchor_link' ? true : false

  if (isPageLink) {
    return (
      <Link href="/[[...slug]]" as={`/${data.slug.current}`}>
        <a className="nav-link">{children}</a>
      </Link>
    )
  }

  if (isAnchorLink) {
    return (
      <Link href="/[[...slug]]" as={`/#${data.anchor}`}>
        <a className="nav-link">{children}</a>
      </Link>
    )
  }

  return (
    <a
      className="nav-link"
      href={data.href}
      // Change target and rel attributes is newTab is turned on
      target={data.blank ? "_blank" : "_self"}
      rel={data.blank ? "noopener noreferrer" : ""}
    >
      {children}
    </a>
  )
}

export default CustomLink