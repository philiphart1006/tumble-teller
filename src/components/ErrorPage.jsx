import { useRouteError } from "react-router-dom";
import Otto from "../assets/otto.jpg"

export default function ErrorPage() {
  const error = useRouteError()
  console.log('ERROR: ',error)

  return (error.message === "Failed to fetch"
  ?
  (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Failed to fetch data - please go back and enter just the first half of your postcode</p>
      <img className='error-image' src={Otto}></img>
    </div>
  )
  :
  (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  )
  )
}