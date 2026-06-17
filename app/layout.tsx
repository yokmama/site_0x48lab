import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'

const siteUrl = 'https://hacklab.jp'
const siteName = '株式会社ハックラボ'
const siteTitle = '株式会社ハックラボ | AI活用型の業務システム開発・受託開発'
const siteDescription =
  '株式会社ハックラボ（東京・渋谷）は、2010年創業の開発経験と生成AI活用で、業務管理・予約・自動化システムを短いサイクルで段階導入します。'
const ogImage = '/og-image.jpg'
const heroVideoUrl = `${siteUrl}/assets/hero-engineers-discussion.mp4`

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: 'HackLab',
  title: siteTitle,
  description: siteDescription,
  keywords: [
    '受託開発',
    'AI活用',
    '生成AI',
    'システム開発',
    'Webシステム',
    '業務システム',
    'モバイルアプリ',
    'Flutter',
    'プログラミング教育',
    '渋谷',
    'ハックラボ',
    'HackLab',
  ],
  authors: [{ name: siteName, url: siteUrl }],
  creator: siteName,
  publisher: siteName,
  category: 'technology',
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    url: '/',
    siteName,
    title: siteTitle,
    description: siteDescription,
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: '株式会社ハックラボ - AI活用型受託開発・Webシステム・モバイルアプリ開発',
        type: 'image/jpeg',
      },
    ],
    videos: [
      {
        url: heroVideoUrl,
        width: 1280,
        height: 720,
        type: 'video/mp4',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteTitle,
    description: siteDescription,
    images: [
      {
        url: ogImage,
        alt: '株式会社ハックラボ - AI活用型受託開発・Webシステム・モバイルアプリ開発',
      },
    ],
  },
  icons: {
    icon: '/favicon.svg',
  },
  formatDetection: {
    telephone: false,
  },
}

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: siteName,
  alternateName: 'HackLab Inc.',
  url: `${siteUrl}/`,
  logo: `${siteUrl}/favicon.svg`,
  image: `${siteUrl}${ogImage}`,
  description: siteDescription,
  foundingDate: '2010',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '渋谷2丁目19-19 和光宮益坂ビル5F',
    addressLocality: '渋谷区',
    addressRegion: '東京都',
    postalCode: '150-0002',
    addressCountry: 'JP',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    url: `${siteUrl}/contact`,
  },
  sameAs: [],
}

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: siteName,
  alternateName: 'HackLab Inc.',
  url: `${siteUrl}/`,
  description: siteDescription,
  inLanguage: 'ja',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja" data-scroll-behavior="smooth">
      <body>
        {children}
        <Script
          id="organization-json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <Script
          id="website-json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </body>
    </html>
  )
}
