---
title: Home
layout: 'layouts/base.njk'
permalink: /en/
translationKey: 'index'
redirect_from: /
date: 'git Last Modified'
nocrawl: false
eleventyNavigation:
  key: mapComponentsEN
  title: Home
  locale: en
  order: 0
github: https://github.com/gcds-extensions/map
linkOverrides:
  githubCompsIssues: https://github.com/gcds-extensions/map/issues
helpus:
  en:
    feedbackHref: mailto:geo@nrcan-rncan.gc.ca
  fr:
    feedbackHref: mailto:geo@rncan-nrcan.gc.ca
cardlist:
  type: mapComponents
  state: published
templateEngineOverride: njk,md
---

# GC Design System Map Extension components

Map components enable display and interaction with geographic data. Each component comes with reusable code, best practice advice, and accessibility tips.

<gcds-button type="link" href="{{ links.startToUse }}">
  How to install
</gcds-button>




<gcds-button type="link" href="{{ links.registerDemo }}" button-role="secondary">
  Attend a demo
</gcds-button>

<section class="bt-sm mt-500">

{% include "partials/card-list.njk" %}

## Choose GC Design System

GC Design System helps public servants deliver Government of Canada websites and products. Build faster without compromising brand identity, accessibility, or bilingualism. Find production-ready code, design assets, and documentation in one place.

### Learn more

Learn <gcds-link href="https://design-system.canada.ca/en/about-us" external>about us</gcds-link>, the <gcds-link href="https://design-system.canada.ca/en/gcds-in-use" external>teams using GC Design System</gcds-link>, our regular <gcds-link href="https://design-system.canada.ca/en/accessibility/" external>accessibility testing</gcds-link>, and how you can improve accessibility in your products and websites.

### Get involved

We’re continuously scaling our product to better meet your needs and offer you more options.

<gcds-button type="link" href="{{ links.getInvolved }}" button-role="secondary">
  Get involved
</gcds-button>

</section>

<section class="bt-sm mt-500">

## What's new

Browse the latest code additions and features in the <gcds-link href="{{ links.releaseNotes}}" external>GitHub changelog</gcds-link>.

**Recent releases**:

- New: Stable v1.0.0 packages for <gcds-link href="{{ links.github }}" external>components</gcds-link> and <gcds-link href="{{ links.githubTokens }}" external>design tokens</gcds-link>
- Update: Expanded colour scale with new and updated <gcds-link href="{{ links.colour }}">base tokens</gcds-link>
- New: Dedicated <gcds-link href="{{ links.figmaTokens }}" external>Figma library for design tokens</gcds-link>

</section>

<section class="bt-sm mt-500">

## What's up next

Explore our <gcds-link href="{{ links.roadmap }}">roadmap</gcds-link> to follow our progress and check out what we’re working on next.

</section>

<section class="bt-sm mt-500">

## Connect with us

Reach out to us if you have questions, want to <gcds-link href="{{ links.getInvolved }}">get involved</gcds-link>, or want to join our mailing list.

<gcds-button type="link" href="{{ links.contact }}" button-role="secondary">
  Contact us
</gcds-button>

</section>

{% include "partials/helpus.njk" %}
