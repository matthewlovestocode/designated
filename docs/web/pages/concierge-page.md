# Concierge Page Guide

This guide explains `apps/web/app/concierge/page.tsx`.

## What This File Does

This file creates the `/concierge` page.

It is a signed-in app page for staff who help patrons connect with drivers.

## Main Ideas

- it checks for a signed-in user on the server
- it redirects to `/sign-in` if there is no user
- it renders inside `DashboardShell`
- it introduces the concierge subsection in the left navigation

