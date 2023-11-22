// Packages
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

// Styles
import 'bootstrap/dist/css/bootstrap.min.css'
import './styles/main.scss'

// Page components
import App from './App.jsx'
import Home from './components/Home'
import ErrorPage from './components/ErrorPage'
import National from './components/National'
import Postcode from './components/Postcode'

// Loaders
import { getAllRegions, getPostcode } from './utils/loaders/carbon'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: '/national',
        element: <National />,
        loader: getAllRegions
      },
      {
        path: '/postcode',
        element: <Postcode />,
        loader: async ({ request }) => getPostcode(request)
      },
    ]
  }
])


ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
