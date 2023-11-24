// Returns the form input as an object that can be used in API search URLs
export async function formToObj(request){
  const formData = await request.formData()
  return Object.fromEntries(formData.entries())
}