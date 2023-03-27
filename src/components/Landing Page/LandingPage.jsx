import React from 'react'
import Header from './Header'
import Hero from './Hero'
import Features from './Features'
import About from './About'
import Footer from './Footer'
import GetStarted from './GetStarted'
import { Element } from 'react-scroll'

const LandingPage = () => {
  return (
    <>
      <Header />
      <Element name='hero'>
        <Hero />
      </Element>
      <Element name='features'>
        <Features />
      </Element>
      <Element name='about'>
        <About />
      </Element>
      <GetStarted />
      <Footer />
    </>
  )
}

export default LandingPage
