# Driver Page Guide

This guide explains `apps/web/app/driver/page.tsx`.

## What This File Does

This file creates the `/driver` page.

It is a signed-in app page for designated drivers.

## Main Ideas

- it checks for a signed-in user on the server
- it redirects to `/sign-in` if there is no user
- it renders inside `DashboardShell`
- it introduces the driver subsection in the left navigation

