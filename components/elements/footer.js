import Link from 'next/link'
const Footer = ({ data }) => {
  return (
    <footer>
      <nav className="navbar navbar-expand-md navbar-dark bg-secondary">
        <div className="container">
          <Link href="[[...slug]]" as="/">
            <a className="navbar-brand">
              {data.brand_name}
            </a>
          </Link>

          <button 
            className="navbar-toggler" 
            type="button" 
            data-bs-toggle="collapse" 
            aria-controls="navbarSupportedContent" 
            aria-expanded="false" 
            aria-label="Toggle navigation"
            // onClick={() => setShowMobileNav(!isShowMobileNav)}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse">
            {data.links &&
              <ul className="navbar-nav footer-nav">
                {data.links.map((link) => (
                  <li className="nav-item" key={link._key}>
                    <CustomLink data={link}/>
                  </li>
                ))}
              </ul>            
            }
          </div>
        </div>
      </nav>
    </footer>
  )
}

const CustomLink = ({ data }) => {
  const isPageLink = data._type === 'page_link' ? true : false

  if (isPageLink) {
    return (
      <Link href="/[[...slug]]" as={`/${data.slug.current}`}>
        <a className="nav-link">{data.text}</a>
      </Link>
    )
  }
}

export default Footer