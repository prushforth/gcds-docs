---
title: map
layout: 'layouts/component-documentation.njk'
loadGcdsMap: true
translationKey: 'mapDesign'
tags: ['mapFR', 'design']
# date: "git Last Modified"
---

## Structure de la carte

<img src="/images/fr/components/anatomy/gcds-map-anatomy.svg" alt="An image of the anatomy." />

<ol class="anatomy-list">
  <li>Le <strong>contrôle des couches</strong> est une liste extensible de couches. Chaque entrée fournit des contrôles détaillés pour manipuler les caractéristiques des couches. 
  <li><strong>Le contrôle du zoom</strong> est une paire de boutons accessibles au clavier permettant aux utilisateurs d'effectuer un zoom avant ou arrière.
  <li>Le <strong>bouton de rechargement</strong> permet aux utilisateurs de réinitialiser la carte à son emplacement d'origine. Il ne modifie pas les états des couches.
  <li>Le <strong>bouton plein écran</strong> permet de visualiser la carte en plein écran. En mode plein écran, l'action du bouton ramène la carte à l'état non plein écran.
  <li>Le <strong>contrôle de la barre d'échelle</strong> fournit une indication active de l'échelle approximative de la carte.  
  <li>Le <strong>contrôle de géolocalisation</strong> est un contrôle à 3 états. Il est soit désactivé, en train de suivre l'emplacement de l'appareil, ou affichant le dernier emplacement connu de l'appareil.
  <li>Le <strong>contrôle d'attribution</strong> est obligatoire et affiche le lien de licence pour le contenu de la couche cartographique.
  <li>La <strong>fenêtre d'affichage de la carte</strong> est l'endroit où le contenu de la couche cartographique est rendu.
</ol>

## Accessibilité et design de map
