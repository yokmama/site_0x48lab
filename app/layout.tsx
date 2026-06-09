import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'

const siteUrl = 'https://hacklab.jp'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: '株式会社ハックラボ | HackLab Inc. — AI活用型受託開発・モバイルアプリ・プログラミング教育',
  description:
    '20年の開発実績×生成AIで、コスト1/5〜1/10・納期最大1/10を実現。受託開発・AI活用・モバイルアプリ・プログラミング教育の株式会社ハックラボ（東京・渋谷）。',
  keywords: ['受託開発', 'AI活用', 'システム開発', 'モバイルアプリ', 'Flutter', 'プログラミング教育', '渋谷', 'ハックラボ', 'HackLab'],
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
    siteName: '株式会社ハックラボ',
    title: '株式会社ハックラボ | AI活用型受託開発・モバイルアプリ開発',
    description:
      '20年の開発実績×生成AI。コスト1/5〜1/10・納期最大1/10の受託開発。業務システム・モバイルアプリ・プログラミング教育。',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '株式会社ハックラボ | AI活用型受託開発',
    description: '20年の開発実績×生成AI。コスト1/5〜1/10の受託開発。',
    images: ['/og-image.png'],
  },
  icons: {
    icon: '/favicon.svg',
  },
}

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: '株式会社ハックラボ',
  alternateName: 'HackLab Inc.',
  url: `${siteUrl}/`,
  logo: `${siteUrl}/favicon.svg`,
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
  name: '株式会社ハックラボ',
  url: `${siteUrl}/`,
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
