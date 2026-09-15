---
title: Accueil
layout: 'layouts/base.njk'
permalink: /fr/
translationKey: 'index'
date: 'git Last Modified'
nocrawl: false
eleventyNavigation:
  key: mapComponentsFR
  title: Accueil
  locale: fr
  order: 0
github: https://github.com/gcds-extensions/map
linkOverrides:
  githubCompsIssues: https://github.com/gcds-extensions/map/issues
cardlist:
  type: mapComponents
  state: published
templateEngineOverride: njk,md
---

# Composants de l’extension cartographique du Système de design GC
# Nous contacter

Les composants de carte fournissent des fonctionnalités cartographiques pour afficher et interagir avec des données géographiques. Chaque composant comprend du code réutilisable, des conseils sur les meilleures pratiques et des conseils d'accessibilité.

Les composants de carte sont des extensions de Système de design GC, maintenu par Ressources naturelles Canada et respectent les normes de design, d’accessibilité et de bilinguisme de Système de design GC. 

Les contributions aux composants de carte sont gérées séparément du système principal.


<gcds-button type="link" href="{{ links.startToUse }}">
  Comment installer
</gcds-button>

<section class="bt-sm mt-500">

{% include "partials/card-list.njk" %}

</section>

## Nouveautés

Parcourez les dernières fonctionnalités et les derniers ajouts au code du composant Carte dans le <gcds-link href="{{ links.releaseNotes }}" external>journal des modifications dans GitHub</gcds-link>.

{% include "partials/helpus.njk" %}
