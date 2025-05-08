import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Set the page title
document.title = "First Impression | 新入社員紹介ジェネレーター";

// Add meta description for SEO
const metaDescription = document.createElement("meta");
metaDescription.name = "description";
metaDescription.content = "First Impression - 新入社員の写真とプロフィールを入力して、おしゃれな紹介ページを生成するアプリケーション。";
document.head.appendChild(metaDescription);

createRoot(document.getElementById("root")!).render(<App />);
