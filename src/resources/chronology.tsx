import React from 'react'

export interface ChronologicalArticleGroup {
  year: number
  month: string
  articles: Array<any>
}

/*
  Given an array of ChronologicalArticleGroup, and an ArticleDate,
  recursively cycle through the group and return the group that matches the
  supplied date by both year and month. If none is found, return void/undefined
*/
export function findArticleDateGroup(
  sortedGroup: Array<ChronologicalArticleGroup>,
  _month: string,
  _year: number
): ChronologicalArticleGroup | undefined {
  return (function findGroup(
    index: number
  ): ChronologicalArticleGroup | undefined {
    if (sortedGroup[index]) {
      const { month, year }: ChronologicalArticleGroup = sortedGroup[index]
      return year === _year && month === _month
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
export function useOrganizePostsChronologically(
  articles: Array<any>
) {
  // create a placeholder array to store the ordered groups of articles
  const orderedArticles: Array<ChronologicalArticleGroup> = []
  // loop through articles list provided via API to organize
  articles.map((page: any) => {
    // extract date and year component
    const { authored_date } = page.data
    const month: string = getLocaleMonthFromDateString(authored_date)
    const year: number = getYearFromDateString(authored_date)
    // if there is already an existing article group of this date and year,
    // fetch a reference to that group
    const existingArticleGroup:
      | ChronologicalArticleGroup
      | undefined = findArticleDateGroup(orderedArticles, month, year)
    // if the group was found, add the article to the list of articles in the group.
    // otherwise, add a new group to the top of the group stack
    existingArticleGroup
      ? existingArticleGroup.articles.unshift(page)
      : orderedArticles.unshift({
          month,
          year,
          articles: [page],
        })
  })
  return {
    chronologicalArticleGroups: orderedArticles
  }
}

// returns the local month name based on a date string converted to date object
export function getLocaleMonthFromDateString(mmddyyyy: string): string {
  const date: Date = new Date(mmddyyyy)
  return date.toLocaleString("default", {
    month: "long",
  })
}

// find the numeric year from a date string as a number
export function getYearFromDateString(mmddyyyy: string): number {
  const date: Date = new Date(mmddyyyy)
  return date.getFullYear()
}

// find the numeric month from a date string returned as a number
export function getMonthFromDateString(mmddyyyy: string): number {
  const date: Date = new Date(mmddyyyy)
  return date.getMonth()
}

// find the day from a date string returned as a number
export function getDayFromDateString(mmddyyyy: string): number {
  const date: Date = new Date(mmddyyyy)
  return date.getDate()
}

// composes a string which will read as [locale month name] [day], [year]
// provides a more human readable form of a mm-dd-yyyy string
export function getFormalDateFromString(mmddyyyy: string): string {
  return `${getLocaleMonthFromDateString(mmddyyyy)} ${getDayFromDateString(
    mmddyyyy
  )}, ${getYearFromDateString(mmddyyyy)}`
}
