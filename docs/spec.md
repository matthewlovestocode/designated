# Product Spec

## Working Title

Designated

## Basic Intent

Designated is intended to help designated drivers discover bars and quickly see
whether those bars currently have patrons looking for a designated driver.

## Core Idea

The app is meant to connect two sides of a simple safety-oriented use case:

- bars that may have patrons in need of a designated driver
- designated drivers who want to see where they may be needed

## Product Direction

The product direction is still early and loosely defined, but the central idea
is consistent:

- show bars
- show whether help is needed
- make that information easy for designated drivers to access

## User Roles

The current product model includes four primary user roles.

### `admin`

An internal administrator of the web application.

This role is intended for platform-level management and oversight rather than
normal marketplace participation.

### `concierge`

An employee of an establishment that serves alcohol, looking to schedule a ride
with a driver for a patron.

This role represents the establishment side of the workflow.

### `driver`

A driver seeking to pick up a patron from a bar.

This role represents the supply side of the workflow.

### `patron`

An individual at a bar, looking for a designated driver due to having too much
to drink.

This role represents the person in need of the ride.

## Role Intent

These roles help define who is participating in the system and why:

- `admin` manages the platform
- `concierge` helps coordinate safe rides from an establishment
- `driver` responds to ride needs
- `patron` is the rider who needs help getting home safely

## Notes

- This is a lightweight starting spec, not a full product requirements document.
- Details such as workflows, permissions, matching rules, and venue updates can
  evolve later.
