# 🎲 TGOL App Build Instructions – Claude Code
Welcome to **The Game of Lifestyle (TGOL)** – a sensual, cheeky, 1950s-inspired party game for couples and groups. Your mission, Claude, is to construct a beautiful, flirtatious, and functional game app using Claude Code, hosted on Vercel.
---
## 📁 Project Structure
Create the following directory layout (the base directory is the current folder):
tgoldigital/
├── Claude.md
├── public/
│ ├── avatars/
│ ├── audio/
│ └── images/
├── src/
│ ├── data/
│ │ ├── decks.json
│ │ ├── categories.json
│ │ └── avatars.json
│ ├── components/
│ ├── pages/
│ │ ├── index.tsx
│ │ ├── lobby.tsx
│ │ ├── consent.tsx
│ │ ├── game.tsx
│ │ ├── results.tsx
│ │ └── store.tsx
│ └── utils/
│ └── gameLogic.ts
├── .env
├── README.md
└── package.json
---
## 🔢 JSON Files
### `categories.json`
Create a file using the cleaned tag list (from CSV provided):
```json
[
  "Kissing",
  "Oral",
  "Roleplay",
  "Group Play",
  "Blindfolding",
  "Nipple Play"
]
Prompt the PM if the final list or CSV isn't fully uploaded.
---
### `avatars.json`
Use placeholder metadata for Elvgren-style avatars (images to come later):
[
  {
    "id": "ava1",
    "name": "Sassy Sue",
    "gender": "female",
    "image": "/avatars/sue.png",
    "animations": ["wink", "o-mouth"]
  },
  {
    "id": "ava2",
    "name": "Flirty Fred",
    "gender": "male",
    "image": "/avatars/fred.png",
    "animations": ["wink"]
  }
]
---
### `decks.json`
Organize decks into game modes and levels. Use sample card files found in the PM’s local folder:
C:\Users\nicab\hot-n-heavy-game\public\cards
Expected format per card:
{
  "id": "HH-L1-001",
  "text": "Kiss your partner’s neck while blindfolded.",
  "tags": ["Kissing", "Blindfolding"],
  "level": "L1",
  "gender": "any",
  "repeatable": true
}
Structure:
{
  "icebreaker": [ ... ],
  "hotAndHeavy": {
    "L1": [ ... ],
    "L2": [ ... ],
    "L3": [ ... ]
  },
  "extraHot": {
    "L4": [ ... ],
    "L5": [ ... ]
  }
}
Prompt PM to upload full decks when needed.
Game Logic
1.	Max 8 players
2.	Enter: name, gender, avatar, partner
3.	Track preferences & spice level (L1–L5)
4.	Cards rotate per turn, filtered by:
o	Player’s level
o	Category preferences
o	Partner logic (no overlap unless prompted)
5.	Skips allowed without restriction
6.	After each set of 18 unique cards per level → Check-in prompt (flame UI selector)
________________________________________
🎶 Audio & UI
Placeholders:
•	/public/audio/card-shuffle.mp3
•	/public/audio/bg-music.mp3
MP3 format is preferred.
________________________________________
🛍️ Store Page
Build /store.tsx using WIX:
•	Display product cards for each deck
•	“Buy Now” button → external WIX checkout
•	Add shipping/discreet packaging note
Prompt PM for WIX links and product info.
________________________________________
🎨 Brand Style
Reference brand guide PDF (found here: C:\Users\nicab\hot-n-heavy-game\public\brand)
•	Fonts: Futura Std, Mission Script
•	Colors:
o	Red: #B9340B
o	Green: #498379
o	Cream: #F7F3E2
•	Use subtle animations (fades, winks, glowing flames)
•	Visual inspiration: Gil Elvgren pin-up artwork
________________________________________
💌 Prompts for PM
•	Request: final card decks in JSON or spreadsheet
•	Request: final avatar images (headshots, gifs)
•	Request: audio files for shuffle & music
•	Request: WIX product URLs for store
