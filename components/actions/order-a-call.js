import { useContext, useState } from 'react'
import { useRouter } from 'next/router'
import { useForm } from "react-hook-form"
import { AppContext } from '@/context/app-context'
import client from '@/lib/sanity'

const OrderACall = ({ data }) => {
  const router = useRouter()
  const { register, handleSubmit, watch, errors } = useForm()
  const [visibleLoader, setVisibleLoader] = useState(false)

  const { orderACall } = useContext(AppContext)

  if (!orderACall.isShowOrderACall) return null

  const handleGoToLink = () => {
    orderACall.setShowOrderACall(false)
    router.push('/datenschutzerklaerung')
  }

  const onSubmit = async (data) => {
    console.log('TEST')
    try {
      setVisibleLoader(true)

      await client(false).config({
        token: process.env.SANITY_API_TOKEN
      }).create({
        _type: 'message',
        full_name: data.full_name,
        phone: data.phone,
        subject: 'order a call'
      })

      setVisibleLoader(false)
      orderACall.setShowOrderACall(false)

    } catch(error) {
      console.error('error: ', error);
    }
  }

  return (
    <div className={`modal order-a-call fade ${orderACall.isShowOrderACall ? "show" : ""}`}>
      <div className="modal-dialog">

        {visibleLoader &&
          <div className="modal-loader">
            <img src="/img/loader.svg" alt=""/>
          </div>
        }

        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{data.title}</h5>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={() => orderACall.setShowOrderACall(false)}
            ></button>
          </div>

          <div className="modal-body">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-3">
                <label htmlFor="full_name" className="form-label">{data.full_name_title}</label>
                <input 
                  type="text" 
                  className="form-control" 
                  id="full_name" 
                  name="full_name"
                  ref={register}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="phone" className="form-label">{data.phone_title}</label>
                <input 
                  type="text" 
                  className="form-control" 
                  id="phone" 
                  name="phone"
                  ref={register}
                  required
                />
              </div>

              <div className="mb-3">
                <p className="privacy">Wenn Sie Ihre Kontakte einreichen, stimmen Sie zu <strong onClick={handleGoToLink}>individuelle Datenschutzeinstellungen</strong></p>
              </div>

              <div className="actions">
                <button
                  type="button"
                  className={`btn btn-${data.cancel_button.type}`}
                  onClick={() => orderACall.setShowOrderACall(false)}
                >{data.cancel_button.text}</button>

                <button type="submit" className={`btn btn-${data.confirm_button.type}`}>{data.confirm_button.text}</button>
              </div>
            </form>
          </div>
        </div>

      </div>
    </div>
  )
}

export default OrderACall
