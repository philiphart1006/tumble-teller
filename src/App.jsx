// ! Imports
import { Outlet, useNavigation } from 'react-router-dom'

// Component imports
import Nav from './components/Nav'
import Footer from './components/Footer'

// Styling imports
import Spinner from 'react-bootstrap/Spinner'

function App() {
  
  // Constants
const navigation = useNavigation()

  return (
    <>
      <Nav />
      <main>
        {
          navigation.state === 'idle'
          ?
          <Outlet />
          :
          <Spinner animation='border' />
        }
      </main>
      <Footer />
    </>
  )
}

export default App
