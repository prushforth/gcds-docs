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

Le composant Carte est une extension de Système de design GC. Il est maintenu par Ressources naturelles Canada et respecte les normes de design, d’accessibilité et de bilinguisme de Système de design GC. Les contributions au composant de carte sont gérées séparément du système principal.

## Contribuez à nos prochaines priorités

Vous pouvez contribuer aux travaux à venir sur l’extension de carte de Système de design GC.

## Demander une fonctionnalité

Nous cherchons toujours à améliorer les composants de carte de Système de design GC et évaluons continuellement nos prochaines priorités. 

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

## Entrez en contact avec notre communauté

<gcds-grid columns="1fr" columns-tablet="1fr 1fr" columns-desktop="1fr 1fr">
  <gcds-card
    card-title="Inscrivez-vous au forum de Système de design GC"
    href="https://events.teams.microsoft.com/event/36f50509-5284-4e92-b188-539b768e2941@9ed55846-8a81-4246-acd8-b1a01abfc0d1"
    target="_blank"
    rel="noopener noreferrer"
    description="Inscrivez-vous aux séances récurrentes du forum de Système de design GC pour connaître les dernières nouvelles sur le produit, nos partenaires et nos clients. "
  ></gcds-card>
</gcds-grid>

{% include "partials/helpus.njk" %}
