# Driver Opportunities Page Guide

This guide explains `apps/web/app/driver/opportunities/page.tsx`.

## What This File Does

This file creates the `/driver/opportunities` page.

It is the first drill-down page inside the driver section.

## Main Ideas

- it checks for a signed-in user on the server
- it redirects to `/sign-in` if there is no user
- it renders inside `DashboardShell`
- it loads persisted ride requests from Supabase
- it shows open and matched requests
- it lets a signed-in driver claim an open request
