---
title: 'StockBot'
role: 'Creator & Quantitative Engineer'
tech:
  - 'Python'
  - 'Pandas'
  - 'NLP'
  - 'Sentiment Analysis'
  - 'Reddit API'
  - 'Twitter API'
  - 'Technical Indicators'
summary: 'Sentiment-driven trading research tool that combines social media analysis, technical indicators, and basic execution logic to prototype and backtest strategies.'
description: 'Experimental trading bot that scrapes Reddit and Twitter for sentiment signals, applies NLP to generate trading indicators, and tests strategies in simulation — learning how to structure trading systems and why naive approaches fail.'
startDate: 2022-09-01
endDate: 2023-05-15
status: 'Completed'
category: 'Archive'
featured: false
gallery:
  - src: '/assets/projects/stockbot.png'
    alt: 'StockBot sentiment analysis dashboard'
links:
  - label: 'GitHub'
    url: 'https://github.com/thejackluo/stockbot'
---

StockBot started as an experiment: Can you build a trading system that listens to social media sentiment and trades automatically?

Spoiler: not a reliably profitable one. But the process taught me a ton about quantitative systems, market data, and the gap between "this sounds like it should work" and "this actually makes money."

## The Idea

Most retail traders lose money because they trade emotionally — buying into hype, panic selling, chasing trends late. The thought behind StockBot was: what if we could automate a strategy that exploits those sentiment swings or at least removes human emotion from the equation?

StockBot combined:

- **Social Sentiment Signals** – Scraping Reddit (r/wallstreetbets, r/stocks, etc.) and Twitter for ticker mentions and general mood (bullish vs bearish posts).
- **Technical Indicators** – Classic market signals (moving averages, RSI, volume spikes) to time entries and exits.
- **Basic Trade Logic** – Simple rules to enter a position when sentiment + technicals align, and exit based on predefined risk limits or mean reversion.

The goal wasn't to "print money" but to learn how a trading strategy could be automated and to see where it would break.

## How It Works

**Data Collection**: A Python pipeline pulls data from the Reddit API (via PRAW) and Twitter API. It gathers posts/comments mentioning stock tickers, then filters and normalizes the text (removing spam, parsing tickers, etc.).

**Sentiment Analysis**: Using NLP (simple lexicon-based sentiment scoring and some pre-trained models), StockBot gauges the mood around certain stocks. It calculates metrics like:

- Volume of mentions per hour (is a stock suddenly trending?).
- Sentiment score of each mention (positive/negative tone).
- Engagement-weighted sentiment (a post with 500 upvotes counts more than one with 2).

**Signal Generation**: These sentiment features are combined with technical indicator values pulled via finance APIs (price data). For example, a potential signal might be: "Ticker $XYZ has 5x usual mention volume today and sentiment has flipped positive while its price is still 10% below its 7-day average." The system flags that as a possible buy scenario (anticipating price might catch up to hype).

**Backtesting & Execution**: I fed historical data (both social and market) into the system to simulate trades. If a strategy variant looked semi-promising, I'd paper trade it in real-time (no real money, just observing). The execution logic was basic: buy a fixed amount of a stock when signaled, set a stop-loss, and take-profit, etc., then log results.

## What I Learned (Hard Truths)

- **Sentiment often lags price.** By the time Reddit is hyping a stock, it's often already run up. Social sentiment can be a coincident or lagging indicator, not as predictive as hoped.
- **"More data" ≠ "better signals."** I threw in a lot of data sources and many indicators initially. That just made it easier to overfit a backtest. Simpler, cleaner signals ended up more robust.
- **Transaction costs and slippage matter.** A strategy that trades too frequently or on low-volume stocks gets eaten alive by fees and bad fill prices. My early versions completely ignored this, skewing backtest results.
- **Overfitting is easy.** I could always tweak a strategy to make the backtest profit, but those tweaks usually didn't generalize. It was a lesson in being honest with yourself when doing quantitative experiments.

**Valuable Skills Gained**: I learned how to structure a data pipeline for real-time analysis, how to design and evaluate a strategy (the basics of quantitative finance), and how to separate strategy logic from execution plumbing. Perhaps most importantly, I learned to appreciate risk management — even a "good" signal can lose money if you size positions wrong or fail to cut losses.

## Current Status

StockBot was a learning tool, not a production trading system. I didn't run it with real money (fortunately!). The codebase and research notes are on GitHub for anyone curious. After this project, I shifted focus to more controlled domains, but the lessons from building StockBot influenced how I approach any complex system that tries to predict real-world outcomes.

## What's Next

The experience from StockBot directly influenced some of my later projects:

- **Efficore's optimization approach** – balancing multiple objectives under uncertainty felt very similar to balancing risk vs reward in trading.
- **Delight's decision architecture** – choosing the "next best action" based on user state has parallels to picking the next trade based on market state.
- **MAGK's workflow reasoning** – separating data gathering, decision logic, and execution in StockBot inspired a similar separation in automation tools like MAGK Excel.

In short, my failed trading bot taught me how to build more reliable systems in other domains.
