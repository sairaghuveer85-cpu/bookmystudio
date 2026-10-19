# BookMyStudio — Design System

## 1. Product Identity

BookMyStudio is a studio-booking and creative-production marketplace.

Customers can discover and book:
- Photography studios
- Video production studios
- Podcast studios
- Filming locations
- Photographers and videographers
- Makeup artists, models, and editors
- Production equipment and related services

This is NOT a cinema-ticket-booking platform.

Do not use movie-ticket layouts, cinema seat maps, movie posters,
or theatre showtime interfaces.

## 2. Design Philosophy

The interface must feel like a professionally designed commercial
product, not a generic AI-generated website.

Prioritize:
- Clear visual hierarchy
- Readable typography
- Purposeful spacing
- High-quality studio photography
- Consistent components
- Intuitive navigation
- Practical booking workflows
- Responsive layouts
- Accessibility

Avoid:
- Generic purple and blue gradients
- Excessive glassmorphism
- Neon glow effects
- Unnecessary animations
- Excessive rounded cards
- Repetitive layouts
- Decorative elements without a purpose
- Tiny text and crowded interfaces

## 3. Visual Direction

Use the approved Google Stitch homepage as the primary visual reference.

Preserve its overall layout and product direction during implementation.

Do not independently redesign the interface without a clear reason.

The design should feel professional, distinctive, credible, and
appropriate for a creative-production marketplace.

## 4. Typography

Use a consistent typography system.

Establish clear styles for:
- Page headings
- Section headings
- Studio names
- Prices
- Descriptions
- Metadata
- Buttons
- Form labels

Maintain comfortable readability on desktop and mobile.

Do not reduce font sizes simply to fit more information on screen.

## 5. Color System

Use a consistent palette based on the approved Stitch design.

Define:
- Primary brand color
- Secondary accent color
- Page background
- Surface background
- Primary text
- Secondary text
- Borders
- Success states
- Warning states
- Error states

Do not introduce new colors arbitrarily.

Maintain accessible contrast.

## 6. Layout and Spacing

Use consistent spacing and alignment throughout the application.

Define reusable layout rules for:
- Page containers
- Section spacing
- Grid gaps
- Card padding
- Form spacing
- Navigation
- Responsive layouts

Avoid unnecessarily dense sections and excessive empty space.

## 7. Studio Listings

Studio listings must prioritize:
1. Studio photography
2. Studio name
3. Location
4. Studio type
5. Facilities and capabilities
6. Pricing
7. Ratings and reviews, when available
8. Availability, when available
9. View details or booking action

Use consistent image ratios and appropriate image cropping.

Keep information readable and avoid unnecessary badges.

Never fabricate real ratings, reviews, prices, or availability.

## 8. Professional Listings

Present photographers, videographers, makeup artists, models,
editors, and other professionals appropriately for their services.

Use portfolio imagery, specialties, profile details, pricing when
available, and clear profile or booking actions.

Do not make professional profiles identical to studio listings.

## 9. Components

Maintain consistent styles and behavior for:
- Navigation
- Search fields
- Filters
- Buttons
- Studio cards
- Professional profiles
- Forms
- Dialogs
- Notifications
- Loading states
- Empty states
- Error messages

Reuse existing components when appropriate.

Avoid unnecessary duplicate components.

## 10. Responsive Design

Support desktop, tablet, and mobile.

Desktop:
- Maintain readable content widths.
- Use balanced grids and spacing.

Tablet:
- Adjust grids and navigation appropriately.

Mobile:
- Stack search fields when necessary.
- Keep controls comfortable to tap.
- Prevent horizontal overflow.
- Maintain readable typography.
- Keep important booking actions accessible.

Do not simply shrink the desktop interface.

## 11. Interaction and Accessibility

Provide clear hover, focus, active, disabled, loading, success,
and error states where appropriate.

Ensure keyboard accessibility and visible focus indicators.

Use descriptive labels for interactive controls.

Do not create buttons that appear functional but do nothing.

Do not display successful bookings unless the booking process
has actually succeeded.

## 12. Implementation Rules

Treat this document and the approved Stitch design as the visual
reference for frontend implementation.

Before changing existing components:
- Inspect the current project structure.
- Understand existing styling and dependencies.
- Reuse suitable components.
- Avoid unnecessary package installations.
- Preserve existing working functionality.

Do not replace the entire application just to implement a design.

## 13. Final Quality Standard

Every page must feel like part of the same product.

The result must be:
- Visually consistent
- Responsive
- Accessible
- Readable
- Practical
- Professionally implemented

If a design choice makes the interface look like a generic AI
template, reconsider it.

BookMyStudio must always remain recognizable as a studio-booking
and creative-production marketplace.