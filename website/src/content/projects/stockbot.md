---
title: "StockBot"
role: "Creator & Quantitative Engineer"
tech:
  - "Python"
  - "Pandas"
  - "NLP"
  - "Sentiment Analysis"
  - "Reddit API"
  - "Twitter API"
  - "Technical Indicators"
summary: "Sentiment-driven trading research tool that combines social media analysis, technical indicators, and basic execution logic to prototype and backtest strategies."
description: "Experimental trading bot that scrapes Reddit and Twitter for sentiment signals, applies NLP to generate trading indicators, and tests strategies in simulation—learning how to structure trading systems and why naive approaches fail."
startDate: 2022-09-01
endDate: 2023-05-15
status: "Archived"
category: "Archive"
featured: false
gallery:
  - src: "/assets/projects/stockbot.png"
    alt: "StockBot sentiment analysis dashboard"
links:
  - label: "GitHub"
    url: "https://github.com/thejackluo/stockbot"
---

StockBot started as an experiment: **Can you build a trading system that listens to social media sentiment and trades automatically?**

Spoiler: not really. But the process taught me a lot about quantitative systems, market dynamics, and the gap between "this sounds like it should work" and "this actually makes money."

## The Idea

Most retail traders lose money because they trade emotionally—buying hype, panic selling, chasing trends. What if you could automate the boring parts and remove emotion from the equation?

StockBot combines:
- **Sentiment signals** from Reddit (r/wallstreetbets, r/stocks) and Twitter
- **Technical indicators** (moving averages, RSI, volume patterns)
- **Automated execution logic** (simulated trades, risk limits)

The goal wasn't to "print money"—it was to learn how trading systems work and prototype strategies faster than manual trading.

## How StockBot Works

**Data Collection**
- Scrapes Reddit posts and comments for ticker mentions
- Pulls Twitter feeds for finance-related accounts
- Cleans and normalizes text (remove spam, filter bots)

**Sentiment Analysis**
- Tokenizes text and applies NLP models to classify bullish/bearish sentiment
- Counts ticker mentions and weights by post engagement (upvotes, retweets)
- Generates sentiment scores per ticker over time windows (hourly, daily)

**Signal Generation**
- Combines sentiment scores with traditional technical indicators
- Looks for divergences (e.g., sentiment turning negative while price is rising)
- Flags tickers with unusual mention volume + sentiment shifts

**Backtesting & Execution**
- Simulates trades using historical price data
- Applies basic risk management (position sizing, stop losses)
- Logs performance metrics (win rate, drawdown, Sharpe ratio)

## What I Learned

**The Hard Truths:**
1. **Sentiment lags price**: By the time Reddit is hyped about a stock, it's usually already moved
2. **Signal quality matters more than signal quantity**: More data doesn't mean better trades
3. **Transaction costs kill naive strategies**: Frequent trading erodes profits fast
4. **Overfitting is easy**: Strategies that backtest well often fail in live markets
5. **Risk management is everything**: Even "good" signals lose money without proper position sizing

**The Valuable Skills:**
- How to structure data pipelines for real-time feeds
- How to backtest strategies without fooling yourself
- How to separate strategy logic from execution infrastructure
- How to think about risk, not just returns

## Technical Stack

**Data Collection**: Reddit API (PRAW), Twitter API, CSV storage
**Text Processing**: NLTK, regex-based cleaning, word lists for sentiment
**Analysis**: Pandas for time-series manipulation, custom scoring functions
**Backtesting**: Event-driven simulation loop with historical price data

## Why This Project Matters

StockBot isn't impressive because it made money (it didn't). It's valuable because it taught me **how to build and test quantitative systems** in a domain where most people just gamble and hope.

The lessons about signal quality, overfitting, and risk management apply to any ML system where you're trying to predict real-world outcomes under uncertainty.

## Current Status

Archived. The bot was a learning tool, not a production system. I don't run it live, but the codebase and research notes are on GitHub for anyone curious about how sentiment-driven trading works (and why it's harder than it sounds).

## What's Next

The experience from StockBot directly influenced:
- Efficore's optimization approach (balancing multiple objectives under constraints)
- Delight's decision-making architecture (choosing actions based on context, not hype)
- MAGK's workflow reasoning (separating data collection, strategy, and execution)

Turns out the patterns you learn from failed trading bots apply surprisingly well to agent systems, energy optimization, and productivity tools.
