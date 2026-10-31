export type Categoria = 'receitas' | 'avaliacoes' | 'noticias'

export type Tag = 'rapidas' | 'vegetarianas' | 'doces' | 'boteco' | 'carnes' | 'massas'

export interface Post {
  slug: string
  categoria: Categoria
  titulo: string
  resumo: string
  autor: string
  data: string
  tempoLeitura: string
  imagem: string
  tags: Tag[]
  corpo: string[]
  ingredientes?: string[]
  passos?: string[]
  nota?: number
}
