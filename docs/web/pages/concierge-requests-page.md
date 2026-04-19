# Concierge Requests Page Guide

This guide explains `apps/web/app/concierge/requests/page.tsx`.

## What This File Does

This file creates the `/concierge/requests` page.

It is the first drill-down page inside the concierge section.

## Main Ideas

- it checks for a signed-in user on the server
- it redirects to `/sign-in` if there is no user
- it redirects to `/dashboard` if the signed-in user does not currently have the `concierge` role
- it renders inside `DashboardShell`
- it lets the concierge check nearby available drivers at the pickup location
- it lets the concierge create a persisted ride request
- it lists the concierge's saved ride requests
- it allows the concierge to choose a pickup point on a zoomed-in map
- it prevents the concierge from creating duplicate active requests for the same role
