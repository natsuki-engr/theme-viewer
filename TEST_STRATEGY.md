# Your Themes 拡張機能 テスト戦略

## プロジェクト概要

**Your Themes** は VSCode のローカルテーマをプレビュー・管理する拡張機能です。

### 主要コンポーネント
- **extension.ts**: 拡張機能のエントリーポイント
- **panel.ts**: Webview パネルの管理
- **theme-extension.ts**: テーマ検索・情報取得ロジック
- **messageController/**: webview との通信処理
- **services/**: テーマ設定サービス

## 現在の状況

### 既存のテスト環境
- `@vscode/test-cli` + Mocha が設定済み
- 基本的なテストファイル (`src/test/extension.test.ts`) が存在
- `npm run test` でテスト実行可能

### 既存のテストユーティリティ
- **`tests/utils/load-theme-configs.ts`**: 外部テーマ設定ファイルをテスト用にロードするスクリプト
  - VSCode Marketplace から実際のテーマファイルをダウンロード
  - `tests/fixtures/themes/` ディレクトリにテーマファイルを保存
  - バージョンチェック機能付き
  - **テスト時のフィクスチャ準備に活用可能**

### 課題
- サンプルテストのみで実際の機能テストなし
- VSCode API に強く依存したコードのテストが困難
- ビジネスロジックが拡張機能コードに密結合

## テスト戦略

### 1. ユニットテスト (優先度: 高)

**対象**:
- `theme-extension.ts` の関数群
  - `getThemeExtensionList()`
  - `getThemeInfoList()`
  - `getColorSetting()`
- `messageController/` の各ハンドラー
- `services/` のロジック
- 型ガード関数や検証関数

**アプローチ**:
- VSCode API のモック化
- 純粋関数の分離
- **既存の `load-theme-configs.ts` でテストデータを準備**

**メリット**:
- 高速実行
- CI/CD での継続実行
- リファクタリング時の安全性確保

### 2. 統合テスト (優先度: 中)

**対象**:
- コマンド登録・実行の確認
- VSCode 設定の読み書き
- webview の作成・通信

**アプローチ**:
- VSCode テスト環境での実行
- 実際の拡張機能コンテキストでのテスト
- **実際のテーマファイルを使用した統合テスト**

### 3. E2Eテスト (優先度: 低)

**対象**:
- 拡張機能有効化 → UI表示 → テーマ切り替えのフロー

## テストフィクスチャ戦略

### 既存の `load-theme-configs.ts` の活用

#### 現在の機能
```typescript
// tests/utils/load-theme-configs.ts
- VSCode Marketplace からテーマファイルをダウンロード
- tests/fixtures/themes/{extension-id}/ に保存
- バージョンチェックとアップデート通知
```

#### テストでの活用方法

**1. 実際のテーマファイルでのテスト**
```typescript
// tests/fixtures/themes/ から実際のテーマファイルを読み込み
const fixtures = loadThemeFixtures('tests/fixtures/themes');
```

**2. 多様なテーマ形式への対応**
- 異なる形式のテーマファイル (JSON, plist)
- 様々な拡張機能からのテーマ
- ビルトインテーマとサードパーティテーマの混在

**3. テストデータの自動更新**
```bash
# テスト実行前にフィクスチャを更新
npm run update-fixtures
npm run test
```

## 実装改善提案

### テスト容易性向上のためのリファクタリング

#### 1. 依存注入パターンの導入
```typescript
interface IVSCodeAPI {
  extensions: typeof vscode.extensions;
  window: typeof vscode.window;
  workspace: typeof vscode.workspace;
}

// テスト時にモックを注入可能
class ThemeService {
  constructor(private api: IVSCodeAPI) {}
}
```

#### 2. 純粋関数の分離
```typescript
// Before: VSCode API に直接依存
export const getThemeInfoList = (): ThemeGroupInfo[] => {
  const themeGroups = vscode.extensions.all.filter(/* ... */);
  // ...
}

// After: 純粋関数として分離
export const filterThemeExtensions = (extensions: any[]): any[] => {
  // テスト可能な純粋関数
}

export const getThemeInfoList = (): ThemeGroupInfo[] => {
  const extensions = vscode.extensions.all;
  const themeGroups = filterThemeExtensions(extensions);
  // ...
}
```

#### 3. 設定層の抽象化
```typescript
interface IConfigService {
  get<T>(key: string): T;
  update(key: string, value: any): Promise<void>;
}

class VSCodeConfigService implements IConfigService {
  get<T>(key: string): T {
    return vscode.workspace.getConfiguration().get(key);
  }
  // ...
}
```

#### 4. ファイルシステムアクセスの抽象化
```typescript
interface IFileSystem {
  readFileSync(path: string, encoding: string): string;
  existsSync(path: string): boolean;
}

// theme-extension.ts の getColorSetting を改善
export const getColorSetting = async (
  filePath: string,
  fs: IFileSystem = require('fs') // デフォルトで Node.js fs
): Promise<ColorThemeSetting | null> => {
  const file = fs.readFileSync(filePath, "utf-8");
  // ...
}
```

## テスト実装計画

### Phase 1: 基盤整備
1. テスト用のディレクトリ構造整備
   ```
   tests/
   ├── fixtures/
   │   └── themes/           # load-theme-configs.ts で生成
   ├── mocks/               # VSCode API モック
   ├── helpers/             # テストヘルパー関数
   └── unit/                # ユニットテストファイル
   ```

2. フィクスチャ管理の改善
   - `load-theme-configs.ts` の package.json スクリプト化
   - テスト実行時の自動フィクスチャ更新オプション

3. モックライブラリの設定
   - sinon.js for VSCode API mocking
   - カスタムモック実装

### Phase 2: ユニットテスト実装
1. **`theme-extension.ts` のテスト**
   ```typescript
   // 実際のテーマファイルを使用したテスト
   describe('getColorSetting', () => {
     it('should parse Dracula theme correctly', () => {
       const dracula = getColorSetting('tests/fixtures/themes/dracula/dracula.json');
       expect(dracula.type).toBe('dark');
     });
   });
   ```

2. **`messageController` のテスト**
   - webview メッセージハンドリング
   - エラーケースの処理

3. **型ガード関数のテスト**
   - 様々なフォーマットのテーマファイルでの検証

### Phase 3: 統合テスト実装
1. **実際のテーマファイルでの統合テスト**
   - フィクスチャを使用した end-to-end 動作確認
   - 複数テーマ形式での動作検証

2. **コマンド実行のテスト**
3. **webview 作成のテスト**
4. **設定変更のテスト**

### Phase 4: CI/CD統合
1. **GitHub Actions でのテスト実行**
   ```yaml
   - name: Prepare test fixtures
     run: npm run update-fixtures

   - name: Run tests
     run: npm run test
   ```

2. **テストカバレッジ計測**
3. **コードベース変更時の自動テスト**

## 技術選択

### テストフレームワーク
- **Mocha** (既存): VSCode 拡張機能の標準
- **@vscode/test-cli**: VSCode 環境でのテスト実行

### モック・アサーション
- **sinon**: VSCode API のモック化
- **assert** (Node.js標準): シンプルなアサーション

### テストデータ管理
- **`tests/utils/load-theme-configs.ts`** (既存): フィクスチャの準備・更新
- **`tests/fixtures/`**: 実際のテーマファイル保存場所
- **`tests/mocks/`**: VSCode API のモック実装

### 実装済み package.json スクリプト
```json
{
  "scripts": {
    "update-fixtures": "node tests/utils/load-theme-configs.ts",
    "test": "vscode-test",
    "test:unit": "mocha out/test/unit/**/*.test.js",
    "test:compile": "npm run compile",
    "test:all": "npm run update-fixtures && npm run compile && npm run test:unit && npm run test"
  }
}
```

## 期待される効果

1. **品質向上**:
   - 実際のテーマファイルでの動作確認
   - バグの早期発見・修正

2. **開発効率**:
   - リファクタリング時の安全性
   - 新機能開発時の回帰テスト自動化

3. **保守性**:
   - コードベースの理解促進
   - テストケースがドキュメントとしても機能

4. **信頼性**:
   - リリース前の多様なテーマでの動作確認
   - 継続的なテストデータ更新

## 実装完了状況

### ✅ 完成したテスト環境

**TEST_STRATEGY.md**に基づいて以下を**実装完了**しました：

### 1. ディレクトリ構造 ✅
```
src/test/
├── extension.test.ts          # VSCode統合テスト
├── unit/                      # ユニットテスト
│   ├── theme-extension.test.ts
│   ├── type-guards.test.ts
│   └── messageController.test.ts
├── helpers/                   # テストヘルパー
│   ├── fixtures.ts
│   └── test-utils.ts
└── mocks/                     # モック実装
    └── vscode.ts

tests/utils/                   # フィクスチャ管理
└── load-theme-configs.ts
```

### 2. package.jsonスクリプト ✅
```json
{
  "scripts": {
    "test": "vscode-test",                    // VSCode統合テスト
    "test:unit": "mocha out/test/unit/**/*.test.js",  // 純粋ユニットテスト
    "test:compile": "npm run compile",        // テスト用コンパイル
    "test:all": "npm run update-fixtures && npm run compile && npm run test:unit && npm run test",
    "update-fixtures": "node tests/utils/load-theme-configs.ts"
  }
}
```

### 3. 実装したテスト ✅

#### **theme-extension.test.ts** (7つのテストスイート)
- `getThemeExtensionList()` - テーマ拡張機能の抽出
- `getThemeInfoList()` - テーマ情報の構築
- `getColorSetting()` - テーマファイルのパース
- 20+ のテストケースで各関数の動作を検証

#### **type-guards.test.ts** (3つのテストスイート)
- `isThemeInfo()` - ThemeInfo型の検証
- `isThemeGroupInfo()` - ThemeGroupInfo型の検証
- `isColorThemeSetting()` - ColorThemeSetting型の検証
- 包括的な型ガード関数のテスト

#### **messageController.test.ts** (3つのテストスイート)
- `getCurrentTheme()` - 現在のテーマ取得
- `getConfigTargets()` - 設定対象の取得
- `updateColorTheme()` - テーマ更新処理
- VSCode API統合のテスト

#### **extension.test.ts** (統合テスト)
- 拡張機能の存在確認
- コマンド登録の確認
- 拡張機能の有効化テスト
- 基本動作の確認

### 4. 技術選択 ✅

#### **テスト実行環境**
- **メイン**: `@vscode/test-cli` (VSCode統合テスト)
- **ユニット**: `mocha` + `sinon` (純粋関数テスト)
- **モック**: 自作VSCodeMockクラス
- **フィクスチャ**: `load-theme-configs.ts`で実テーマファイル管理

#### **依存関係**
```json
{
  "devDependencies": {
    "@types/mocha": "^10.0.6",
    "@types/sinon": "^17.0.3",
    "@vscode/test-cli": "^0.0.9",
    "@vscode/test-electron": "^2.3.9",
    "mocha": "^10.0.0",
    "sinon": "^18.0.0"
  }
}
```

### 5. テスト実行方法 ✅

```bash
# ユニットテスト（高速）
npm run test:unit

# VSCode統合テスト
npm run test

# フィクスチャ更新
npm run update-fixtures

# 全テスト実行（推奨）
npm run test:all
```

### 6. 期待される効果 ✅

1. **品質向上**:
   - 実際のテーマファイルでの動作確認
   - バグの早期発見・修正
   - リファクタリング時の安全性確保

2. **開発効率**:
   - 高速ユニットテスト（数秒で実行）
   - VSCode環境での統合確認
   - 継続的なテストデータ更新

3. **保守性**:
   - テストケースがドキュメントとして機能
   - コードベースの理解促進
   - 新機能開発時の回帰テスト自動化

4. **信頼性**:
   - リリース前の多様なテーマでの動作確認
   - CI/CD パイプラインでの自動検証

## 次のステップ（推奨）

1. **CI/CD統合**: GitHub Actionsでの自動テスト実行
2. **カバレッジ計測**: Istanbul等でのテストカバレッジ測定
3. **パフォーマンステスト**: 大量のテーマファイルでの性能確認
4. **E2Eテスト**: Playwright等でのUI自動テスト
5. **継続的改善**: テストケースの追加・改善