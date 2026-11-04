# ポートフォリオのライト／ダークテーマ実装・検証報告

## 概要

全8ページにライト／ダーク切替を追加し、OS設定を初期値として尊重しながら、ユーザーの選択を保存するようにしました。既存のHTML、共通CSSモジュール、共通JavaScript構成を維持しています。

## 調査した問題と方針

- 旧スタイルには、明るい旧来の表面色と暗いポートフォリオ専用色、薄い文字色が混在していました。テーマ変数が無い色は、テーマ切替後も固定表示になる可能性がありました。
- 作品ページ内の暗い画像背景に通常の暗い文字色が置かれた箇所や、一般の補足色が暗いメディア面に使われた箇所を実ブラウザーで確認しました。
- 背景・表面・文字・アクセント・境界・操作状態をセマンティックトークンに整理し、画像・動画・暗いヒーローは一般テキストと分離しました。
- レイアウトを大きく変えず、作品カード・技術説明・目次・操作UIが両テーマで識別できるよう調整しました。

## テーマ切替の仕様

- `assets/js/theme-init.js` をCSSより前に同期実行し、初回描画前に `data-theme` を設定します。
- 優先順位は保存済みの `portfolio-theme`（`light` / `dark`）、OSの `prefers-color-scheme`、取得不能時の `dark` です。
- `assets/js/site.js` が全ページ共通のテキスト付きライト／ダークボタンを作り、`aria-pressed` と `localStorage` を更新します。保存機能が使えない場合も現在のページ内で切替できます。
- テーマ選択UIは固定位置に配置し、レイアウトの高さを変えません。キーボードフォーカス、44px以上のモバイル操作領域、`prefers-reduced-motion` にも対応します。

## 最終パレット

| 役割 | ライト | ダーク |
|---|---|---|
| ページ背景 | `#f3f6f8` | `#101820` |
| セクション背景 | `#e7eef3` | `#17232d` |
| カード背景 | `#ffffff` | `#202e39` |
| 浮上面 | `#f8fafc` | `#2a3a46` |
| 本文・見出し | `#17212b` | `#edf3f7` |
| 補足テキスト | `#405262` | `#c1ccd5` |
| 控えめなテキスト | `#4d5e6d` | `#a9b6c1` |
| アクセント／リンク | `#075e68` | `#4dd0e1` |
| Hoverアクセント | `#064b54` | `#62dcea` |
| 通常境界線 | `#6e8496` | `#7b8fa0` |
| コード背景／文字 | `#e8eef2` / `#17212b` | `#0b1218` / `#d7e6ee` |
| ボタン背景／文字 | `#075e68` / `#ffffff` | `#4dd0e1` / `#0c171c` |

暗いヒーローとメディアの背景は専用トークンで固定し、画像上の文字色や動画UIが通常テーマ色で反転しないようにしています。

## 3案の比較と選定

1. **ダーク・テクニカル** — `#101820`、青灰色の表面、シアンアクセント。技術的で落ち着き、カラフルなゲーム画像を引き立てますが、暗い画面を好まない閲覧者もいます。
2. **ニュートラル・モダン** — `#f3f6f8`、白いカード、濃い本文、深い青緑アクセント。柔らかく読みやすく、作品画像を選びにくい案です。
3. **クリエイティブ・エディトリアル** — `#faf8f3`、`#eee9df`、`#fffefa`、テラコッタ `#8e3f36` とティール `#225c61`。作品集らしい個性は強まりますが、色の階層管理と一貫性維持の負担が増えます。

最終的に1案に固定せず、**1と2をそれぞれダーク／ライトテーマとして採用**しました。3は比較用の未実装案です。採用理由は、ユーザーの好みに対応しながら、落ち着いた画面と作品画像の多様性を両立できるためです。詳細な比較は [COLOR_DESIGN_PROPOSAL.md](./COLOR_DESIGN_PROPOSAL.md) を参照してください。

## アクセシビリティとブラウザー検証

- [COLOR_CONTRAST_VERIFICATION.js](./COLOR_CONTRAST_VERIFICATION.js): テキスト、リンク、ボタン、タグ、コード、入力、フォーカス、境界など、ライト／ダーク各21項目を検証し **42/42合格**。
- 実ブラウザーで全8ページを両テーマで開き、合計1,884件の表示テキストノードを監査しました。計算済み文字色と背景色（透明度を含む）を比較した結果、4.5:1未満は0件、最小値は4.94:1でした。Bomb Crash、FingerDojo、Algomate Colonyのメディア周辺にあった低コントラスト箇所は、メディア面とパネルの役割を分けて修正しました。
- ブラウザー確認では、保存済みテーマの再読み込み後の維持、OS設定からの初期選択、ページ遷移後の継続、390px幅での操作性も確認しました。
- スクリーンショット比較はライト／ダークそれぞれの全対象ページで実施し、実際の表示を確認しています。16枚はセッション成果物の `files/theme-screenshots` に保存しました。

コントラスト比は画面上の全状態を自動証明するものではありません。DOM監査は計算済みの単色背景と透明度を合成して比較し、画像自体、動画フレーム、外部埋め込みの色は対象外です。画像上の文字は暗幕と専用の反転色を使い、スクリーンショットで目視確認しました。

参考： [WCAG 2.2 Contrast (Minimum)](https://www.w3.org/TR/WCAG22/#contrast-minimum)、[WCAG 2.2 Non-text Contrast](https://www.w3.org/TR/WCAG22/#non-text-contrast)、[Material Design 3 Color system](https://m3.material.io/styles/color/system/overview)、[Apple HIG Color](https://developer.apple.com/design/human-interface-guidelines/color)。

## 変更ファイルと適用範囲

- カラートークンとモジュール: `assets/css/modules/00-color-system.css`, `10-base.css`, `30-elements.css`, `40-content.css`, `50-layout.css`, `60-portfolio-new.css`
- 初期表示・操作: `assets/js/theme-init.js`, `assets/js/site.js`
- 初期化スクリプトをCSSより前に追加: `index.html`, `bombcrash.html`, `kaomoji.html`, `kaomoji-reloaded.html`, `fingerdojo.html`, `algomate.html`, `absolutecolor.html`, `swordslicer.html`
- 検証・報告: `COLOR_CONTRAST_VERIFICATION.js`, `COLOR_DESIGN_PROPOSAL.md`, `COLOR_DESIGN_REPORT.md`, `PROJECT_COMPLETION_SUMMARY.md`

## 未解決事項

実ブラウザーでローカル表示と外部動画プレイヤーを確認しました。ネットワークに依存する外部動画の再生可否は検証環境に左右され、テーマ切替の合否には含めていません。
