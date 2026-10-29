# 現状調査レポート

## 調査範囲と基準

- 対象は現在のローカル作業ツリー `D:\Website\portfolio-site`。実ファイル、HTML/CSS/JavaScript、Git状態を調査した。
- 作業時点: 2026-10-30。ブランチ `main`、HEAD `8452e6d`。リモート `origin` は `https://github.com/shimizu-hinata/portfolio.github.io.git`。
- 本レポートはローカルで確認できる構成とページ記述の棚卸しであり、作品ソースや公開ページとの一致、外部リンクの到達性、GitHub Pagesの管理画面設定を保証しない。

## リポジトリ構成と役割

| パス | 内容・役割 | 備考 |
|---|---|---|
| `index.html` | トップページ、プロフィール導入、強み・成長領域、カテゴリーフィルター付き作品一覧 | 代表作品4、その他3、技術検証・小作品6のカード。動画制作枠はHTMLコメント内 |
| `algomate.html` | Algomate Colonyの紹介・技術解説 | チーム制作と記載 |
| `bombcrash.html` | Bomb Crashの紹介・技術解説 | チーム制作と記載 |
| `fingerdojo.html` | 指道場（FingerDojo）の紹介・技術解説 | 試作段階と記載 |
| `kaomoji.html` | Kaomoji Clash初版の紹介・技術解説 | 個人制作と記載 |
| `kaomoji-reloaded.html` | Reloadedの紹介、初版比較、制作状況 | 制作中と記載 |
| `single.html` | 旧 `?post=` URLを個別作品ページへ振り分ける互換案内 | 現在の作品一覧から使われる導線かは未確認 |
| `assets/css/main.css` | モジュールCSSを束ねる入口 | Sassのコンパイル手順・出力関係は未確認 |
| `assets/css/modules/` | 7つの分割CSS。preflight、base、grid、elements、content、layout、portfolio固有スタイル | `00-preflight.css` がFont AwesomeとGoogle Fontsを読み込む |
| `assets/sass/` | Sassエントリーポイントとbase/components/layout/libsのソース | 合計33ファイル。ビルドマニフェスト・コマンドは未発見 |
| `assets/js/` | 7ファイル。jQuery、HTML5 UP系ブラウザー/ブレークポイント・ユーティリティ・サイトスクリプト、作品フィルター | `index.html` のみ `portfolio-filter.js` を追加読み込み |
| `assets/webfonts/` | Font Awesomeのbrands、regular、solid各フォントを5形式で格納 | 合計15ファイル |
| `images/` | 画像35点。作品サムネイル、ロゴ、プロフィール画像、詳細画面素材 | 合計約10.2 MB |
| `movies/` | MP4動画4点。作品紹介・Unity Editorでのデータ作成映像 | 合計約15.0 MB |
| `README.txt` | HTML5 UP「Future Imperfect」テンプレートの説明・クレジット | 作品仕様のREADMEではない |
| `LICENSE.txt` | リポジトリに同梱されたライセンス文書 | 適用範囲・各素材の権利関係は別途確認が必要 |
| `.agents/` | 空ディレクトリ | 調査時点でファイルなし |
| `docs/portfolio-improvement/` | 本プロジェクトの内部管理資料 | 公開ページには自動掲載されない |

トップ階層のHTMLは7件。ローカル一覧ではUnityプロジェクト、C#ソース、テストプロジェクト、`package.json`、npm/yarn/pnpmロックファイルを確認していない。

## ページ・作品一覧

| ページ／掲載項目 | トップページ上の分類 | ページで確認できる概要 | 調査上の注意 |
|---|---|---|---|
| Algomate Colony (`algomate.html`) | 代表作品 | コマンド入力、資源採集・運搬、拠点運営。コマンド検証・実行やロボット移動の解説と画面素材を掲載 | 「本人の担当」「開発期間」「Unityバージョン」等はページ記載。一次資料・本人確認は未実施 |
| Kaomoji Clash (`kaomoji.html`) | 代表作品 | 顔文字パーツのビルド、アリーナ戦闘、ScriptableObjectとカスタムエディタの解説。PC/Androidのリンクあり | 実行ファイル、ソース、動画の現状・アクセス権は未確認 |
| Kaomoji Clash / Reloaded (`kaomoji-reloaded.html`) | 代表作品 | ドラッグ射出、ウェーブ戦闘、成長要素、初版との比較 | ページ上は制作中。初版カードとは別作品として代表作品に数えられている |
| Bomb Crash (`bombcrash.html`) | 代表作品 | 敵ボム迎撃アクション。Wave生成・スポーン・スキル処理の解説 | ページ上の担当・開発期間・バージョン記載を一次資料と照合する必要あり |
| 指道場（FingerDojo） (`fingerdojo.html`) | その他 | タイミングQTE型の1対1バトル。戦闘コマンドと状態・ダメージ処理を説明 | ページ上は試作段階。デザイナー名の表記がページ内で異なる |
| AbsoluteColor - 絶対色感 | その他 | UnityroomのRGBスライダー型ゲームへの外部リンク | 開発担当・制作規模・掲載継続の価値は未確認 |
| 超回転！ぶーめらんブレード | その他 | Unityroomのゲームへの外部リンク | 開発担当・制作規模・掲載継続の価値は未確認 |
| ECS Performance & ShaderGraph | 技術検証・小作品 | YouTube動画と短い説明 | 技術主張、使用構成、担当範囲を未照合 |
| UIToolkit & Gemini API | 技術検証・小作品 | YouTube動画と短い説明 | Gemini API連携の動作・公開時点・担当範囲を未照合 |
| Particle muzzle flash | 技術検証・小作品 | YouTube動画と短い説明 | 実装と動画の対応、担当範囲を未照合 |
| Addressable PC System | 技術検証・小作品 | YouTube動画と短い説明 | Addressables利用の範囲・実装と説明の一致を未照合 |
| Node Tree | 技術検証・小作品 | YouTube動画、noteへの導線 | 接続線実装のコード・説明との一致を未照合 |
| UIToolkit & ScriptableObject | 技術検証・小作品 | YouTube動画、CookingNote GitHubへの導線 | リポジトリの内容と担当範囲を未照合 |
| 動画制作4件 | 表示なし（HTMLコメント内） | `index.html` 内にカード記述が残る | 現行の表示・操作対象ではない。作品数に含めない |

トップページの見出し説明は「代表作品3作」とする一方、代表作品分類のカードは4件ある。技術検証・小作品とその他のカードは初期HTMLで `hidden` 属性が付いており、フィルター操作後の表示を想定した構成。

## HTMLと実行時依存関係

| 依存 | ローカルの場所／提供元 | ページ上の役割 |
|---|---|---|
| jQuery 3.6.0 | `assets/js/jquery.min.js` | HTML5 UP系の `main.js` の基盤 |
| breakpoints.js 1.0 | `assets/js/breakpoints.min.js`、@ajlkn、MIT表記 | レスポンシブブレークポイント判定 |
| browser.js 1.0.1 | `assets/js/browser.min.js`、@ajlkn、MIT表記 | ブラウザー・OS判定 |
| `util.js` | `assets/js/util.js` | テンプレート用ユーティリティ／プラグイン。実装詳細の棚卸しは未完了 |
| `main.js` | `assets/js/main.js` | jQueryを利用したメニュー、ブレークポイント時の要素配置など |
| `site.js` | `assets/js/site.js` | 動画埋め込み、ストーリー表示切替、互換記事選択、スクロール処理等 |
| `portfolio-filter.js` | `assets/js/portfolio-filter.js` | トップの作品カード絞り込み。ネイティブDOM APIを利用 |
| Font Awesome Free 5.15.4 | `assets/css/fontawesome-all.min.css` と `assets/webfonts/` | アイコンとフォント |
| Google Fonts | `00-preflight.css` 内の外部CSS URL | Source Sans ProとRalewayのフォント読込。ネットワークアクセスが発生 |
| YouTube | iframe埋め込み、`site.js` | 紹介映像と技術検証動画 |
| Google Drive | `site.js` の動画プレビュー／直接再生とリンク | 紹介映像、実行ファイル、制作資料 |
| GitHub / note / Unityroom | 外部リンク | ソース、記事、公開作品 |

HTMLファイルに外部URLで記述されるホストとして `drive.google.com`、`github.com`、`note.com`、`unityroom.com`、`www.youtube.com` を確認。Google FontsはCSSの外部依存。これらのURLのHTTP到達性・権限・現在の内容は未確認。

通常のパッケージマネージャ依存マニフェストは見当たらない。実際のビルド工程がないことまでは断定できず、Sassの生成・更新手順を確認する必要がある。

## GitHub Pagesの公開構成

- `origin` のリモートURLはGitHubリポジトリ `shimizu-hinata/portfolio.github.io`。
- ローカルのトップ階層に `index.html` と相対パスの `assets/`、`images/`、`movies/` がある。
- 調査時点で `.github/workflows/`、`CNAME`、`.nojekyll`、Jekyll設定候補、独自のPagesデプロイ設定ファイルは見つからなかった。
- リポジトリ名とユーザー指定の公開URL `/portfolio/index.html` のパス対応、GitHub Pages設定画面の公開元（ブランチ・ディレクトリまたはActions）、実際の公開コミットはローカルファイルだけでは確定できない。公開構成の事実確認が必要。

## Git状態と既存差分

作業開始時は `main` の `8452e6d`。以下はプロジェクト着手前から存在し、内容を保持している。

- `assets/css/modules/60-portfolio-new.css`: `:target` の強調表示と `prefers-reduced-motion` 対応を追加。
- `assets/js/site.js`: ハッシュ先へのスクロール処理と `load` 時処理を追加。

初期確認時はこの2ファイルが変更済みで、未追跡ファイルはなかった。管理資料の作成・移動は別途このプロジェクトの変更となる。

## 初期段階で見つかった確認対象

1. 代表作品の紹介文（3作）と分類カード（4件）の不一致。
2. FingerDojoページ内のデザイナー名表記に差異がある。
3. 制作期間、本人担当、制作状況、公開バイナリ、技術情報はページ記載のみで、一次資料・本人確認が必要。
4. 作品ソースは外部リポジトリへのリンクで、現行のサイト説明との一致は未確認。
5. ページ・動画・リポジトリ等の外部リンク到達性と公開権限は未確認。
6. GitHub Pagesの設定画面、ユーザー指定URLとの対応、公開対象ブランチは未確認。
7. 画像代替テキスト、動画iframe名、`user-scalable=no` を含むビューポート指定、キーボード操作、動きの軽減について、実装と実際の操作を含むアクセシビリティ検証が必要。
8. SassとCSSの生成関係・更新手順、HTML/CSSの品質チェック、ブラウザー検証方法は未確認。
9. 画像・動画の出典、チーム制作物・第三者データの掲載許可を確認する必要がある。

## この工程で実施していない検証

- 外部URLへのアクセスや到達性チェック
- GitHub Pages設定画面・公開URLの設定確認
- Unity/C#作品ソースのレビュー、ビルド、テスト
- HTML/CSSの自動チェック
- ブラウザーでのPC・スマートフォン表示確認
- アクセシビリティ監査、キーボード操作検査

これらは実施済みとして扱わない。工程1以降で証拠調査・本人確認と並行して、利用可能な検証方法を決める。
