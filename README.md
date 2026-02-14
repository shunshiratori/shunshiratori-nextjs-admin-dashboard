# Next.js コーポレートサイト

このプロジェクトは、Next.js (App Router) と TypeScript を使用して構築されたコーポレートサイトです。管理ダッシュボード（/admin 以下）ではコンテンツ管理が可能ですが、一般ユーザーからはアクセスできません。

## 技術スタック

*   **フレームワーク**: Next.js 16+
*   **言語**: TypeScript
*   **認証・DB**: Supabase
*   **スタイリング**: Tailwind CSS
*   **リンティング**: ESLint

## 開発サーバーの起動

開発サーバーを起動するには、以下のコマンドを実行します。

```bash
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) にアクセスすると、アプリケーションが表示されます。

## ヘッダーの表示制御について

`/admin` 以下のパスでは、ヘッダーコンポーネントが表示されないように設定されています。これは、ルートレイアウト (`src/app/layout.tsx`) がサーバーコンポーネントとして機能し、`ConditionalHeader` クライアントコンポーネント (`src/app/component/ConditionalHeader.tsx`) が現在のパスに基づいてヘッダーの表示・非表示を制御することで実現されています。

## Next.js について

Next.js の詳細については、以下のリソースを参照してください。

- [Next.js Documentation](https://nextjs.org/docs) - Next.js の機能とAPIについて学習します。
- [Learn Next.js](https://nextjs.org/learn) - Next.js のインタラクティブなチュートリアルです。

[Next.js GitHub リポジリ](https://github.com/vercel/next.js) もご確認ください。フィードバックや貢献を歓迎します！

## Vercel へのデプロイ

Next.js アプリケーションをデプロイする最も簡単な方法は、Next.js の開発元である [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) を使用することです。

詳細は [Next.js デプロイメントドキュメント](https://nextjs.org/docs/app/building-your-application/deploying) を参照してください。

## このサイトについて

### 何を作ったか

Next.js の App Router を利用した企業サイトのテンプレートを作成しました。一般ユーザー向けの公開ページと、認証された管理者のみがアクセスできる保護された管理ダッシュボード（/admin）で構成されています。管理ダッシュボードでは、ブログ記事などのコンテンツを管理することを想定しています。

### 誰のためのサイトか

中小企業やスタートアップが、Next.js と Supabase を使って、迅速に企業サイトやブログシステムを立ち上げたい場合に利用できるテンプレートです。管理画面と一般公開画面が一体となっているため、CMSとしても活用できます。

### 技術選定理由

*   **Next.js (App Router)**: 最新の機能とパフォーマンス最適化を活用するため。サーバーコンポーネントとクライアントコンポーネントの柔軟な使い分けが魅力です。
*   **TypeScript**: 大規模なアプリケーション開発における型安全性の確保と、開発効率の向上を図るため。
*   **Supabase**: 認証機能とデータベース（PostgreSQL）を迅速に導入できる BaaS (Backend as a Service) であるため。リアルタイム機能も備えており、開発コストを抑えつつリッチな機能を実現できます。
*   **Tailwind CSS**: ユーティリティファーストなCSSフレームワークであり、迅速なUI開発とデザインの一貫性を保つために採用しました。カスタマイズ性も高く、プロジェクトの規模に関わらず柔軟に対応できます。

### 苦労した点

*   **Next.js 16 (App Router) の学習**: Server Components と Client Components の使い分け、データの取得方法 (fetch API, Server Actions など)、キャッシュ戦略など、従来の Pages Router からの移行に伴う新しいパラダイムの理解に苦労しました。特に `use client` ディレクティブの使用箇所とその影響について、深い理解が必要でした。
*   **Supabase との連携**: RLS (Row Level Security) の設定や、サーバーサイド・クライアントサイドでの Supabase クライアントの適切な利用方法、認証フローの実装において学習コストがありました。特に、サーバーコンポーネント内でのセッション管理とクライアントコンポーネントでのデータ操作の連携が課題でした。
*   **認証と認可**: `/admin` パス以下を保護するためのミドルウェアの実装と、Supabase の RLS を組み合わせた堅牢な認証・認可システムの構築に試行錯誤しました。

### 学んだこと

*   **Next.js App Router のベストプラクティス**: Server Components と Client Components を適切に使い分けることで、パフォーマンスと開発体験を両立できることを学びました。特に、クライアントサイドでインタラクティブな要素が必要な部分にのみ `use client` を適用し、それ以外は Server Components で構成する重要性を再認識しました。
*   **データフェッチ戦略**: Next.js 16 における `fetch` の拡張とキャッシュの仕組みを理解し、効率的なデータ取得と表示方法を習得しました。
*   **Supabase の強力さ**: 認証、データベース、ストレージ、Edge Functions といった多様な機能を一つのプラットフォームで提供する Supabase の強力さと開発の容易さを実感しました。特に RLS を活用することで、バックエンドのセキュリティロジックを簡素化できる点が大きな学びでした。
*   **プロジェクト構造とスケーラビリティ**: 大規模なアプリケーションを見据えたコンポーネントの分割、モジュール構造、状態管理の設計について、より実践的な知見を得ることができました。
