# Home Page Guide

This guide explains `apps/web/app/page.tsx` line by line.

## What This File Does

This file defines the homepage route at `/`.

It now acts like a real landing page instead of a starter screen.

The page has two main parts:

- an above-the-fold hero area with an image on the left and headline/copy on
  the right
- a pair of full-width statistic sections below the hero

## Key Ideas

- `next/image` is used for the landing-page image
- the top section uses a responsive two-column grid
- the image stacks above the text on smaller screens
- the homepage now has two dedicated statistic sections below the hero
- both statistic sections use the same reusable full-width linear visualization

## Hero Layout Diagram

```mermaid
flowchart LR
    A["Home page"] --> B["Hero grid"]
    B --> C["Left: pulled-over image"]
    B --> D["Right: headline and intro"]
    A --> E["Death section"]
    E --> F["Copy at top"]
    E --> G["Full-width stat row"]
    A --> H["Arrest section"]
    H --> I["Copy at top"]
    H --> J["Full-width stat row"]
```

## Current Structure

The hero area contains:

- the `pulled-over.jpg` image
- the oversized statement `Drunk driving is stupid.`
- the supporting paragraph that introduces *Designated*

The death-clock section contains:

- the heading `People Die From Drunk Driving`
- a short explanation of the official 42-minute statistic
- a sharper line connecting that statistic to drunk driving
- a full-width `LinearStatClock` row
- a large countdown inside that row
- a symbolic moving car and person marker

The arrests section contains:

- the heading `Drunk Drivers Get Arrested`
- the FBI arrest figure for DUI arrests in 2024
- a line translating that number into roughly one arrest every 39 seconds
- another full-width `LinearStatClock` row
- a police endpoint icon instead of a person icon

## Why This Page Matters

For a beginner, this file is a good example of how one page can combine:

- layout
- typography
- image assets
- product messaging
- responsive design

all in one place.

It is also a useful example of a server-rendered page using a live-updating
client component, and of one reusable component being used in two different
sections with different props.
