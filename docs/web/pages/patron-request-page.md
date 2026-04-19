# Patron Request Page Guide

This guide explains `apps/web/app/patron/request/page.tsx`.

## What This File Does

This file creates the `/patron/request` page.

It is the first drill-down page inside the patron section.

## Main Ideas

- it checks for a signed-in user on the server
- it redirects to `/sign-in` if there is no user
- it renders inside `DashboardShell`
- it lets the patron look up nearby available drivers
- it lets the patron create a persisted ride request
- it lists the patron's saved ride requests
