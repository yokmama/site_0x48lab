/* ── Services ─────────────────────────────────────────────── */
export const SERVICES = [
  {
    slug: 'ai-development',
    title: 'AI活用型受託開発',
    titleEn: 'AI-Powered Development',
    icon: 'ai',
    tagline: '500万円のシステムが100万円で。',
    desc: '生成AIと20年の設計ノウハウを組み合わせ、コスト1/5〜1/10・納期最大1/10を実現。業務管理・予約・自動化システムに対応。',
    features: ['業務管理システム', '予約・顧客対応システム', '業務効率化・自動化'],
    path: '/services/ai-development',
    lpPath: '/lp/ai-development',
  },
  {
    slug: 'mobile',
    title: 'モバイルアプリ開発',
    titleEn: 'Mobile App Development',
    icon: 'mobile',
    tagline: 'Android黎明期から積み上げた実績。',
    desc: 'Android黎明期からの深い実績を持ち、FlutterによるiOS/Androidクロスプラットフォーム開発を提供。ネイティブ品質のUXをスピーディに実現します。',
    features: ['Flutter (iOS / Android)', 'ネイティブアプリ', 'PWA対応'],
    path: '/services/mobile',
  },
  {
    slug: 'web',
    title: 'Webシステム開発',
    titleEn: 'Web System Development',
    icon: 'web',
    tagline: 'スケールする設計で長く使えるシステムを。',
    desc: 'React・Next.js・Javaなど幅広いスタックに対応。要件定義から設計・開発・保守まで一貫して担当。長期運用を見据えたアーキテクチャを提案します。',
    features: ['フロントエンド開発', 'APIサーバー構築', 'クラウドインフラ設計'],
    path: '/services/web',
  },
  {
    slug: 'education',
    title: 'プログラミング教育',
    titleEn: 'Programming Education',
    icon: 'education',
    tagline: 'マインクラフトで楽しく学ぶプログラミング。',
    desc: 'マインクラフトを題材にした独自カリキュラムで子ども向けプログラミング教育を提供。教材・教育システムの受託開発も承ります。',
    features: ['子ども向けスクール (8x9)', '教材・カリキュラム開発', 'Mod・プラグイン開発'],
    path: '/services/education',
    externalPath: 'https://8x9.jp/',
  },
]

/* ── AI Development Page ──────────────────────────────────── */
export const AI_DEV_PROBLEMS = [
  {
    title: '開発開始まで時間がかかる',
    desc: '要件整理やベンダー選定に時間がかかり、業務改善のタイミングを逃してしまう。',
  },
  {
    title: 'ノーコードでは品質が安定しない',
    desc: '自作ツールでは入力ルール・権限・データ整合性まで作り込みづらく、現場運用に乗り切らない。',
  },
  {
    title: 'レビュー・テスト体制が足りない',
    desc: 'スピードを優先すると品質が落ち、品質を優先するとリリースが遅れる。両立できる開発体制が必要。',
  },
]

export const AI_DEV_SOLUTIONS = [
  {
    num: '01',
    title: '設計から実装までを短縮',
    desc: '生成AIを要件整理・設計・実装補助に組み込み、数ヶ月単位の開発を数週間単位へ圧縮します。',
  },
  {
    num: '02',
    title: '品質レビューを標準化',
    desc: '20年の開発経験をもつエンジニアが設計・実装・QAをレビューし、AI任せにしない品質管理を行います。',
  },
  {
    num: '03',
    title: '必要な機能から段階導入',
    desc: '最初から大きく作り込まず、現場で使う中核機能を先に届けて、運用しながら改善します。',
  },
]

export const AI_DEV_COMPARISON_ROWS = [
  { item: '立ち上げ', traditional: '要件整理に時間がかかる', ours: '初期設計を短期間で具体化' },
  { item: '期間', traditional: '3〜6ヶ月の大型進行', ours: '2〜4週間単位で段階リリース' },
  { item: '変更対応', traditional: '仕様変更が後戻りになりやすい', ours: '小さく作って素早く改善' },
  { item: '品質保証', traditional: '手動QAが中心', ours: 'AI補助＋シニアレビュー' },
]

export const AI_DEV_SERVICE_PACKAGES = [
  {
    title: '業務管理システム',
    delivery: '3〜4週間',
    items: ['CRM・顧客管理', '案件・プロジェクト管理', '営業パイプライン管理'],
  },
  {
    title: '予約・顧客対応システム',
    delivery: '2〜4週間',
    items: ['予約管理', 'LINE連携', '自動返信・通知'],
  },
  {
    title: '業務効率化・自動化',
    delivery: '2〜3週間',
    items: ['データ入力自動化', 'レポート自動生成', '社内業務の効率化'],
  },
]

export const AI_DEV_EXAMPLE_PROJECTS = [
  {
    industry: '製造業',
    title: '製造進捗ダッシュボード',
    delivery: '3週間',
    quality: '現場入力と管理画面を統一',
    desc: '工程別の進捗・遅延・担当者をリアルタイムに可視化。',
  },
  {
    industry: '製造業',
    title: '検品記録・不良分析システム',
    delivery: '4週間',
    quality: '入力漏れチェックを標準化',
    desc: '検品結果を蓄積し、不良傾向を品番・工程別に分析。',
  },
  {
    industry: '卸売業',
    title: '在庫・発注アラート',
    delivery: '3週間',
    quality: '発注判断のばらつきを抑制',
    desc: '安全在庫を下回った商品を自動抽出し、発注候補を提示。',
  },
  {
    industry: '小売業',
    title: '店舗別売上レポート',
    delivery: '2週間',
    quality: '集計ルールを統一',
    desc: 'POS・ECデータを取り込み、日次で店舗別の状況を共有。',
  },
  {
    industry: 'サービス業',
    title: '予約管理・リマインド配信',
    delivery: '2週間',
    quality: '予約対応を一元管理',
    desc: '予約枠、変更、キャンセル、事前通知をまとめて管理。',
  },
  {
    industry: '医療・介護',
    title: '面談記録サマリー作成',
    delivery: '3週間',
    quality: '記録フォーマットを標準化',
    desc: '面談メモから共有用サマリーと次回対応事項を生成。',
  },
  {
    industry: '教育',
    title: '受講申込・決済管理',
    delivery: '4週間',
    quality: '申込から受講開始までを接続',
    desc: '申込受付、決済確認、受講者ステータスを一画面で管理。',
  },
  {
    industry: '人材',
    title: '候補者管理CRM',
    delivery: '3週間',
    quality: '選考履歴を追跡可能に',
    desc: '候補者、企業、面談、選考状況を一元化。',
  },
  {
    industry: '不動産',
    title: '物件問い合わせ管理',
    delivery: '3週間',
    quality: '対応漏れを検知',
    desc: '問い合わせ内容、内見予定、担当者対応を自動整理。',
  },
  {
    industry: '建設',
    title: '現場日報アプリ',
    delivery: '4週間',
    quality: '写真・作業記録を構造化',
    desc: 'スマートフォンから日報を登録し、管理者が進捗確認。',
  },
  {
    industry: '物流',
    title: '配送状況トラッキング',
    delivery: '3週間',
    quality: '遅延共有を迅速化',
    desc: '配送ステータスと例外対応を管理画面に集約。',
  },
  {
    industry: '飲食',
    title: '仕込み・発注管理',
    delivery: '2週間',
    quality: '店舗ごとの運用差を整理',
    desc: '販売予定と在庫状況から仕込み量と発注候補を確認。',
  },
  {
    industry: 'EC',
    title: '顧客対応ナレッジ検索',
    delivery: '3週間',
    quality: '回答品質を均一化',
    desc: '問い合わせ内容からFAQ・過去対応履歴を素早く検索。',
  },
  {
    industry: '士業',
    title: '書類作成ワークフロー',
    delivery: '4週間',
    quality: 'レビュー履歴を保存',
    desc: 'ヒアリング内容から書類ドラフトを生成し、確認状況を管理。',
  },
  {
    industry: '金融',
    title: '社内申請・承認管理',
    delivery: '3週間',
    quality: '承認条件を明確化',
    desc: '申請フォーム、承認フロー、差し戻し履歴をシステム化。',
  },
  {
    industry: '自治体',
    title: '問い合わせ分類ダッシュボード',
    delivery: '4週間',
    quality: '分類基準を標準化',
    desc: '問い合わせをカテゴリ別に整理し、対応状況を可視化。',
  },
  {
    industry: 'マーケティング',
    title: '広告レポート自動生成',
    delivery: '2週間',
    quality: '指標定義を統一',
    desc: '媒体データを集約し、週次レポートを自動作成。',
  },
  {
    industry: 'SaaS',
    title: 'オンボーディング支援ツール',
    delivery: '3週間',
    quality: '導入状況を追跡',
    desc: '顧客ごとの設定状況、未完了タスク、次アクションを管理。',
  },
  {
    industry: 'バックオフィス',
    title: '請求・入金照合システム',
    delivery: '4週間',
    quality: '照合ルールを透明化',
    desc: '請求データと入金データを突合し、未消込を一覧化。',
  },
  {
    industry: '営業',
    title: '商談メモ自動整理',
    delivery: '2週間',
    quality: '次アクションを明確化',
    desc: '商談メモから要点、宿題、提案事項を抽出してCRMへ反映。',
  },
]

export const AI_DEV_PROCESS_STEPS = [
  { num: '1', title: 'ヒアリング', desc: '課題・要件・優先順位を整理します。オンライン30分から対応します。', badge: '初回相談' },
  { num: '2', title: '設計・納期計画', desc: '機能の範囲、画面構成、品質確認項目、リリース計画を提示します。' },
  { num: '3', title: '開発・レビュー', desc: 'AI×20年の経験で高速に実装し、設計・コード・動作をレビューします。' },
  { num: '4', title: '納品・改善', desc: '検証後に納品。運用データを見ながら機能追加・改善を継続します。' },
]

export const AI_DEV_FAQ_ITEMS = [
  {
    q: 'なぜ短い期間で開発できるのですか？',
    a: '要件整理・設計・実装補助・テスト観点の洗い出しにAIを活用し、シニアエンジニアが判断とレビューを担うためです。作業を速めながら、重要な品質判断は人間が行います。',
  },
  {
    q: '品質は大丈夫ですか？',
    a: '20年の設計・検証ノウハウを持つシニアエンジニアがAIの出力をすべてレビューします。AI任せにせず、人間の経験と組み合わせることで高品質を担保しています。',
  },
  {
    q: 'AIを使うことで安全性は問題ありませんか？',
    a: 'AIはあくまでもツールです。要件定義・設計・QAはすべて人間が主導します。機密情報はAIに入力しない運用ルールを徹底しています。',
  },
  {
    q: '納期はどのくらいですか？',
    a: '規模によりますが、標準的な業務システムで2〜4週間を想定しています。最初に中核機能を届け、その後の運用に合わせて段階的に改善できます。',
  },
  {
    q: '納品後のサポートはありますか？',
    a: 'はい。修正・機能追加・品質改善まで継続的に対応します。利用状況を見ながら、次に優先すべき改善を一緒に整理します。',
  },
  {
    q: 'どんな業種・業態でも対応できますか？',
    a: '製造業・サービス業・小売・卸売など多様な業種の実績があります。業種・規模を問わず、まずはお気軽にご相談ください。',
  },
]

/* ── Shared Navigation / Layout Data ──────────────────────── */
export const HEADER_SERVICES_DROPDOWN = [
  { label: 'AI活用型受託開発', sub: '短納期・高品質', path: '/services/ai-development' },
  { label: 'モバイルアプリ開発', sub: 'Flutter / iOS / Android', path: '/services/mobile' },
  { label: 'Webシステム開発', sub: 'React / Next.js / Java', path: '/services/web' },
  { label: 'プログラミング教育', sub: '8x9 Kids スクール', path: '/services/education' },
]

export const HEADER_NAV = [
  { label: 'サービス', path: '/services', dropdown: HEADER_SERVICES_DROPDOWN },
  { label: '実績', path: '/works' },
  { label: '会社概要', path: '/company' },
  { label: 'ブログ', path: '/blog' },
  { label: '採用', path: '/careers' },
]

export const FOOTER_NAV = [
  {
    title: 'Services',
    links: [
      { label: 'AI活用型受託開発', to: '/services/ai-development' },
      { label: 'モバイルアプリ開発', to: '/services/mobile' },
      { label: 'Webシステム開発', to: '/services/web' },
      { label: 'プログラミング教育', to: '/services/education' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: '会社概要', to: '/company' },
      { label: '実績・事例', to: '/works' },
      { label: 'ブログ', to: '/blog' },
      { label: '採用情報', to: '/careers' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'お問い合わせ', to: '/contact' },
      { label: 'プライバシーポリシー', to: '/privacy' },
      { label: '8x9.jp', href: 'https://8x9.jp/', external: true },
    ],
  },
]

export const NOT_FOUND_QUICK_LINKS = [
  { label: 'サービス', to: '/#services' },
  { label: '実績', to: '/#works' },
  { label: '会社概要', to: '/#about' },
]

/* ── Home Sections ────────────────────────────────────────── */
export const ABOUT_ROWS = [
  { label: '会社名', value: '株式会社ハックラボ（HackLab Inc.）' },
  { label: '法人番号', value: '8140001033003' },
  { label: '設立', value: '2010年（商号変更：2021年1月12日）' },
  { label: '代表取締役', value: '寺園聖文' },
  {
    label: '所在地',
    value: '〒150-0002 東京都渋谷区渋谷2丁目19-19 和光宮益坂ビル5F',
  },
  {
    label: '事業内容',
    value: 'システム開発・受託開発 / プログラミング教育事業 / 教材開発',
  },
]

export const HOME_STRENGTHS = [
  {
    icon: 'ai',
    title: 'AI活用開発',
    desc: '生成AIを設計・実装・テストに組み込み、短納期と高品質を両立。20年の設計ノウハウがAIを正しく活用する鍵です。',
  },
  {
    icon: 'mobile',
    title: 'モバイルアプリ開発',
    desc: 'Android黎明期からの深い実績を持ち、Flutterを活用したiOS/Androidクロスプラットフォーム開発を提供。ネイティブ品質のUXをスピーディに実現します。',
  },
  {
    icon: 'web',
    title: 'Webシステム開発',
    desc: 'React・Next.js・Javaなど幅広いスタックに対応。要件定義から設計・開発・保守まで一貫して担当し、長期運用を見据えたアーキテクチャを提案します。',
  },
]

export const TEAM_MEMBERS = [
  {
    name: '寺園 聖文',
    role: 'Representative Director / CEO',
    photo: 'representative',
    initials: null,
  },
  {
    name: 'Maciej Nowakiewicz',
    role: 'CTO',
    photo: null,
    initials: 'MN',
  },
]

export const HOME_HISTORY_EVENTS = [
  {
    year: '2010年',
    title: '株式会社Re.Kayo-System 設立',
    desc: '神戸にてWebシステム開発会社として創業。JavaサーバーサイドやXML、Androidアプリ開発を中心に事業展開。',
  },
  {
    year: '2012年',
    title: '技術書を出版',
    desc: '翔泳社より「10日でおぼえるAndroidアプリ開発入門教室」を出版。教育事業へ本格参入。',
  },
  {
    year: '2016年1月',
    title: '8x9 Kids プログラミングスクール 開校',
    desc: 'マインクラフトを題材にした独自カリキュラムの子ども向けプログラミングスクールを開校。教材・教育システムの開発も開始。',
  },
  {
    year: '2021年1月',
    title: '株式会社ハックラボへ商号変更',
    desc: '神戸・灘区への移転を機に商号を変更。AI活用開発・モバイル開発へ事業を拡張。',
  },
  {
    year: '2025年7月',
    title: '東京・渋谷へ本社移転',
    desc: '東京渋谷に本社を移転。首都圏での事業基盤を強化し、さらなる成長を推進。',
  },
]

/* ── Company Page ─────────────────────────────────────────── */
export const COMPANY_HISTORY = [
  {
    year: '2010年',
    title: '株式会社Re.Kayo-System 設立',
    desc: '神戸にてWebシステム開発会社として創業。JavaサーバーサイドやXML、Androidアプリ開発を中心に事業展開。',
  },
  {
    year: '2012年',
    title: '技術書を出版',
    desc: '翔泳社より「10日でおぼえるAndroidアプリ開発入門教室」を出版。教育事業へ本格参入。',
  },
  {
    year: '2016年1月',
    title: '8x9 Kids プログラミングスクール 開校',
    desc: null,
  },
  {
    year: '2021年1月',
    title: '株式会社ハックラボへ商号変更',
    desc: null,
  },
  {
    year: '2025年7月',
    title: '東京・渋谷へ本社移転',
    desc: null,
  },
]

export const COMPANY_MEMBERS = TEAM_MEMBERS

export const COMPANY_PAGE_STRENGTHS = [
  {
    title: 'モバイルアプリ開発',
    desc: 'Android黎明期からの深い実績を持ち、FlutterによるiOS/Android両対応開発を提供。',
    icon: 'mobile',
  },
  {
    title: 'AI活用開発',
    desc: '設計から開発・テストまでAIを活用した効率的な開発プロセスにより、仕様変更にも柔軟に対応。',
    icon: 'ai',
  },
  {
    title: 'プログラミング教育',
    desc: 'スクール運営で培った知識を活かし、マインクラフトを使った教材・カリキュラム開発まで対応。',
    icon: 'grid',
  },
]

export const COMPANY_PAGE_STATS = [
  { num: '15+', label: '年の開発実績' },
  { num: '300+', label: 'プロジェクト' },
  { num: '4', label: 'つのサービス領域' },
  { num: '2016年〜', label: '教育事業' },
]

/* ── Services Page ────────────────────────────────────────── */
export const SERVICES_PAGE_ICON_BG = {
  'ai-development': 'var(--color-accent)',
  mobile: '#7c3aed',
  web: '#0891b2',
  education: 'var(--color-orange)',
}

export const SERVICES_PAGE_WHY_ITEMS = [
  {
    num: '1/5〜1/10',
    unit: 'コスト',
    title: 'コスト1/5〜1/10',
    desc: 'AI活用と20年の設計ノウハウにより、従来比大幅なコスト削減を実現。削減分はそのままお客様に還元します。',
  },
  {
    num: '最大1/10',
    unit: '納期',
    title: '最大1/10の納期',
    desc: 'AI活用で設計・実装・QAを加速。数ヶ月かかっていた開発が数週間で完了します。',
  },
  {
    num: '20年',
    unit: '実績',
    title: '20年の実績と品質',
    desc: '2010年の創業以来、製造業・サービス業・小売など幅広い業種で300件超のプロジェクトを手がけてきました。',
  },
]

export const SERVICES_PAGE_PROCESS_STEPS = [
  { num: '1', title: 'ヒアリング', desc: '課題・要件をお伺いします。オンライン30分、無料。', free: true },
  { num: '2', title: '設計・見積もり', desc: '機能の整理とコスト・納期をご提示。ここまで無料。', free: true },
  { num: '3', title: '開発', desc: 'AI＋経験豊富なエンジニアで開発。進捗を随時共有します。', free: false },
  { num: '4', title: '納品・運用', desc: '検証後に納品。修正・機能追加も低コストで対応します。', free: false },
]

/* ── Blog / Contact / Careers ─────────────────────────────── */
export const BLOG_CATEGORIES = ['全て', '開発事例', '技術', '開発手法', '教育', 'ビジネス', 'お知らせ']

export const CONTACT_PROCESS = [
  {
    num: '01',
    label: 'お問い合わせ',
    desc: 'フォームに必要事項をご記入のうえ送信してください。',
  },
  {
    num: '02',
    label: 'ヒアリング（30分・無料）',
    desc: '担当者よりご連絡し、オンラインにてヒアリングを実施します。',
  },
  {
    num: '03',
    label: '簡易見積もり提示（無料）',
    desc: 'ヒアリング内容をもとに、概算のお見積もりをご提示します。',
  },
]

export const CAREERS_CULTURE = [
  {
    icon: 'web',
    title: 'フルリモート対応',
    desc: '渋谷オフィス常駐・フルリモート・ハイブリッドから選択可。働き方はあなたが決める。',
  },
  {
    icon: 'ai',
    title: 'AI活用の最前線',
    desc: '最新の生成AIツールを積極活用した開発環境。常に時代の先端で働ける。',
  },
  {
    icon: 'users',
    title: '少数精鋭チーム',
    desc: '少人数チームで裁量を持って働ける環境。一人ひとりの影響力が大きい。',
  },
]

export const CAREERS_BENEFITS = [
  { icon: '📅', label: '完全週休2日', sub: '土日祝・年間休日120日以上' },
  { icon: '🏥', label: '各種社会保険完備', sub: '健康・厚生年金・雇用・労災' },
  { icon: '📚', label: '書籍・学習費補助', sub: '年間上限あり。技術書・資格取得費用' },
  { icon: '🏠', label: 'リモートワーク手当', sub: '在宅勤務時の通信・光熱費補助' },
]

export const CAREERS_STEPS = [
  { num: '01', label: '書類選考', desc: '履歴書・職務経歴書をご提出ください。' },
  { num: '02', label: 'オンライン面接 1〜2回', desc: 'カジュアル面談を含む場合があります。' },
  { num: '03', label: '内定', desc: '条件面談の上、内定となります。' },
]

/* ── Education Pages ──────────────────────────────────────── */
export const SCHOOL_PAGE_FEATURES = [
  {
    icon: 'desktop-code',
    title: 'マインクラフト題材',
    desc: '子どもたちが熱中するマインクラフトを教材に使用。楽しみながら自然にプログラミング的思考を習得できます。',
  },
  {
    icon: 'users',
    title: '小学生〜中学生対象',
    desc: '年齢・習熟度に合わせたクラス分けで、初心者から上級者まで無理なく学べる環境を整えています。',
  },
  {
    icon: 'ai',
    title: '独自カリキュラム',
    desc: '2016年の開校以来培ってきた独自のカリキュラムで、論理的思考からプログラミングの基礎まで体系的に学習。',
  },
]

export const SCHOOL_PAGE_BUSINESS_ITEMS = [
  {
    title: '教材・カリキュラム開発受託',
    desc: '企業・学校向けにオリジナルのプログラミング教材およびカリキュラムの設計・開発を承ります。',
  },
  {
    title: 'Mod・プラグイン開発',
    desc: 'マインクラフト用のカスタムMod・プラグインの受託開発。教育目的のゲーム改造にも対応します。',
  },
  {
    title: '教育システム開発',
    desc: 'eラーニングプラットフォーム・進捗管理システムなど、教育領域に特化したWebシステムを開発します。',
  },
]

export const EDUCATION_PAGE_FEATURES = [
  {
    icon: 'play',
    title: 'マインクラフトを使った体験型学習',
    desc: '子どもたちが大好きなマインクラフトを題材に、ゲームを作りながらプログラミングの基礎から応用まで自然に身につけます。',
  },
  {
    icon: 'users',
    title: '小学生〜中学生対応',
    desc: '年齢・習熟度に合わせたクラス分けで、はじめてプログラミングに触れる子どもから発展的な学習を望む子どもまで幅広く対応。',
  },
  {
    icon: 'education',
    title: 'オリジナル教材・カリキュラム',
    desc: '株式会社ハックラボが独自に開発した教材とカリキュラムを使用。プログラミング的思考力と創造性を同時に育みます。',
  },
]

export const EDUCATION_PAGE_BUSINESS_ITEMS = [
  {
    title: '教材・カリキュラム開発受託',
    desc: 'プログラミング教育向けの教材やカリキュラムの設計・開発をお受けします。学習目標・対象年齢に合わせてカスタマイズします。',
  },
  {
    title: 'Mod・プラグイン開発',
    desc: 'マインクラフト向けのMod・プラグインの受託開発に対応。学習用コンテンツから独自ゲーム体験まで幅広く対応できます。',
  },
  {
    title: '教育システム開発',
    desc: '受講管理・進捗トラッキング・保護者向けポータルなど、教育事業者向けのWebシステム開発を承ります。',
  },
]

/* ── Works Page Filters ───────────────────────────────────── */
export const WORKS_INDUSTRIES = ['all', '製造業', 'サービス業', '卸売業', '小売業', '教育業']

export const WORKS_SERVICE_FILTERS = ['all', 'AI活用開発', 'モバイル', 'Web']

export const WORKS_SERVICE_LABEL_MAP = {
  'ai-development': 'AI活用開発',
  mobile: 'モバイル',
  web: 'Web',
}

/* ── Mobile Service Page ──────────────────────────────────── */
export const MOBILE_PAGE_STATS = [
  { num: '15+年', label: 'モバイル開発実績' },
  { num: 'Flutter', label: 'クロスプラットフォーム対応' },
  { num: 'iOS & Android', label: '両プラットフォーム対応' },
  { num: 'オフライン対応', label: '実績あり' },
]

export const MOBILE_PAGE_SERVICE_CARDS = [
  {
    icon: 'mobile',
    title: 'Flutterクロスプラットフォーム開発',
    desc: '1つのコードベースでiOSとAndroid両方に対応。開発コストを抑えながら、ネイティブ品質のUXを実現します。',
    tags: ['Flutter', 'Dart', 'iOS', 'Android'],
  },
  {
    icon: 'location-pin',
    title: 'ネイティブアプリ開発',
    desc: 'iOS (Swift) / Android (Kotlin) のネイティブ開発にも対応。高度なハードウェア連携や最大限のパフォーマンスが必要な場合に最適です。',
    tags: ['Swift', 'Kotlin', 'iOS', 'Android'],
  },
  {
    icon: 'web',
    title: 'PWA・Webアプリ',
    desc: 'ネイティブアプリが不要なケースはPWAやWebアプリも選択肢に。用途・予算・ユーザー層に合わせて最適な形を提案します。',
    tags: ['PWA', 'React', 'Next.js', 'TypeScript'],
  },
]

export const MOBILE_PAGE_COMPARISON = [
  {
    feature: '開発コスト',
    flutter: '低コスト（1コードで両OS）',
    reactNative: '低コスト',
    native: '高コスト（iOS+Android別開発）',
  },
  {
    feature: '品質・パフォーマンス',
    flutter: '高品質・ネイティブに近い',
    reactNative: '普通（JSブリッジのオーバーヘッド）',
    native: '最高品質',
  },
  {
    feature: '保守性',
    flutter: '高い（統一コードベース）',
    reactNative: '普通（依存パッケージが多い）',
    native: '低い（2コードベース）',
  },
  {
    feature: '対応OS',
    flutter: 'iOS / Android / Web',
    reactNative: 'iOS / Android',
    native: 'iOS または Android',
  },
]

export const MOBILE_PAGE_PROCESS_STEPS = [
  { num: '1', title: '要件定義', desc: '機能・UX要件を整理し、技術スタックを選定します。' },
  { num: '2', title: 'UI/UXデザイン', desc: 'Figmaでワイヤーフレーム・モックアップを作成します。' },
  { num: '3', title: '開発', desc: 'AI×経験豊富なエンジニアでスピーディに実装します。' },
  { num: '4', title: 'テスト', desc: '実機テストと自動テストで品質を担保します。' },
  { num: '5', title: 'リリース・運用', desc: 'ストア申請から運用サポートまで一貫して対応します。' },
]

export const MOBILE_PAGE_TECH_TAGS = ['Flutter', 'Dart', 'Firebase', 'iOS', 'Android', 'Swift', 'Kotlin']

/* ── Web Service Page ─────────────────────────────────────── */
export const WEB_PAGE_SERVICE_CARDS = [
  {
    color: '#0891b2',
    icon: 'code',
    title: 'フロントエンド開発',
    desc: 'React・Next.js・Vue.js などのモダンフレームワークで、高速・高品質なUIを構築します。SEO・パフォーマンス最適化も対応。',
    tags: ['React', 'Next.js', 'Vue.js', 'TypeScript'],
  },
  {
    color: 'var(--color-accent)',
    icon: 'api',
    title: 'バックエンドAPI開発',
    desc: 'Node.js・Java・Python など幅広いバックエンド技術に対応。RESTful API・GraphQL・マイクロサービスまで設計から実装します。',
    tags: ['Node.js', 'Java', 'Python', 'PostgreSQL'],
  },
  {
    color: 'var(--color-orange)',
    icon: 'infrastructure',
    title: 'クラウドインフラ',
    desc: 'AWS・GCP・Vercel など主要クラウドに対応。スケーラブルで安全なインフラを設計・構築します。CI/CD パイプラインの整備も支援します。',
    tags: ['AWS', 'GCP', 'Vercel', 'Docker'],
  },
]

export const WEB_PAGE_STRENGTHS = [
  {
    icon: 'check-panel',
    title: '要件定義から一貫対応',
    desc: '要件定義・設計・開発・保守まですべてお任せ。窓口を一本化することでコミュニケーションコストを削減します。',
  },
  {
    icon: 'ai',
    title: 'AI活用でコスト削減',
    desc: '生成AIを設計・実装・テストに積極活用。従来比1/5〜1/10のコストで同品質のシステムを届けます。',
  },
  {
    icon: 'clock',
    title: '長期保守を見据えた設計',
    desc: 'リリースがゴールではありません。運用・保守・機能追加を想定したアーキテクチャで、長く使えるシステムを構築します。',
  },
  {
    icon: 'chat',
    title: 'アジャイル開発で柔軟対応',
    desc: '小さく始めて素早く改善。要件変更にも柔軟に対応できるアジャイルな開発スタイルで、ビジネスの変化に追従します。',
  },
]

export const WEB_PAGE_TECH_TAGS = ['React', 'Next.js', 'Vue.js', 'TypeScript', 'Node.js', 'Java', 'Python', 'AWS', 'PostgreSQL', 'MySQL', 'Docker']

export const WEB_PAGE_PROCESS_STEPS = [
  { num: '1', title: '要件定義・設計', desc: '要件をヒアリングし、システム設計書・画面設計を作成します。' },
  { num: '2', title: 'フロントエンド開発', desc: 'UI/UXデザインをもとに、高品質なフロントエンドを実装します。' },
  { num: '3', title: 'バックエンド開発', desc: 'APIサーバー・データベース・インフラを構築します。' },
  { num: '4', title: 'テスト・リリース', desc: '総合テスト後、本番環境へデプロイ。運用移行をサポートします。' },
]

/* ── AI Development LP ────────────────────────────────────── */
export const LP_PROBLEMS = [
  '見積もりを取ったら500万円以上になり、諦めてしまった',
  'ノーコードツールで自作を試みたが、機能の限界で頓挫した',
  'エンジニア不足で年々開発コストが上がり、困っている',
]

export const LP_SOLUTIONS = [
  {
    num: '01',
    title: 'コスト1/5〜1/10',
    desc: 'AIが設計・実装・テストを加速し、人件費を大幅削減。削減分をそのままお客様に還元します。',
  },
  {
    num: '02',
    title: '納期最大1/10',
    desc: '数ヶ月かかっていた案件が数週間に。ビジネスのスピードに合わせた開発が実現します。',
  },
  {
    num: '03',
    title: '必要なものだけを作る',
    desc: '大きなパッケージを買わなくていい。最小限のコストで要件にぴったりのシステムを構築します。',
  },
]

export const LP_COMPARISON_ROWS = [
  {
    item: '費用',
    traditional: '500万円以上',
    ours: '50万円〜（1/5〜1/10）',
  },
  {
    item: '期間',
    traditional: '3〜6ヶ月',
    ours: '2〜4週間（最大1/10）',
  },
  {
    item: '柔軟性',
    traditional: '変更に弱い',
    ours: '小規模イテレーション・低コスト修正',
  },
  {
    item: '品質保証',
    traditional: '手動QAが中心',
    ours: 'AI＋人間の20年QA知識',
  },
]

export const LP_PRICING = [
  {
    title: '業務管理システム',
    price: '¥500,000',
    from: true,
    items: ['CRM・顧客管理', '案件・プロジェクト管理', '営業パイプライン管理'],
  },
  {
    title: '予約・顧客対応システム',
    price: '¥800,000',
    from: true,
    items: ['予約管理', 'LINE連携', '自動返信・通知'],
  },
  {
    title: '業務効率化・自動化',
    price: '¥300,000',
    from: true,
    items: ['データ入力自動化', 'レポート自動生成', '社内業務の効率化'],
  },
]

export const LP_RESULTS = [
  {
    industry: '製造業',
    title: 'CRM構築',
    before: { cost: '500万円', period: '5ヶ月' },
    after: { cost: '80万円', period: '3週間' },
    saving: 'コスト84%削減',
  },
  {
    industry: 'サービス業',
    title: '予約システム',
    before: { cost: '300万円', period: '4ヶ月' },
    after: { cost: '60万円', period: '2週間' },
    saving: 'コスト80%削減',
  },
  {
    industry: '卸売業',
    title: '在庫・受発注管理',
    before: { cost: '800万円', period: '6ヶ月' },
    after: { cost: '120万円', period: '4週間' },
    saving: 'コスト85%削減',
  },
]

export const LP_FAQ_ITEMS = [
  {
    q: 'なぜこんなに安くできるのですか？',
    a: 'AIが設計・実装・テストの工数を大幅に削減するため、従来比1/5〜1/10のコストが実現できます。その削減分をそのままお客様に還元しています。',
  },
  {
    q: '品質は大丈夫ですか？',
    a: '20年の設計・検証ノウハウを持つシニアエンジニアがAIの出力をすべてレビューします。AI任せにせず、人間の経験と組み合わせることで高品質を担保しています。',
  },
  {
    q: 'AIを使うことで安全性は問題ありませんか？',
    a: 'AIはあくまでもツールです。要件定義・設計・QAはすべて人間が主導します。機密情報はAIに入力しない運用ルールを徹底しています。',
  },
  {
    q: '納期はどのくらいですか？',
    a: '規模によりますが、標準的なシステムで2〜4週間を想定しています。従来の開発と比べて最大1/10の期間で納品が可能です。',
  },
  {
    q: '納品後のサポートはありますか？',
    a: 'はい。修正・機能追加も低コストで対応します。継続的なサポートも承りますのでご相談ください。',
  },
  {
    q: 'どんな業種・業態でも対応できますか？',
    a: '製造業・サービス業・小売・卸売など多様な業種の実績があります。業種・規模を問わず、まずはお気軽にご相談ください。',
  },
]

/* ── Works / Case Studies ─────────────────────────────────── */
export const WORKS = [
  {
    slug: 'crm-manufacturing',
    industry: '製造業',
    service: 'ai-development',
    title: 'CRM・顧客管理システム構築',
    summary: '顧客情報を一元化し、案件更新の品質とスピードを改善。',
    challenge: '社内の顧客・案件情報がExcelと担当者の頭の中にのみ存在し、属人化が深刻な課題でした。',
    solution: '生成AIを活用した設計フェーズの高速化とレビュー体制により、要件定義から納品まで3週間で完了。',
    tech: ['React', 'Node.js', 'PostgreSQL'],
    before: { period: '5ヶ月', quality: 'Excel・口頭管理' },
    after: { period: '3週間', quality: '入力ルールを統一' },
    impact: '5ヶ月→3週間',
  },
  {
    slug: 'booking-service',
    industry: 'サービス業',
    service: 'ai-development',
    title: '予約・顧客対応システム開発',
    summary: 'LINE連携と自動返信で予約対応を高速化し、応対品質を均一化。',
    challenge: '電話・メールが混在する予約受付と問い合わせ対応にスタッフの半数が割かれていました。',
    solution: 'LINE公式アカウントと連携した予約管理システムを構築。自動返信・リマインド・対応履歴管理を実装。',
    tech: ['Vue.js', 'Python', 'MySQL', 'LINE API'],
    before: { period: '4ヶ月', quality: '電話・メール混在' },
    after: { period: '2週間', quality: '対応フローを統一' },
    impact: '4ヶ月→2週間',
  },
  {
    slug: 'inventory-wholesale',
    industry: '卸売業',
    service: 'ai-development',
    title: '在庫・受発注管理システム',
    summary: '手動Excelから脱却し、在庫ミスゼロと月次締めの早期化を達成。',
    challenge: '複数拠点のExcel管理による在庫差異が月次決算を常に遅延させていました。',
    solution: 'リアルタイム在庫同期と自動発注トリガーを実装し、確認しやすいWebシステムを構築。',
    tech: ['React', 'Java', 'AWS'],
    before: { period: '6ヶ月', quality: '拠点ごとにExcel' },
    after: { period: '4週間', quality: '在庫データを同期' },
    impact: '6ヶ月→4週間',
  },
  {
    slug: 'mobile-app-retail',
    industry: '小売業',
    service: 'mobile',
    title: 'スタッフ向け業務アプリ (Flutter)',
    summary: '紙の作業指示書をデジタル化し、報告の速さと精度を向上。',
    challenge: '現場スタッフへの作業指示と完了報告がすべて紙ベースで、集計に毎週丸1日かかっていました。',
    solution: 'Flutterで iOS/Android 両対応のスタッフ向けアプリを開発。オフライン対応も実装。',
    tech: ['Flutter', 'Firebase', 'Dart'],
    before: { period: '3ヶ月', quality: '紙で完了報告' },
    after: { period: '3週間', quality: '即時反映・確認' },
    impact: '3ヶ月→3週間',
  },
  {
    slug: 'booking-platform-web',
    industry: '教育業',
    service: 'web',
    title: 'オンライン予約・決済プラットフォーム',
    summary: 'Stripe連携で決済・受領書発行を自動化し、申込処理を迅速化。',
    challenge: '受講申込・入金確認・受領書発行がすべて手作業で、月に100件超の申込処理に追われていました。',
    solution: 'Stripe決済・自動領収書発行・受講管理を統合したWebプラットフォームを構築。',
    tech: ['Next.js', 'Stripe', 'Supabase'],
    before: { period: '5ヶ月', quality: '手作業で申込処理' },
    after: { period: '4週間', quality: '決済・領収書を自動化' },
    impact: '5ヶ月→4週間',
  },
]

/* ── Blog Posts ───────────────────────────────────────────── */
export const BLOG_POSTS = [
  {
    slug: 'ai-development-cost-reduction',
    category: '開発事例',
    title: 'AI活用でシステム開発コストを1/5に削減した話',
    excerpt: '生成AIを設計・実装・テストに活用することで、従来比1/5のコストでシステム開発を実現した実践事例を紹介します。',
    date: '2025-05-20',
    readCount: 6,
  },
  {
    slug: 'flutter-cross-platform-2025',
    category: '技術',
    title: 'Flutter 3.x でのクロスプラットフォーム開発 — 2025年版',
    excerpt: 'iOS/Android/Web を一つのコードベースでカバーする Flutter の最新動向と実務での選択基準を解説します。',
    date: '2025-04-15',
    readCount: 8,
  },
  {
    slug: 'requirements-definition-ai',
    category: '開発手法',
    title: '要件定義にAIを使うと何が変わるか',
    excerpt: 'ChatGPT / Claude を要件定義フェーズに組み込んだことで、ドキュメント作成時間が従来の60%減になった経験を共有します。',
    date: '2025-03-08',
    readCount: 5,
  },
  {
    slug: 'minecraft-programming-education',
    category: '教育',
    title: 'マインクラフトで学ぶプログラミング — 子どもの学習効果を高める3つのポイント',
    excerpt: '8x9 Kidsスクールの運営を通じて見えてきた、ゲームを活用したプログラミング教育の効果的なアプローチを紹介します。',
    date: '2025-02-14',
    readCount: 7,
  },
  {
    slug: 'small-business-system-investment',
    category: 'ビジネス',
    title: '中小企業がシステム投資で失敗しないための5つの原則',
    excerpt: '多くの中小企業がシステム開発で失敗する共通のパターンと、それを避けるための実践的な考え方を解説します。',
    date: '2025-01-22',
    readCount: 6,
  },
  {
    slug: 'shibuya-office-move',
    category: 'お知らせ',
    title: '本社を東京・渋谷へ移転しました',
    excerpt: '2025年7月、株式会社ハックラボは東京都渋谷区渋谷2丁目に本社を移転いたしました。',
    date: '2025-07-01',
    readCount: 2,
  },
]

/* ── Careers ──────────────────────────────────────────────── */
export const JOB_OPENINGS = [
  {
    id: 'engineer-fullstack',
    title: 'Webエンジニア（フルスタック）',
    type: '正社員 / 業務委託',
    location: '東京・渋谷 / フルリモート可',
    tags: ['React', 'Node.js', 'TypeScript'],
    desc: 'AI活用型のWeb・業務システム開発をリードするエンジニアを募集。自社開発と受託開発の両方に携わります。',
  },
  {
    id: 'engineer-mobile',
    title: 'モバイルエンジニア（Flutter）',
    type: '正社員 / 業務委託',
    location: '東京・渋谷 / フルリモート可',
    tags: ['Flutter', 'Dart', 'Firebase'],
    desc: 'Flutter を使ったiOS/Android両対応のアプリ開発。アーキテクチャ設計から実装まで幅広く担当します。',
  },
  {
    id: 'pm',
    title: 'プロジェクトマネージャー',
    type: '正社員',
    location: '東京・渋谷',
    tags: ['PM', 'アジャイル', '要件定義'],
    desc: 'クライアントとの要件定義から納品までをリードするPMを募集。エンジニアとクライアントの橋渡し役。',
  },
]

/* ── Stats ────────────────────────────────────────────────── */
export const COMPANY_STATS = [
  { num: '15+', label: '年の開発実績' },
  { num: '300+', label: 'プロジェクト実績' },
  { num: '1/5〜1/10', label: 'コスト削減率' },
  { num: '2週間〜', label: '最短納品期間' },
]
