export interface ArticleDate {
  year: string
  month: string
  day: string
}

export interface ChronologicalArticleGroup {
  date: ArticleDate
  articles: Array<any>
}