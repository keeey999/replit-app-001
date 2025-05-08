# GitHub Pagesへのデプロイ手順

このアプリケーションをGitHub Pagesにデプロイするには、以下の手順に従ってください。

## 1. アプリケーションをエクスポートする

まず、Replitからコードをエクスポートします：

1. Replitプロジェクトの「Tools」メニューを開く
2. 「Git」を選択
3. 「Download ZIP」をクリックしてプロジェクトのZIPファイルをダウンロード
4. ZIPファイルを解凍

## 2. GitHubリポジトリを作成する

1. GitHubで新しいリポジトリを作成
2. リポジトリ名は任意（例：`first-impression`）
3. リポジトリを作成後、以下のコマンドでローカルリポジトリを初期化し、GitHubにプッシュします：

```bash
# プロジェクトフォルダ内で実行
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/あなたのユーザー名/リポジトリ名.git
git push -u origin main
```

## 3. GitHub Actionsのワークフローファイルを作成する

リポジトリのルートに `.github/workflows` ディレクトリを作成し、その中に `deploy.yml` ファイルを作成します：

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  workflow_dispatch:

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Build client
        run: |
          npm run build
          touch dist/public/.nojekyll
          
      - name: Deploy to GitHub Pages
        uses: JamesIves/github-pages-deploy-action@v4
        with:
          folder: dist/public
          branch: gh-pages
```

## 4. package.jsonの更新

パッケージのビルドコマンドを確認します：

```json
{
  "scripts": {
    "build": "vite build"
  }
}
```

が存在していることを確認します。

## 5. GitHub Pagesの設定

1. GitHubリポジトリの「Settings」タブを開く
2. 左側メニューから「Pages」を選択
3. ソースとして「Deploy from a branch」を選択
4. ブランチを「gh-pages」、フォルダを「/ (root)」に設定
5. 「Save」ボタンをクリック

## 6. デプロイの確認

GitHub Actionsのワークフローが実行完了したら、`https://あなたのユーザー名.github.io/リポジトリ名/` にアクセスしてアプリケーションが正常にデプロイされたことを確認します。

## 重要: ハッシュベースのルーティングに関する注意

このプロジェクトではGitHub Pages対応のために、`App.tsx`にハッシュベースのルーティングを実装しています。これは静的ホスティング環境でシングルページアプリケーション（SPA）を正しく動作させるために必要です。

ハッシュベースのルーティングにより、URLは以下のような形式になります：
```
https://あなたのユーザー名.github.io/リポジトリ名/#/
```

このルーティング方式は以下のようなメリットがあります：
- 静的ホスティングでもページのリロード時に404エラーが発生しない
- ブラウザのリロードやブックマークが正しく動作する

## 注意点

- GitHub Pagesはサーバーサイドのコードを実行できないため、このアプリはクライアントサイドの機能のみが利用可能です。
- 画像のアップロードはローカルのファイルとして機能し、サーバーに保存されることはありません。
- アプリの状態はブラウザのセッション内でのみ保持されます。