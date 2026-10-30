# 工程03 — 作品実装根拠の調査

この資料はポートフォリオ改善用の内部調査記録であり、公開ページの原稿ではない。コードから読める構造、リポジトリ文書の記載、実機確認の証拠、本人の意図・担当を分ける。ソース読解だけで動作・設計意図・本人の貢献を断定しない。

## 調査範囲と基準

- 対象は現行ポートフォリオで紹介される主要5作品。サイトのコードリンクから入った関連クラスと、各公開リポジトリのREADME・仕様資料を中心に静的に読んだ。
- ソースの参照基準は調査時に取得した `main` のコミット。リポジトリのHEAD SHAは Kaomoji Clash `c59192dfa0f5d0b7751e2c7e0dab796ae32ad868`、Bomb Crash `e4fc3fe45371a4f4b6e214522991a8e64b4e50a5`、Algomate Colony `defcfa9106017b945ea5edced54b6ad56786ce4b`、FingerDojo `d67c1013a0b5d9d0be5c930bf85de006bd72d627`、Kaomoji Clash / Reloaded `dd7e1a031498f70d5ad124e7b05e7c0925de8c2e`。公開用に採用する前に、ページのリンク先が同じ版を指すか再確認する。
- 行番号は上記コミットのファイルに対応する。GitHubのリンク先は後日更新され得るため、調査時点のSHAと合わせて読む。
- ローカルのポートフォリオは説明文、コードへのリンク、画像・動画ファイルの所在を確認した。Unity Editorでの起動、Play Mode、ビルド、自動テスト、実行時計測、外部配布物の到達性は今回確認していない。

## 証拠区分

| 区分 | 意味 |
|---|---|
| A — ソース構造 | 対象コミットのコードから静的に読み取った責務・処理・条件。実行成功の証明ではない |
| B — 資料記載 | README、仕様書、実装状況表などに書かれている内容。コードまたは実行結果と同一視しない |
| C — 動作・計測証拠 | 今回確認したUnity実行、ビルド、テスト、計測の記録。**該当する実施証拠なし** |
| D — 本人確認 | 本人の担当、意図、意思決定、理解、公開許可が必要な内容 |
| E — 追加調査 | Scene/Prefab/Inspector接続、実行時挙動、周辺クラス、配布物などの未確認事項 |

## 作品別調査

### Kaomoji Clash（初版）

**コードから読める構成（A）**

- `PlayerApplyKaomoji.Initialize` が `PlayerData` から顔文字を組み立て、表示テキストとコライダー幅を設定し、`PlayerUpgradeService.Initialize` と `PlayerMental.Initialize` を呼ぶ。
- `PlayerUpgradeService.SetTags` は各顔文字パーツのタグを走査して同一タグを集計し、スタックを最大5に制限する。条件タグは別リストに集計する。
- `ApplyTagEffects` は `PlayerData.Status` の基礎値を複製し、条件タグ以外をタグごとに適用する。`SkillTag.StatusModifier.ApplyModifier` は乗算後に加算し、その後 `ApplyPartsEffects` がパーツ由来の割合補正を加える。
- 主な関係：`PlayerData` → `KAOMOJI`（組み立て・パーツタグ）→ `PlayerApplyKaomoji`（初期化・表示）→ `PlayerUpgradeService`（タグ集計・ステータス反映）→ `SkillTag` ScriptableObject（スタック別補正定義）。

**コード候補と公開説明案**

| 候補／場所 | 何を説明するか・関連データ | 画面との対応 | 公開説明案（本人確認前の暫定文） | 本人への質問 |
|---|---|---|---|---|
| [`PlayerUpgradeService.cs`](https://github.com/HinataPiyo/KaomojiClash/blob/c59192dfa0f5d0b7751e2c7e0dab796ae32ad868/Assets/Scripts/Player/PlayerUpgradeService.cs#L25) `Initialize`、`SetTags`、`ApplyTagEffects`（L25, L47, L124, L171） | 顔文字パーツのタグを集計し、スタック数に応じた補正を基礎ステータスへ反映する。`PlayerData`、`KAOMOJI`、`SkillTag` に依存 | ローカルの `images/KaomojiClash_Thumbnail.png` はサムネイルのみ。計算順を説明する図は kaomoji ページにある。ゲーム中の実画面との対応は未確認 | 「顔文字を構成するパーツのタグを集計し、スタック数に応じた補正を基礎ステータスへ適用します」 | どの機能・コードを本人が担当したか。最大スタック5と補正順序は意図したルールか。図の値と現行コードが一致するか |
| [`UpgradeDefinition.cs`](https://github.com/HinataPiyo/KaomojiClash/blob/c59192dfa0f5d0b7751e2c7e0dab796ae32ad868/Assets/Scripts/ScriptableObject/KaomojiSkill/UpgradeDefinition.cs#L5) `SkillTag`、`StatusModifier`（L5, L14, L37, L69） | ScriptableObject上のタグ定義とスタックごとの加算・乗算補正を表す | Inspector画面は現サイト上に実画面として掲載されているか要照合 | 「タグごとの補正値をデータとして定義し、スタック数に対応する補正を取得します」 | Inspectorでの設定運用、データ作成を担当したか、補正定義アセットとコードの対応 |
| [`PlayerApplyKaomoji.cs`](https://github.com/HinataPiyo/KaomojiClash/blob/c59192dfa0f5d0b7751e2c7e0dab796ae32ad868/Assets/Scripts/Player/PlayerApplyKaomoji.cs#L15) `Initialize`（L15–33） | 顔文字表示、コライダー幅、アップグレード処理の初期化をつなぐ | 顔文字とヒット領域を同時に見せる実ゲーム画面が必要 | 「顔文字データから表示文字列を作り、文字列長に応じて2Dコライダー幅を設定します」 | 表示文字数とCollider幅を結び付けた意図、利用画面と動作確認の有無 |

**例外経路・改善候補（A/E）**

- 5スタック上限はタグ集計側にある。`GetStatusModifier` は範囲外のスタック数で警告を出し `default` を返す一方、`stackModifiers` の要素不足や未設定データを事前検証する処理は候補コード上で確認できない。実際に問題が起きるとは断定しない。
- 今後はInspectorデータの整合性検証、補正順序・上限・条件タグのテストを検討する。現状のテスト実施を示す記録は未確認。

**画像・資料**

- 取得済み：`images/KaomojiClash_Thumbnail.png`。ゲーム内画面やInspectorの証拠としては扱わない。
- 既存ページの計算順序図とEditorでデータを作成する動画は、現行の実物・ソースとの対応および公開許可を再確認する。ゲーム画面、タグ設定Inspector、プレイ中の該当効果が分かる素材は取得候補。
- 資料記載（B）：READMEは顔文字パーツ、ステータス、Wave等のゲーム要素を説明する。コードを全体監査したり、実行したりした証拠ではない。

**工程05の本人確認・公開ページ反映**

- 本人回答で確認：Kaomoji Clashは個人制作で、企画・プログラミングを担当。
- 本人回答で確認：既存YouTube紹介動画の帰属。別回答では動画内容が未確認とされているため、公開ページでは作品紹介動画としてのみ掲載し、特定の画面・機能・コードとの対応は主張しない。oEmbedタイトルは `KaomojiClash_紹介動画`。ブラウザー再生はエラー153となり、映像内容を独立検証できていない。
- 本人回答で未用意：ゲーム内画面またはInspectorの静止画。`KaomojiClash_Thumbnail.png` を実画面に見立てず、コードの流れをHTMLの番号付き図解で説明した。コードと対応する静止画の要件は未達。
- ページに採用したコード抜粋は調査対象SHA `c59192dfa0f5d0b7751e2c7e0dab796ae32ad868` の `SkillTag.StatusModifier.ApplyModifier`。`PlayerUpgradeService`、`UpgradeDefinition`、`PlayerApplyKaomoji` への公開リンクも同じSHAに固定した。対応ファイルの生ソースを取得し、抜粋と処理順を照合した。
- 本人確認や実行確認がない開発期間、Unityバージョン、プラットフォーム、配布ビルドへの導線は初稿から除外。

### Bomb Crash

Wave / オトモスキルシステムの呼出し経路、資料との差異、設計上の利点・制約、拡張範囲とMermaid図は[bomb-crash-system-analysis.md](bomb-crash-system-analysis.md)に追記した。以下は既存調査記録で、上記の詳細記録を優先する。

**コードから読める構成（A）**

- `EndlessWaveRule` ScriptableObjectが通常Wave、スタンピード、敵HP上昇、敵種ごとの開始Wave・ピークWave・重みを保持する。
- `WaveGenerator.GenerateWave` は指定Waveとルールから時間・出現間隔・スタンピード状態を計算し、開始Waveに達した敵の出現重みを線形補間して `IntervalWaveData` を生成する。
- `WaveManager.WaveTimer` はWave数を進め、生成データを作り、ボス／通常Wave・タイマー・UI・カットイン等を進行させ、敵フィールドが空になるまで待つ。通常Waveの敵生成コルーチンは `EnemySpawnController` が受け持つ。同クラスは候補重みによる抽選、位置決定、生成後の敵状態設定も行う。
- 主な関係：`EndlessWaveRule` と `EnemyScalingPattern`（設定）→ `WaveGenerator`（回ごとの `IntervalWaveData`）→ `WaveManager`（進行・UI・ボス連携）→ `EnemySpawnController`（抽選・配置・敵状態）。

**コード候補と公開説明案**

| 候補／場所 | 何を説明するか・関連データ | 画面との対応 | 公開説明案（本人確認前の暫定文） | 本人への質問 |
|---|---|---|---|---|
| [`EndlessWaveRule.cs`](https://github.com/HinataPiyo/BombCrash/blob/e4fc3fe45371a4f4b6e214522991a8e64b4e50a5/Assets/Scripts/SO/EndlessWaveRule.cs#L7) `EndlessWaveRule` / `EnemyScalingPattern`（L7–40） | Wave時間・敵出現・スタンピード・敵種ごとの重みをInspectorデータで保持 | `images/BombCrash_EndlessWaveGeneration.png` はWave生成設定の画像候補。画像内の値・参照先が調査対象コミットと一致するか要確認 | 「Waveの長さや敵種ごとの出現設定をScriptableObjectに保持します」 | データ設計の本人担当、Inspector調整の担当、画像が現行アセットを示すか |
| [`WaveGenerator.cs`](https://github.com/HinataPiyo/BombCrash/blob/e4fc3fe45371a4f4b6e214522991a8e64b4e50a5/Assets/Scripts/System/Wave/WaveGenerator.cs#L16) `GenerateWave`（L16–75） | 敵の開始Waveを見て候補を選び、ピークまでの線形補間で重みを作りWaveデータに格納 | 現行ページのWave生成図・説明とコードの対応を確認 | 「敵ごとの開始Waveとピーク重みから、そのWaveでの出現候補と重みを生成します」 | 補間式・設定値の根拠、誰が実装／調整したか、想定する境界条件 |
| [`WaveManager.cs`](https://github.com/HinataPiyo/BombCrash/blob/e4fc3fe45371a4f4b6e214522991a8e64b4e50a5/Assets/Scripts/System/Wave/WaveManager.cs#L65) `WaveTimer`（L65–130）と [`EnemySpawnController.cs`](https://github.com/HinataPiyo/BombCrash/blob/e4fc3fe45371a4f4b6e214522991a8e64b4e50a5/Assets/Scripts/System/Wave/EnemySpawnController.cs#L20) `SpawnEnemiesCoroutine` / `ChooseEnemy` | 進行と敵の抽選・配置を分担 | 実際の戦闘中Wave画面と敵出現を示す既存素材が必要 | 「WaveManagerがルールからWaveを進行し、EnemySpawnControllerが重みに応じて敵を選び配置します」 | 本人の担当境界、ボス／通常Waveの実行確認、表示画面が該当コード版のものか |

**例外経路・改善候補（A/E）**

- `stampedeWaveInterval` が0の場合の剰余演算、敵候補が空の場合の `ChooseEnemy`、敵Prefab/`EnemyStatus` の未設定、`waveRule` やUI参照の欠落を防ぐ入力・アセット検証は、候補コード内では確認できない。発生実績ではなく静的に見える未ガード条件として扱う。
- `WaveGenerator` は実行時 `IntervalWaveData` を生成する。生成物の寿命管理と長時間プレイ時の挙動はEditorで確認する。
- 今後は設定値の制約・候補ゼロ・Prefab不備・Wave終了条件をテストし、Waveルールを変更した際の出現結果を確認する。実施済みテストとしては掲載しない。

**画像・資料**

- 取得済み：`images/BombCrash_Thumbnail.png`、`images/BombCrash_EndlessWaveGeneration.png`、`images/BombCrash_Skill_Data.png`。後2点はページ上の説明対象・アセット版との一致を要確認。
- 取得候補：実ゲームのWave開始から敵出現までの画面、Wave設定と敵種データを同時に示すInspector。
- 資料記載（B）：開発ドキュメントはUnity 6 (6000.0.29f1)等の環境情報、Wave設定から生成・進行までの構成、ガチャ未実装、配布用ビルド／公開URL未確認を記す。これは今回のビルド・実動作証拠ではない。

### Algomate Colony

**コードから読める構成（A）**

- `CommandLoader` は `Resources` からMove/Gather/DepositのJSONを読み、`CommandHandler` がその一覧を参照して引数を検査する。
- UI側の入力行を検証後、`RobotCommandExecute.ProcText` に保存し、コルーチンが各行を順番に実行する。Move/Gather/Depositに応じて `RobotController` の対象や状態を設定し、各処理の `StateEndFlag` を待って次の命令へ進む。
- 移動は `PathfindingSystem.GeneratePath` が始点・終点間を線形補間したWaypointキューを作り、`RobotMovement` が経路点へ移動する。Raycastと `ObstacleAvoidanceHelper` による障害物回避は別の処理。これはA*等の探索アルゴリズムを示すものではない。
- 主な関係：UI (`RobotCommandUIController`) → `CommandHandler` / `CommandLoader`（入力検証・JSON定義）→ `RobotCommandExecute`（逐次実行）→ `RobotController` の状態遷移 → 移動・採集・Deposit処理 → `StateEndFlag`。移動経路は `PathfindingSystem` と `RobotMovement` が扱う。

**コード候補と公開説明案**

| 候補／場所 | 何を説明するか・関連データ | 画面との対応 | 公開説明案（本人確認前の暫定文） | 本人への質問 |
|---|---|---|---|---|
| [`CommandHandler.cs`](https://github.com/HinataPiyo/AlgomateColony/blob/defcfa9106017b945ea5edced54b6ad56786ce4b/Assets/Scripts/Command/CommandHandler.cs#L22) `MatchParenthesesCommand` / `CheckCommand` / `DepositFunc`（L22–61）と [`CommandLoader.cs`](https://github.com/HinataPiyo/AlgomateColony/blob/defcfa9106017b945ea5edced54b6ad56786ce4b/Assets/Scripts/Command/CommandLoader.cs#L20) | JSONのコマンド候補と、Move/Gather/Depositの引数検証 | `images/AlgomateColony/AlgomateColony_CommandEditor.png`、`images/AlgomateColony/AlgomateColony_Command_Error.png`、`images/AlgomateColony/AlgomateColony_Command_Success.png`（全てローカルに存在）。各画面が現行コードの実画面かは本人確認 | 「UI入力を行単位で検査し、対象名などをResources内の定義と照合します」 | JSONの実際の役割、許容文法、エラー表示の意図と担当、画面の取得時期 |
| [`RobotCommandExecute.cs`](https://github.com/HinataPiyo/AlgomateColony/blob/defcfa9106017b945ea5edced54b6ad56786ce4b/Assets/Scripts/Robot/RobotCommandExecute.cs#L40) `CommandToExecution` / `ExecuteCommand`（L40–107） | コマンド列を逐次実行し、状態完了フラグを待つ。Deposit引数を分割 | `images/AlgomateColony/AlgomateColony_Command_Move.png`、`images/AlgomateColony/AlgomateColony_Command_Gather.png`、`images/AlgomateColony/AlgomateColony_Command_Deposit.png` がローカルに存在 | 「入力された命令を順番に状態遷移へ渡し、各処理の終了を待って次の行に進みます」 | 状態完了の責務をどのクラスに置いたか、失敗・中断をどう扱う想定か |
| [`PathfindingSystem.cs`](https://github.com/HinataPiyo/AlgomateColony/blob/defcfa9106017b945ea5edced54b6ad56786ce4b/Assets/Scripts/Robot/PathfindingSystem.cs#L8) `GeneratePath`（L8–39）と [`RobotMovement.cs`](https://github.com/HinataPiyo/AlgomateColony/blob/defcfa9106017b945ea5edced54b6ad56786ce4b/Assets/Scripts/Robot/RobotMovement.cs#L47) | Waypoint補間、ターゲット追跡、Raycastによる回避の関係 | `images/AlgomateColony/AlgomateColony_Command_Move.png` と `images/AlgomateColony/AlgomateColony_Open_Location Panel.png` | 「目的地までの線分をWaypointに分割し、RobotMovementが経路点へ移動します。障害物はRaycastで検知して回避方向を選びます」 | 「Pathfinding」の意図、経路再計算周期と回避の設計意図、障害物ケースの実動作確認 |

**例外経路・改善候補（A/E）**

- `CheckCommand` は `StartsWith` と括弧内抽出を使い、末尾や文全体を厳密に検査しない。一方、実行側は `Move(arg);` 等の完全一致を要求する。この差により検証を通ったが実行分岐に入らない文字列が、状態完了待ちに入る経路がある。実行待ちには候補コード上、タイムアウト／キャンセルが確認できない。
- `CommandLoader.Load` は `Resources.Load` の戻り値やJSON解析結果の検査が見当たらない。コマンドエラーUIに詳細な理由・位置を出す実装は調査した資料上確認できない。
- 将来の改善候補は、共通の構文解析結果を検証・実行双方で使うこと、失敗理由を行単位で表示すること、実行中断・タイムアウト・空/不正データの扱いを決めること。現状の説明では「拡張性重視」「経路探索」といった意図・能力を断言しない。

**画像・資料**

- 取得済み：`images/AlgomateColony/AlgomateColony_CommandEditor.png`、`images/AlgomateColony/AlgomateColony_Command_Move.png`、`images/AlgomateColony/AlgomateColony_Command_Gather.png`、`images/AlgomateColony/AlgomateColony_Command_Deposit.png`、`images/AlgomateColony/AlgomateColony_Command_Error.png`、`images/AlgomateColony/AlgomateColony_Command_Success.png`、`images/AlgomateColony/AlgomateColony_Tutorial01.png`、`images/AlgomateColony/AlgomateColony_Tutorial_CustomPicture.png`、`images/AlgomateColony/AlgomateColony_Open_Location Panel.png`。
- 資料記載（B）：README／現行仕様はプロトタイプの機能と未完成・未検証項目を記す。GitHubの `Documentation/LogicFlows.md` も静的な処理追跡であり、Unity Editorでの通しプレイ検証をしていないと明記する。

### FingerDojo（指道場）

**コードから読める構成（A）**

- `CommandTimingQTE.OnPointerDown` はポインター入力を受けて `TimingBarController.CheckTiming()` の倍率を取得し、`CombatCalculator.PlayerToEnemyAttack` に渡す。その後判定表示とQTE終了コルーチンを開始し、連続入力を止める。
- `CombatCalculator` はPlayer/Enemyの基礎Strengthと倍率からダメージを計算し、それぞれのHealthへ渡す。カウンター用の別処理はStrengthの25%を相手Healthへ渡す。
- リポジトリのArchitecture資料はPlayer/Enemyの状態・HP所有、敵行動選択、コマンド、AnimationEvent、ScriptableObject設定の流れを整理する。Player/Enemyの個別StateControllerとHealthが状態・HPを保持し、戦闘終局はGameManagerが扱う。
- 主な関係：UI Button/PointerDown → `CommandTimingQTE` → `TimingBarController` の判定・倍率 → `CombatCalculator` → `EnemyHealth` → QTE終了処理／PlayerStateController。敵側はEnemyDecisionController → EnemyStateController/EnemyAction → AnimationEvent等 → CombatCalculator → PlayerHealth。

**コード候補と公開説明案**

| 候補／場所 | 何を説明するか・関連データ | 画面との対応 | 公開説明案（本人確認前の暫定文） | 本人への質問 |
|---|---|---|---|---|
| [`CommandTimingQTE.cs`](https://github.com/HinataPiyo/FingerDojo/blob/d67c1013a0b5d9d0be5c930bf85de006bd72d627/Assets/Scripts/UI/CommandTimingQTE.cs#L33) `OnPointerDown` / `EndTimingQTE`（L33–58）と [`TimingBarController.cs`](https://github.com/HinataPiyo/FingerDojo/blob/d67c1013a0b5d9d0be5c930bf85de006bd72d627/Assets/Scripts/UI/TimingBar/TimingBarController.cs) | 入力時にタイミング判定を取り、攻撃倍率を計算処理へ渡してQTEを終了する | `images/FingerDojo/FingerDojo_standby.png`、`images/FingerDojo/FingerDojo_playerCounter.png` 等がローカルに存在。QTE判定中の画面は取得・照合が必要 | 「入力タイミングの判定結果を攻撃倍率として戦闘計算へ渡し、連続入力を抑止します」 | 判定帯と倍率の仕様、QTEの実装担当、画面素材が実行画面であるか |
| [`CombatCalculator.cs`](https://github.com/HinataPiyo/FingerDojo/blob/d67c1013a0b5d9d0be5c930bf85de006bd72d627/Assets/Scripts/Combat/CombatCalculator.cs#L27) `PlayerToEnemyAttack` / `EnemyToPlayerAttack` / Counter（L27–54） | 基礎Strengthと倍率からダメージを求め、Healthコンポーネントに適用 | `images/FingerDojo/FingerDojo_standby.png` / `images/FingerDojo/FingerDojo_playerCounter.png` / `images/FingerDojo/FingerDojo_playerBreaked.png` は戦闘状態の候補。数値の変化を示す画面は別途照合 | 「攻撃側のStrengthと入力／行動倍率を掛け、対象のHealthへダメージを渡します」 | `0.25f` のカウンター値の根拠、担当範囲、仕様としての意図 |
| `PlayerStateController`、`EnemyDecisionController`、`EnemyAction`（具体箇所は公開ページ・Repository Docsの参照と合わせて追加確認） | 状態所有と敵の行動選択。AnimationEventがダメージ発生の契機となる経路を含む | `images/FingerDojo/FingerDojo_enemyHealing.png`、`images/FingerDojo/FingerDojo_playerCounter.png`、`images/FingerDojo/FingerDojo_playerBreaked.png` がローカルに存在 | 公開時は一つの状態遷移だけ選び、EditorでAnimationEventと状態変化を対応確認した後に説明する | Scene/Animator/AnimationEventの接続を誰が作成・検証したか |

**例外経路・改善候補（A/B/E）**

- `CommandTimingQTE` は `Button`、状態Controller、TimingBar参照をInspectorから取得する。`CombatCalculator` もHealth参照をSerializeFieldで持つ。参照欠落時の実挙動は実行していない。
- リポジトリの実装状況資料は、技・煽りコマンドを未実装とし、AnimationEvent、UIイベント接続、カウンター時間窓、Scene参照をPlay Mode未確認とする。ここではコード／資料上の指摘であり、実際に画面が壊れると断定しない。
- 次はQTE入力、判定、ダメージ、Break中の終了状態、敵攻撃AnimationEventのタイミングをEditorで確認し、境界条件のテストを検討する。自動テストやPlay Mode確認の証拠は今回得ていない。

**画像・資料**

- 取得済み：`images/FingerDojo/FingerDojo_Home.png`、`images/FingerDojo/FingerDojo_standby.png`、`images/FingerDojo/FingerDojo_playerCounter.png`、`images/FingerDojo/FingerDojo_playerBreaked.png`、`images/FingerDojo/FingerDojo_enemyHealing.png`、`images/FingerDojo/FingerDojo_Thumbnail.png`。
- 公開ページでは、画面の表現と機能を対応付ける。QTE判定中の実画面と、関連するTimingBar/Inspector/AnimationEventは取得・照合候補。
- 資料記載（B）：READMEは試作とし、技・煽り処理等に未実装箇所がある。Architecture / ImplementationStatus資料は静的構造を記すが、Editorでの参照・イベントの動作を証明しない。

### Kaomoji Clash / Reloaded

**コードから読める構成（A）**

- `Player.Movement` はInput SystemのPress/Point入力を読み、ドラッグ中にスクリーン座標からWorld座標へ変換する。リリース時にドラッグ方向と距離を `PlayerStatsCalculator.LaunchForce` で力へ変換し、Rigidbody2DにImpulseを加える。`IWave.IsStopCharacter` がtrueなら入力処理を止める。
- `WaveController` は複数のインターフェースを `ApiProvider` から解決し、BattleStateを切り替えながら敵の生成、接敵、戦闘、経験値処理、次Wave等をコルーチンで進める。状態変更時には既存ループを停止して新しいループを開始する。
- `PlayerStatsCalculator` は設定値とCoreStatsから各ステータスを計算する。Powerにはコンボ倍率を含め、`ApplyDamageCalculation` はコンボを加算してPowerを返す。ドラッグ距離を上限値で制限し、Speedと距離から発射力を返す。
- 主な関係：Input System → `Movement` → `PlayerStatsCalculator` / Rigidbody2D。Waveの各状態は `WaveController` → `ApiProvider`で取得したEnemy/Player/Stage/Experience/UI/Camera/Audio等のインターフェースへ処理を委譲。

**コード候補と公開説明案**

| 候補／場所 | 何を説明するか・関連データ | 画面との対応 | 公開説明案（本人確認前の暫定文） | 本人への質問 |
|---|---|---|---|---|
| [`Movement.cs`](https://github.com/HinataPiyo/KaomojiClash_Reloaded/blob/dd7e1a031498f70d5ad124e7b05e7c0925de8c2e/Assets/Scripts/Player/Movement.cs#L40) `Update` / `Impact`（L40–96） | ドラッグ入力を座標変換し、方向・距離から発射力を求めRigidbody2DにImpulseを適用 | kaomoji-reloaded.htmlには紹介動画が埋め込まれている。動画中の操作・コード版が調査コミットと同じか未確認 | 「ドラッグ量と方向をワールド座標で計算し、離した時にプレイヤーへImpulseを加えます」 | 力の符号・最大距離・演出の意図、本人の担当、動画を現在のコード根拠として使えるか |
| [`WaveController.cs`](https://github.com/HinataPiyo/KaomojiClash_Reloaded/blob/dd7e1a031498f70d5ad124e7b05e7c0925de8c2e/Assets/Scripts/Wave/WaveController.cs#L71) `ChangeBattleState` / `EnemySpawnCount` / `WaveLooping`（L71, L82, L131–） | Wave状態変更、敵数計算、API経由の関連処理との連携 | 現行ページの比較画像・動画が現行シーンと一致するか要確認。該当するゲーム画面素材の所在も再照合 | 「WaveControllerがBattleStateに応じて接敵・Wave開始・敵撃破後の進行を切り替えます」 | BattleState切替と停止の仕様、敵数計算式・10Wave単位の意図、どのインターフェースを本人が実装 |
| [`PlayerStatsCalculator.cs`](https://github.com/HinataPiyo/KaomojiClash_Reloaded/blob/dd7e1a031498f70d5ad124e7b05e7c0925de8c2e/Assets/Scripts/Kaomoji/StatCalculator/PlayerStatsCalculator.cs#L46) `GetPower` / `ApplyDamageCalculation` / `LaunchForce`（L46, L135, L155） | 基礎値・CoreStats・コンボ倍率の合成、ドラッグ距離上限と発射力計算 | プレイ中のドラッグと攻撃結果が分かる実画面・動画が必要 | 「Powerは基礎値とCoreStats、コンボ倍率から計算し、発射力は上限付きドラッグ距離とSpeedから求めます」 | 初版との仕様差、StatCalculatorの共通責務、コンボ倍率の設計意図、コードと掲載動画の版 |

**例外経路・改善候補（A/B/E）**

- `Movement` は `Camera.main`、`ApiProvider`の登録済みサービス、Input Systemアクション、コンポーネント参照に依存する。起動順・シーンごとの登録・欠落参照は実行確認していない。
- 公開READMEは制作途中とし、EditorでのPlay/Build未確認、スキル参照やデータの不整合などを記載する。最新ソース全体の監査・プレイ確認をしたとは扱わない。
- 次は初版との差分をコードで限定し、Wave遷移・ドラッグ距離上限・コンボ倍率・スキル装備から戦闘参照までの接続をPlay Modeで確認する。コード候補を公開する前に、未完の箇所と本人が説明できる変更範囲を確認する。

**画像・資料**

- 既存ページにYouTube紹介動画が埋め込まれていることを確認。動画中のビルド・画面・コードが現行コミットの状態を示すかは未検証。
- 取得候補：ドラッグ入力と発射の連続画面、Wave状態と敵数が分かる戦闘画面、該当するステータス設定データ。ローカルの画像一覧でReloaded専用実画面素材を確認できていないため、存在するものとして扱わない。

## 全作品を通じた検証状況

| 項目 | 今回の状態 |
|---|---|
| ソース構造 | 5作品それぞれで、ポートフォリオが直接参照する主なコード経路を静的に照合。全スクリプトの網羅監査ではない |
| README・資料 | 各作品の公開README/仕様資料を読み、コード読解と区別して記録 |
| Play Mode／実機動作 | 今回は未実施 |
| Unityビルド | 今回は未実施 |
| 自動テスト／CI | 今回は未実施。存在の有無を作品ごとに網羅探索したとは扱わない |
| 性能計測 | 今回は未実施。性能改善の数値や成果は主張しない |
| Scene／Prefab／Inspector／Animator参照 | コードからの全参照をEditorで照合していない |
| ポートフォリオからの外部リンク疎通 | 今回は未実施 |
| 本人の担当範囲・意図・説明可能性・素材利用許可 | 本人確認前 |

## 公開に使える候補と保留事項

### コード構造を説明する候補（ただし本人確認前の仮文）

- Kaomoji Clash：顔文字パーツのタグ集計と補正適用順。
- Bomb Crash：ScriptableObject設定からWave候補を生成し、Wave進行と敵出現を別クラスが担う構造。
- Algomate Colony：コマンド入力検証から逐次実行まで。ただし構文不一致と停止経路を正確に説明し、完成済みの自動化と誤認させない。
- FingerDojo：QTE判定倍率からダメージ計算への経路。画面・イベント接続を確認してから掲載する。
- Reloaded：ドラッグ入力から発射力への変換、Wave状態管理。制作途中であることと、初版からの差を明示し、現行状態を確認してから扱う。

### 本人・実行確認まで断定を保留

- 本人の個別担当、共同担当範囲、コードの執筆者、設計を選んだ理由、期待した成果。
- Unity Editorでの正常動作、ビルド可否、各機能の完成度、操作感、バランス、安定性、性能。
- コードから読んだ処理がScene/Prefab/Inspector設定と接続され、スクリーンショットや動画の画面と同じ版で動作したこと。
- 未確認のテスト、計測、改善効果、拡張性・保守性の成果。
- チーム制作画像・動画・音源等の公開権利、協力者の氏名表記。

## 次に行う技術調査

1. 各公開リポジトリの関連テスト、Unity設定、Scene/Prefab/ScriptableObject参照を調査する。
2. ページに掲載済みの全コードリンク・図・動画を、それぞれ同じ機能と現行ソースへ対応付ける。
3. 作品一覧の技術サンプル・小作品、外部配布物・動画も調査する。
4. 本人に担当範囲、コード候補の説明、設計意図、素材公開可否を確認する。
5. 本人確認と実行確認が済んだ候補だけを公開用説明へ移す。大規模なサイト実装はこの調査・確認を経てから判断する。
