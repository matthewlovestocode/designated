# Nearby Drivers Card Guide

This guide explains
`apps/web/app/components/nearby-drivers-card.tsx`.

## What This File Does

This component helps a patron or concierge:

- use the current location
- look up nearby available drivers
- see those drivers on a map
- read a small result list with distance and freshness details

## Main Ideas

- it is a client component because it uses browser geolocation
- it calls the server action in `app/availability/actions.ts`
- it stores both the requester location and the returned drivers in state
- it renders `NearbyDriversMap` so the result feels spatial

## Why This Matters

This is the first rider-side matching surface in the app.

Instead of only creating a request blindly, a patron or concierge can first ask:

- are there any drivers already covering this area?
- how far away are they?
- does the map view make that coverage feel realistic?

## Important Supporting Files

- `apps/web/app/availability/actions.ts`
- `apps/web/app/components/nearby-drivers-map.tsx`
- `apps/web/lib/driver-availability.ts`
