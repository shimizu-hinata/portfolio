# 工程10 — 採用向け最終調整

## 目的

既存のデザインと情報構成を維持し、採用担当者には作品の遊び・担当範囲が分かり、ゲームプログラマーには処理の順序と実装責務が追える文章に整える。担当や動作を推測せず、作品ページ・公開資料・既存画像との対応を確かめた範囲に限定する。

## 優先度別の問題と修正理由

| 優先度 | 問題 | 修正理由 |
|---|---|---|
| P0 | トップの3つのチーム作品カードが「担当範囲は未掲載」とする一方、各詳細ページには企画・プログラミング・UI実装の担当が記載されていた | 採用担当者がトップだけを見た場合に担当が分からず、詳細ページの情報とも不一致になるため、詳細ページの範囲をそのまま反映した |
| P1 | Bomb Crashで概要・担当・ゲームループ・Wave実装・設定画面が別々の導線にあり、見出しの階層や情報順が分かりにくかった | 読者がゲームの遊びから自分の担当、Wave生成の実装根拠へ順に進めるよう、概要→担当/技術上の見どころ→基本ループ→設定・実装→ソースの順にした |
| P1 | Bomb Crashの概要でスクラップ・IP・Wave進行の説明が重複し、WaveGeneratorの計算から敵の出現までの説明が短く、役割の関係を追いにくかった | 重複を統合し、WaveManagerによるWaveごとの生成呼出し、WaveGeneratorによる出現データ計算、EnemySpawnControllerによる敵選択・配置、WaveManagerによる次Waveへの進行を順に説明した |
| P1 | Algomate Colonyの処理フローでクラス名が説明より先に出ていた | JSON定義の読込、コマンド検査、行ごとの実行と完了待ち、ロボット状態への接続という順に、クラスの役割を機能と併記した |
| P1 | FingerDojoの処理経路・クラス一覧が役割を把握しにくい表現だった | 難易度選択、コマンド開始、QTE倍率と敵攻撃、CombatCalculator、Health、勝敗表示の経路に沿って説明した |
| P1 | Reloaded用の実画面・Inspector資料がなく、外部動画の内容もソースや対象ビルドと照合されていなかった | ローカルには専用画像・動画がないことを確認。既存の外部動画は残すが、関連動画にとどめ、ゲーム画面・動作確認の証拠と表示しない |

## 担当範囲の照合

| 作品 | 詳細ページの記載 | トップカード |
|---|---|---|
| Kaomoji Clash | 個人制作。企画・プログラミング | 個人制作 / 企画・プログラミング |
| Bomb Crash | チーム制作。企画・プログラミング・UI実装 | チーム制作 / 担当: 企画・プログラミング・UI実装 |
| Algomate Colony | チーム制作。企画・プログラミング・UI実装 | 試作・チーム制作 / 担当: 企画・プログラミング・UI実装 |
| FingerDojo | チーム制作。企画・プログラミング・UI実装 | 試作・チーム制作 / 担当: 企画・プログラミング・UI実装 |

トップには各詳細ページにある範囲を反映した。チーム内の個々の分担や成果物単位の執筆者まではページ・コードから独立確認できないため、チームメンバーの実装を本人の成果として追加していない。

## 技術説明の根拠

- **Bomb Crash:** [EndlessWaveRule.cs](https://github.com/HinataPiyo/BombCrash/blob/e4fc3fe45371a4f4b6e214522991a8e64b4e50a5/Assets/Scripts/SO/EndlessWaveRule.cs) のWave時間・間隔、敵パターンの開始Wave・最大比重設定、[WaveManager.cs](https://github.com/HinataPiyo/BombCrash/blob/e4fc3fe45371a4f4b6e214522991a8e64b4e50a5/Assets/Scripts/System/Wave/WaveManager.cs) のWave進行とデータ生成呼出し、[WaveGenerator.cs](https://github.com/HinataPiyo/BombCrash/blob/e4fc3fe45371a4f4b6e214522991a8e64b4e50a5/Assets/Scripts/System/Wave/WaveGenerator.cs) の出現時間・間隔・比重の計算、[EnemySpawnController.cs](https://github.com/HinataPiyo/BombCrash/blob/e4fc3fe45371a4f4b6e214522991a8e64b4e50a5/Assets/Scripts/System/Wave/EnemySpawnController.cs) の候補抽選・配置を照合。計算は静的に確認し、Unity上の出現動作を実行したとはしていない。
- **Algomate Colony:** [CommandHandler.cs](https://github.com/HinataPiyo/AlgomateColony/blob/defcfa9106017b945ea5edced54b6ad56786ce4b/Assets/Scripts/Command/CommandHandler.cs) のコマンド引数検査、`RobotCommandExecute` の逐次実行、`PathfindingSystem` の直線補間WaypointとRaycast回避を、既存の技術調査資料・コードリンクと照合。A*などの経路探索としては説明していない。
- **FingerDojo:** [CommandTimingQTE.cs](https://github.com/HinataPiyo/FingerDojo/blob/d67c1013a0b5d9d0be5c930bf85de006bd72d627/Assets/Scripts/UI/CommandTimingQTE.cs) が判定倍率を `CombatCalculator` に渡す処理と、既存の技術調査にあるHealth・状態管理の役割を照合。
- **Reloaded素材:** `images/` には `KaomojiClash_Logo.png` と `KaomojiClash_Thumbnail.png` があるが、Reloaded専用のゲーム画面・Inspector画像ではない。`movies/` には4つの動画ファイルがあるが、いずれもReloaded用ではない。ページのYouTube埋め込みは外部資料として確認しただけで、映像内容・対象版・再生を確認していない。

## 変更ファイル

- `index.html`: Kaomoji Clashと3つのチーム作品の担当範囲を、各詳細ページと同じ内容に更新。
- `bombcrash.html`: ナビと本文を指定順に整理。基本ループを短く理解できるようにし、Waveルールから出現データ生成・敵配置・進行までの役割を説明。設定画像の説明を追加し、未実装のスキルガチャを維持。
- `algomate.html`: コマンドデータ読込から検証、逐次実行、状態遷移への接続を文章化。Waypoint生成と局所回避の処理を順序立てて説明。
- `fingerdojo.html`: 作品概要を自然な文にし、QTE倍率からダメージ・HP・勝敗表示までの関係を明示。クラス一覧に役割を付けた。
- `docs/portfolio-improvement/README.md`、`open-questions.md`: 工程10の状態と担当・Reloaded素材の残確認事項を反映。

## 未対応・検証範囲

- Reloaded専用のゲーム画面・Inspector画像はローカル素材にない。外部動画の内容・対象ビルド・ゲーム画面としての掲載可否は本人に確認が必要。
- Unity Editorでの通しプレイ、ビルド、各技術説明の実動作は確認していない。コード・資料との静的照合である。
- チーム制作物の細かな分担は確認していない。トップと詳細ページの担当記載は一致したが、共同制作の責任境界を追加確認したわけではない。
- 公開ページの編集後反映、全外部リンクの到達性、動画の再生は未確認。変更を公開する場合は反映後に再検査する。

## ローカル検証

- `git diff --check` 成功。
- ローカルプレビューで全7 HTMLページをモバイル相当幅（ブラウザー報告のCSS viewport 375px）で表示し、横スクロールがないことを確認。画像を遅延ロード解除して読み込み、壊れた画像がないことを確認。
- 同じ7ページをデスクトップ相当幅（CSS viewport 1425px）で確認し、ページ全体の横はみ出しがないことを確認。
- すべてのHTMLページのローカル `src` / `poster` と `href` 参照、およびHTMLアンカーの参照先を静的に確認。欠落なし。
- Bomb Crashのモバイル表示を目視し、ページ目次が折り返されて表示されること、セクション順が目次と一致することを確認。
- 外部リンクの到達性・動画再生、公開環境の表示はこの確認に含めない。

## 追加調整 — Bomb Crash文章構造とコード責務

最終確認で、ゲーム進行のカードと技術解説の両方にWave生成の説明があり、工程名と説明文のHTML構造が`strong` / `span`に留まっていた点を確認。ゲーム進行はプレイヤー視点の遊び方・終了条件に限定し、Wave処理のクラス責務は技術解説へ集約した。ゲーム概要ではゲームの目的を説明し、スクラップ・IPの説明は箇条書きに分けた。

調査時固定コミット `e4fc3fe45371a4f4b6e214522991a8e64b4e50a5` の以下のコードを再確認した。

- `WaveGenerator`: Wave番号と`EndlessWaveRule`から時間・出現間隔・スタンピード状態を設定し、敵候補の比重を計算した`IntervalWaveData`を生成。
- `WaveManager`: Wave開始、生成データの取得、ボス／通常Wave・タイマー・UIの進行を管理し、Wave時間終了後に敵がいなくなるまで待機。
- `EnemySpawnController`: Waveデータに従い一定間隔で敵を生成し、候補の比重による選択、位置決定、敵HP設定、敵一覧を管理。
- `OtomoSkillManager`: `ReplaceEquippedSkills`で装備スロットからスキルを読み込み、装備中リストを更新。
- `OtomoSkillRunner`: 装備中リストを戦闘時スロットへ反映し、Z / X / C入力・自動発動を処理。スキル実行後のクールタイムを更新。
- `SkillSO`: スキルの表示・分類・レアリティ・自動発動設定・クールタイム・ストック・覚醒情報を保持する抽象ScriptableObject。効果説明、クールタイム計算、実行処理は派生クラスに定義。

上記は固定コミットのソース読解であり、Unity上での実動作確認ではない。見出しを`h4`、説明を`p`要素で分け、既存カードの見た目を維持するタイポグラフィ用ルールを追加した。
