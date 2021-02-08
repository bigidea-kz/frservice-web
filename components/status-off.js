import { urlFor } from '@/lib/sanity'
const StatusOff = ({ data }) => {
  return (
    <div className="status-off">
      <div className="container">
        <div className="wrap">
          <div className="picture-area">
            <img src={urlFor(data.navbar.logo)} alt=""/>
          </div>
          <div className="base-area">
            <p className="heading">Bauarbeiten</p>
            <p className="text">Wir entschuldigen uns</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StatusOff