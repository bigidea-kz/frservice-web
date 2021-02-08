import Navbar from './elements/navbar'
import Footer from './elements/footer'
import OrderACall from './actions/order-a-call'
import CookieConsent from './elements/cookie-consent'

const Layout = ({ children, global }) => {

  return (
    <>
      <Navbar data={global.navbar}/>
      <main>
        {children}
      </main>
      {global.actions && <Actions actions={global.actions} />}
      {global.cookie_consent_notification && <CookieConsent data={global.cookie_consent_notification}/>}
      <Footer data={global.footer}/>
    </>
  )
}

const actionComponents = {
  "order_a_call": OrderACall
}

const Action = ({ action }) => {
  const ActionComponent = actionComponents[action._type]
  if (!ActionComponent) return null
  return <ActionComponent data={action} />
}

const Actions = ({ actions }) => {
  return (
    <>
      {actions.map((action) => (
        <Action action={action} key={action._key}/>
      ))}
    </>
  )
}

export default Layout