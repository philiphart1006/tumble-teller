// React package imports
import { useState } from 'react'
import { Link } from 'react-router-dom'

// Styling imports
import Modal from 'react-bootstrap/Modal'

// Images
import logoSq from "../assets/ttlogosq.png"
import logoWWF from "../assets/wwf.jpeg"
import logoOx from "../assets/oxford.png"


export default function Nav(){

  // State to open/close hamburger menu
  const [show, setShow] = useState(false)

  return (
    <>
    <header>
      {/* Icon linking back to homepage */}
      <div className='logos'>
        <Link to="/" ><img className='logo-icon' src={logoSq} alt='tt logo' /></Link>
        <a href="https://wwf.org.uk" ><img className='logo-icon' src={logoWWF} alt='wwf logo' /></a>
        <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" ><img className='logo-icon' src={logoOx} alt='wwf logo' /></a>
      </div>
      {/* Hamburger nav menu */}
      <button className='hamburger' onClick={() => setShow(true)}>
        <span></span>
        <span></span>
        <span></span>
      </button>
    </header>

    <Modal show={show} fullscreen={true} onHide={() => setShow(false)}>
      <Modal.Header closeButton>
        <nav onClick={() => setShow(false)}>
          <Link to="/national"><i className='bold display-4'>Carbon Intensity by region</i></Link>
          <Link to="/postcode"><i className='bold display-4'>Carbon Intensity for your location</i></Link>
          <Link to="/combo"><i className='bold display-4'>Should you use your Tumble Dryer today?</i></Link>
        </nav>
      </Modal.Header>
    </Modal>
    </>
  )
}