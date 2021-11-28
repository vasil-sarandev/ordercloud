export interface Page {
  next?: string
  limit: number
  count: boolean
}
export interface Paging {
  prev?: string
  next?: string
  limit?: number
  count?: number
}
export const firstPage = (): Page => ({
  limit: 50,
  count: false,
  next: undefined
})

export const initialStateQuery = ({ limit = 10, count = true }): Page => ({
  next: undefined,
  limit,
  count
})
