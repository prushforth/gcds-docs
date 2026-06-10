---
title: Couche
layout: 'layouts/component-documentation.njk'
translationKey: 'maplayerCode'
tags: ['maplayerFR', 'code']
date: 'git Last Modified'
---

## Sur cette page

- [Codage et accessibilité pour les couches](#codage-et-accessibilite-pour-les-couches)
  - [Fournir un nom accessible pour les couches non cachées](#fournir-un-nom-accessible-pour-les-couches-non-cachees)
  - [Masquer le contenu cartographique non pertinent à l'aide de requêtes média de carte](#masquer-le-contenu-cartographique-non-pertinent-a-laide-de-requetes-media-de-carte)
  - [Assurer un contraste suffisant du contenu visuel](#assurer-un-contraste-suffisant-du-contenu-visuel)
- [Exemples](#exemples)
  - [Contenu de couche distant](#contenu-de-couche-distant)
  - [Contenu de couche intégré](#contenu-de-couche-integre)
  - [Couche de base cachée](#couche-de-base-cachee)
  - [Opacité](#opacite)
  - [Contenu d'image intégré](#contenu-dimage-integre)
  - [Requêtes média](#requetes-media)
  - [Combiner des couches distantes et intégrées](#combiner-des-couches-distantes-et-integrees)
- [Générateur de code](#generateur-de-code)

## Codage et accessibilité pour les couches

Utilisez le composant de couche pour afficher le contenu « Map Markup Language » (MapML).

Utilisez l'attribut `src` du composant pour créer un lien vers un contenu distant, ou créez du contenu MapML intégré dans votre HTML, entre les balises de début `<map-layer>` et de fin `</map-layer>`.

Définissez les propriétés initiales de la couche à l'aide des attributs `src`, `checked`, `hidden`, `label`, `opacity` et `media`.

### Fournir un nom accessible pour les couches non cachées

Si une couche est suffisamment importante, elle devrait avoir un nom significatif accessible à tous les utilisateurs.
Le nom d'une couche est présenté via le contrôle de couche. Si une couche contient un élément enfant
`<map-title>foo</map-title>`, la valeur textuelle de cet élément (« foo », dans ce cas) est toujours utilisée comme
nom dans le contrôle de couche ; si la couche ne possède pas d'élément `<map-title>`, le nom du contrôle de couche
se rabat sur la valeur de l'attribut `<map-layer label="bar">` `label`, si présent (« bar » dans ce dernier cas).
Si aucune de ces valeurs n'est disponible, le nom de la couche est défini à « Layer », ce qui n'est pas très utile
pour les utilisateurs. Par conséquent, il est important de s'assurer que vos couches de contenu ont des noms significatifs.

### Masquer le contenu cartographique non pertinent à l'aide de requêtes média de carte

Si certains contenus cartographiques ne sont pas pertinents selon des conditions identifiables par des expressions
média de carte, organisez le contenu en éléments `<map-layer>` distincts, et utilisez l'attribut `media` pour afficher
ou masquer la couche en conséquence.

### Assurer un contraste suffisant du contenu visuel

Ne vous fiez pas uniquement à la couleur pour distinguer les entités cartographiques. Utilisez un contraste de couleur
élevé, ainsi que des formes et symbologies différentes lorsque possible — votre organisation ne possède pas toujours
les données que votre carte présente, mais fournir des commentaires d'accessibilité aux fournisseurs de cartes
est utile à tous les utilisateurs.

En général, laissez l'opacité ou la transparence des couches à la discrétion de l'utilisateur.

## Exemples

### Contenu de couche distant

Une couche distante récupère son contenu à partir d'une URL de document MapML, pointée par l'attribut
`src` de `<map-layer src="...">`. Le document MapML est analysé en tant que XHTML, à l'aide de
l'analyseur XML intégré dans le navigateur. Les documents MapML distants **doivent** être déclarés dans l'espace de noms XHTML,
[en utilisant l'attribut `xmlns`](https://maps4html.org/web-map-doc/fr/docs/elements/mapml/#xmlns),
et ils **doivent** être du [XML bien formé](https://fr.wikipedia.org/wiki/Document_bien_form%C3%A9).

Si le contenu MapML distant (ou intégré) contient l'élément `<map-title>`, la valeur textuelle de cet
élément devient le nom de la couche dans le contrôle de couche. Si aucun élément `<map-title>` n'est trouvé,
le nom de la couche se rabat sur la valeur de l'attribut `label`, si présent. Si cette valeur n'est pas
trouvée non plus, le nom de la couche par défaut est « Couche ».

<gcds-map lat="53.087426" lon="-91.27533" zoom="4" projection="OSMTILE" controls style="height: 400px;">
  <map-layer src="{{ '/components/gcds-map/dist/gcds-map/assets/mapml/fr/osmtile/cbmt' | url }}" checked></map-layer>
</gcds-map>

```html
<gcds-map lat="53.087426" lon="-91.27533" zoom="4" projection="OSMTILE" controls>
  <map-layer src="https://exemple.com/chemin/vers/couche.mapml" checked></map-layer>
</gcds-map>
```

### Contenu de couche intégré

Lorsque l'attribut `src` n'est pas défini, le contenu de la couche est fourni par les éléments enfants de `<map-layer>`.
Notez que le contenu intégré **doit** être encodé en HTML. Il est particulièrement important que les balises
HTML non [vides](https://developer.mozilla.org/fr/docs/Glossary/Void_element)
se terminent par une balise de fermeture, et de **ne pas** utiliser la
[syntaxe de balise auto-fermante](https://developer.mozilla.org/fr/docs/Glossary/Void_element#balises_auto-fermantes)
XML `<balise />`, qui n'est pas reconnue par l'analyseur HTML et peut causer des problèmes.

Il est particulièrement important d'être conscient des différences entre la syntaxe auto-fermante XML et la syntaxe
d'éléments vides HTML lors du copier-coller de contenu depuis des documents MapML encodés en XML vers un fichier .html
encodé en HTML. Une bonne pratique pour créer des documents MapML (XML-XHTML) autonomes est d'éviter la forme
auto-fermante XML et de toujours inclure une balise de fermeture explicite, par ex. `</map-link>` ou `</map-input>`,
ce qui reste du XML bien formé. De cette façon, lors du copier-coller de ce contenu d'un document MapML vers un
document HTML, les pièges causés par la différence apparemment minime entre les syntaxes peuvent être évités.

Cet exemple montre une entité intégrée avec une géométrie de polygone définie en coordonnées géographiques (`cs="gcrs"`).

<gcds-map lat="45.5" lon="-74.5" zoom="3" projection="CBMTILE" controls style="height: 400px;">
<map-layer src="{{ '/components/gcds-map/dist/gcds-map/assets/mapml/fr/cbmtile/cbmtsimple' | url }}" checked hidden></map-layer>
  <map-layer label="Couche d'entités intégrée" checked>
    <map-meta name="projection" content="CBMTILE"></map-meta>
    <map-meta name="zoom" content="min=0,max=5"></map-meta>
    <map-link rel="license"
      href="https://ouvert.canada.ca/fr/licence-du-gouvernement-ouvert-canada"
      title="Licence du gouvernement ouvert - Canada"></map-link>
    <map-feature zoom="2">
      <map-featurecaption>Un exemple d'entité</map-featurecaption>
      <map-properties>
        <h2>Polygone exemple</h2>
        <p>Cette entité est définie de manière intégrée dans l'élément map-layer.</p>
      </map-properties>
      <map-geometry cs="gcrs">
        <map-polygon>
          <map-coordinates>-75 45 -74 45 -74 46 -75 46 -75 45</map-coordinates>
        </map-polygon>
      </map-geometry>
    </map-feature>
  </map-layer>
</gcds-map>

```html
<gcds-map lat="45.5" lon="-74.5" zoom="3" projection="CBMTILE" controls>
  <!-- le contenu de cette couche est « intégré » -->
  <map-layer label="Couche d'entités intégrée" checked>
    <map-meta name="projection" content="CBMTILE"></map-meta>
    <map-meta name="zoom" content="min=0,max=5"></map-meta>
    <map-feature zoom="2">
      <map-featurecaption>Un exemple d'entité</map-featurecaption>
      <map-properties>
        <h2>Polygone exemple</h2>
      </map-properties>
      <map-geometry cs="gcrs">
        <map-polygon>
          <map-coordinates>-75 45 -74 45 -74 46 -75 46 -75 45</map-coordinates>
        </map-polygon>
      </map-geometry>
    </map-feature>
  </map-layer>
</gcds-map>
```

### Couche de base cachée

Utilisez l'attribut `hidden` pour garder une couche visible sur la carte mais cachée du contrôle de couche.
Ceci est utile pour les couches de base qui doivent toujours être affichées.
S'il n'y a aucune couche non cachée (`hidden`) dans une carte, le contrôle de couche est est lui-même automatiquement caché .

<gcds-map lat="53.087426" lon="-91.27533" zoom="4" projection="OSMTILE" controls style="height: 400px;">
  <map-layer checked hidden src="{{ '/components/gcds-map/dist/gcds-map/assets/mapml/fr/osmtile/cbmt' | url }}"></map-layer>
  <map-layer checked src="{{ '/components/gcds-map/dist/gcds-map/assets/mapml/fr/osmtile/current_conditions' | url }}"></map-layer>
</gcds-map>

```html
<gcds-map lat="53.087426" lon="-91.27533" zoom="4" projection="OSMTILE" controls>
  <map-layer checked hidden src="couche_de_base.mapml"></map-layer>
  <map-layer checked src="conditions_actuelles.mapml"></map-layer>
</gcds-map>
```

### Opacité

L'attribut `opacity` (0–1) contrôle la transparence de la couche. Les utilisateurs peuvent également
ajuster l'opacité via le curseur du contrôle de couche. En général, laissez l'opacité ou la transparence
des couches à la discrétion de l'utilisateur.

<gcds-map lat="53.087426" lon="-91.27533" zoom="4" projection="OSMTILE" controls style="height: 400px;">
  <map-layer opacity="0.5" checked src="{{ '/components/gcds-map/dist/gcds-map/assets/mapml/fr/osmtile/cbmt' | url }}"></map-layer>
</gcds-map>

```html
<gcds-map lat="53.087426" lon="-91.27533" zoom="4" projection="OSMTILE" controls>
  <map-layer opacity="0.5" checked src="couche.mapml"></map-layer>
</gcds-map>
```

### Contenu d'image intégré

Une couche intégrée peut également contenir des éléments `<map-extent>` qui définissent des requêtes
d'images tuilées ou de fenêtre d'affichage complète, récupérées dynamiquement lorsque l'utilisateur
déplace et zoome la carte.

<gcds-map lat="53.087426" lon="-91.27533" zoom="4" projection="OSMTILE" controls style="height: 400px;">
  <map-layer label="CCCT (extent intégré)" checked>
    <map-meta name="projection" content="OSMTILE"></map-meta>
    <map-extent units="OSMTILE" checked hidden>
      <map-input name="z" type="zoom" min="0" max="22"></map-input>
      <map-input name="xmin" type="location" units="pcrs" position="top-left" axis="easting"></map-input>
      <map-input name="ymin" type="location" units="pcrs" position="bottom-left" axis="northing"></map-input>
      <map-input name="xmax" type="location" units="pcrs" position="top-right" axis="easting"></map-input>
      <map-input name="ymax" type="location" units="pcrs" position="top-left" axis="northing"></map-input>
      <map-input name="w" type="width"></map-input>
      <map-input name="h" type="height"></map-input>
      <map-link rel="image" tref="https://geogratis.gc.ca/cartes/CBCT?SERVICE=WMS&amp;VERSION=1.1.1&amp;SRS=EPSG:3857&amp;LAYERS=CBCT&amp;BBOX={xmin},{ymin},{xmax},{ymax}&amp;REQUEST=GetMap&amp;FORMAT=image/png&amp;TRANSPARENT=TRUE&amp;WIDTH={w}&amp;HEIGHT={h}&amp;STYLES="></map-link>
    </map-extent>
  </map-layer>
</gcds-map>

```html
<gcds-map lat="53.087426" lon="-91.27533" zoom="4" projection="OSMTILE" controls>
  <map-layer label="CCCT (extent intégré)" checked>
    <map-meta name="projection" content="OSMTILE"></map-meta>
    <!-- les limites d'une requête d'image ou de tuile sont décrites par l'élément formulaire map-extent -->
    <map-extent units="OSMTILE" checked hidden>
      <map-input name="z" type="zoom" min="0" max="22"></map-input>
      <map-input name="xmin" type="location" units="pcrs" position="top-left" axis="easting"></map-input>
      <map-input name="ymin" type="location" units="pcrs" position="bottom-left" axis="northing"></map-input>
      <map-input name="xmax" type="location" units="pcrs" position="top-right" axis="easting"></map-input>
      <map-input name="ymax" type="location" units="pcrs" position="top-left" axis="northing"></map-input>
      <map-input name="w" type="width"></map-input>
      <map-input name="h" type="height"></map-input>
      <map-link rel="image" tref="https://exemple.com/wms?BBOX={xmin},{ymin},{xmax},{ymax}&amp;WIDTH={w}&amp;HEIGHT={h}"></map-link>
    </map-extent>
  </map-layer>
</gcds-map>
```

### Requêtes média

L'attribut `media` accepte une
[requête média de carte](https://maps4html.org/web-map-doc/fr/docs/api/mapml-viewer-api/#fonctionnalit%C3%A9s-de-requ%C3%AAte-m%C3%A9dia-prises-en-charge-pour-la-carte).
Lorsqu'il est spécifié, la couche est active uniquement lorsque la requête correspond à l'état actuel de la carte
(par ex. le zoom de la carte correspond à une plage spécifiée), et désactivée autrement. Essayez de zoomer au-delà
du niveau de zoom 6 pour voir la couche superposée (et par conséquent, le contrôle de couche) disparaître.

<gcds-map lat="53.087426" lon="-91.27533" zoom="4" projection="OSMTILE" controls style="height: 400px;">
  <map-layer checked hidden src="{{ '/components/gcds-map/dist/gcds-map/assets/mapml/fr/osmtile/cbmt' | url }}"></map-layer>
  <map-layer checked media="(0 <= map-zoom <= 6)" src="{{ '/components/gcds-map/dist/gcds-map/assets/mapml/fr/osmtile/current_conditions' | url }}"></map-layer>
</gcds-map>

```html
<gcds-map lat="53.087426" lon="-91.27533" zoom="4" projection="OSMTILE" controls>
  <map-layer src="couche_de_base.mapml" checked hidden></map-layer>
  <map-layer media="(0 <= map-zoom <= 6)" checked src="superposition.mapml"></map-layer>
</gcds-map>
```

### Combiner des couches distantes et intégrées

Une carte peut contenir un mélange de couches distantes et intégrées. Ici, une couche de base cachée et une
superposition thématique distante sont combinés avec une couche d'entités ponctuelles intégrées.

<gcds-map lat="53.087426" lon="-91.27533" zoom="4" projection="OSMTILE" controls style="height: 400px;">
  <map-layer src="{{ '/components/gcds-map/dist/gcds-map/assets/mapml/fr/osmtile/cbmt' | url }}" checked hidden></map-layer>
  <map-layer src="{{ '/components/gcds-map/dist/gcds-map/assets/mapml/fr/osmtile/current_conditions' | url }}" checked opacity="0.7"></map-layer>
  <map-layer label="Points d'intérêt" checked>
    <map-meta name="projection" content="OSMTILE"></map-meta>
    <map-meta name="zoom" content="min=0,max=10"></map-meta>
    <map-feature zoom="8">
      <map-featurecaption>Ottawa</map-featurecaption>
      <map-properties>
        <h2>Ottawa</h2>
        <p>Capitale du Canada</p>
      </map-properties>
      <map-geometry cs="gcrs">
        <map-point>
          <map-coordinates>-75.6972 45.4215</map-coordinates>
        </map-point>
      </map-geometry>
    </map-feature>
  </map-layer>
</gcds-map>

```html
<gcds-map lat="53.087426" lon="-91.27533" zoom="4" projection="OSMTILE" controls>
  <map-layer src="couche_de_base.mapml" checked hidden></map-layer>
  <map-layer src="superposition.mapml" checked opacity="0.7"></map-layer>
  <map-layer label="Points d'intérêt" checked>
    <map-meta name="projection" content="OSMTILE"></map-meta>
    <map-meta name="zoom" content="min=0,max=10"></map-meta>
    <map-feature zoom="8">
      <map-featurecaption>Ottawa</map-featurecaption>
      <map-properties>
        <h2>Ottawa</h2>
        <p>Capitale du Canada</p>
      </map-properties>
      <map-geometry cs="gcrs">
        <map-point>
          <map-coordinates>-75.6972 45.4215</map-coordinates>
        </map-point>
      </map-geometry>
    </map-feature>
  </map-layer>
</gcds-map>
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
  allow="clipboard-write"></iframe>

{% include "partials/storybook-resize.njk" %}

{% include "partials/map-live-code.njk" %}
