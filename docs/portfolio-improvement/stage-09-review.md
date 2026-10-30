# 工程09 — 公開文章・作品構成の再監査

## 目的と判定

2026-10-30、対象URL `https://shimizu-hinata.github.io/portfolio/index.html` とローカルのHTMLを照合し、採用担当者が作品の概要・担当・制作状態を短時間で把握できること、エンジニアが実装根拠へ進めることを基準に公開文を見直した。

編集前のトップと5作品ページ（Kaomoji Clash、Kaomoji Clash / Reloaded、Bomb Crash、Algomate Colony、指道場）の公開内容を取得した。公開ページと編集前のローカルHTMLは、確認した本文・見出しの範囲で一致していた。以降に行った工程09の修正は未デプロイのため、現在の公開ページは修正前の文面である。HTMLファイルのバイト単位比較、Pagesの公開元設定、未取得のページ・外部素材の完全な照合は行っていない。

## 問題一覧と修正理由

| 優先度 | 問題 | 修正理由 |
|---|---|---|
| P0 | Reloadedページに「README記載では」「調査時点のコードと資料から整理」「コードから確認できる処理」「静的なコード読解」など、内部監査の手順を説明する表現が残っていた | 読者が知りたいゲームの仕組み・制作状態ではなく、調査者の作業を前面に出していた。処理の具体的な内容と、制作中であることに置き換える |
| P0 | Reloadedの制作状態を概要カード、動画、比較、開発状況の複数箇所で繰り返し、プレイ・ビルド未確認などの調査注記も重ねていた | 制作途中という必要な情報は一度明確に伝え、重複を減らす。動作確認していない機能を確認済みとは表現しない |
| P1 | 初版とReloadedの比較が「コード上の違い」としていたが、比較条件や実画面はそろっておらず、共通点と相違点も読み取りにくかった | 同じ顔文字題材を扱う別プロジェクトとして関係を先に説明し、ビルド・戦闘・進行の違いに絞る。初版は代表作品、Reloadedは開発中記録として残す |
| P1 | 作品ページの「調査時点のソース」などのリンク名や「公開リポジトリのコードでは確認できます」という導入が、複数ページで調査報告の口調になっていた | 具体的な機能の説明から対応コードへ直接進めるようにし、外部リンクの参照先（SHA固定）は維持する |
| P1 | 作品ページに本人が実施すると確認できていない「今後の改善候補」が、制作者自身の予定と受け取られる形で掲載されていた | 実際に取り組む意思を確認できない提案は公開ページから外し、技術的な検討候補は内部の調査資料に残す |
| P1 | Algomate Colonyのページ見出しは「AlgomateColony」、トップと他の表記は「Algomate Colony」 | 掲載名をそろえ、採用担当者が別作品と誤認しないようにする |
| P1 | Kaomoji Clashのタグ補正説明は処理順を示す一方、コード計算の結果がどこに保持されるかが説明されていなかった | 既存コードの `PlayerUpgradeService.UpgradedStatus` を説明に加え、機能→データ処理→コードのつながりを強める |
| P1 | Reloadedでコードと対応するゲーム画面・Inspector静止画がなく、既存動画の内容と実装との対応も確認できていない | 実在しない画面を作らず、動画をテスト証拠として説明しない。画像を増やさず、コードの流れを本文とリンクで示す |
| P2 | トップに「今後伸ばしたいこと」の抽象的な自己評価があるかを再確認する必要があった | 現在のトップには当該セクションがなく、作品別の具体的な実装例へつなぐ構成になっている。新たな予定・意欲は作らず、この構成を維持する |

## Kaomoji Clash初版とReloadedの掲載判断

両方を残す。公開READMEと固定したソース版では、初版は顔文字パーツのタグ集計とスタック数に応じたステータス補正を説明しやすく、本人確認済みの個人制作・企画・プログラミング担当がある。Reloadedは別リポジトリの制作途中プロジェクトで、ドラッグ距離とSpeedを使う発射力計算、衝突速度に基づくダメージ、BattleStateによるWave進行、経験値とArenaObjectの選択・強化を含む。機能の重複はあるが、同一作品の完成版・更新版として扱う根拠はなく、実装の軸と開発状態が異なる。

そのため、初版はトップの代表作品とし、Reloadedは「補足作品・開発中」のフィルター内に置く。初版との違いを一度だけ説明し、別ページを開く導線を維持する。Reloadedを完成済み作品として数えず、作品の統合・削除もしない。

## 公開文の改善方針

- Reloadedは「初版と共通する顔文字題材の別プロジェクト」と説明し、タグビルド、ドラッグ射出、衝突、Wave進行の違いを記述する。
- 「制作中」と表示し、完成作品として掲載しない。コードに記載された処理を説明するが、Unity上での通しプレイやビルドを実施済みとは述べない。
- YouTube動画は「関連動画」とだけ表示し、特定のコードや機能の動作証拠として結び付けない。
- ゲーム内スクリーンショットやInspector画像は追加しない。サムネイル、ロゴ、動画の内容を実画面・機能の証拠として扱わない。
- チーム制作作品では担当機能を推測せず、本人担当範囲は「現在掲載していない」と明記する。
- 改善候補は内部調査資料に残す。本人が今後実施すると確認していない内容を、公開ページの予定・意欲として書かない。

## 根拠と照合結果

| 主張 | 確認した根拠 | 確認範囲 |
|---|---|---|
| 初版のパーツタグ集計・上限・補正順 | [PlayerUpgradeService.cs](https://github.com/HinataPiyo/KaomojiClash/blob/c59192dfa0f5d0b7751e2c7e0dab796ae32ad868/Assets/Scripts/Player/PlayerUpgradeService.cs)、[Kaomoji Clash README](https://github.com/HinataPiyo/KaomojiClash/blob/c59192dfa0f5d0b7751e2c7e0dab796ae32ad868/README.md) | コードと資料を静的に確認。計算結果の保持先は `UpgradedStatus`。動作確認ではない |
| Reloadedのドラッグと発射力 | [Movement.cs](https://github.com/HinataPiyo/KaomojiClash_Reloaded/blob/dd7e1a031498f70d5ad124e7b05e7c0925de8c2e/Assets/Scripts/Player/Movement.cs)、[PlayerStatsCalculator.cs](https://github.com/HinataPiyo/KaomojiClash_Reloaded/blob/dd7e1a031498f70d5ad124e7b05e7c0925de8c2e/Assets/Scripts/Kaomoji/StatCalculator/PlayerStatsCalculator.cs) | 画面座標のワールド変換、ドラッグ距離による発射力計算、Rigidbody2DへのImpulse適用を静的に確認 |
| ReloadedのWave状態 | [WaveController.cs](https://github.com/HinataPiyo/KaomojiClash_Reloaded/blob/dd7e1a031498f70d5ad124e7b05e7c0925de8c2e/Assets/Scripts/Wave/WaveController.cs) | `BattleState` とWaveループの構造を静的に確認。Unity実行はしていない |
| Reloadedの制作状態・動画 | [Kaomoji Clash / Reloaded README](https://github.com/HinataPiyo/KaomojiClash_Reloaded/blob/dd7e1a031498f70d5ad124e7b05e7c0925de8c2e/README.md)、既存ページのYouTubeリンク | READMEは制作途中とし、Editorでのプレイ・ビルド確認を行っていないと記載。動画URLの掲載を確認したが、再生内容とコードの対応は未確認 |
| 編集前の公開サイトとの一致 | `index.html`、`kaomoji.html`、`kaomoji-reloaded.html`、`bombcrash.html`、`algomate.html`、`fingerdojo.html` と各公開URL | 編集前のページ本文の主要箇所を取得。工程09の変更は未デプロイ。Pages設定・全画像のブラウザー表示・動画再生は未確認 |

## 変更したファイル

- `index.html`: Reloadedを「開発中」と表示し、初版と異なる実装の軸を短く説明。Bomb Crashの担当範囲を未掲載と表示。
- `kaomoji-reloaded.html`: 調査報告調の定型句を削除。初版との関係、コードの具体的な処理、開発状態、リンク名を整理。既存動画は関連動画として残し、ゲーム画面は追加していない。
- `kaomoji.html`: タグ補正とパーツ補正の処理順、結果の保存先を平易に説明。
- `algomate.html`、`bombcrash.html`、`fingerdojo.html`: 調査者視点の導入とリンク名を整理し、具体的な機能を先に示す。本人の予定と確認できない改善案は公開欄から除外。Algomate Colonyの表記とチーム作品の担当注記を統一。
- 本文書、[README.md](README.md)、[open-questions.md](open-questions.md)、[stage-08-review.md](stage-08-review.md): 判断根拠、公開との照合、残課題を記録。

## 未確認事項・残課題

- 今回の変更はコミット・push・デプロイしていない。公開ページに修正を反映する場合は公開後の再監査が必要。
- Unity Editorでのプレイ・ビルド、自動テスト、性能計測は行っていない。
- Kaomoji Clash初版およびReloadedのコードと対応するゲーム画面・Inspector画像は未提供。既存動画の内容・再生・コードとの対応も確認していない。
- Algomate Colony、Bomb Crash、FingerDojoの本人担当範囲、制作期間、チーム情報、素材の掲載許可は引き続き本人確認が必要。
- GitHub Pagesの公開元設定は未確認。公開URLの一致確認は、サイト設定や公開ワークフローの確認を代替しない。
