import { urlFor } from '@/lib/sanity'

const AddressWithPictureSection = ({ data }) => {

  const pictureAreaStyle = {
    backgroundImage: 'url(/img/circles.svg)'
  }

  return (
    <section className="address-with-picture-section">
      <div className="container">
        <div className="base-area">
          <div className="base-area">
            <p className="label">{data.label}</p>
            <h1 className="heading">
              <span></span>
              {data.heading}
            </h1>
          </div>
        </div>
        <div className="picture-area" style={pictureAreaStyle}>
          <img src={urlFor(data.picture)} alt=""/>
        </div>
        <div className="address-area">
          <div className="brand-wrap">
            <p className="address-tagline">{data.address_tagline}</p>
            <h1 className="address-heading">{data.address_heading}</h1>
          </div>
          <div className="address-wrap">
            <p className="address-location">
              <span className="material-icons">
                location_on
              </span>
              {data.address_location}
            </p>
            <p className="address-phone">
              <span className="material-icons">
                phone
              </span>
              {data.address_phone}
            </p>
            <p className="address-email">
              <span className="material-icons">
                mail
              </span>
              {data.address_email}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AddressWithPictureSection