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
- give patrons a path to create a real ride request
- give concierges a path to create and manage ride requests for patrons
- give drivers a way to mark themselves available, view persisted requests, and
  claim opportunities
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

- `patron` -> request a ride, look up nearby drivers, and view saved requests
- `concierge` -> manage ride requests for patrons and check nearby drivers
- `driver` -> share availability, browse persisted requests, and claim
  opportunities
- `admin` -> manage users and roles

## Early Workflow Intent

At a high level, the intended workflow is:

1. a patron needs a safe way home
2. a concierge or the patron can check whether any nearby drivers already cover
   that location
3. the patron or concierge can create a persisted ride request
4. a driver marks themselves available with location and radius
5. a driver sees that request as an opportunity and can claim it
6. the ride is coordinated before the patron attempts to drive

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

## Current Persisted Workflow

The app now has two real persisted workflow pieces in Supabase:

- `driver_availability`: stores a driver's current location, radius, and active
  availability window
- `ride_requests`: stores requests created by patrons or concierges

That means the app is no longer only showing placeholder role sections. It now
has the start of a real request-and-response loop:

- a rider-side role creates a request
- the request is stored
- a driver can discover and claim that request

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
