# Driver Opportunities Page Guide

This guide explains `apps/web/app/driver/opportunities/page.tsx`.

## What This File Does

This file creates the `/driver/opportunities` page.

It is the first drill-down page inside the driver section.

## Main Ideas

- it checks for a signed-in user on the server
- it redirects to `/sign-in` if there is no user
- it redirects to `/dashboard` if the signed-in user does not currently have the `driver` role
- it renders inside `DashboardShell`
- it loads persisted ride requests from Supabase
- it separates open requests from requests already claimed by the current driver
- it renders `OpportunitiesMap`
- it lets a signed-in driver claim an open request
- it lets a signed-in driver mark a matched request completed
- it prioritizes requests inside the driver's current active radius
- it hides out-of-range open requests by default and reports how many were hidden
