export async function getAllRegions(){
  const res = await fetch('https://api.carbonintensity.org.uk/regional')
  return res.json()
}

export async function getPostcode(postcode){
  const res = await fetch(`https://api.carbonintensity.org.uk/regional/postcode/PO19`)
  return res.json()
}