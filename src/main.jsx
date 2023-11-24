// ! Imports
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
import National from './components/National.jsx'
import Postcode from './components/Postcode'
import Combo from './components/Combo'
import Forecast from './components/Forecast.jsx'
import Comboforecast from './components/Comboforecast.jsx'

// Loaders
import { getAllRegions, getPostcode, getCombo, getForecast, getWeatherForecast} from './utils/loaders/carbon'

// ! Router & paths
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
        action: async ({ request }) => getPostcode(request)
      },
      {
        path: '/forecast',
        element: <Forecast />,
        loader: getForecast
      },
      {
        path: '/combo',
        element: <Combo />,
        action: async ({ request }) => getCombo(request)
      },
      {
        path: '/comboforecast',
        element: <Comboforecast />,
        loader: getForecast,
        action: async ({ request }) => getWeatherForecast(request)
      },
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
