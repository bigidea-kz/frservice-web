import { useRouter } from 'next/router'
import HeroSection from './sections/hero-section'
import TextWithPictureSection from './sections/text-with-picture-section'
import PictureWithFeaturesSection from './sections/picture-with-features-section'
import AddressWithPictureSection from './sections/address-with-picture-section'
import TextSection from './sections/text-section'

const sectionComponents = {
  "hero_section": HeroSection,
  "text_with_picture_section": TextWithPictureSection,
  "picture_with_features_section": PictureWithFeaturesSection,
  "address_with_picture_section": AddressWithPictureSection,
  "text_section": TextSection
}

const Section = ({ section }) => {
  const SectionComponent = sectionComponents[section._type]

  if (!SectionComponent) return null
  
  return (
    <SectionComponent data={section}/>
  )
}

const PreviewModeBanner = () => {
  const router = useRouter()
  
  return (
    <div className="preview-mode-banner">
      <div className="container">
        <p className="title">Preview mode is On</p> 
        <a className="btn btn-primary" href={`/api/exit-preview?redirect=${router.asPath}`}>
          Turn off
        </a>
      </div>
    </div>
  )
}

const ContentSections = ({ sections, preview }) => {
  return (
    <>
      {preview && <PreviewModeBanner />}
      {sections &&
        sections.map((section) => (
          <Section section={section} key={section._key}/>
        ))
      }
    </>
  )
}

export default ContentSections