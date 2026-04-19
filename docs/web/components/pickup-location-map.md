# Pickup Location Map Guide

This guide explains
`apps/web/app/ride-requests/pickup-location-map.tsx`.

## What This File Does

This component lets concierge staff choose a patron pickup point by clicking on
an interactive map.

## Main Ideas

- it is a client component because it uses Leaflet in the browser
- it uses a dynamic import for the scene file
- it receives a center point and an optional selected pickup point
- it shows the selected point back to the user in readable coordinates

## Why This Matters

Concierge staff usually do not know latitude and longitude values.

This component gives them a more realistic workflow:

- zoom in near the bar or pickup area
- click where the patron should be picked up
- save that point into the persisted ride request

## Important Supporting Files

- `apps/web/app/ride-requests/pickup-location-map-scene.tsx`
- `apps/web/app/ride-requests/request-ride-card.tsx`
- `apps/web/app/ride-requests/actions.ts`
