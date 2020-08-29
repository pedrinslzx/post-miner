import puppeteer from 'puppeteer'


interface ImageElement extends Element {
  src: string
  alt: string
}
interface ImageInterface {
  src: string
  alt: string
}

export const Instagram = async (profile: string, count?: string | number) => {
  if (!profile) return ({ err: 'No profile' })
  const b = await puppeteer.launch()
  const page = await b.newPage()
  await page.goto(`https://instagram.com/${profile}`)
  var posts = await page.evaluate(() => {
    const imgReturn: ImageInterface[] = []
    document.querySelectorAll<ImageElement>('article img').forEach((img) => imgReturn.push({
      src: img.src,
      alt: img.alt
    }))
    return imgReturn
  })
  var userInfo = await page.evaluate((profile) => {
    const returnedValue: number[] = []
    document.querySelectorAll(`span.g47SY`).forEach((e, i) => {
      returnedValue.push(Number(e.innerHTML))
    })
    return returnedValue
  }, { profile })
  await b.close()
  var posts = posts.slice(0, Number(count) || posts.length)
  return {
    info: {
      requestDate: new Date().toISOString(),
      profile,
      url: `https://instagram.com/${profile}`,
      posts: posts.length,
      totalPosts: userInfo[0],
      followers: userInfo[1],
      following: userInfo[2]
    },
    posts: posts
  }
}
