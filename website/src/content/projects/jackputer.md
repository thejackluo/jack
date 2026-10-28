---
title: 'Jackputer'
role: 'Solo — nand2tetris computer from NAND gates up'
tech:
  - 'HDL'
  - 'Verilog'
  - 'Python'
  - 'SVG'
summary: 'Building a computer from scratch, starting from universal NAND gates, with interactive browser views from high-level chips down to primitive gates.'
description: 'A nand2tetris build where HDL chips compile to structural Verilog and render as explorable visualizations.'
startDate: 2026-06-30
status: 'Ongoing'
category: 'Research'
gallery:
  - src: '/assets/projects/jackputer-alu.webp'
    alt: 'Jackputer ALU schematic expanded one level, showing Mux, Not and And subchips wired across 16 bits'
    caption: 'ALU chip design, expanded one level into its Mux16, Not16 and And16 subchips'
  - src: '/assets/projects/jackputer.webp'
    alt: 'Jackputer chip visualization index'
    caption: 'Chip visualizations'
links:
  - label: 'Live site'
    url: 'https://thejackluo.github.io/jackputer/'
  - label: 'GitHub'
    url: 'https://github.com/thejackluo/jackputer'
---

**Jackputer** is my nand2tetris computer. The chips are written in HDL, compiled into structural Verilog, and rendered as interactive browser visualizations. You can explore each design from its high-level blocks down to the primitive NAND gates.

So far it covers logic gates, the arithmetic chips and **ALU**, and the memory chips and **program counter**. Each chip can be viewed at its own level or expanded one or two dependency layers deeper.
