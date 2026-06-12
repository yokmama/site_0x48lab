export type TeamMemberInput = {
  name: string
  role: string
  photo: string
  photoFileId: number | null
  initials: string
  sortOrder: number
}

export type TeamMemberErrors = Partial<Record<keyof TeamMemberInput, string>>

export function normalizeTeamMember(input: unknown): TeamMemberInput | null {
  if (!input || typeof input !== 'object') return null
  const r = input as Record<string, unknown>
  return {
    name: typeof r.name === 'string' ? r.name.trim().slice(0, 100) : '',
    role: typeof r.role === 'string' ? r.role.trim().slice(0, 200) : '',
    photo: typeof r.photo === 'string' ? r.photo.trim().slice(0, 200) : '',
    photoFileId: typeof r.photoFileId === 'number' ? Math.floor(r.photoFileId) : null,
    initials: typeof r.initials === 'string' ? r.initials.trim().slice(0, 10) : '',
    sortOrder: typeof r.sortOrder === 'number' ? Math.floor(r.sortOrder) : 0,
  }
}

export function validateTeamMember(input: TeamMemberInput): TeamMemberErrors {
  const errors: TeamMemberErrors = {}
  if (!input.name.trim()) errors.name = '名前を入力してください'
  if (!input.role.trim()) errors.role = '役職を入力してください'
  return errors
}
