# Patron Page Guide

This guide explains `apps/web/app/patron/page.tsx`.

## What This File Does

This file creates the `/patron` page.

It is a signed-in app page for patrons who need a safe ride home.

## Main Ideas

- it checks for a signed-in user on the server
- it redirects to `/sign-in` if there is no user
- it renders inside `DashboardShell`
- it introduces the patron subsection in the left navigation
- it points the user toward the persisted ride-request workflow
