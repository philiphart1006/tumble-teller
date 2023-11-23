import { formToObj } from '../helpers/common'
import { secretKey } from '../../.env'

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

// export async function getCombo(request){
//   const postcode = await formToObj(request)
//   const postcodeRes = await fetch(`https://api.carbonintensity.org.uk/regional/postcode/${postcode.postcode}`)
//   console.log('Postcode Res: ',postcodeRes)
//   const postcodeResJSON = postcodeRes.json()
//   const weatherRes = await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${postcode.postcode},GB&appid=3f673d4b77f551fe55cc4d54599dd4c7`)
//   const weatherResJSON = weatherRes.json()
//   return await {
//     carbonResults: postcodeResJSON, 
//     weatherResults: weatherResJSON
//   }
// }

export async function getPostcodeCombo(postcode){
  const res = await fetch(`https://api.carbonintensity.org.uk/regional/postcode/${postcode.postcode}`)
  console.log('Carbon intensity result: ',res)
  return res.json()
}

export async function getWeather(postcode){
  const res = await fetch({secretKey})
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