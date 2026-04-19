# Driver Page Guide

This guide explains `apps/web/app/driver/page.tsx`.

## What This File Does

This file creates the `/driver` page.

It is a signed-in app page for designated drivers.

## Main Ideas

- it checks for a signed-in user on the server
- it redirects to `/sign-in` if there is no user
- it redirects to `/dashboard` if the signed-in user does not currently have the `driver` role
- it renders inside `DashboardShell`
- it loads the current driver's saved availability from Supabase
- it passes that data into `DriverAvailabilityCard`
- it introduces the driver subsection in the left navigation
