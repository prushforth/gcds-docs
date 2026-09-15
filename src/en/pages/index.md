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
cardlist:
  type: mapComponents
  state: published
templateEngineOverride: njk,md
---

# GC Design System Map Extension components

Map components enable display and interaction with geographic data. Each component comes with reusable code, best practice advice, and accessibility tips.

The Map component is an extension for the GC Design System, maintained by Natural Resources Canada and follows GC Design System's design, accessibility, and bilingualism standards.

Contributions to the map component are handled separately from the core system.

<gcds-button type="link" href="{{ links.startToUse }}">
  How to install
</gcds-button>

<section class="bt-sm mt-500">

{% include "partials/card-list.njk" %}

</section>

## What's new

Browse the latest map components code additions and features in the <gcds-link href="{{ links.releaseNotes }}" external>GitHub changelog</gcds-link>.

{% include "partials/helpus.njk" %}
