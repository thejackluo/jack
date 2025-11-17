---
title: "MAGK Excel"
role: "Co-founder & Platform Architect"
tech:
  - "Python"
  - "PyQt"
  - "AWS Lambda"
  - "AWS Chalice"
  - "Amazon Bedrock"
  - "Selenium"
  - "PyMuPDF"
  - "openpyxl"
summary: "Desktop app that turns natural language instructions into reusable workflows for web scraping, PDF parsing, and Excel automation—built for analysts who live in spreadsheets."
description: "MAGK Excel lets non-technical users describe what they want in plain language, then builds automation workflows that scrape data from websites or PDFs, process it in the cloud, and deliver clean Excel files ready for analysis."
startDate: 2024-06-01
status: "Ongoing"
category: "AI & Agents"
featured: true
gallery:
  - src: "/assets/projects/magk-excel.png"
    alt: "MAGK Excel workflow builder interface"
links:
  - label: "GitHub"
    url: "https://github.com/magk-app/magk-excel"
---

MAGK Excel is built for people who live inside spreadsheets but hate the repetitive data wrangling around them. You describe what you want in plain language, and MAGK builds an automation workflow that can pull tabular data from websites or PDFs, run it through a cloud pipeline, and return a clean Excel file ready for analysis.

## The Problem

Financial analysts, operations teams, and business intelligence folks spend hours every week:
- Manually copying data from PDFs into spreadsheets
- Scraping the same websites for updated tables
- Running the same data transformations for weekly reports
- Trying to explain to engineers what they actually need

They don't want to learn Python. They don't want to write scripts. **They just want the damn data in Excel.**

## How MAGK Excel Works

**Natural Language Workflow Creation**
Instead of coding, you describe your data pipeline in plain English:
> "Get the quarterly earnings table from Tesla's investor site, combine it with the PDF in my downloads folder, and give me an Excel file with revenue by segment."

MAGK translates this into a reusable workflow config that gets stored locally.

**Multi-Stage Cloud Pipeline**
Once the workflow is defined, MAGK orchestrates multiple backend stages:
1. **Web automation** via Selenium for dynamic sites
2. **PDF extraction** via PyMuPDF for tabular data in documents
3. **Data transformation** using pandas-style operations
4. **Excel generation** via openpyxl with formatting preserved

All of this runs serverless on **AWS Lambda** via **Chalice**, so you're not waiting for a local script to finish.

**Reusable Tools, Not One-Off Answers**
The key difference from "AI chat tools" is that MAGK creates **permanent, repeatable automations**. You're not asking ChatGPT to scrape a website every week. You're building a library of tools that can be run with a single click.

This is a much better fit for recurring reports, weekly financial operations, and any workflow where you need the same data transformation over and over.

## Technical Architecture

**Desktop Client**: PyQt application that provides the UI, workflow editor, and local workflow storage. Users manage their automation library without needing a browser.

**Serverless Backend**: AWS Chalice deploys multiple Lambda functions that handle different pipeline stages (scraping, parsing, transformation, Excel generation).

**LLM Orchestration**: Amazon Bedrock provides the natural language → workflow config translation, using structured prompts to ensure reliable output.

**Automation Stack**:
- **Selenium** for headless browser automation on dynamic websites
- **PyMuPDF** for extracting tables and text from PDF files
- **openpyxl** for generating properly formatted Excel files
- **Workflow configs** stored as JSON that can be version-controlled and shared

## Why This Matters

Generic AI assistants give you one-off answers. MAGK Excel gives you **tools you own**. For teams that run the same data workflows every week, this is the difference between "ask ChatGPT to do it again" and "click the button and get your file."

It's designed for the long tail of business operations where hiring a data engineer is overkill, but manual work is killing productivity.

## Current Status

Actively developed under the MAGK organization. Core workflow engine and pipeline orchestration are functional. Currently expanding data source connectors and improving error handling for edge cases in web scraping and PDF parsing.
