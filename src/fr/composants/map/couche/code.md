---
title: Couche
layout: 'layouts/component-documentation.njk'
loadGcdsMap: true
translationKey: 'maplayerCode'
tags: ['maplayerFR', 'code']
date: 'git Last Modified'
---

## Sur cette page

- [Codage et accessibilité pour les couches](#codage-et-accessibilite-pour-les-couches)
- [Exemples](#exemples)
  - [Attribut `src` de la couche](#attribut-src-de-la-couche)
  - [Attribut `checked` de la couche et de la sous-couche](#attribut-checked-de-la-couche-et-de-la-souscouche)
  - [Attribut `hidden` de la couche et de la sous-couche](#attribut-hidden-de-la-couche-et-de-la-souscouche)
  - [Attribut `label` de la couche et de la sous-couche](#attribut-label-de-la-couche-et-de-la-souscouche)
    - [Couche](#couche)
    - [Sous-couche](#souscouche)
  - [`opacity` de la couche et de la sous-couche](#opacity-de-la-couche-et-de-la-souscouche)
  - [Requêtes `media` de la couche](#requetes-media-de-la-couche)
- [Générateur de code](#generateur-de-code)

## Codage et accessibilité pour les couches

Utilisez le composant de couche pour afficher le contenu « Map Markup Language » (MapML).

Utilisez l'attribut `src` du composant pour créer un lien vers un contenu distant, ou créez du contenu MapML intégré dans votre HTML, entre les balises de début `<map-layer>` et de fin `</map-layer>`.

Définissez les propriétés initiales de la couche à l'aide des attributs `src`, `checked`, `hidden`, `label`, `opacity` et `media`.

## Exemples

### Attribut `src` de la couche

L'attribut optionnel `src` peut être utilisé pour fournir l'URL d'un document MapML. Lorsque l'attribut `src`
est fourni, nous appelons cette situation « [contenu distant](../design/#contenu-distant) ». Un document MapML
distant est encodé en XHTML et analysé avec l'analyseur XML intégré du navigateur. Si aucun attribut `src`
n'est fourni, le contenu peut être fourni entre les balises de début et de fin `<map-layer>...</map-layer>`.
C'est ce qu'on appelle le « [contenu intégré](../design/#contenu-integre) ». Le contenu cartographique est
constitué soit de tuiles, soit d'entités, soit d'une combinaison de tuiles et d'entités. Les tuiles, les
entités ou une combinaison des deux peuvent être chargées dans la carte via un élément de modèle enveloppant
appelé `<map-extent>`. Lorsqu'un modèle de contenu est utilisé, il est traité comme une
« [sous-couche](../design/#couches-et-souscouches) » aux fins de son exposition à l'utilisateur dans [le
contrôle de couche](../design/#anatomy). Le contenu est rendu sur la carte dans l'ordre du document. Autrement dit, le contenu
situé au bas du document est rendu par-dessus le contenu apparaissant plus tôt dans le document. Cela importe
particulièrement lorsque de tels contenus se chevauchent spatialement, car le contenu ultérieur peut masquer
le contenu précédent, par ex. les tuiles peuvent recouvrir les entités, et vice versa. En général, le contenu
cartographique qui se chevauche devrait être organisé en couches distinctes, offrant à l'utilisateur les
moyens de l'activer ou de le désactiver, de modifier l'ordre, de changer l'opacité ou de le supprimer
entièrement.

### Attribut `checked` de la couche et de la sous-couche

L'attribut `checked` et sa propriété correspondante permettent aux scripts d'activer ou de désactiver le
contenu sans le retirer du DOM. `checked` reflète l'état de la case à cocher du contrôle utilisateur.
Lorsqu'il est modifié par l'utilisateur, la couche émet l'événement `map-change`.

### Attribut `hidden` de la couche et de la sous-couche

Utilisez l'attribut `hidden` pour garder une couche ou une sous-couche visible sur la carte mais masquée du
contrôle de couche. Ceci est utile pour les couches de base qui doivent toujours être affichées. C'est
souvent une bonne idée d'ajouter `hidden` aux sous-couches des couches ayant un contenu simple, afin de
simplifier l'interface utilisateur de la carte — chaque petit détail compte.

Si _toutes_ les couches d'une carte sont `hidden`, le contrôle de couche lui-même est masqué. Voyez par
vous-même en retirant la superposition de la carte ci-dessous.

<gcds-ext-map lat="53.087426" lon="-91.27533" zoom="4" projection="OSMTILE" controls style="height: 400px;">
  <map-layer checked hidden src="{{ '/components/gcds-ext-map/dist/gcds-ext-map/assets/mapml/fr/osmtile/cbmt' | url }}"></map-layer>
  <map-layer label="Conditions actuelles" checked>
    <map-extent units="OSMTILE" checked hidden>
      <map-input name="z" type="zoom" min="0" max="18" ></map-input>
      <map-input name="xmin" type="location" rel="map" position="top-left" axis="easting"
          units="pcrs" min="-1.8443827380300004E7" max="-2287187.2902772236" ></map-input>
      <map-input name="ymin" type="location" rel="map" position="bottom-left" axis="northing"
          units="pcrs" min="4547345.566611593" max="1.6344676582521891E7" ></map-input>
      <map-input name="xmax" type="location" rel="map" position="top-right" axis="easting"
          units="pcrs" min="-1.8443827380300004E7" max="-2287187.2902772236" ></map-input>
      <map-input name="ymax" type="location" rel="map" position="top-left" axis="northing"
          units="pcrs" min="4547345.566611593" max="1.6344676582521891E7" ></map-input>
      <map-input name="w" type="width" min="1" max="4079" ></map-input>
      <map-input name="h" type="height" min="1" max="4079" ></map-input>
      <map-link rel="image" tref="https://geo.weather.gc.ca/geomet?request=GetMap&crs=EPSG:3857&service=WMS&bbox={xmin},{ymin},{xmax},{ymax}&layers=CURRENT_CONDITIONS&format=image/png&width={w}&styles=default&language=fr&version=1.3.0&transparent=true&height={h}"></map-link>
    </map-extent>
  </map-layer>
</gcds-ext-map>

```html
<gcds-ext-map lat="53.087426" lon="-91.27533" zoom="4" projection="OSMTILE" controls>
  <map-layer checked hidden src="couche_de_base.mapml"></map-layer>
  <map-layer label="Conditions actuelles" checked>
    <map-extent units="OSMTILE" checked hidden>
      <map-input name="z" type="zoom" min="0" max="18" ></map-input>
      <map-input name="xmin" type="location" rel="map" position="top-left" axis="easting"
          units="pcrs" min="-1.8443827380300004E7" max="-2287187.2902772236" ></map-input>
      <map-input name="ymin" type="location" rel="map" position="bottom-left" axis="northing"
          units="pcrs" min="4547345.566611593" max="1.6344676582521891E7" ></map-input>
      <map-input name="xmax" type="location" rel="map" position="top-right" axis="easting"
          units="pcrs" min="-1.8443827380300004E7" max="-2287187.2902772236" ></map-input>
      <map-input name="ymax" type="location" rel="map" position="top-left" axis="northing"
          units="pcrs" min="4547345.566611593" max="1.6344676582521891E7" ></map-input>
      <map-input name="w" type="width" min="1" max="4079" ></map-input>
      <map-input name="h" type="height" min="1" max="4079" ></map-input>
      <map-link rel="image" tref="https://geo.weather.gc.ca/geomet?request=GetMap&crs=EPSG:3857&service=WMS&bbox={xmin},{ymin},{xmax},{ymax}&layers=CURRENT_CONDITIONS&format=image/png&width={w}&styles=default&language=fr&version=1.3.0&transparent=true&height={h}"></map-link>
    </map-extent>
  </map-layer>
</gcds-ext-map>
```

### Attribut `label` de la couche et de la sous-couche

L'attribut `label` fournit un nom accessible pour une couche ou une sous-couche dans le contrôle de couche. Si
un élément `<map-title>` est présent en tant que descendant de `<map-layer>` (pour les couches uniquement), sa
valeur textuelle a priorité sur l'attribut `<map-layer label="">`. Si aucun des deux n'est fourni, le contrôle
de couche se rabat sur un nom par défaut générique (« Couche » ou « Sous-couche »), ce qui n'est pas utile aux
utilisateurs — donnez donc toujours un nom significatif à votre contenu via `<map-title>` ou `label`.

#### Couche

Pour une couche, le nom affiché dans le contrôle de couche est choisi dans cet ordre :

1. Le contenu textuel d'un élément enfant `<map-title>`, s'il est présent.
2. La valeur de l'attribut `<map-layer label="...">`, s'il est présent.
3. Le nom par défaut « Couche ».

Comme un élément `<map-title>` dans du contenu distant est rédigé aux côtés des données de la couche, il est
généralement la source faisant autorité pour le nom de la couche. L'attribut `label` est un repli utile
lorsque vous ne contrôlez pas le contenu distant, ou lors de la rédaction de contenu intégré et que vous
préférez garder le nom dans le HTML de la page hôte.

#### Sous-couche

Les sous-couches suivent les mêmes règles de priorité que les couches : un `<map-title>` à l'intérieur du
`<map-extent>` a priorité sur l'attribut `<map-extent label="...">`, qui a lui-même priorité sur le nom par
défaut « Sous-couche ».

Cependant, si une sous-couche n'est pas significativement distincte de sa couche parente, par exemple,
lorsqu'une couche contient un seul `<map-extent>` qui fournit tout son contenu, il est souvent préférable
d'appliquer l'attribut `hidden` au `<map-extent>` plutôt que de lui donner un `label`. Cela garde la
sous-couche hors du contrôle de couche et simplifie l'expérience utilisateur. Réservez les libellés aux
sous-couches que les utilisateurs ont réellement besoin d'activer, de réordonner, ou dont ils doivent ajuster
les paramètres indépendamment de leur couche parente.

### `opacity` de la couche et de la sous-couche

L'attribut `opacity` (0–1, incréments de 0,1) contrôle la transparence de la couche et de la sous-couche,
qui sont cumulatives. Les utilisateurs peuvent également ajuster l'opacité via le curseur du contrôle de
couche. En général, laissez l'opacité des couches à la discrétion de l'utilisateur.

<gcds-ext-map lat="53.087426" lon="-91.27533" zoom="4" projection="OSMTILE" controls style="height: 400px;">
  <map-layer opacity="0.5" checked src="{{ '/components/gcds-ext-map/dist/gcds-ext-map/assets/mapml/fr/osmtile/cbmt' | url }}"></map-layer>
</gcds-ext-map>

```html
<gcds-ext-map lat="53.087426" lon="-91.27533" zoom="4" projection="OSMTILE" controls>
  <map-layer opacity="0.5" checked src="couche.mapml"></map-layer>
</gcds-ext-map>
```

### Requêtes `media` de la couche

L'attribut `media` accepte une
[requête média de carte](https://maps4html.org/web-map-doc/fr/docs/api/mapml-viewer-api/#fonctionnalit%C3%A9s-de-requ%C3%AAte-m%C3%A9dia-prises-en-charge-pour-la-carte).
Lorsqu'il est spécifié, la couche est active uniquement lorsque la requête correspond à l'état actuel de la
carte (par ex. le zoom de la carte correspond à une plage spécifiée), et désactivée autrement. Essayez de
zoomer au-delà du niveau de zoom 6 pour voir la couche superposée (et le contrôle de couche lui-même)
disparaître.

<div style="position: relative;">
  <gcds-ext-map id="zoom-demo-map" lat="53.087426" lon="-91.27533" zoom="4" projection="OSMTILE" controls style="height: 400px;">
    <map-layer checked hidden src="{{ '/components/gcds-ext-map/dist/gcds-ext-map/assets/mapml/fr/osmtile/cbmt' | url }}"></map-layer>
    <map-layer checked media="(0 <= map-zoom <= 6)" src="{{ '/components/gcds-ext-map/dist/gcds-ext-map/assets/mapml/fr/osmtile/current_conditions' | url }}"></map-layer>
  </gcds-ext-map>
  <gcds-text id="zoom-demo-text" character-limit="false" margin-bottom="0" style="position: absolute; top: 8px; left: 50%; transform: translateX(-50%); z-index: 1000; background: rgba(255, 255, 255, 0.85); padding: 0.25rem 0.5rem; border-radius: 4px; color: #000; pointer-events: none;">Zoom = 4</gcds-text>
</div>
<script>
  (function () {
    var map = document.getElementById('zoom-demo-map');
    var text = document.getElementById('zoom-demo-text');
    if (!map || !text) return;
    var update = function () {
      text.textContent = 'Zoom = ' + map.zoom;
    };
    map.addEventListener('zoomend', update);
    map.addEventListener('map-moveend', update);
  })();
</script>

```html
<gcds-ext-map lat="53.087426" lon="-91.27533" zoom="4" projection="OSMTILE" controls>
  <map-layer src="couche_de_base.mapml" checked hidden></map-layer>
  <map-layer media="(0 <= map-zoom <= 6)" checked src="superposition.mapml"></map-layer>
</gcds-ext-map>
```

## Générateur de code

{% include "partials/getcode.njk" %}

<!-- height="100" est un espace réservé ; le partial storybook-resize redimensionne cet iframe automatiquement -->
<iframe
  title="Générateur de code map-layer avec propriétés et événements."
  src="https://nrcan.github.io/gcds-map/storybook/iframe.html?id=components-layer--events-properties&viewMode=docs&demo=true&singleStory=true&lang=fr"
  width="100%"
  height="100"
  style="display: block; border: 0;"
  scrolling="no"
  frameBorder="0"
  allow="clipboard-write; fullscreen"
  allowfullscreen></iframe>

{% include "partials/storybook-resize.njk" %}

{% include "partials/map-live-code.njk" %}
