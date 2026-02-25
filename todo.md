# SaaS Pricing & Feature Roadmap

## 1. Tier 1: Free (The "Trial" Tier)

- **Price:** **$0 / month**
- **Game Limit:** **25 Games Total**
- **Strategy:** Provide just enough for a user to track their current rotation and a small backlog. This intentionally creates friction early to encourage upgrades while protecting the Neon DB 500MB free tier. At 25 games max, the DB can hold ~20,000 free users.
- **Features:** Basic tracking (Status, Rating), standard lists.

## 2. Tier 2: Pro (The "Enthusiast" Tier)

- **Price:** **$5.99 / month** (or **$59.99 / year**)
- **Game Limit:** **500 Games**
- **Strategy:** Represents a premium niche product. 500 games covers lifetime libraries while preventing bulk-import abuse. Just 10 users covers server and Neon Launch tier ($19/mo) costs.
- **Features:**
    - Track up to 500 games.
    - Advanced filters and sorting.
    - Custom collections/lists.
    - Rich text notes for game reviews.

## 3. Tier 3: Ultra / AI-Tier (The "Power User")

- **Price:** **$14.99 / month** (or **$149.99 / year**)
- **Game Limit:** **UNLIMITED** (Soft-cap ~5,000 to prevent bots)
- **Strategy:** Premium media tracking price giving full access to advanced features, structured to cover higher LLM API costs.
- **Features:**
    - Everything in Pro.
    - **AI "Next Game" Engine:** Uses LLM to analyze 5-star "Completed" games and generates highly personalized recommendations.
    - **Automated Backlog Prioritization:** AI suggests what to play next based on trends or recent completions.
    - **Data Export/Import:** CSV imports/exports.
