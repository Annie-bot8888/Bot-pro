# Annie 日文漢字 · 每日練習

香港學習者用 JLPT N3–N2 漢字 flashcard + 每日小測。

## 點樣開
1. 開啟 **`index.html`**（主應用）
2. 或者喺呢個資料夾跑：
   ```bash
   cd /workspace/flashcards && python3 -m http.server 8765
   ```
   然後瀏覽器開 `http://localhost:8765/`

## 功能
- **主頁／今日** — Day 1 日常生活
- **開始翻卡** — 20 張翻卡；正面圖+漢字；背面突出 **音読み（音）／訓読み（訓）**、粵語意思、例句；可撳「讀一次」聽日文讀音（Web Speech API）
- **今日小測** — 10 題混合：睇圖／意思揀漢字、揀正確讀音、例句意思；最後計分同錯題複習

## 資料結構（方便加 Day 2+）
```
flashcards/
  index.html          ← 主應用
  day1/
    cards.json
    images/kanji_01_….png … kanji_20_….png
  day2/               ← 之後加
```

鍵盤：← → 換卡，空白鍵／Enter 翻卡。
