---
title: Nous contacter
layout: 'layouts/base.njk'
eleventyNavigation:
  key: contactusFR
  title: Nous contacter
  locale: fr
  order: 3
  hideMain: true
translationKey: 'contactus'
date: 'git Last Modified'
templateEngineOverride: njk,md
---

# Nous contacter

Le composant Carte est une extension de Système de design GC. Il est maintenu par Ressources naturelles Canada et respecte les normes de design, d’accessibilité et de bilinguisme de Système de design GC. 

Les contributions au composant de carte sont gérées séparément du système principal.

## Demander une fonctionnalité

Nous cherchons toujours à améliorer les composants de carte de Système de design GC. 

Envoyez votre demande de fonctionnalité directement dans GitHub, en <gcds-link href="{{ links.githubGetStarted }}" external>créant un compte</gcds-link>.

<gcds-button button-role="secondary" type="link" href="{{ links.githubCompsPriority }}" external>Contribuer sur GitHub</gcds-button>

<hr class="mt-600" />

## Découvrez Système de design GC

<gcds-grid columns="1fr" columns-tablet="1fr 1fr" columns-desktop="1fr 1fr">
  <gcds-card
    card-title="Recevez nos communications"
    href="{{ links.contactMailingList }}"
    target="_blank"
    rel="noopener noreferrer"
    description="Abonnez-vous à notre liste d’envoi pour ne manquer aucune communication de Système de design GC concernant les mises à jour, les lancements ou encore les évènements spéciaux."
  ></gcds-card>
</gcds-grid>

{% include "partials/helpus.njk" %}
