import { wilsonFletcher } from '@data/organizations'
import site from '@data/site'

export interface Props {
  name?: string
  description?: string
  url?: string
  image?: {
    url: string
  }
  mainEntityOfPage: object
}

export default function SchemaWebPage({
  name = site.name,
  description = site.description,
  url = '/',
  image = site.image,
  mainEntityOfPage
}) {
  const ldData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${site.url}${url}`,
        name,
        description,
        url: `${site.url}${url}`,
        image: {
          '@type': 'ImageObject',
          url: image.url
        },
        mainEntityOfPage,
        copyrightHolder: {
          '@type': 'Organization',
          ...wilsonFletcher
        },
        copyrightYear: 2022
      }
    ]
  }
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ldData, null, 2) }}
      />
    </>
  )
}
