import { useContext } from 'react'
import { urlFor } from '@/lib/sanity'
import { AppContext } from '@/context/app-context'

const HeroSection = ({ data }) => {

  const { orderACall } = useContext(AppContext)

  const sectionStyle = {
    backgroundImage: `url(${urlFor(data.background_image)})`
  }

  const hanldeAction = (actionType) => {
    if (actionType === 'order_a_call') {
      orderACall.setShowOrderACall(true)
    }
  }

  return (
    <section className="hero" style={sectionStyle}>
      <div className="container">
        <p className="tagline">{data.tagline}</p>
        <h1 className="heading">{data.heading}</h1>
        {data.ctas &&
          <div className="ctas">
            {
              data.ctas.map((cta) => (
                <button 
                 className={`btn btn-${cta.type}`}
                 key={cta._key}
                 onClick={() => hanldeAction(cta.action_type)}
                >{cta.text}</button>
              ))
            }
          </div>
        }
      </div>
    </section>
  )
}

export default HeroSection