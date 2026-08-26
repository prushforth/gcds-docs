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

The Map component is an extension for the GC Design System. It is maintained by Natural Resources Canada and follows GC Design System's design, accessibility, and bilingualism standards. Contributions to the map component are handled separately from the core system.

## Contribute to our next priorities

You can contribute to upcoming GC Design System map extension work.

## Request a feature

We are always seeking to improve GC Design System map components and continually evaluating our next priorities. 

Submit your feature request directly in GitHub, with an <gcds-link href="{{ links.githubGetStarted }}" external>account</gcds-link>.

<gcds-button button-role="secondary" type="link" href="{{ links.githubCompsPriority }}" external>Contribute in Github</gcds-button>

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

## Connect with our community

<gcds-grid columns="1fr" columns-tablet="1fr 1fr" columns-desktop="1fr 1fr">
  <gcds-card
    card-title="Register for the GC Design System Forum"
    href="https://events.teams.microsoft.com/event/36f50509-5284-4e92-b188-539b768e2941@9ed55846-8a81-4246-acd8-b1a01abfc0d1"
    target="_blank"
    rel="noopener noreferrer"
    description="Register to our recurring Forum events to stay current with GC Design System, our partners and clients."
  ></gcds-card>
</gcds-grid>

{% include "partials/helpus.njk" %}
