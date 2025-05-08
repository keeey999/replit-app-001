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

## 3. GitHubリポジトリにプッシュする

すでにこのプロジェクトでは、GitHub Pagesデプロイに必要なファイルが含まれています：

- `.github/workflows/deploy.yml` - GitHubアクションのワークフロー設定
- `client/public/.nojekyll` - Jekyll処理を無効化するためのファイル
- `client/public/404.html` - 404エラーを処理するためのリダイレクトページ

必要なファイルはすべて設定済みですので、GitHubリポジトリにプッシュするだけでGitHub Actionsが自動的にデプロイを行います。

## 4. GitHub Pagesの設定

GitHubリポジトリにコードをプッシュした後：

1. GitHubリポジトリの「Settings」タブを開く
2. 左側メニューから「Pages」を選択
3. ソースとして「Deploy from a branch」を選択
4. ブランチを「gh-pages」、フォルダを「/ (root)」に設定
5. 「Save」ボタンをクリック

GitHub Actionsのワークフローは自動的に以下を行います：
- Nodeモジュールのインストール
- アプリケーションのビルド
- ビルド結果の`gh-pages`ブランチへのプッシュ

## 5. デプロイの確認

GitHub Actionsのワークフローが実行完了したら、`https://あなたのユーザー名.github.io/リポジトリ名/` にアクセスしてアプリケーションが正常にデプロイされたことを確認します。

ウェブサイトにアクセスする際のURL形式：
```
https://<GitHubユーザー名>.github.io/<リポジトリ名>/
```

## アプリケーション機能について

GitHub Pagesにデプロイされたバージョンでは以下の機能が利用可能です：

- プロフィール情報の入力と編集
- 写真のアップロードとプレビュー
- レイアウトとカラーテーマの選択
- プロフィールカードの画像としてのダウンロード

## 注意点

- GitHub Pagesはサーバーサイドのコードを実行できないため、このアプリはクライアントサイドの機能のみが利用可能です。
- 画像のアップロードはブラウザのメモリに一時的に保存され、サーバーには保存されません。
- アプリの状態はブラウザのセッション内でのみ保持されます。
- 入力データは自動的に保存されないため、作業が完了したら必ず画像としてダウンロードすることをお勧めします。