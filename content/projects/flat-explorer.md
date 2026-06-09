---
title: "Flat Explorer"
date: 2026-01-01
draft: false
logo: "img/logos/flat-explorer.svg"
year: 2026
fields: ["Agentic AI", "Applications"]
role: "Author"
status: "Product"
links:
  site: "https://flat-explorer.tagomind.com/"
impact: 72
featured: false
summary: "AI-assisted flat hunting: scores apartment listings, summarizes visits, and compares options side by side."
hero: ""
---

Flat Explorer is an AI-assisted app for evaluating apartment listings. It pairs structured scoring with LLM-generated insights and collaborative sharing, so everyone involved in the search weighs the same flats against the same criteria.

## What it is

Paste a listing URL and the backend scrapes the property, scores it against weights you control, and writes a short narrative via the Claude API. Core features:

- **Batch assessment** of many flats against configurable scoring agents
- **Visit summaries** synthesized from your field notes and photos
- **Collaborative sharing** with permission-based access and a chat interface over flat data
- **Map view** of candidates with distances to the places that matter to you

## Stack

A Next.js + React frontend (Supabase auth) over a FastAPI backend that runs LLM agents with LangGraph; data lives in PostgreSQL with row-level security.
