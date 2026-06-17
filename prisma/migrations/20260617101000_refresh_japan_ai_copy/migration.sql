UPDATE "AiDevSolution"
SET "desc" = 'シニアエンジニアが設計・実装・QAをレビューし、AI任せにしない品質管理を行います。'
WHERE "title" = '品質レビューを標準化'
  AND "desc" = '20年の開発経験をもつエンジニアが設計・実装・QAをレビューし、AI任せにしない品質管理を行います。';

UPDATE "AiDevProcessStep"
SET "desc" = 'AIを活用して実装を進め、シニアエンジニアが設計・コード・動作をレビューします。'
WHERE "num" = '3'
  AND "desc" = 'AI×20年の経験で高速に実装し、設計・コード・動作をレビューします。';

UPDATE "AiDevFaqItem"
SET "a" = 'シニアエンジニアがAIの出力をレビューします。AI任せにせず、人間の設計判断と検証を組み合わせて品質を確認します。'
WHERE "q" = '品質は大丈夫ですか？'
  AND "a" = '20年の設計・検証ノウハウを持つシニアエンジニアがAIの出力をすべてレビューします。AI任せにせず、人間の経験と組み合わせることで高品質を担保しています。';

UPDATE "LpProblem"
SET "text" = '見積もりの前に、費用・納期・実現範囲の目安が知りたい'
WHERE "text" = '見積もりを取ったら500万円以上になり、諦めてしまった';

UPDATE "LpProblem"
SET "text" = 'エンジニア不足で改善したい業務が後回しになっている'
WHERE "text" = 'エンジニア不足で年々開発コストが上がり、困っている';

UPDATE "LpSolution"
SET
  "title" = '短い単位で設計・実装',
  "desc" = 'AIを要件整理・実装補助・テスト観点の整理に使い、2〜4週間単位で確認できる状態を目指します。'
WHERE "num" = '01'
  AND "title" = 'コスト1/5〜1/10';

UPDATE "LpSolution"
SET
  "title" = 'シニアレビューで品質確認',
  "desc" = 'AI任せにせず、設計・実装・QAを人が確認。業務運用に必要な権限・入力ルール・例外対応まで見ます。'
WHERE "num" = '02'
  AND "title" = '納期最大1/10';

UPDATE "LpSolution"
SET "desc" = '大きなパッケージありきではなく、現場で使う中核機能から始めて段階的に改善します。'
WHERE "num" = '03'
  AND "title" = '必要なものだけを作る'
  AND "desc" = '大きなパッケージを買わなくていい。最小限のコストで要件にぴったりのシステムを構築します。';

UPDATE "LpComparisonRow"
SET
  "traditional" = '大きな初期見積もりになりやすい',
  "ours" = '中核機能から範囲を区切って見積もり'
WHERE "item" = '費用'
  AND "traditional" = '500万円以上';

UPDATE "LpComparisonRow"
SET "ours" = '2〜4週間単位で段階リリース'
WHERE "item" = '期間'
  AND "ours" = '2〜4週間（最大1/10）';

UPDATE "LpComparisonRow"
SET "ours" = 'AI補助＋シニアレビュー'
WHERE "item" = '品質保証'
  AND "ours" = 'AI＋人間の20年QA知識';

UPDATE "LpResult"
SET
  "beforeCost" = 'Excel・手作業',
  "beforePeriod" = '確認に時間がかかる',
  "afterCost" = '管理画面化',
  "afterPeriod" = '3週間目安',
  "saving" = '入力と確認の流れを整理'
WHERE "industry" = '製造業'
  AND "title" = 'CRM構築'
  AND "saving" = 'コスト84%削減';

UPDATE "LpResult"
SET
  "beforeCost" = '電話・メール中心',
  "beforePeriod" = '対応漏れが発生',
  "afterCost" = '予約を一元管理',
  "afterPeriod" = '2週間目安',
  "saving" = '予約変更と通知を整理'
WHERE "industry" = 'サービス業'
  AND "title" = '予約システム'
  AND "saving" = 'コスト80%削減';

UPDATE "LpResult"
SET
  "beforeCost" = '担当者依存',
  "beforePeriod" = '発注判断が属人化',
  "afterCost" = '在庫アラート',
  "afterPeriod" = '4週間目安',
  "saving" = '発注候補を可視化'
WHERE "industry" = '卸売業'
  AND "title" = '在庫・受発注管理'
  AND "saving" = 'コスト85%削減';

UPDATE "LpFaqItem"
SET
  "q" = 'なぜ短い期間で開発できるのですか？',
  "a" = '要件整理・設計・実装補助・テスト観点の洗い出しにAIを活用し、シニアエンジニアが判断とレビューを担うためです。最初から大きく作り込まず、中核機能から段階導入します。'
WHERE "q" = 'なぜこんなに安くできるのですか？';

UPDATE "LpFaqItem"
SET "a" = 'シニアエンジニアがAIの出力をレビューします。AI任せにせず、人間の設計判断と検証を組み合わせて品質を確認します。'
WHERE "q" = '品質は大丈夫ですか？'
  AND "a" = '20年の設計・検証ノウハウを持つシニアエンジニアがAIの出力をすべてレビューします。AI任せにせず、人間の経験と組み合わせることで高品質を担保しています。';

UPDATE "LpFaqItem"
SET "a" = '規模によりますが、標準的な業務システムの中核機能は2〜4週間単位で段階リリースを計画します。要件・連携先・確認範囲に合わせて調整します。'
WHERE "q" = '納期はどのくらいですか？'
  AND "a" = '規模によりますが、標準的なシステムで2〜4週間を想定しています。従来の開発と比べて最大1/10の期間で納品が可能です。';

UPDATE "BlogPost"
SET
  "title" = 'AI活用で業務システム開発を段階導入した話',
  "excerpt" = '生成AIを要件整理・設計・実装補助に活用し、業務システムを短いサイクルで確認しながら進める方法を紹介します。'
WHERE "slug" = 'ai-development-cost-reduction'
  AND "title" = 'AI活用でシステム開発コストを1/5に削減した話';
