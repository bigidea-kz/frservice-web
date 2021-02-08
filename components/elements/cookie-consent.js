import { useEffect, useState } from 'react'
import Link from 'next/link'
import { RichText } from '@/lib/sanity'
import Cookies from "js-cookie"

const serializers = {
  marks: {
    link: ({mark, children}) => {
      const { blank, href, _type } = mark
      return blank ?
        <a className="rich-text-link" href={href} target="_blank" rel="noopener">{children}</a>
        : <a className="rich-text-link" href={href}>{children}</a>
    },
    internalLink: ({ mark, children }) => {
      const {slug = {}} = mark
      return <Link href="/[[...slug]]" as={slug.current}><a>{children}</a></Link>
    }
  }
}

const CookieConsent = ({ data, handleClose }) => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (getCookieValue() === undefined) {
      setVisible(true)
    }
  }, [])

  function getCookieValue() {
    return getCookieConsentValue('cookie-consent')
  }

  function handleAccept() {
    Cookies.set('cookie-consent', true, { expires: 150 })
    setVisible(false)
  }

  if (!visible) return null 
  
  return (
    <div className={`cookie-consent bg-${data.type}`}>
      <div className="container">
        <div className="base-area">
          <h6 className="heading">{data.heading}</h6>
          <RichText
            className="text"
            blocks={data.text}
            renderContainerOnSingleChild={true}
            serializers={serializers}
          />
          <button
            className={`btn btn-${data.button.type}`}
            onClick={handleAccept}
          >{data.button.text}</button>
        </div>
      </div>
    </div>
  )
}

function getCookieConsentValue(cookieName) {
  let cookieValue = Cookies.get(cookieName)

  if (cookieValue === undefined) {
    cookieValue = Cookies.get(getLagacyCookieName(cookieName))
  }

  return cookieValue
}

function getLagacyCookieName(name) {
  return `${name}-legacy`
}



export default CookieConsent