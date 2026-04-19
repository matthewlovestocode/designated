# Driver Availability Card Guide

This guide explains
`apps/web/app/components/driver-availability-card.tsx`.

## What This File Does

This component lets a signed-in driver:

- choose an availability radius
- share their current location
- mark themselves available or unavailable
- refresh their location while available
- see a map of their current coverage area

## Main Ideas

- it is a client component because it uses browser location and React state
- it talks to server actions in `app/driver/actions.ts`
- it renders `AvailabilityMap` so the radius is visible instead of abstract
- it keeps the driver's last known availability state in React state

## Why This Matters

Without this component, the driver workflow would just be text and forms.

With it, the driver can understand:

- where the app thinks they are
- how large their coverage radius is
- whether they are currently visible to rider-side matching

## Important Supporting Files

- `apps/web/app/driver/actions.ts`
- `apps/web/app/components/availability-map.tsx`
- `apps/web/app/driver/page.tsx`
