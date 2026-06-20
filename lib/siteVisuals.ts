import type { AmbientCanvasVariant } from '@/components/AmbientCanvas/AmbientCanvas'

export type SiteVisualKey =
  | 'home'
  | 'services'
  | 'aiDevelopment'
  | 'mobile'
  | 'web'
  | 'education'
  | 'company'
  | 'works'
  | 'blog'
  | 'careers'
  | 'school'
  | 'contact'
  | 'privacy'

type SiteVisual = {
  src: string
  alt: string
  accent: string
  canvas: AmbientCanvasVariant
  position?: string
  dim?: number
}

export const siteVisuals: Record<SiteVisualKey, SiteVisual> = {
  home: {
    src: 'https://images.pexels.com/photos/31148079/pexels-photo-31148079.jpeg?auto=compress&cs=tinysrgb&w=2400',
    alt: '東京の夜景と都市の高層ビル',
    accent: '#2A9D8F',
    canvas: 'network',
    position: 'center',
    dim: 0.72,
  },
  services: {
    src: '/assets/bg-consulting-workflow.png',
    alt: 'オフィスで仕事の説明をするビジネスパーソン',
    accent: '#1769AA',
    canvas: 'gridFlow',
    position: 'center 42%',
  },
  aiDevelopment: {
    src: '/assets/bg-consulting-workflow.png',
    alt: 'ボードを見ながらシステム開発の議論をするエンジニア',
    accent: '#2A9D8F',
    canvas: 'network',
    position: 'center 45%',
  },
  mobile: {
    src: 'https://images.pexels.com/photos/36966358/pexels-photo-36966358.jpeg?auto=compress&cs=tinysrgb&w=1800',
    alt: '東京のビジネス街を歩く人々',
    accent: '#7C3AED',
    canvas: 'orbit',
    position: 'center 55%',
  },
  web: {
    src: '/assets/bg-software-delivery.png',
    alt: '設計ボードを見ながらWebシステムを検討するチーム',
    accent: '#1769AA',
    canvas: 'gridFlow',
    position: 'center 45%',
  },
  education: {
    src: '/assets/bg-programming-classroom.png',
    alt: 'デジタル教材で学ぶ日本の教室',
    accent: '#D85A3A',
    canvas: 'educationBlocks',
    position: 'center 42%',
    dim: 0.62,
  },
  company: {
    src: 'https://images.pexels.com/photos/32397765/pexels-photo-32397765.jpeg?auto=compress&cs=tinysrgb&w=1800',
    alt: '夜の東京駅と都市景観',
    accent: '#C9972E',
    canvas: 'timeline',
    position: 'center 48%',
  },
  works: {
    src: '/assets/bg-software-delivery.png',
    alt: '業務システムの画面設計と開発資料',
    accent: '#2E7D5B',
    canvas: 'gridFlow',
    position: 'center 48%',
  },
  blog: {
    src: 'https://images.pexels.com/photos/8355407/pexels-photo-8355407.jpeg?auto=compress&cs=tinysrgb&w=1800',
    alt: 'ノートパソコンで記事を作成する人',
    accent: '#1769AA',
    canvas: 'staticDots',
    position: 'center 45%',
  },
  careers: {
    src: 'https://images.pexels.com/photos/7845496/pexels-photo-7845496.jpeg?auto=compress&cs=tinysrgb&w=1800',
    alt: 'オフィスで協働するビジネスチーム',
    accent: '#2A9D8F',
    canvas: 'network',
    position: 'center 42%',
  },
  school: {
    src: '/assets/bg-programming-classroom.png',
    alt: 'デジタル教材を使う教室',
    accent: '#D85A3A',
    canvas: 'educationBlocks',
    position: 'center 42%',
    dim: 0.62,
  },
  contact: {
    src: '/assets/bg-consulting-workflow.png',
    alt: '相談内容を確認するビジネスミーティング',
    accent: '#D85A3A',
    canvas: 'formSignal',
    position: 'center 42%',
  },
  privacy: {
    src: 'https://images.pexels.com/photos/37181115/pexels-photo-37181115.jpeg?auto=compress&cs=tinysrgb&w=1800',
    alt: '東京のビジネス街のガラス建築',
    accent: '#1769AA',
    canvas: 'staticDots',
    position: 'center 45%',
    dim: 0.78,
  },
}
