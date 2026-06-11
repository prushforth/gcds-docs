---
title: Couche
layout: 'layouts/component-documentation.njk'
translationKey: 'maplayerDesign'
tags: ['maplayerFR', 'design']
date: 'git Last Modified'
---

Le contenu de l'élément <code>&lt;map-layer&gt;</code> est rendu sur la carte sous forme d'images, de tuiles et d'entités, et ses métadonnées sont rendues dans le contrôle des couches. Le contrôle des couches s'agrandit au survol ou lors d'une interaction au clavier. Le contrôle des couches agrandi affiche les couches de la carte sous forme d'une liste d'entrées, avec un ordre de tabulation au clavier égal à l'ordre documentaire des éléments <code>&lt;map-layer&gt;</code> sources. Chaque entrée du contrôle des couches possède une anatomie standard.

## Anatomie du contrôle des couches
<ol class="anatomy-list">
  <li>Chaque entrée de couche peut être activée ou désactivée par l'utilisateur à l'aide de la <strong>case à cocher</strong> de la couche. Les modifications interactives de la case à cocher provoquent l'émission de l'événement <code>map-change</code> par l'élément <code>&lt;map-layer&gt;</code>. L'attribut booléen <code>&lt;map-layer checked&gt;</code> peut être défini ou retiré pour contrôler l'état initial de la couche, et la propriété de l'élément peut également être mise à jour à l'aide de JavaScript pour modifier l'état de la couche (activée ou désactivée). Les modifications apportées à la propriété ou à l'attribut <code>checked</code> par JavaScript ne provoquent pas l'émission d'événements <code>map-change</code> par l'élément <code>&lt;map-layer&gt;</code>.

  <li>Le <strong>titre ou étiquette</strong> de la couche est le nom accessible de la couche pour la présentation aux utilisateurs. Si l'élément <code>&lt;map-layer&gt;</code> possède un attribut <code>src</code>, la couche est une couche à contenu « distant ». Le contenu distant peut être du contenu tiers, et en tant que tel, son auteur a le droit ou l'obligation de définir le nom accessible du contenu, via un élément <code>&lt;map-title&gt;</code>. Si aucun élément <code>&lt;map-title&gt;</code> n'est présent, le nom de la couche peut être défini avec l'attribut <code>&lt;map-layer label=" "&gt;</code>. Que le contenu de la couche soit distant ou en ligne (c'est-à-dire entre les balises de début et de fin de <code>&lt;map-layer&gt;balisage et contenu en ligne&lt;/map-layer&gt;</code>), un élément descendant <code>&lt;map-title&gt;</code> a priorité sur l'attribut <code>&lt;map-layer label=" "</code>.

  <li>Le bouton de <strong>suppression</strong> de la couche supprime définitivement la couche du document. La seule façon de restaurer une couche supprimée est de recharger la page d'origine. L'activation du bouton de suppression retire l'élément <code>&lt;map-layer&gt;</code> correspondant et ses enfants du document.

  <li>Un élément <code>&lt;map-extent&gt;</code> est représenté dans le contrôle des couches comme une sous-couche de son élément ancêtre <code>&lt;map-layer&gt;</code>, et le nom accessible de la sous-couche est fourni par son attribut <code>label</code> <code>&lt;map-extent label="Le nom ici"&gt;</code>. Si aucun attribut <code>label</code> n'est fourni, la sous-couche est nommée « Sous-couche » par défaut. Une sous-couche n'a pas besoin d'être présentée dans le contrôle des couches, car elle peut être masquée via un attribut optionnel. Comme les couches, les sous-couches sont contrôlées via les attributs booléens <code>hidden</code> et <code>checked</code>.

  <li>Pour les couches et les sous-couches, les informations de paramètres sont accessibles via le bouton <strong>Paramètres</strong>, qui révèle les étiquettes et les contrôles du contenu. Le bouton de paramètres de la couche ou de la sous-couche est un type de widget de divulgation, avec une interface utilisateur différente.

  <li>Les entrées du contrôle des couches utilisent des <strong>widgets de divulgation</strong> HTML standard pour présenter un résumé des informations de la couche ou de la sous-couche tout en révélant les détails, y compris les contrôles de contenu, lors de l'interaction de l'utilisateur.

  <li>Les couches et les sous-couches disposent de contrôles de curseur d'<strong>opacité</strong> indépendants. Le curseur d'opacité affiche et représente une valeur numérique de l'attribut <code>opacity</code> de <code>&lt;map-layer&gt;</code> ou <code>&lt;map-extent&gt;</code> comprise entre 0 et 1.

  <li>Les styles de couche sont rendus sous forme de sélecteurs de <strong>style</strong>. Les styles de couche peuvent être utilisés pour gérer les thèmes cartographiques, les équivalents clair/sombre et les couches à contraste élevé, entre autres objectifs d'accessibilité. Les styles de couche ont été conçus pour rendre les styles nommés WMS accessibles, mais constituent un mécanisme à usage général permettant le choix de l'utilisateur parmi des alternatives, y compris des sources de contenu complètement différentes pour la même zone géographique, par exemple vue satellite vs vue carte.

  <li>Les dimensions des sous-couches telles que le temps, le temps de référence et l'altitude (qui sont des dimensions standard du service Web Map Service (WMS)) sont rendues et sélectionnables de manière interactive sous forme d'éléments HTML <code>select</code>.

</ol>

<img src="/images/fr/components/anatomy/gcds-layer-control-anatomy.svg" alt="Une image de l'anatomie." >

## Design et accessibilité pour la couche

// TODO: Ajouter des directives de conception

- attribution et licences
- titre / étiquette
- style
- légendes
- liens de requête
- styles alternatifs
- projections alternatives
- types de contenu : tuiles, entités, images en ce qui concerne l'accessibilité
