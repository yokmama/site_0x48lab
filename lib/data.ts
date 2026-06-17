/* ── Services ─────────────────────────────────────────────── */
export const SERVICES = [
  {
    slug: 'ai-development',
    title: 'AI活用型受託開発',
    titleEn: 'AI-Powered Development',
    icon: 'ai',
    tagline: '業務システムを短く、確実に。',
    desc: '2010年創業の開発経験と生成AIを組み合わせ、業務管理・予約・自動化システムを2〜4週間単位で段階導入します。',
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
    desc: 'シニアエンジニアが設計・実装・QAをレビューし、AI任せにしない品質管理を行います。',
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
  { num: '3', title: '開発・レビュー', desc: 'AIを活用して実装を進め、シニアエンジニアが設計・コード・動作をレビューします。' },
  { num: '4', title: '納品・改善', desc: '検証後に納品。運用データを見ながら機能追加・改善を継続します。' },
]

export const AI_DEV_FAQ_ITEMS = [
  {
    q: 'なぜ短い期間で開発できるのですか？',
    a: '要件整理・設計・実装補助・テスト観点の洗い出しにAIを活用し、シニアエンジニアが判断とレビューを担うためです。作業を速めながら、重要な品質判断は人間が行います。',
  },
  {
    q: '品質は大丈夫ですか？',
    a: 'シニアエンジニアがAIの出力をレビューします。AI任せにせず、人間の設計判断と検証を組み合わせて品質を確認します。',
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

export const AI_DEV_TRUST_ITEMS = [
  {
    title: '機密情報は初回相談では不要',
    desc: '初回は業務課題と実現したい状態だけで整理します。詳細データや顧客情報は、必要に応じてNDA締結後に扱います。',
  },
  {
    title: 'AIの利用範囲を明確化',
    desc: '生成AIは要件整理・設計補助・実装補助・テスト観点の整理に活用します。判断とレビューは人間が担います。',
  },
  {
    title: '納品物と権利を事前確認',
    desc: 'ソースコード、設計資料、運用手順、保守範囲など、納品後に必要なものを見積もり前に整理します。',
  },
  {
    title: 'リリース後の改善まで対応',
    desc: '最初の中核機能を出して終わりにせず、利用状況を見ながら修正・追加開発・品質改善を継続できます。',
  },
]

export const AI_DEV_FIT_ITEMS = [
  'Excel・スプレッドシート運用をシステム化したい',
  '予約、申請、顧客対応などの定型業務を減らしたい',
  '小さく始めて、現場確認しながら改善したい',
  '要件が固まりきっていない段階で相談したい',
]

export const AI_DEV_LIMIT_ITEMS = [
  '要件が未整理のまま固定価格だけを先に確定したい',
  '法規制・監査要件の正式判断を開発会社だけに任せたい',
  'AIに機密情報をそのまま投入する前提で進めたい',
  '大規模基幹システムを一括で短期刷新したい',
]

/* ── Shared Navigation / Layout Data ──────────────────────── */
export const HEADER_SERVICES_DROPDOWN = [
  { label: 'AI活用型受託開発', sub: '短納期・高品質', path: '/services/ai-development' },
  { label: 'モバイルアプリ開発', sub: 'Flutter / iOS / Android', path: '/services/mobile' },
  { label: 'Webシステム開発', sub: 'React / Next.js / Java', path: '/services/web' },
  { label: 'プログラミング教育', sub: '8x9 Kids スクール', path: '/services/education' },
]

export const HEADER_NAV = [
  { label: 'AI開発', path: '/services/ai-development' },
  { label: '実績', path: '/works' },
  { label: '料金・納期', path: '/services/ai-development#pricing' },
  { label: '導入の流れ', path: '/services/ai-development#process' },
  { label: 'FAQ', path: '/services/ai-development#faq' },
  { label: '会社情報', path: '/company' },
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
  { label: 'AI開発', to: '/services/ai-development' },
  { label: '実績', to: '/works' },
  { label: '無料相談', to: '/contact?topic=ai-development' },
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
    desc: '生成AIを設計・実装・テストに組み込み、短いサイクルで品質を確認。シニアレビューと組み合わせてAIを実務で活用します。',
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
    num: '2〜4週間',
    unit: '段階リリース',
    title: '中核機能から短く導入',
    desc: '最初から大きく作り込まず、現場確認できる中核機能を短い単位で届けます。',
  },
  {
    num: 'AI＋人',
    unit: '品質確認',
    title: 'AI任せにしないレビュー',
    desc: '生成AIを開発補助に使いながら、設計・実装・QAの判断はシニアエンジニアが確認します。',
  },
  {
    num: '2010年',
    unit: '実績',
    title: '創業以来300件超',
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
export const WORKS_INDUSTRIES = [
  'all', '教育業', 'ヘルスケア・医療', 'フィンテック',
  'IoT・スマートホーム', 'メディア・エンタメ', 'Web・EC・Web3',
]

export const WORKS_SERVICE_FILTERS = ['all', 'AI活用開発', 'モバイル', 'Web', 'EdTech', 'IoT / BLE']

export const WORKS_SERVICE_LABEL_MAP = {
  'ai-development': 'AI活用開発',
  mobile: 'モバイル',
  web: 'Web',
  edtech: 'EdTech',
  iot: 'IoT / BLE',
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
    title: 'AI活用で開発を効率化',
    desc: '生成AIを設計・実装・テスト観点の整理に活用。人のレビューと組み合わせて、短いサイクルで確認できる開発を進めます。',
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
  '見積もりの前に、費用・納期・実現範囲の目安が知りたい',
  'ノーコードツールで自作を試みたが、機能の限界で頓挫した',
  'エンジニア不足で改善したい業務が後回しになっている',
]

export const LP_SOLUTIONS = [
  {
    num: '01',
    title: '短い単位で設計・実装',
    desc: 'AIを要件整理・実装補助・テスト観点の整理に使い、2〜4週間単位で確認できる状態を目指します。',
  },
  {
    num: '02',
    title: 'シニアレビューで品質確認',
    desc: 'AI任せにせず、設計・実装・QAを人が確認。業務運用に必要な権限・入力ルール・例外対応まで見ます。',
  },
  {
    num: '03',
    title: '必要なものだけを作る',
    desc: '大きなパッケージありきではなく、現場で使う中核機能から始めて段階的に改善します。',
  },
]

export const LP_COMPARISON_ROWS = [
  {
    item: '費用',
    traditional: '大きな初期見積もりになりやすい',
    ours: '中核機能から範囲を区切って見積もり',
  },
  {
    item: '期間',
    traditional: '3〜6ヶ月',
    ours: '2〜4週間単位で段階リリース',
  },
  {
    item: '柔軟性',
    traditional: '変更に弱い',
    ours: '小規模イテレーション・低コスト修正',
  },
  {
    item: '品質保証',
    traditional: '手動QAが中心',
    ours: 'AI補助＋シニアレビュー',
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
    before: { cost: 'Excel・手作業', period: '確認に時間がかかる' },
    after: { cost: '管理画面化', period: '3週間目安' },
    saving: '入力と確認の流れを整理',
  },
  {
    industry: 'サービス業',
    title: '予約システム',
    before: { cost: '電話・メール中心', period: '対応漏れが発生' },
    after: { cost: '予約を一元管理', period: '2週間目安' },
    saving: '予約変更と通知を整理',
  },
  {
    industry: '卸売業',
    title: '在庫・受発注管理',
    before: { cost: '担当者依存', period: '発注判断が属人化' },
    after: { cost: '在庫アラート', period: '4週間目安' },
    saving: '発注候補を可視化',
  },
]

export const LP_FAQ_ITEMS = [
  {
    q: 'なぜ短い期間で開発できるのですか？',
    a: '要件整理・設計・実装補助・テスト観点の洗い出しにAIを活用し、シニアエンジニアが判断とレビューを担うためです。最初から大きく作り込まず、中核機能から段階導入します。',
  },
  {
    q: '品質は大丈夫ですか？',
    a: 'シニアエンジニアがAIの出力をレビューします。AI任せにせず、人間の設計判断と検証を組み合わせて品質を確認します。',
  },
  {
    q: 'AIを使うことで安全性は問題ありませんか？',
    a: 'AIはあくまでもツールです。要件定義・設計・QAはすべて人間が主導します。機密情報はAIに入力しない運用ルールを徹底しています。',
  },
  {
    q: '納期はどのくらいですか？',
    a: '規模によりますが、標準的な業務システムの中核機能は2〜4週間単位で段階リリースを計画します。要件・連携先・確認範囲に合わせて調整します。',
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
    slug: 'ai-edu-platform',
    industry: '教育業',
    service: 'edtech',
    link: 'http://www.8x9.jp',
    title: 'AI教育プラットフォーム',
    summary: 'Minecraft Java EditionベースのAI・プログラミング教育EdTechプラットフォームを設計・開発。全5章のカリキュラムを完成させ10年以上継続運営中。',
    challenge: '子供向けプログラミング教育に適した市販のEdTech環境がなく、GraalVM上でJS/Pythonランタイムを統合したマルチ言語学習基盤が必要でした。',
    solution: 'GraalVM上でJavaScript/Pythonランタイムを統合。Kotlin Coroutinesで数十名同時接続を安定処理。OSSプラグインをModrinthで公開。',
    tech: ['Kotlin', 'Java', 'GraalVM', 'TypeScript', 'React', 'LiveKit', 'Docker'],
    before: { period: '教育開始前', quality: '既製EdTechなし' },
    after: { period: '10年以上継続', quality: 'マルチ言語学習環境' },
    impact: '10年以上継続運営',
  },
  {
    slug: 'online-lesson-tool',
    industry: '教育業',
    service: 'edtech',
    title: 'オンライン授業ツール',
    summary: 'ビデオ通話・画面共有・リモートPC操作を統合したElectronベースのオンライン授業ツール。LiveKit自己ホストでSaaS比コストを大幅削減。',
    challenge: 'SaaS型ビデオ通話のコストが高く、講師が生徒のPCをリモート操作できる専用ツールが必要でした。',
    solution: 'LiveKit自己ホストでWebRTCを実現。ElectronとWebでコードベースを共有し、リモートPC操作・画面共有機能を実装。',
    tech: ['TypeScript', 'React', 'Electron', 'LiveKit', 'Vite', 'Docker Compose'],
    before: { period: 'SaaS利用時', quality: '高コスト・操作不可' },
    after: { period: '現在', quality: 'セルフホスト・低コスト' },
    impact: 'コスト大幅削減',
  },
  {
    slug: 'line-booking-system',
    industry: '教育業',
    service: 'web',
    title: 'LINE予約管理システム',
    summary: 'LINE LIFF連携で電話不要の予約フローを実現。LINE経由の予約率が全体の60%以上を達成。',
    challenge: '電話による予約・問い合わせ対応が業務の大きな負担となっており、保護者への連絡も手作業でした。',
    solution: 'LINE LIFFで予約フローを構築。Flex Messageでリッチ通知・リマインドを実装し、成長記録もLINEで共有。',
    tech: ['Node.js', 'Vue.js', 'LINE Messaging API', 'LINE LIFF', 'PostgreSQL'],
    before: { period: '導入前', quality: '電話・手作業対応' },
    after: { period: '現在', quality: 'LINE予約60%以上' },
    impact: '電話対応工数を大幅削減',
  },
  {
    slug: '3d-scan-system',
    industry: 'Web・EC・Web3',
    service: 'ai-development',
    title: '3D空間スキャンシステム',
    summary: 'iOSのLiDARで撮影した空間データから3DGS（3D Gaussian Splatting）ファイルを自動生成するWebサービス。',
    challenge: 'LiDARで撮影した空間データから高品質な3DGSファイルを自動生成するパイプラインが必要でした。',
    solution: 'iOSアプリでLiDAR撮影を実装し、GCP上でPython/Open3D/COLMAPによる3DGS生成パイプラインを構築。メタ情報抽出ツールも開発。',
    tech: ['Swift', 'Python', 'PyTorch', 'Open3D', 'COLMAP', 'Blender', 'GCP'],
    before: { period: '開発前', quality: '手動3D作成' },
    after: { period: 'リリース後', quality: '自動3DGS生成' },
    impact: '3D生成を完全自動化',
  },
  {
    slug: 'ai-pose-detection',
    industry: 'ヘルスケア・医療',
    service: 'mobile',
    title: 'AI画像認識アプリ（ヨガポーズ判定）',
    summary: 'Google MLToolKitの骨格検出で関節角度を計算し、カメラ映像から30fps以上でリアルタイムにヨガポーズをAI判定。',
    challenge: 'MLToolKit・TFLite・MediaPipeの中から最適な技術を選定し、30fps以上のリアルタイム骨格推定を実現する必要がありました。',
    solution: '3ライブラリを比較検証してMLToolKitを採用。骨格座標33点から関節角度計算アルゴリズムを設計し、30fps超のリアルタイム処理を達成。',
    tech: ['Flutter', 'Dart', 'Kotlin', 'Swift', 'Firestore', 'MLToolKit', 'Firebase'],
    before: { period: '開発前', quality: '目視でポーズ確認' },
    after: { period: 'リリース後', quality: 'AI判定30fps以上' },
    impact: 'リアルタイムAI判定実現',
  },
  {
    slug: 'payment-app',
    industry: 'フィンテック',
    service: 'mobile',
    title: '決済サービスアプリ',
    summary: 'SSL Certificate Pinning・生体認証・PCI DSS準拠設計を徹底した決済iOS/Androidアプリを約10ヶ月で開発。',
    challenge: 'トークナイゼーション・暗号化通信・中間者攻撃対策など、決済アプリに求められる高度なセキュリティ要件を満たす必要がありました。',
    solution: 'SSL Certificate Pinning・生体認証・画面キャプチャ防止・冪等性制御を実装。PCI DSS準拠を意識したセキュリティ設計を徹底し約10ヶ月で納品。',
    tech: ['Flutter', 'Dart', 'iOS', 'Android', 'Firebase'],
    before: { period: '開発前', quality: '決済基盤なし' },
    after: { period: '約10ヶ月', quality: 'PCI DSS準拠設計' },
    impact: 'PCI DSS準拠達成',
  },
  {
    slug: 'video-streaming-app',
    industry: 'メディア・エンタメ',
    service: 'mobile',
    title: '動画配信アプリ',
    summary: 'HLS/DASH適応ビットレート・DRM（Widevine/FairPlay）・オフラインダウンロード対応の動画配信iOS/Androidアプリ。',
    challenge: 'HLS/DASH・DRM保護・オフライン再生・PinP・字幕など多機能プレイヤーをFlutterのPlatform Channelで実現する必要がありました。',
    solution: 'Platform Channelでネイティブ動画エンジンを統合。Widevine/FairPlay DRM・オフラインダウンロード・プリフェッチで再生開始時間を短縮。',
    tech: ['Flutter', 'Dart', 'Kotlin', 'Swift', 'Platform Channel'],
    before: { period: '開発前', quality: '基本再生のみ' },
    after: { period: 'リリース後', quality: 'DRM・オフライン対応' },
    impact: 'エンタープライズ級プレイヤー',
  },
  {
    slug: 'iot-smarthome-app',
    industry: 'IoT・スマートホーム',
    service: 'iot',
    title: 'IoTスマートホームアプリ',
    summary: 'BLE経由でカーテン・照明を操作し、JSON定義に基づくUI動的生成でアプリ更新なしにデバイス拡張が可能。',
    challenge: 'デバイス構成が頻繁に変わる中、アプリ更新なしでUIを追加・変更できる柔軟なアーキテクチャが必要でした。',
    solution: 'サーバーから取得したJSON定義を元にUIを動的自動生成する仕組みを設計・実装。BLE接続管理（スキャン・ペアリング・再接続）も実装。',
    tech: ['Flutter', 'Dart', 'BLE', 'iOS', 'Android'],
    before: { period: '開発前', quality: 'デバイス変更→アプリ更新必要' },
    after: { period: 'リリース後', quality: 'JSON定義で動的更新' },
    impact: 'アプリ更新なしで拡張可能',
  },
  {
    slug: 'healthcare-ble-app',
    industry: 'ヘルスケア・医療',
    service: 'iot',
    title: 'ヘルスケアBLEアプリ',
    summary: '呼気検査デバイスとBLE連携し、リアルタイム波形グラフ表示・検査結果判定・PDF/CSVレポート出力を搭載。',
    challenge: '精度と信頼性が求められるヘルスケア領域で、BLEプロトコル設計から波形表示・レポート出力まで一貫した実装が必要でした。',
    solution: 'BLE通信プロトコル設計・デバイス自動再接続・リアルタイム波形グラフ・検査結果判定・PDF/CSVレポートを一貫して実装。',
    tech: ['Flutter', 'Dart', 'BLE', 'iOS', 'Android'],
    before: { period: '開発前', quality: '手動検査・紙記録' },
    after: { period: 'リリース後', quality: 'リアルタイム波形+レポート' },
    impact: 'デジタル検査を実現',
  },
  {
    slug: 'blockchain-management',
    industry: 'Web・EC・Web3',
    service: 'web',
    title: 'ブロックチェーン管理システム',
    summary: 'AIモデルをNFT/ブロックチェーンで資産管理するシステムのフロントエンドをAtomic Designで一から構築。20数画面を担当。',
    challenge: 'プロトタイプから本番移行にあたり、Atomic Designのコンポーネント基盤とWeb3.js連携レイヤーをゼロから構築する必要がありました。',
    solution: 'Atomic DesignでUI基盤を整備し、Web3.js/Ethers.jsによるスマートコントラクト呼び出しレイヤーを設計。20数画面の設計・実装を担当。',
    tech: ['TypeScript', 'React', 'Next.js', 'Web3.js', 'Ethers.js'],
    before: { period: 'プロトタイプ時', quality: 'UI基盤なし' },
    after: { period: 'リリース後', quality: '20数画面を本番構築' },
    impact: 'Web3フロントエンド確立',
  },
  {
    slug: 'child-safety-app',
    industry: 'IoT・スマートホーム',
    service: 'mobile',
    title: '子供見守りアプリ（Android保守開発）',
    summary: 'NDK/JNI音声処理・Stripe決済・NFC/FeliCa交通系IC連携を含む子供見守りAndroidアプリの保守・機能開発を担当。',
    challenge: 'NDK/JNI・Stripe・FeliCaなど多岐にわたる技術領域の保守と、レガシーコードのJetpack近代化を同時に進める必要がありました。',
    solution: 'NDK/JNIネイティブ音声実装・FeliCa残高/乗車履歴取得・Stripe SDK連携を実装。レガシーコードのJetpackアーキテクチャへの段階的マイグレーションを推進。',
    tech: ['Android', 'Kotlin', 'Java', 'NDK', 'BLE', 'Stripe SDK', 'NFC', 'FeliCa'],
    before: { period: '保守前', quality: 'レガシーアーキテクチャ' },
    after: { period: '現在', quality: 'Jetpack段階移行中' },
    impact: '多機能保守・近代化推進',
  },
  {
    slug: 'salesforce-ec-site',
    industry: 'Web・EC・Web3',
    service: 'web',
    title: 'SalesForce連携ECサイト',
    summary: 'SalesForce顧客・販売情報とソフトウェアキー発行サーバーを連携したライセンス販売Webサイトを構築。',
    challenge: 'SalesForceの顧客・販売情報とソフトウェアキー発行サーバーを連携させたECサイトが必要でした。',
    solution: 'LaravelでOAuth2.0認証フローを実装し、Vue.js/TypeScriptでSPA管理画面・購入フローを構築。DockerHub×GitHub WebhookでCI/CDも整備。',
    tech: ['PHP', 'Laravel', 'Vue.js', 'TypeScript', 'MySQL', 'Docker', 'AWS', 'SalesForce'],
    before: { period: '開発前', quality: '連携システムなし' },
    after: { period: 'リリース後', quality: '販売・キー発行を自動化' },
    impact: 'ライセンス販売を自動化',
  },
]

/* ── Blog Posts ───────────────────────────────────────────── */
export const BLOG_POSTS = [
  {
    slug: 'ai-development-cost-reduction',
    category: '開発事例',
    title: 'AI活用で業務システム開発を段階導入した話',
    excerpt: '生成AIを要件整理・設計・実装補助に活用し、業務システムを短いサイクルで確認しながら進める方法を紹介します。',
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
  { num: '2〜4週間', label: '段階リリース目安' },
  { num: 'AI＋人', label: 'レビュー体制' },
]
