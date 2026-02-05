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

Le composant de carte prend en charge l'utilisation du clavier. Les contrôles de la carte suivent un ordre visuel et de tabulation prédéfini. Vous pouvez ajouter ou retirer la plupart des contrôles, à l'exception du contrôle d'attribution (licence) qui est obligatoire.

Lors du choix des couches cartographiques (en particulier les couches WMS/WMTS basées sur des images), utilisez un style à contraste élevé et évitez de vous fier uniquement à la couleur pour communiquer le sens. Fournissez des styles sélectionnables alternatifs, si possible.

Pour l'accès non visuel, fournissez une courte description textuelle de l'objectif de la carte. Pour les cartes avec un objectif précis, ajoutez un élément `<map-caption>…</map-caption>` comme premier enfant du composant de carte.

Lorsque la carte comprend des entités, elles sont regroupées en un seul point de tabulation. Utilisez les touches fléchées pour vous déplacer entre les entités. Les entités sont ordonnées par distance croissante par rapport au centre de la carte.
