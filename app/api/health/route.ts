type HealthResponse = {
  ok: true
  service: 'site_0x48lab'
  timestamp: string
}

export function GET() {
  const body: HealthResponse = {
    ok: true,
    service: 'site_0x48lab',
    timestamp: new Date().toISOString(),
  }

  return Response.json(body)
}
