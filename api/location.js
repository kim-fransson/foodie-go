export async function GET(request) {
  const url = new URL(request.url)

  const { searchParams } = url
  const latitude = searchParams.get('latitude')
  const longitude = searchParams.get('longitude')

  if (process.env.DISABLE_GEO_LOCATION === 'TRUE') {
    return new Response('Location api disabled')
  }

  if (!latitude || !longitude) {
    return new Response('Latitude and longitude are required.', { status: 400 })
  }

  try {
    const res = await fetch(
      `https://api.opencagedata.com/geocode/v1/json?q=${latitude}%2C${longitude}&key=${process.env.OPEN_CAGE_DATA_API_KEY}`
    )
    const data = await res.json()
    const formattedAddress = data?.results?.[0]?.formatted?.split(',') || []

    const [road, address, country] = formattedAddress

    return new Response(
      JSON.stringify({
        road: road?.trim() === 'unnamed road' ? undefined : road?.trim(),
        address: address?.trim(),
        country: country?.trim()
      })
    )
  } catch (err) {
    return new Response('Internal error')
  }
}
