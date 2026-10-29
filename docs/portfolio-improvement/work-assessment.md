# 主要作品の証拠ベース評価

## 位置付けと範囲

工程1の初回資料調査。2026-10-30に各作品の公開README・仕様／実装状況ドキュメントと、ローカルの作品紹介ページを照合した。下記は公開リポジトリ文書に記された静的調査結果であり、今回Unity Editorでプレイ・ビルドした結果ではない。作品コード全体の独立した再レビュー、担当範囲・意図の本人確認、リンク・配布物の可用性確認は未完了。

この評価は公開ページにそのまま掲載する説明文ではなく、作品構成を決めるための内部判断記録。

## 作品ごとの評価

| 作品 | 現在の資料で分かる強み | 制作状態・公開上の制約 | 情報設計上の扱い |
|---|---|---|---|
| Kaomoji Clash（初版） | 顔文字パーツの構成からステータスを作るアクションという、短く説明できる独自の軸がある。ページは個人制作と表示。READMEは戦闘・Wave・ビルド・アリーナオブジェクト等を記載。ページにはUnity Editorでデータを作る動画と計算処理の解説がある | 個人制作表記はページ上の情報で本人未確認。READMEに多数の「実装済み」機能が列挙されるが、作品コードを今回一通り監査してはいない。本人の担当、現行の配布物・プレイ可能性、画面と記述の一致は要確認 | **第一候補の代表作品。** ビルド→計算→戦闘が実物で確認できる機能に絞り、1つの実装事例で説明する。READMEの機能一覧を丸ごと転載しない |
| Bomb Crash | 爆弾迎撃からWave攻略までゲームの遊びが明瞭。README/開発資料は `EndlessWaveRule`、`WaveGenerator`、`WaveManager`、`EnemySpawnController` のデータと進行処理の連携、ScriptableObject管理、役割分割を記載 | ページはチーム開発と表示するが、担当範囲は本人未確認。READMEはUnityプロジェクト内に公開用実行ファイル・ダウンロード先がないと記載。ガチャ機能は未実装のためホームUIから無効化と明記。ローカルサイトのDriveリンクの現状は不明 | **第二候補の代表作品。** Waveルール→生成→進行→出現という1つの処理経路を、実画面とコードリンクを結んで説明。ガチャや未確認の配布を完成要素として見せない |
| Algomate Colony | READMEと現行仕様資料に、複数行コマンド入力、行単位実行、Move/Gather/Deposit、ロボット状態・資源・チュートリアルの具体的な流れが記載されている。プログラム的な命令をゲーム進行へ接続する実装事例を提示しやすい | 資料自身が開発中プロトタイプと記す。現行仕様監査ではコマンド検証と実行の文法差、タイムアウトのない停止経路、移動・採集等の部分実装が記載され、Editor通しプレイも未確認。グラフ探索/A*と説明しない。本人担当・プレイ可能性は要確認 | **技術ケーススタディ／補足の候補。** 未完成の作品規模を誇張せず、実際に確認できる「入力→検証→逐次実行」の範囲に限定。実行経路の正確な表現と本人の説明確認が公開条件 |
| 指道場（FingerDojo） | README・資料に難易度選択、タイミングQTE、指撃、カウンター、休息、敵AI等の試作機能と、Command→StateController→ダメージ・HP反映の構成が記載されている。画面素材もローカルにある | READMEは試作とし、技・煽りコマンド処理は未実装と明記。Unity Play ModeやInspector/AnimationEvent接続は未確認。ページ内のデザイナー名表記に差があり、チーム情報は本人確認が必要 | **短い補足作品。** 1画面と1つの戦闘経路だけを紹介し、未実装コマンドを掲載上の機能に含めない。チームメンバー名は確認まで保留 |
| Kaomoji Clash / Reloaded | READMEはドラッグ射出、衝突条件、Wave、撃破経験値、Bumper選択・強化、共通ステータス計算などをソース・設定から記述。初版との変更を示す開発題材になり得る | READMEに制作途中、Unity Editor上のプレイ・ビルド未確認と明記。スキル装備と戦闘時参照の不整合、一部データ不足、Guard/クリティカル値が衝突ダメージへ適用されない等の指摘がある | **代表完成作と分離した開発中の記録。** 比較ページは維持するが、トップの完成作品枠と混同させない。現行コードで確認できた変更だけを記述 |

## 推奨する掲載優先度

1. **Kaomoji Clash（初版）** — 個人制作と独自のビルド軸を結び付けやすい。実際に説明・提示できる機能の範囲をコード・ビルド・本人の確認後に決定する。
2. **Bomb Crash** — チーム制作とデータ駆動のWave処理という、別の強みを示せる。配布ファイルを確認できなければ「プレイする」CTAを出さず、動画・リポジトリへの導線を用いる。
3. **Algomate Colony** — 独立した主要作品枠よりも、コマンド実行を追う技術ケーススタディ候補とする。部分実装を「完成済みの自動化・経路探索」と誤認させない。
4. **指道場** — 作品規模に合わせた短い補足ケース。チーム表記と実行状態を確認してから掲載範囲を確定。
5. **Kaomoji Clash / Reloaded** — 制作中の開発記録として分離し、完成作の件数・実績へ混ぜない。

掲載順位はコード・デモ・配布物の確認、および本人による担当範囲確認後に最終確定する。ここでいう候補は採用・実行を保証するものではない。

## 参照した公開一次資料

- [Algomate Colony README](https://github.com/HinataPiyo/AlgomateColony/blob/main/README.md)
- [Algomate Colony 現行ゲーム仕様](https://github.com/HinataPiyo/AlgomateColony/blob/main/Documentation/GameSpecification.md)
- [Algomate Colony 実装状況](https://github.com/HinataPiyo/AlgomateColony/blob/main/Documentation/ImplementationStatus.md)
- [Bomb Crash README](https://github.com/HinataPiyo/BombCrash/blob/main/README.md)
- [Bomb Crash 開発・設計ドキュメント](https://github.com/HinataPiyo/BombCrash/blob/main/Assets/Docs/documentation.md)
- [FingerDojo README](https://github.com/HinataPiyo/FingerDojo/blob/main/README.md)
- [FingerDojo 現状総合仕様書](https://github.com/HinataPiyo/FingerDojo/blob/main/Docs/CurrentProjectSpecification.md)
- [Kaomoji Clash README](https://github.com/HinataPiyo/KaomojiClash/blob/main/README.md)
- [Kaomoji Clash / Reloaded README](https://github.com/HinataPiyo/KaomojiClash_Reloaded/blob/main/README.md)
- 対応するローカルページ: [algomate.html](../../algomate.html)、[bombcrash.html](../../bombcrash.html)、[fingerdojo.html](../../fingerdojo.html)、[kaomoji.html](../../kaomoji.html)、[kaomoji-reloaded.html](../../kaomoji-reloaded.html)

## 残る工程1の調査

- READMEで触れた全機能と実際のソースを作品ごとに照合し、どの記述を公開に使えるか決める。
- トップの技術検証6件・その他2件、関連する動画、実行ファイル、紹介動画の現状と権限を確認する。
- 本人の担当、制作期間、チーム表記、面接で説明したい設計意図を本人に確認する。
- Play Mode、Editor参照、配布ビルドが今回実際に検証できるか確認し、コード・資料確認と動作確認を区別する。
