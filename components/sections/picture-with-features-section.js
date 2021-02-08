import { urlFor } from '@/lib/sanity'

const PictureWithFeaturesSection = ({ data }) => {
  
  const pictureAreaStyle = {
    backgroundImage: 'url(/img/circles.svg)'
  }

  return (
    <section className="picture-with-features" id={data.anchor ? data.anchor : ''}>
      <div className="container">
        <div className="base-area">
          <p className="label">{data.label}</p>
          <h1 className="heading">
            <span></span>
            {data.heading}
          </h1>
        </div>
        <div className="picture-area" style={pictureAreaStyle}>
          <img src={urlFor(data.picture)} alt=""/>
        </div>
        <div className="features-area">
          {data.features && 
            <div className="features">
              {data.features.map((feature) => (
                <Feature data={feature} key={feature._key}/>
              ))}
            </div>
          }
        </div>
      </div>
    </section>
  )
}

const Feature = ({ data }) => {
  return (
    <div className="feature">
      <span className="material-icons">
        {data.icon}
      </span>
      <h4 className="heading">{data.heading}</h4>
      <p className="text">{data.text}</p>
    </div>
  )
}

export default PictureWithFeaturesSection