 Rebuild the curated portfolio table with the user's requested fixes
import pandas as pd
from caas_jupyter_tools import display_dataframe_to_user

rows = [
    # Major projects
    {
        "category": "major",
        "project": "MAGK",
        "tagline": "Multi‑agent workflow builder with real‑time orchestration and reflection",
        "timeframe": "2025‑ongoing",
        "status": "active",
        "repo_url": "",
        "demo_url": "",
        "tags": "agents, orchestration, low‑latency, infra, production",
        "highlights": "Sub‑100 ms inference target; real‑time graph orchestration; reflection loops; designed for prod workloads",
        "proof_points": "Architecture docs + benchmarks (internal)",
        "priority_for_site": "showcase"
    },
    {
        "category": "major",
        "project": "Sunday",
        "tagline": "AI email & workflow assistant (unified inbox, triage, task extraction)",
        "timeframe": "2025‑ongoing",
        "status": "active",
        "repo_url": "https://github.com/magk-app/sunday",
        "demo_url": "",
        "tags": "full‑stack, next.js, agents, email, productivity",
        "highlights": "Unified inbox; AI triage; smart summaries; task extraction; daily briefing; modular connectors",
        "proof_points": "Working web UI; docs; 30+ commits",
        "priority_for_site": "showcase"
    },
    {
        "category": "major",
        "project": "MIT ARK (ARKOS)",
        "tagline": "Open‑source agent platform with long‑term memory and MCP compatibility",
        "timeframe": "2025‑ongoing",
        "status": "active – contributor",
        "repo_url": "https://github.com/SGIARK/ARK2.0",
        "demo_url": "",
        "tags": "agents, memory, MCP, python, research",
        "highlights": "Agent, model, memory, tool, state modules; contributor listed in README",
        "proof_points": "Public repo, 250+ commits",
        "priority_for_site": "showcase"
    },
    {
        "category": "major",
        "project": "Eliza",
        "tagline": "Meeting note‑taker: record, transcribe, summarize, and index meetings",
        "timeframe": "2025",
        "status": "active",
        "repo_url": "https://github.com/thejackluo/eliza",
        "demo_url": "",
        "tags": "full‑stack, transcription, RAG, next.js, whisper",
        "highlights": "Next.js frontend; Node backend; AI summaries & action items; knowledge base",
        "proof_points": "Public repo with README and basic structure",
        "priority_for_site": "feature"
    },
    # Side projects (per user update)
    {
        "category": "side",
        "project": "LinguaScan",
        "tagline": "CV‑powered language learning with real‑time object scanning",
        "timeframe": "2023",
        "status": "hackathon prototype",
        "repo_url": "https://github.com/thejackluo/lingua-scan",
        "demo_url": "",
        "tags": "computer‑vision, flutter, mobile, translation",
        "highlights": "Multi‑platform Flutter app; demo video; object scanning + translation",
        "proof_points": "Repo with Dart/C++ sources",
        "priority_for_site": "nice‑to‑have"
    },
    {
        "category": "side",
        "project": "MindfulAI",
        "tagline": "Micro‑aggression & hate‑speech classifiers with scraped datasets",
        "timeframe": "2021‑2022",
        "status": "prototype",
        "repo_url": "https://github.com/thejackluo/mindfulai",
        "demo_url": "",
        "tags": "nlp, tensorflow, classification, ethics",
        "highlights": "Two sequential neural nets; Discord data pipelines; early research project",
        "proof_points": "Repo with models and preprocessing scripts",
        "priority_for_site": "nice‑to‑have"
    },
    {
        "category": "side",
        "project": "Stock Model v2 (StockM2)",
        "tagline": "Quantamental equity model with QuickFS/AlphaVantage and backtesting",
        "timeframe": "2024",
        "status": "work‑in‑progress",
        "repo_url": "https://github.com/thejackluo/StockM2",
        "demo_url": "",
        "tags": "python, finance, backtesting, data‑pipeline",
        "highlights": "Graham + Greenblatt models; API templates; backtesting folders; 80+ commits",
        "proof_points": "Public repo with structured modules",
        "priority_for_site": "nice‑to‑have"
    },
    # Finished & published (keep website; move others per update)
    {
        "category": "finished",
        "project": "Jack‑Luo.com (V4)",
        "tagline": "Personal site with modern UI and content system",
        "timeframe": "2024‑2025",
        "status": "live",
        "repo_url": "https://github.com/thejackluo/jack",
        "demo_url": "https://jack-luo.com",
        "tags": "next.js, typescript, tailwind, design",
        "highlights": "Custom components; print‑quality pages; integrated blog and projects",
        "proof_points": "Open‑source repo; deployed site",
        "priority_for_site": "feature"
    },
    # Deprecated
    {
        "category": "deprecated",
        "project": "Gradder Main",
        "tagline": "Legacy grade‑management platform (fork)",
        "timeframe": "2020‑2022",
        "status": "deprecated",
        "repo_url": "https://github.com/thejackluo/gradder_main",
        "demo_url": "",
        "tags": "full‑stack, react, python",
        "highlights": "Large forked codebase; historical team project",
        "proof_points": "Repo shows 1k+ commits upstream",
        "priority_for_site": "archive"
    },
    # Other
    {
        "category": "other",
        "project": "Competitive Programming 2023",
        "tagline": "CSES, USACO, Kattis solutions and templates",
        "timeframe": "2023",
        "status": "archived practice",
        "repo_url": "https://github.com/thejackluo/competitive-programming-2023",
        "demo_url": "",
        "tags": "c++, algorithms, data‑structures",
        "highlights": "36 commits; multiple problem‑set directories; templates",
        "proof_points": "Public repo with solved sets",
        "priority_for_site": "footnote"
    },
]

df = pd.DataFrame(rows, columns=[
    "category","project","tagline","timeframe","status",
    "repo_url","demo_url","tags","highlights","proof_points","priority_for_site"
])

display_dataframe_to_user("Jack Luo — Portfolio (updated categories)", df)
df.to_csv("/mnt/data/jack_portfolio_updated.csv", index=False)
"/mnt/data/jack_portfolio_updated.csv"