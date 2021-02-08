import { useState, useEffect } from 'react'
import Link from 'next/link'
import { urlFor } from '@/lib/sanity'
import CustomLink from './custom-link'

const Navbar = ({ data }) => {
  const [isShowMobileNav, setShowMobileNav] = useState(false)

  useEffect(() => {

    function onResizeHandler() {
      setShowMobileNav(false)
    }

    window.addEventListener("resize", onResizeHandler, false)

    return () => window.removeEventListener("resize", onResizeHandler, false)
  }, [])

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-secondary">
      <div className="container">

        <Link href="[[...slug]]" as="/">
          <a className="navbar-brand">
            <img src={urlFor(data.logo)} alt=""/>
          </a>
        </Link>

        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          aria-controls="navbarSupportedContent" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
          onClick={() => setShowMobileNav(!isShowMobileNav)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`collapse navbar-collapse ${isShowMobileNav ? 'show' : ''}`}>
          {data.links &&
          <ul className="navbar-nav">
            {data.links.map((link) => (
              <li className="nav-item" key={link._key}>
                <CustomLink data={link}>
                  {link.text}
                </CustomLink>    
              </li>
            ))}
          </ul>
          }

          {data.contact_links &&
          <ul className="navbar-nav nav-contacts">
            {data.contact_links.map((link) => {
              if (link._type === 'contact_location_field') {
                return (
                  <li className="nav-item" key={link._key}>
                    <a className="nav-link">{link.text}</a>
                  </li>
                )
              }

              return (
                <li className="nav-item phone-item" key={link._key}>
                  <a href={`tel:${link.phone}`} className="nav-link">{link.text}</a>
                </li>
              )
            })}
          </ul>
          }
        </div>

      </div>
    </nav>
  )
}

export default Navbar