# Opportunities Map Guide

This guide explains
`apps/web/app/components/opportunities-map.tsx`.

## What This File Does

This component shows driver opportunities on a map.

It compares:

- the driver's current location
- the driver's active coverage radius
- open ride requests
- matched requests already claimed by that driver

## Main Ideas

- it is a client component because the Leaflet map only runs in the browser
- it uses a dynamic import for the scene file so server rendering stays stable
- it provides a placeholder when the driver has not shared location yet
- it uses colors to separate driver, open requests, and claimed requests

## Why This Matters

The opportunities page becomes much more understandable when the requests are
placed on a map relative to the driver's coverage circle.

That helps answer:

- which requests are actually nearby?
- which request did I already claim?
- does my current location make these requests realistic to accept?

## Important Supporting Files

- `apps/web/app/components/opportunities-map-scene.tsx`
- `apps/web/app/driver/opportunities/page.tsx`
- `apps/web/app/driver/page.tsx`
