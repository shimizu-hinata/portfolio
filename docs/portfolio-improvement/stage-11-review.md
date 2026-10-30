# 工程11 — Bomb Crash 技術調査と掲載改善

## 調査

調査対象リポジトリは`HinataPiyo/BombCrash`、ソース参照は`e4fc3fe45371a4f4b6e214522991a8e64b4e50a5`に固定。リポジトリのREADME、`Assets/Docs/README.md`、`Assets/Docs/documentation.md`、Wave / ScriptableObject / スキル / 装備UI / ガチャ関連C#を調べ、関連シンボル参照とEditor拡張も検索した。クラス別の処理記録、設計上の利点・制約、Mermaidのデータフロー・処理フロー・スキル構成図は[bomb-crash-system-analysis.md](bomb-crash-system-analysis.md)に記録。

照合で分かった主な差異:

- `WaveGenerator`は`readyTime`を`IntervalWaveData`に書き込むが、`WaveManager`はその値を使わず固定1秒待つ。
- `WaveManager`は画面に`currentWaveIndex`を表示した後、`currentWaveIndex + 1`を生成器に渡す。
- 出現数はWaveGeneratorで事前決定せず、EnemySpawnControllerが時間と間隔で生成を繰り返す。
- ガチャ処理コードは存在するが、資料ではホーム画面ボタンを無効化と記載されるため、使える取得機能として扱わない。
- スキルSOには設定データと変更される発動状態が同居し、装備・Runner間では同一アセット参照が渡る。
- 既存画像はWave設定InspectorとDelayPulseのSkillSO Inspector。今回確認したローカル素材には装備中画面・ゲーム中スキル発動画面がない。

## 公開ページの変更

- [bombcrash.html](../../bombcrash.html)の技術的な見どころにWave生成とオトモスキルの両方を掲載。
- Waveを`EndlessWaveRule` → `WaveGenerator` → `IntervalWaveData` → `WaveManager` / `EnemySpawnController`の流れで説明。生成番号の差と未使用`readyTime`、候補検証などの改善点も、断定や過剰評価を避けて記載。
- オトモスキルを装備UI → 出撃時の`OtomoSkillManager` → 戦闘時`OtomoSkillRunner` → `SkillSO.Execute` / 派生型の効果の順で説明。ガチャが無効化されていること、現在の状態共有と固定入力に関する改善点を記載。
- `BombCrash_Skill_Data.png`の表示名をDelayPulseのScriptableObject設定Inspectorと明記。
- Wave重み計算と`SkillSO`の抽象メソッドの短いコード抜粋、調査コミット固定リンクを追加。
- [60-portfolio-new.css](../../assets/css/modules/60-portfolio-new.css)はBomb Crashのフロー項目に限って、見出し・段落の既存カード表示を調整。共通配色・レイアウト変更なし。

## 検証

- 固定コミットからWave / Skill関連のソースを取得し、公開ページの説明・抜粋と照合。
- `git diff --check`成功。
- ローカルプレビューでBomb CrashをPlaywright viewport 375×900 / 1425×900（document client width 360 / 1410）で表示し、横はみ出しがないことを確認。
- フロー13項目すべてで見出し`h4`と説明`p`が各1つであること、目次リンク先が存在すること、ローカル画像が読み込まれることを確認。
- Bomb Crashページのローカル画像・リンク参照が存在することを確認。

## 残る未確認事項

- Unity Play Mode、ビルド、自動テストでWave番号・Wave終了・ボス周期・スキル発動を検証していない。
- `EndlessWaveRule.asset`はGit LFSポインターとして取得され、実アセット値を読めなかった。Inspector画像との一致も未確定。
- 紹介動画の内容・対象ビルド・再生、スキル設定画像の実アセットとの対応、実ゲームのスキル装備・発動画面は未確認。
- チーム内の個別担当、コード設計の本人意図、改善候補を本人が今後実施したいかは未確認。公開説明で本人の意図として新規に帰属させていない。
- 外部リンク全件の到達性と公開サイトでの反映は未確認。コミット・push・デプロイはしていない。
