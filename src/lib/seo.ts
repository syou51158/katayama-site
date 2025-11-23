import { Metadata } from 'next'

export const siteConfig = {
  name: '片山建設工業株式会社',
  description: '片山建設工業は、解体工事・外構工事・舗装工事を中心に、建設業全般を手がけるプロフェッショナル集団です。お客様のニーズに寄り添い、安心と安全を提供します。',
  url: 'https://katayama-k.jp',
  ogImage: 'https://katayama-k.jp/og-image.jpg',
  links: {
    twitter: 'https://twitter.com/katayama_kogyo',
    github: 'https://github.com/katayama-kogyo',
  },
  address: {
    '@type': 'PostalAddress',
    streetAddress: '東京都世田谷区北沢1-2-3',
    addressLocality: '世田谷区',
    addressRegion: '東京都',
    postalCode: '155-0031',
    addressCountry: 'JP',
  },
  telephone: '0120-XXX-XXX',
  email: 'info@katayama-k.jp',
  businessHours: [
    '月-金 09:00-18:00',
    '土 09:00-17:00',
  ],
  sameAs: [
    'https://twitter.com/katayama_kogyo',
    'https://facebook.com/katayama.kogyo',
    'https://instagram.com/katayama_kogyo',
  ],
}

export const defaultMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} - 解体工事・外構工事・舗装工事のプロ`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    '解体工事',
    '外構工事',
    '舗装工事',
    '建設工事',
    '東京',
    '神奈川',
    '片山建設',
    '建設業',
    '工事請負',
    'リフォーム',
  ],
  authors: [{ name: '片山建設工業株式会社' }],
  creator: '片山建設工業株式会社',
  publisher: '片山建設工業株式会社',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    url: siteConfig.url,
    title: `${siteConfig.name} - 解体工事・外構工事・舗装工事のプロ`,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.name} - 解体工事・外構工事・舗装工事のプロ`,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: '@katayama_kogyo',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
  },
}

export function generateBusinessStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    telephone: siteConfig.telephone,
    email: siteConfig.email,
    address: siteConfig.address,
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '09:00',
        closes: '17:00',
      },
    ],
    priceRange: '¥¥',
    sameAs: siteConfig.sameAs,
    image: siteConfig.ogImage,
    logo: 'https://katayama-k.jp/logo.png',
    hasMap: 'https://maps.google.com/?q=東京都世田谷区北沢1-2-3',
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 35.6580,
      longitude: 139.6590,
    },
    servesCuisine: 'Japanese',
    acceptsReservations: 'true',
  }
}

export function generateBreadcrumbStructuredData(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${item.url}`,
    })),
  }
}

export function generateArticleStructuredData(
  title: string,
  description: string,
  datePublished: string,
  dateModified?: string,
  author?: string,
  image?: string
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description: description,
    image: image || siteConfig.ogImage,
    datePublished: datePublished,
    dateModified: dateModified || datePublished,
    author: {
      '@type': 'Organization',
      name: author || siteConfig.name,
      url: siteConfig.url,
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      logo: {
        '@type': 'ImageObject',
        url: 'https://katayama-k.jp/logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': siteConfig.url,
    },
  }
}