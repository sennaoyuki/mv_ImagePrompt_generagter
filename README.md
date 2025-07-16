# リスティング広告ランキングサイト項目生成システム

リスティング広告におけるランキングサイトで記載すべき項目を自動的にリスト化するWebアプリケーションです。

## 機能概要

- **共通項目生成**: 全ジャンル共通の必須項目リストを提供
- **ジャンル別項目生成**: 医療脱毛、AGA治療、包茎手術、痩身治療などの専門項目を提供
- **地域別項目管理**: エリア特化型ランキングサイト向けの項目を提供
- **SEO最適化**: 検索上位表示に効果的な項目構成を提案
- **コンテンツテンプレート**: 各項目の具体的なコンテンツ例とテンプレートを提供
- **法的コンプライアンス**: 薬機法や景品表示法に対応した項目を自動生成

## 技術スタック

### バックエンド
- **Node.js** + **Express.js**
- **TypeScript**
- **PostgreSQL**
- **JWT認証**
- **Winston**（ログ管理）

### フロントエンド
- **React** + **TypeScript**
- **Styled Components**
- **React Router**
- **Axios**
- **React Hook Form**

### データベース
- **PostgreSQL 14+**
- **マイグレーション機能**
- **シードデータ**

## セットアップ

### 必要な環境
- Node.js 18+
- PostgreSQL 14+
- npm または yarn

### データベースセットアップ
```bash
# PostgreSQLデータベースの作成
createdb listing_ad_ranking

# スキーマの作成
psql -d listing_ad_ranking -f database/schema.sql

# 初期データの挿入
psql -d listing_ad_ranking -f database/seeds.sql
```

### バックエンドセットアップ
```bash
cd backend
npm install
cp .env.example .env
# .envファイルを編集してデータベース設定を更新
npm run dev
```

### フロントエンドセットアップ
```bash
cd frontend
npm install
npm start
```

### 全体の起動
```bash
# ルートディレクトリで
npm install
npm run dev
```

## API仕様

### 項目生成API
```
POST /api/items/generate
{
  "genres": ["医療脱毛", "AGA治療"],
  "region": "東京都",
  "seoOptimized": true,
  "includeCompliance": true
}
```

### テンプレート取得API
```
GET /api/templates/:itemId
```

### カスタマイズ保存API
```
POST /api/customizations/save
{
  "userId": "user123",
  "projectName": "医療脱毛ランキング",
  "selectedItems": ["item1", "item2"],
  "customItems": [...],
  "settings": {...}
}
```

## 対応ジャンル

### 医療系
- 医療脱毛
- AGA治療
- 包茎手術
- 痩身治療
- 美容整形

### その他
- フィットネス
- 一般サービス

## 法的コンプライアンス

### 薬機法対応
- 効果効能の適切な表現
- 医師監修表示
- 体験談の適切な扱い

### 景品表示法対応
- 比較根拠の明示
- 調査データの出典表示
- 誇大表現の排除

## 開発

### テスト実行
```bash
# バックエンドテスト
cd backend && npm test

# フロントエンドテスト
cd frontend && npm test

# 全体テスト
npm test
```

### ビルド
```bash
# 本番ビルド
npm run build
```

## ライセンス

MIT License