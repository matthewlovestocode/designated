# Home Page Guide

This guide explains `apps/web/app/page.tsx` line by line.

## What This File Does

This file defines the homepage route at `/`.

It now acts like a real landing page instead of a starter screen.

The page has two main parts:

- an above-the-fold hero area with an image on the left and headline/copy on
  the right
- a set of full-width content cards below the hero

## Key Ideas

- `next/image` is used for the landing-page image
- the top section uses a responsive two-column grid
- the image stacks above the text on smaller screens
- the death clock now lives in its own dedicated section below the hero
- the death-clock section now uses a full-width linear visualization
- the longer explanation content lives in its own separate section below that

## Hero Layout Diagram

```mermaid
flowchart LR
    A["Home page"] --> B["Hero grid"]
    B --> C["Left: pulled-over image"]
    B --> D["Right: headline and intro"]
    A --> E["Death clock section"]
    E --> F["Copy at top"]
    E --> G["Full-width clock row"]
    A --> H["Explanatory content section"]
    H --> I["What Designated is for"]
    H --> J["Why drunk driving is stupid"]
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
- a full-width `LinearDeathClock` row
- a large countdown inside that row
- a symbolic moving car and person marker

The lower explanation section contains:

- a section explaining what Designated is for
- a section explaining why drunk driving is stupid

## Why This Page Matters

For a beginner, this file is a good example of how one page can combine:

- layout
- typography
- image assets
- product messaging
- responsive design

all in one place.

It is also a useful example of a server-rendered page using a live-updating
client component.
