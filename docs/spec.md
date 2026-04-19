# Product Spec

## Working Title

Designated

## Basic Intent

Designated is intended to help people avoid drunk driving by making it easier
to connect patrons, establishments, and designated drivers before someone gets
behind the wheel impaired.

## Core Idea

The app is meant to coordinate a simple safety-oriented use case:

- patrons who need a safe ride home
- concierges or staff who can help coordinate that ride
- drivers who want to see where they may be needed
- admins who manage platform access and oversight

## Product Direction

The product direction is still early and loosely defined, but the central idea
is consistent:

- make the cost of drunk driving feel immediate and visible
- give patrons a path to request help
- give concierges a path to manage or submit ride requests
- give drivers a path to view opportunities
- give admins a way to manage users and platform access

## Current Product Framing

The current product framing is more direct than a neutral ride marketplace.

Designated is positioned as a safety product built around one simple belief:

- drunk driving is reckless
- people need a safer alternative in the moment they might make that choice

That framing is reflected in the current landing page, which emphasizes:

- deaths caused by alcohol-impaired driving
- DUI arrest frequency
- the urgency of helping people choose not to drive drunk

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

## Current Role Areas

The app now has early role-based navigation sections for:

- `patron`
- `concierge`
- `driver`
- `admin`

Each role area currently serves as a starting point for a more complete
workflow.

The current first-level role pages imply these intended directions:

- `patron` -> request a ride
- `concierge` -> manage ride requests for patrons
- `driver` -> browse opportunities where a ride is needed
- `admin` -> manage users and roles

## Early Workflow Intent

At a high level, the intended workflow is:

1. a patron needs a safe way home
2. a concierge or the patron signals that a ride is needed
3. a driver sees that opportunity
4. the ride is coordinated before the patron attempts to drive

An admin supports the system by managing access and oversight rather than
participating in the ride flow directly.

## Current Admin Intent

The app now includes explicit admin-only capabilities around user management.

That includes the ability to:

- view signed-up users
- promote a user to admin
- demote an admin
- delete a user account

This means the `admin` role is no longer just conceptual in the spec. It now
has real product responsibilities in the application.

## Early Non-Goals

The current project does not yet define:

- pricing or payment flows
- driver dispatch algorithms
- live location tracking
- bar onboarding workflows
- patron identity verification rules
- driver screening rules

Those areas may matter later, but they are not yet part of the working MVP
direction.

## Role Intent

These roles help define who is participating in the system and why:

- `admin` manages the platform
- `concierge` helps coordinate safe rides from an establishment
- `driver` responds to ride needs
- `patron` is the rider who needs help getting home safely

## Notes

- This is a lightweight starting spec, not a full product requirements document.
- The spec should now be read as an early-product direction document, not just
  a naming note.
- Details such as matching rules, venue updates, trust and safety workflows,
  and operational policies can evolve later.
