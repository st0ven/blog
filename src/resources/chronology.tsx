export const monthsMappedByIndex: any = {
  0: "january",
  1: "febuary",
  2: "march",
  3: "april",
  4: "may",
  5: "june",
  6: "july",
  7: "august",
  8: "september",
  9: "october",
  10: "november",
  11: "december",
}

export interface ArticleDate {
  year: string
  month: string
  day: string
}

export interface ChronologicalArticleGroup {
  year: string, 
  month: string,
  articles: Array<any>
}

/* 
  Given a date string in format of YYYY-MM-DD, converts to an object of
  format ArticleDate, and returns the new object.
*/
export function convertPostDateStringToObject(dateString: string): ArticleDate {
  const dateArray: Array<string> = dateString.split("-")
  const dateObj: ArticleDate = {
    year: dateArray[0],
    month: dateArray[1],
    day: dateArray[2],
  }
  return dateObj
}

/*
  Given an array of ChronologicalArticleGroup, and an ArticleDate,
  recursively cycle through the group and return the group that matches the
  supplied date by both year and month. If none is found, return void/undefined
*/
export function findArticleDateGroup(
  sortedGroup: Array<ChronologicalArticleGroup>,
  articleDate: ArticleDate
): ChronologicalArticleGroup | undefined {
  return (function findGroup(
    index: number
  ): ChronologicalArticleGroup | undefined {
    if (sortedGroup[index]) {
      const { month, year }: ChronologicalArticleGroup = sortedGroup[index]
      return year === articleDate.year && month === articleDate.month
        ? sortedGroup[index]
        : findGroup(++index)
    } else return undefined
  })(0)
}

/*
  Given a list of articles fetched from Prismic back-end, structure the content
  to be ordered and grouped chronologically, first by year and date, and then containing
  a list of articles under that group (also ordered chonologically).
  NOTE: the order of the results is presuemd to be descending order sorted by API response
*/
export function organizePostChronologically(
  articles: Array<any>
): Array<ChronologicalArticleGroup> {
  const orderedArticles: Array<ChronologicalArticleGroup> = []
  articles.map(({ node }: any) => {
    const { authored_date } = node
    const articleDate: ArticleDate = convertPostDateStringToObject(
      authored_date
    )
    const existingArticleGroup:
      | ChronologicalArticleGroup
      | undefined = findArticleDateGroup(orderedArticles, articleDate)

    if (existingArticleGroup) {
      existingArticleGroup.articles.unshift(node)
    } else {
      orderedArticles.unshift({
        month: articleDate.month,
        year: articleDate.year,
        articles: [node],
      })
    }
  })
  return orderedArticles
}