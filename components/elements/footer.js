import Link from 'next/link'
import CustomLink from './custom-link'

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

          <div className="navbar-collapse">
            {data.links &&
              <ul className="navbar-nav footer-nav">
                {data.links.map((link) => (
                  <li className="nav-item" key={link._key}>
                    <CustomLink data={link}>
                      {link.text}
                    </CustomLink>
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

export default Footer
