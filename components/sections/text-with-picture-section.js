import { urlFor, RichText } from '@/lib/sanity'

const TextWithPictureSection = ({ data }) => {

  const pictureAreaStyle = {
    backgroundImage: 'url(/img/squares.svg)'
  }

  return (
    <section className="text-with-picture-section" id={data.anchor}>
      <div className="container">
        <div className="base-area">
          <p className="label">{data.label}</p>
          <h1 className="heading">
            <span></span>
            {data.heading}
          </h1>
          <RichText
            className="text"
            blocks={data.text}
            renderContainerOnSingleChild={true}
          />
        </div>
        <div className="picture-area" style={pictureAreaStyle}>
          <img src={urlFor(data.picture)} alt=""/>
        </div>
      </div>
    </section>
  )
}

export default TextWithPictureSection