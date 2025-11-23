# 片山建設工業株式会社 - 公式ウェブサイト

## 概要

片山建設工業の公式ウェブサイトは、Next.js 14、TypeScript、Tailwind CSS、Supabaseを使用して構築された高性能な企業サイトです。

## 主な機能

- 🏗️ **施工実績管理** - 動的なポートフォリオシステム
- 📰 **ニュース・お知らせ** - ブログ機能とMarkdownサポート
- 📞 **お問い合わせフォーム** - hCaptcha統合とファイル添付
- ♿ **アクセシビリティ** - WCAG 2.2 AA準拠
- 🔍 **SEO最適化** - メタデータ、構造化データ、OGP
- 📊 **パフォーマンス監視** - Core Web Vitalsトラッキング
- 🌐 **多言語対応** - 日本語最適化
- 📱 **レスポンシブデザイン** - モバイルファースト

## 技術スタック

- **フレームワーク**: Next.js 14 (App Router)
- **言語**: TypeScript
- **スタイリング**: Tailwind CSS
- **データベース**: Supabase (PostgreSQL)
- **認証**: Supabase Auth
- **ストレージ**: Supabase Storage
- **フォーム**: React Hook Form + Zod
- **キャプチャ**: hCaptcha
- **アニメーション**: Framer Motion
- **アイコン**: Lucide React

## 環境構築

### 必要な環境

- Node.js 18以上
- npm または pnpm
- Supabaseアカウント

### セットアップ

1. リポジトリをクローン
```bash
git clone [repository-url]
cd katayama-site
```

2. 依存関係をインストール
```bash
npm install
# または
pnpm install
```

3. 環境変数を設定
`.env.local`ファイルを作成し、以下の環境変数を設定：

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# hCaptcha Configuration
NEXT_PUBLIC_HCAPTCHA_SITE_KEY=your_site_key
HCAPTCHA_SECRET_KEY=your_secret_key

# Email Configuration
EMAIL_FROM=noreply@katayama-k.jp
EMAIL_TO=info@katayama-k.jp
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_smtp_user
SMTP_PASS=your_smtp_password

# Analytics Configuration
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=katayama-k.jp
```

4. 開発サーバーを起動
```bash
npm run dev
# または
pnpm dev
```

5. ブラウザで開く
```
http://localhost:3000
```

## デプロイメント

### Vercelへのデプロイ

1. Vercelにログイン
2. プロジェクトをインポート
3. 環境変数を設定
4. デプロイを実行

### 環境変数の設定（Vercel）

Vercelダッシュボードで以下の環境変数を設定：

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `NEXT_PUBLIC_HCAPTCHA_SITE_KEY`
- `HCAPTCHA_SECRET_KEY`
- `EMAIL_FROM`
- `EMAIL_TO`
- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_USER`
- `SMTP_PASS`
- `NEXT_PUBLIC_GA_ID`
- `NEXT_PUBLIC_PLAUSIBLE_DOMAIN`

## データベーススキーマ

### 主要テーブル

- **works** - 施工実績
- **news** - ニュース記事
- **inquiries** - お問い合わせ
- **services** - サービス情報
- **representatives** - 代表者情報
- **web_vitals** - パフォーマンスメトリクス

### マイグレーション

```bash
# マイグレーションを適用
npm run db:migrate

# データベースをシード
npm run db:seed
```

## パフォーマンス最適化

### Core Web Vitals

- **LCP (Largest Contentful Paint)**: < 2.5秒
- **FID (First Input Delay)**: < 100ms
- **CLS (Cumulative Layout Shift)**: < 0.1

### 最適化機能

- 画像最適化（Next.js Image）
- コード分割
- 遅延読み込み
- キャッシュ戦略
- Gzip圧縮

## アクセシビリティ

### WCAG 2.2 AA準拠

- キーボードナビゲーション
- スクリーンリーダー対応
- 高コントラストモード
- フォントサイズ調整
- 画像alt属性
- ARIAラベル

## セキュリティ

### 実装されているセキュリティ対策

- Content Security Policy (CSP)
- HTTPS強制
- XSS保護
- CSRFトークン
- SQLインジェクション対策
- ファイルアップロード制限

## モニタリング

### ヘルスチェック

```bash
# ヘルスチェックエンドポイント
GET /api/health-check
```

### パフォーマンス監視

- Web Vitalsトラッキング
- エラーログ収集
- パフォーマンスメトリクス
- アラート設定

## バックアップと復元

### データベースバックアップ

Supabaseの自動バックアップ機能を使用：
- デイリーバックアップ
- ポイントインタイムリカバリ
- エクスポート/インポート機能

### ファイルストレージ

Supabase Storageのバックアップ：
- 自動レプリケーション
- バージョン管理
- 削除保護

## トラブルシューティング

### よくある問題

1. **データベース接続エラー**
   - 環境変数を確認
   - ネットワーク接続を確認
   - Supabaseステータスを確認

2. **画像が表示されない**
   - Supabase Storageの設定を確認
   - CORS設定を確認
   - ファイルパスを確認

3. **フォーム送信エラー**
   - hCaptchaの設定を確認
   - SMTP設定を確認
   - メールアドレスを確認

### ログ確認

```bash
# 開発環境
npm run dev

# ビルドログ
npm run build

# 本番環境ログ（Vercel）
vercel logs
```

## 貢献ガイドライン

1. ブランチを作成
```bash
git checkout -b feature/your-feature
```

2. 変更をコミット
```bash
git commit -m "feat: your feature description"
```

3. プッシュとプルリクエスト
```bash
git push origin feature/your-feature
```

## ライセンス

このプロジェクトはプライベートリポジトリです。

## お問い合わせ

技術的なご質問は、開発チームまでお問い合わせください。

- Email: dev@katayama-k.jp
- Phone: 03-1234-5678

## 更新履歴

### v1.0.0 (2024-11-21)
- 初期リリース
- 基本的なページ構成
- お問い合わせフォーム
- 施工実績表示
- ニュース機能
- アクセシビリティ対応
- SEO最適化
- パフォーマンス監視