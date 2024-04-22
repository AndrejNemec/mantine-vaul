export type DrawerDirection = 'top' | 'bottom' | 'left' | 'right'
export interface SnapPoint {
  fraction: number
  height: number
}

export type VaulClasses = {
  content: string
  overlay: string
  handler: string
  header: string
  title: string
  body: string
  footer: string
}