export type RiskLevel = 'Critical' | 'High' | 'Medium' | 'Low' | 'Info' | string

export interface DorkEntry {
  id: string
  title: string
  category: string
  categoryKey: string
  description: string
  query: string
  riskLevel: RiskLevel
}

export interface DorkCollectionDataset {
  source: string
  total: number
  dorks: DorkEntry[]
}
