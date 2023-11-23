import { formToObj } from '../helpers/common'


export async function getAllRegions(){
  const res = await fetch('https://api.carbonintensity.org.uk/regional')
  return res.json()
}

export async function getPostcode(request){
  const postcode = await formToObj(request)
  const res = await fetch(`https://api.carbonintensity.org.uk/regional/postcode/${postcode.postcode}`)
  console.log('Carbon intensity result: ',res)
  return res.json()
}


export async function getPostcodeCombo(postcode){
  const res = await fetch(`https://api.carbonintensity.org.uk/regional/postcode/${postcode.postcode}`)
  console.log('Carbon intensity result: ',res)
  return res.json()
}

export async function getWeather(postcode){
  console.log('getWeather function executing')
  console.log(import.meta.env.VITE_SECRET_KEY)
  const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${postcode.postcode},GB&appid=${import.meta.env.VITE_SECRET_KEY}`)
  console.log('getWeather res: ',res)
  return res.json()
}

export async function getCombo(request){
  const formData = await request.formData()
  const postcode = Object.fromEntries(formData.entries())
  console.log(postcode)
  return {
    "carbonResults": await getPostcodeCombo(postcode),
    "weatherResults": await getWeather(postcode)
  }
}