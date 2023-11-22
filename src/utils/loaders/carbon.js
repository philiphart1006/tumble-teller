import { formToObj } from '../helpers/common'

export async function getAllRegions(){
  const res = await fetch('https://api.carbonintensity.org.uk/regional')
  return res.json()
}

export async function getPostcode(request){
  const postcode = await formToObj(request)
  const res = await fetch(`https://api.carbonintensity.org.uk/regional/postcode/${postcode.postcode}`)
  console.log(res)
  return res.json()
}