import { prisma } from '@/lib/db'
import { AiDevPageClient } from './AiDevPageClient'
import Script from 'next/script'

export const dynamic = 'force-dynamic'
export const metadata = { title: 'AI活用型受託開発 | HackLab Inc.' }

const siteUrl = 'https://hacklab.jp'

export default async function AiDevPage() {
  const [problems, solutions, comparisonRows, packages, examples, steps, faqItems] = await prisma.$transaction([
    prisma.aiDevProblem.findMany({ orderBy: { sortOrder: 'asc' } }),
    prisma.aiDevSolution.findMany({ orderBy: { sortOrder: 'asc' } }),
    prisma.aiDevComparisonRow.findMany({ orderBy: { sortOrder: 'asc' } }),
    prisma.aiDevServicePackage.findMany({ orderBy: { sortOrder: 'asc' } }),
    prisma.aiDevExampleProject.findMany({ orderBy: { sortOrder: 'asc' } }),
    prisma.aiDevProcessStep.findMany({ orderBy: { sortOrder: 'asc' } }),
    prisma.aiDevFaqItem.findMany({ orderBy: { sortOrder: 'asc' } }),
  ])

  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'AI活用型受託開発',
    serviceType: 'AI-assisted custom software development',
    provider: {
      '@type': 'Organization',
      name: '株式会社ハックラボ',
      url: siteUrl,
    },
    areaServed: {
      '@type': 'Country',
      name: 'Japan',
    },
    description: '2010年創業の開発経験と生成AIを組み合わせ、業務システム開発を短いサイクルで段階導入します。',
    url: `${siteUrl}/services/ai-development`,
  }

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'ホーム', item: `${siteUrl}/` },
      { '@type': 'ListItem', position: 2, name: 'サービス', item: `${siteUrl}/services` },
      { '@type': 'ListItem', position: 3, name: 'AI活用型受託開発', item: `${siteUrl}/services/ai-development` },
    ],
  }

  return (
    <>
      <AiDevPageClient
        problems={problems}
        solutions={solutions}
        comparisonRows={comparisonRows}
        packages={packages}
        examples={examples}
        steps={steps}
        faqItems={faqItems}
      />
      <Script
        id="ai-dev-service-json-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <Script
        id="ai-dev-faq-json-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Script
        id="ai-dev-breadcrumb-json-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
    </>
  )
}
