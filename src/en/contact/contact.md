---
title: Contact us
layout: 'layouts/base.njk'
eleventyNavigation:
  key: contactusEN
  title: Contact us
  locale: en
  order: 3
  hideMain: true
translationKey: 'contactus'
date: 'git Last Modified'
templateEngineOverride: njk,md
---

# Contact us

The Map component is an extension for the GC Design System. It is maintained by Natural Resources Canada and follows GC Design System's design, accessibility, and bilingualism standards. 

Contributions to the map component are handled separately from the core system.

## Request a feature

We are always seeking to improve GC Design System map components. 

Submit your feature request directly in GitHub, with an <gcds-link href="{{ links.githubGetStarted }}" external>account</gcds-link>.

<gcds-button button-role="secondary" type="link" href="{{ links.githubCompsPriority }}" external>Contribute in GitHub</gcds-button>

<hr class="mt-600" />

## Find out about GC Design System

<gcds-grid columns="1fr" columns-tablet="1fr 1fr" columns-desktop="1fr 1fr">
  <gcds-card
    card-title="Subscribe to mailing list"
    href="{{ links.contactMailingList }}"
    target="_blank"
    rel="noopener noreferrer"
    description="Subscribe to the mailing list to get GC Design System updates, release communications, and special events."
  ></gcds-card>
</gcds-grid>

{% include "partials/helpus.njk" %}
