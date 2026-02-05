---
title: Carte
layout: "layouts/component-documentation.njk"
loadGcdsMap: true
eleventyNavigation:
  key: mapFR
  title: Carte
  locale: fr
  parent: mapComponentsFR
  order: 1
  otherNames:
  description: Une carte est un outil interactif permettant d'afficher et d'interroger des informations de localisation en couches à différentes échelles
  thumbnail: /images/common/components/preview-map.svg
  alt: This is an image of the component
  state: published
eleventyComputed:
  links:
    githubCompsIssues: https://github.com/nrcan/gcds-map/issues
  helpus:
    en:
      feedbackHref: mailto:geo@nrcan-rncan.gc.ca
    fr:
      feedbackHref: mailto:geo@rncan-nrcan.gc.ca
translationKey: "map"
tags: ['mapFR', 'usage']
permalink: /fr/composants/map/
date: "git Last Modified"
---

## Problèmes que les cartes peuvent résoudre

Les cartes ont une grande variété d'utilisations, notamment :

- affichage du fond de carte d'une région
- emplacements et propriétés des emplacements d'intérêt
- cartes thématiques
- cartes chronologiques
- distribution spatiale ou localisation des ressources

<hr/>

## Composants connexes

- <a href="{{ links.mapLayer }}">Couche</a> est utilisé exclusivement pour ajouter du contenu cartographique.
- <a href="{{ links.mapA11y }}">`<map-caption>`</a> est utilisé pour fournir une légende accessible aux utilisateurs de lecteurs d'écran.

