import { RichText } from '@/lib/sanity'

const TextSection = ({ data }) => {
  return (
    <section className="text">
      <div className="container">
      <RichText
        className="text"
        blocks={data.text}
        renderContainerOnSingleChild={true}
      />
      </div>
    </section>
  )
}

export default TextSection