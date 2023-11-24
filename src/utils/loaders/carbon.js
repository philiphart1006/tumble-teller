// ! Imports
import { formToObj } from '../helpers/common'

// ! Functions

// Gets current carbon intensity data for all UK regions
export async function getAllRegions(){
  const res = await fetch('https://api.carbonintensity.org.uk/regional')
  return res.json()
}

// Gets current carbon intensity data for one region by postcode
export async function getPostcode(request){
  const postcode = await formToObj(request)
  const res = await fetch(`https://api.carbonintensity.org.uk/regional/postcode/${postcode.postcode}`)
  console.log('Carbon intensity result: ',res)
  return res.json()
}

// Gets carbon intensity data for current & upcoming 48hours
export async function getForecast(){
  const now = new Date().toISOString()
  const nowArray = now.split('')
  // This ensures the first item in the data array is always for o'clock instead of half past
  nowArray[14]=0
  nowArray[15]=0
  const nowHour = nowArray.join('')
  console.log(nowHour)
  const res = await fetch(`https://api.carbonintensity.org.uk/intensity/${nowHour}/fw48h`)
  console.log('Carbon intensity result: ',res)
  return res.json()
}

// Gets carbon intensity for one region by postcode; called by the combo function alongside weather below
export async function getPostcodeCombo(postcode){
  const res = await fetch(`https://api.carbonintensity.org.uk/regional/postcode/${postcode.postcode}`)
  console.log('Carbon intensity result: ',res)
  return res.json()
}

// Gets local weather for one region by postcode
export async function getWeather(postcode){
  console.log('getWeather function executing')
  console.log(import.meta.env.VITE_SECRET_KEY)
  const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${postcode.postcode},GB&appid=${import.meta.env.VITE_SECRET_KEY}`)
  console.log('getWeather res: ',res)
  return res.json()
}

// Calls both current carbon intensity and local weather for one region together
export async function getCombo(request){
  const formData = await request.formData()
  const postcode = Object.fromEntries(formData.entries())
  console.log(postcode)
  return {
    "carbonResults": await getPostcodeCombo(postcode),
    "weatherResults": await getWeather(postcode)
  }
}

// Gets 3-hourly weather forecast for one region based on postcode
export async function getWeatherForecast(request){
  const formData = await request.formData()
  const postcode = Object.fromEntries(formData.entries())
  console.log('getWeather function executing')
  console.log(import.meta.env.VITE_SECRET_KEY)
  const res = await fetch(`https://api.openweathermap.org/data/2.5/forecast?zip=${postcode.postcode},GB&appid=${import.meta.env.VITE_SECRET_KEY}`)
  console.log('getWeather res: ',res)
  return res.json()
}