# 株式会社ハックラボ コーポレートサイト（リニューアル版）

```
index.html          ページ本体
scss/               スタイルのソース（ここを編集）
  _themes.scss      配色テーマ（空 / ミント / 朝日）の色定義
  _variables.scss   フォント・ブレークポイント・ミックスイン（色はテーマの CSS 変数を参照）
  _animations.scss  キーフレームとスクロール連動表示の仕組み
  _base.scss        リセット・共通レイアウト・カーソル・進捗バー
  _loader.scss      オープニングローダー
  _header.scss      ヘッダー／ナビ／モバイルメニュー
  _hero.scss        ファーストビュー（オーブ・グリッド・ターミナル）
  _components.scss  ボタン・見出し・マーキー・カード
  _sections.scss    各セクション（強み〜フッター）
  style.scss        エントリーポイント
css/style.css       コンパイル済みCSS（index.html が読み込むファイル）
js/main.js          アニメーション制御（パーティクル、タイピング、カウンター、傾き効果 など）
assets/favicon.svg
assets/team/        代表・CTO の写真
assets/brand/       公式ロゴ、8x9 ロゴ、AIダイエットコーチのアイコン
```

## SCSS のビルド

```bash
npx sass scss/style.scss css/style.css --no-source-map            # 1回だけビルド
npx sass --watch scss/style.scss css/style.css --no-source-map    # 保存のたびに自動ビルド
```

## メモ

- `prefers-reduced-motion` が有効な環境では、アニメーションをすべて止めて内容をそのまま表示します。
- JavaScript が無効な環境でも、ローダーや非表示状態が残らず全文を読めます。
- お問い合わせフォームは送信のたびに2か所へ送ります。
  1. **メール**：[Web3Forms](https://web3forms.com) 経由で `kenzaumezaki@gmail.com` に届きます。返信先（Reply-To）は送信者のアドレスなので、そのまま返信できます。
  2. **Google フォーム**：これまで通り回答がスプレッドシートに残ります。「ご相談の種類」は、お問い合わせ内容の先頭に `【ご相談の種類】…` として付けて送ります。
  - 画面の成否表示はメール送信の結果で判断します（Google フォームは CORS ヘッダーを返さず成否を取得できないため、送りっぱなしです）。

### メール送信の有効化（必須）

`index.html` の `id="cf-key"` の `value` が `PASTE_WEB3FORMS_ACCESS_KEY` のままだと、**メールは送られません**（Google フォームへの記録だけが行われ、ブラウザのコンソールに警告が出ます）。

1. <https://web3forms.com> で `kenzaumezaki@gmail.com` を入力し、届いたアクセスキーを控える。
2. `index.html` の `<input type="hidden" id="cf-key" name="access_key" value="…">` にそのキーを貼る。

アクセスキーは公開前提の値です（そのキーで送れる宛先は登録した1アドレスだけ）。送信先を変えるときは、新しいアドレスでキーを取り直して差し替えてください。`js/main.js` 側にアドレスは書かれていません。

- スパム対策として `name="botcheck"` の隠しチェックボックス（ハニーポット）を置いています。人間には見えず、チェックが入った送信は Web3Forms 側で破棄されます。
- JavaScript が無効な環境では、フォームは Google フォームにのみ送信されます（メールは飛びません）。
- Google フォームの質問を変更・追加した場合は、`index.html` の `entry.XXXX` と `js/main.js` の送信処理も合わせて更新してください。
- オープニングは、同じタブで2回目以降に開くと約半分の長さになります（`sessionStorage`）。クリックかキー入力で飛ばせます。
- `assets/team/`・`assets/brand/` の画像とロゴは 0x48lab.com から取得したものです。Web用に WebP 版を作ってあり、元の PNG と SVG も同じフォルダに残しています。

## 配色テーマ

画面左下のボタンで、3つの配色を切り替えられます。選んだテーマはブラウザに保存されます（`localStorage` の `hl-theme`）。

| テーマ | `data-theme` | 背景 | メイン | 差し色 |
|---|---|---|---|---|
| 空と公式ブルー（初期値） | `sky` | `#f6f9fd` | `#2490f3` | `#ffc83d` |
| ミントと海 | `mint` | `#f3faf7` | `#00a884` | `#ff6b57` |
| 朝日とコーラル | `sunrise` | `#fffaf3` | `#ff5a36` | `#1f8a99` |

- 色を変えるときは `scss/_themes.scss` だけを編集します。その他の SCSS は `$accent` などの変数を通して CSS 変数を参照しています。
- 半透明の色は `a(accent, .2)` のように書きます（`rgb(var(--accent-rgb) / .2)` に展開されます）。
- 最初に表示するテーマを固定したい場合は、`index.html` の `<head>` にあるスクリプトの `"sky"` を変更します。切り替えボタンが不要な場合は、`.theme-switch` 要素を削除してください。

## 対応業界の写真

- `assets/industries/` の写真は Unsplash から取得したものです（Unsplash License：商用利用可、クレジット表記は任意）。撮影者名と元ページは `assets/industries/credits.json` にまとめ、各写真の左下にもクレジットを表示しています。
- 写真を差し替えるときは、同じファイル名（例：`manufacturing.webp`、1600×1000 程度）で上書きしてください。
- パネル右下の「SAMPLE UI」は画面イメージです。数値は表示例で、実際の実績値ではありません。

## 強みセクションの素材

- 写真：`assets/strengths/`（`s01-ai.webp`〜`s06-education.webp`、縦長 4:5）は Unsplash（Unsplash License）。撮影者と元ページは `assets/strengths/credits.json` にあります。
- PC では左の写真が、画面中央にある項目に合わせて切り替わります。写真を差し替えるときは同じファイル名で上書きしてください。

## トップの背景動画

- 素材：Mixkit「Software developer working while drinks coffee」（#1730、[Mixkit Stock Video Free License](https://mixkit.co/license/)：商用利用可、クレジット不要）。
- `assets/video/hero-1080.mp4`（幅1100px以上の大きな画面）と `hero-720.mp4`（それ以外）を自動で使い分けます。どちらも音声なし・H.264 で、末尾を先頭にクロスフェードさせて、ループのつなぎ目が見えないようにしています。静止画は `hero-poster.webp` です。
- オープニングが終わってから再生を始めます。ヒーローが画面外に出たときやタブを切り替えたときは止まり、右下の「BG VIDEO」ボタンでいつでも一時停止できます。`prefers-reduced-motion` やデータセーバーが有効な環境では、静止画だけを表示します。

## セクションの背景写真

- `assets/backgrounds/` の写真は Unsplash（Unsplash License）から取得しました。撮影者と元ページは `assets/backgrounds/credits.json` にあります。
- 使っているセクション：Why HackLab（`intro`）、数字の帯（`numbers`）、開発プロセス（`process`）、沿革（`history`）、会社概要（`company`）、お問い合わせ（`contact`）。
- 各セクションの先頭にある `<div class="sbg sbg--…">` が背景です。見せ方は `scss/_components.scss` の `.sbg` で切り替えます（`wash`：薄く全面、`duo`：メインカラーの二色調、`rise`：下から立ち上がる、`dark`：濃い色を重ねる）。不要なセクションは、この `div` を削除するだけで外せます。
- 写真はスクロールに合わせてわずかに動きます（`prefers-reduced-motion` が有効な環境では動きません）。
- AIダイエットコーチのスマホ画面の背景（`assets/brand/aidiet-chat-bg.webp`）も Unsplash の写真です。出典は `assets/backgrounds/credits.json` の `aidiet-chat` にあります。

## サービスセクションの写真

- `assets/services/` の写真は Unsplash（Unsplash License）。撮影者と元ページは `assets/services/credits.json` にあります。
- PC では各サービスの行にカーソルを乗せると左側の写真が切り替わり、スマホ・タブレットでは行の中に写真を表示します。

## 開発シミュレーター（サービスセクション）

- 「つくるもの・規模・必要な機能」を選ぶと、構成図・開発期間の目安・想定技術がその場で更新されます。旧サイト（0x48lab.com）へのリンクはすべて外しました。
- 期間は `js/main.js` の `KIND` / `SIZE` / `OPT` で決めています（週数と技術名はここを編集）。**あくまで目安**で、画面にもその旨を明記しています。実績値ではありません。
- 「この内容で相談する」を押すと、選んだ内容がお問い合わせ本文の先頭に入ります。
- パネルは「製図コンソール」の構成です。上の `.sim__head` が現在の構成（`WEB / M / 04 MODULES`）とリビジョン番号、左の `.sim__console` が入力、右の `.sim__canvas` が構成図＋表題欄（`.tblock`）、下の `.sim__foot` が期間・技術・CTA です。左右のカラムは高さが揃うように作ってあります。
- 開発期間は**2本とも同じ軸で描いています**（`js/main.js` の `scaleFor` / `drawAxis`）。塗りつぶしが下限、斜線が上限までの幅です。軸の目盛りは必ず右端で終わるように刻み幅を決めています。
- 構成図は `index.html` の `<svg class="bp">` です。ブロックは `data-node="…"`、配線は `data-link="…"` で、`js/main.js` の `KIND.nodes` / `OPT.node` / `LINKS` が名前でひも付けています。選ばれていないブロックは破線のゴーストとして薄く残ります。
- 画面幅が狭いときは構成図だけを横スクロールします（`.bp__scroll`）。
