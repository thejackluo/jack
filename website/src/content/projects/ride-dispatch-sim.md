---
title: 'Ride Dispatch Sim'
role: 'Solo — dispatch algorithm & simulator'
tech:
  - 'Python'
  - 'FastAPI'
  - 'React'
summary: 'A grid-city ride-hailing simulator whose dispatcher balances low ETA against driver fairness, with fallback when drivers reject rides.'
description: 'FastAPI backend and React visualizer for a simplified ride-hailing dispatch system.'
startDate: 2025-09-18
endDate: 2025-09-18
status: 'Completed'
category: 'Archive'
links:
  - label: 'GitHub'
    url: 'https://github.com/thejackluo/ride-dispatch-sim'
---

A simplified ride-hailing backend. Riders request rides in a grid-based city, and a dispatch algorithm picks drivers by balancing **low ETA** against **fairness** and availability. When a driver rejects a ride, it falls back to the next best driver.

A React frontend visualizes the grid and lets you advance time manually to step through the simulation.
