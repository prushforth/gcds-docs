---
title: Couche
layout: 'layouts/component-documentation.njk'
translationKey: 'maplayerDesign'
tags: ['maplayerFR', 'design']
date: 'git Last Modified'
---

## Sur cette page

- [Anatomie du contrôle des couches](#anatomie-du-controle-des-couches)
- [Design et accessibilité pour les couches](#design-et-accessibilite-pour-les-couches)
  - [Design](#design)
    - [Comment les couches représentent le contenu de la carte](#comment-les-couches-representent-le-contenu-de-la-carte)
    - [Contenu de couche distant ou intégré](#contenu-de-couche-distant-ou-integre)
      - [Contenu distant](#contenu-distant)
      - [Contenu intégré](#contenu-integre)
      - [Combiner des couches distantes et intégrées](#combiner-des-couches-distantes-et-integrees)
    - [Attribution et licence](#attribution-et-licence)
    - [Couches et sous-couches](#couches-et-souscouches)
    - [Projections alternatives pour les couches](#projections-alternatives-pour-les-couches)
    - [Légendes](#legendes)
    - [Types de contenu de carte](#types-de-contenu-de-carte)
        - [Contenu image](#contenu-image)
        - [Contenu entité](#contenu-entite)
        - [Contenu tuilé](#contenu-tuile)
        - [GeoJSON](#geojson)
        - [Tuiles vectorielles](#tuiles-vectorielles)
  - [Accessibilité](#accessibilite)
    - [Fournir un nom accessible aux couches non masquées](#fournir-un-nom-accessible-aux-couches-non-masquees)
    - [Masquer le contenu de carte non pertinent à l'aide de requêtes de média de carte](#masquer-le-contenu-de-carte-non-pertinent-a-laide-de-requetes-de-media-de-carte)
    - [Assurer un contraste suffisant pour le contenu visuel](#assurer-un-contraste-suffisant-pour-le-contenu-visuel)
      - [Styles alternatifs de couche](#styles-alternatifs-de-couche)



## Anatomie du contrôle des couches
<ol class="anatomy-list">
  <li>Chaque entrée de couche peut être activée ou désactivée par l'utilisateur à l'aide de la <strong>case à cocher</strong> de la couche. Les modifications interactives de la case à cocher provoquent l'émission de l'événement <code>map-change</code> par l'élément <code>&lt;map-layer&gt;</code>. L'attribut booléen <code>&lt;map-layer checked&gt;</code> peut être défini ou retiré pour contrôler l'état initial de la couche, et la propriété de l'élément peut également être mise à jour à l'aide de JavaScript pour modifier l'état de la couche (activée ou désactivée). Les modifications apportées à la propriété ou à l'attribut <code>checked</code> par JavaScript ne provoquent pas l'émission d'événements <code>map-change</code> par l'élément <code>&lt;map-layer&gt;</code>.

  <li>Le <strong>titre ou étiquette</strong> de la couche est le nom accessible de la couche pour la présentation aux utilisateurs. Si l'élément <code>&lt;map-layer&gt;</code> possède un attribut <code>src</code>, la couche est une couche à contenu « distant ». Le contenu distant peut être du contenu tiers, et en tant que tel, son auteur a le droit ou l'obligation de définir le nom accessible du contenu, via un élément <code>&lt;map-title&gt;</code>. Si aucun élément <code>&lt;map-title&gt;</code> n'est présent, le nom de la couche peut être défini avec l'attribut <code>&lt;map-layer label=" "&gt;</code>. Que le contenu de la couche soit distant ou intégré (c'est-à-dire entre les balises de début et de fin de <code>&lt;map-layer&gt;balisage et contenu intégré&lt;/map-layer&gt;</code>), un élément descendant <code>&lt;map-title&gt;</code> a priorité sur l'attribut <code>&lt;map-layer label=" "</code>.

  <li>Le bouton de <strong>suppression</strong> de la couche supprime définitivement la couche du document. La seule façon de restaurer une couche supprimée est de recharger la page d'origine. L'activation du bouton de suppression retire l'élément <code>&lt;map-layer&gt;</code> correspondant et ses enfants du document.

  <li>Un élément <code>&lt;map-extent&gt;</code> est représenté dans le contrôle des couches comme une sous-couche de son élément ancêtre <code>&lt;map-layer&gt;</code>, et le nom accessible de la sous-couche est fourni par son attribut <code>label</code> <code>&lt;map-extent label="Le nom ici"&gt;</code>. Si aucun attribut <code>label</code> n'est fourni, la sous-couche est nommée « Sous-couche » par défaut. Une sous-couche n'a pas besoin d'être présentée dans le contrôle des couches, car elle peut être masquée via un attribut optionnel. Comme les couches, les sous-couches sont contrôlées via les attributs booléens <code>hidden</code> et <code>checked</code>.

  <li>Pour les couches et les sous-couches, les informations de paramètres sont accessibles via le bouton <strong>Paramètres</strong>, qui révèle les étiquettes et les contrôles du contenu. Le bouton de paramètres de la couche ou de la sous-couche est un type de widget de divulgation, avec une interface utilisateur différente.

  <li>Les entrées du contrôle des couches utilisent des <strong>widgets de divulgation</strong> HTML standard pour présenter un résumé des informations de la couche ou de la sous-couche tout en révélant les détails, y compris les contrôles de contenu, lors de l'interaction de l'utilisateur.

  <li>Les couches et les sous-couches disposent de contrôles de curseur d'<strong>opacité</strong> indépendants. Le curseur d'opacité affiche et représente une valeur numérique de l'attribut <code>opacity</code> de <code>&lt;map-layer&gt;</code> ou <code>&lt;map-extent&gt;</code> comprise entre 0 et 1.

  <li>Les styles de couche sont rendus sous forme de sélecteurs de <strong>style</strong>. Les styles de couche peuvent être utilisés pour gérer les thèmes cartographiques, les équivalents clair/sombre et les couches à contraste élevé, entre autres objectifs d'accessibilité. Les styles de couche ont été conçus pour rendre les styles nommés WMS accessibles, mais constituent un mécanisme à usage général permettant le choix de l'utilisateur parmi des alternatives, y compris des sources de contenu complètement différentes pour la même zone géographique, par exemple vue satellite vs vue carte.

  <li>Les dimensions des sous-couches telles que le temps, le temps de référence et l'altitude (qui sont des dimensions standard du service Web Map Service (WMS)) sont rendues et sélectionnables de manière interactive sous forme d'éléments HTML <code>select</code>.

</ol>

<img src="/images/fr/components/anatomy/gcds-layer-control-anatomy.svg" alt="Une image de l'anatomie." >

## Design et accessibilité pour les couches

### Design

#### Comment les couches représentent le contenu de la carte

Le contenu de l'élément <code>&lt;map-layer&gt;</code> est rendu sur la carte sous forme d'images, de tuiles et d'entités, et ses métadonnées sont rendues dans le contrôle des couches. Le contrôle des couches s'agrandit au survol ou lors d'une interaction au clavier. Le contrôle des couches agrandi affiche les couches de la carte sous forme d'une liste d'entrées, avec un ordre de tabulation au clavier égal à l'ordre documentaire des éléments <code>&lt;map-layer&gt;</code> sources. Chaque entrée du contrôle des couches possède une anatomie standard.

#### Contenu de couche distant ou intégré

##### Contenu distant

Une couche distante récupère son contenu depuis l'URL d'un document MapML, indiquée par l'attribut
`src` de `<map-layer src="...">`. Le document MapML est analysé en tant que XHTML, à l'aide de
l'analyseur XML intégré au navigateur. Les documents MapML distants **doivent** être déclarés dans
l'espace de noms XHTML,
[à l'aide de l'attribut `xmlns`](https://maps4html.org/web-map-doc/fr/docs/elements/mapml/#xmlns),
et ils **doivent** être [du XML bien formé](https://fr.wikipedia.org/wiki/Well-formed_XML_document).

Si le contenu MapML distant (ou intégré) contient un élément `<map-title>`, la valeur textuelle de
cet élément devient le nom de la couche dans le contrôle des couches. Si aucun élément
`<map-title>` n'est trouvé, le nom de la couche est défini à partir de la valeur de l'attribut
`label`, si celui-ci est présent. Si cette valeur n'est pas non plus disponible, le nom de la
couche prend la valeur par défaut « Couche ».

<gcds-map lat="53.087426" lon="-91.27533" zoom="4" projection="OSMTILE" controls style="height: 400px;">
  <map-layer src="{{ '/components/gcds-map/dist/gcds-map/assets/mapml/fr/osmtile/cbmt' | url }}" checked></map-layer>
</gcds-map>

```html
<gcds-map lat="53.087426" lon="-91.27533" zoom="4" projection="OSMTILE" controls>
  <map-layer src="https://example.com/chemin/vers/couche.mapml" checked></map-layer>
</gcds-map>
```

##### Contenu intégré

Lorsque l'attribut `src` n'est pas défini, le contenu de la couche est fourni par les éléments
enfants de `<map-layer>`. Notez que le contenu intégré **doit** être encodé en HTML. Il est
particulièrement important que les balises HTML
non [vides](https://developer.mozilla.org/fr/docs/Glossary/Void_element) se terminent par une
balise de fermeture, et de **ne pas** utiliser la
[syntaxe de balise auto-fermante](https://developer.mozilla.org/fr/docs/Glossary/Void_element#self-closing_tags)
XML `<tag />`, qui n'est pas reconnue par l'analyseur HTML et peut causer des problèmes.

Il est particulièrement important d'être conscient des différences entre la syntaxe auto-fermante
XML et celle des éléments vides HTML lorsque l'on copie-colle du contenu provenant de documents
MapML encodés en XML dans un fichier .html encodé en HTML. Une bonne pratique pour créer des
documents MapML autonomes (XML-XHTML) est d'éviter la forme de balise auto-fermante XML et de
toujours inclure une balise de fermeture explicite, par exemple `</map-link>` ou `</map-input>`,
ce qui reste du XML bien formé. Ainsi, lorsqu'on copie-colle ce type de contenu d'un document
MapML vers un document HTML, les pièges causés par la différence apparemment minime entre les
syntaxes peuvent être évités.

Cet exemple illustre une entité intégrée dont la géométrie est un polygone défini en coordonnées
géographiques (`cs="gcrs"`).

<gcds-map lat="45.5" lon="-74.5" zoom="3" projection="CBMTILE" controls style="height: 400px;">
<map-layer src="{{ '/components/gcds-map/dist/gcds-map/assets/mapml/fr/cbmtile/cbmtsimple' | url }}" checked hidden></map-layer>
  <map-layer label="Couche d'entités intégrée" checked>
    <map-meta name="projection" content="CBMTILE"></map-meta>
    <map-meta name="zoom" content="min=0,max=5"></map-meta>
    <map-link rel="license"
      href="https://ouvert.canada.ca/fr/licence-du-gouvernement-ouvert-canada"
      title="Licence du gouvernement ouvert - Canada"></map-link>
    <map-feature zoom="2">
      <map-featurecaption>Une entité d'exemple</map-featurecaption>
      <map-properties>
        <h2>Polygone d'exemple</h2>
        <p>Cette entité est définie de manière intégrée à l'intérieur de l'élément map-layer.</p>
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
      <map-featurecaption>Une entité d'exemple</map-featurecaption>
      <map-properties>
        <h2>Polygone d'exemple</h2>
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

##### Combiner des couches distantes et intégrées

Une carte peut contenir un mélange de couches distantes et intégrées. Ici, une carte de base
masquée et une couche thématique distante sont combinées avec une couche d'entités ponctuelles
intégrée.

<gcds-map lat="45.4215" lon="-75.6972" zoom="4" projection="OSMTILE" controls style="height: 400px;">
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
<gcds-map lat="45.4215" lon="-75.6972" zoom="4" projection="OSMTILE" controls>
  <map-layer src="basemap.mapml" checked hidden></map-layer>
  <map-layer src="overlay.mapml" checked opacity="0.7"></map-layer>
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

#### Attribution et licence

Le composant carte affiche le bouton d'attribution réduit dans le coin inférieur droit. Lorsqu'il
est activé, le contrôle d'attribution affiche un menu d'aide au clavier, suivi de liens pouvant
recevoir le focus vers les informations d'attribution et de licence pour toutes les couches de la
carte.

Les liens de licence ou d'attribution peuvent éventuellement être inclus dans le contenu de la
couche (distant ou intégré), sous forme de liens
<code>&lt;map-link <strong>rel="license"</strong>&gt;</code>, où la valeur <code>license</code> de
l'attribut <code>rel</code> indique que le lien doit être inclus dans le contrôle d'attribution.
Les liens de licence ou d'attribution sont facultatifs, mais leur inclusion est fortement
recommandée, en particulier si votre carte utilise du contenu tiers dont l'attribution est requise
de manière indépendante, comme dans l'exemple ci-dessous.

<gcds-map projection="OSMTILE" zoom="0" lat="0" lon="0" controls style="height: 400px;">
  <map-layer label="OpenStreetMap" checked>
    <map-link rel="license" href="https://www.openstreetmap.org/copyright/fr" title="&#xa9; les contributeurs d'OpenStreetMap CC BY-SA 2.0"></map-link>
    <map-extent units="OSMTILE" checked hidden>
      <map-input name="z" type="zoom" min="0" max="18"></map-input>
      <map-input name="x" type="location" units="tilematrix" axis="column"></map-input>
      <map-input name="y" type="location" units="tilematrix" axis="row"></map-input>
      <map-link rel="tile" tref="https://tile.openstreetmap.org/{z}/{x}/{y}.png"></map-link>
    </map-extent>
  </map-layer>
</gcds-map>

```html
<gcds-map projection="OSMTILE" zoom="0" lat="0" lon="0" controls>
  <map-layer label="OpenStreetMap" checked>
    <map-link rel="license" href="https://www.openstreetmap.org/copyright/fr" title="&#xa9; les contributeurs d'OpenStreetMap CC BY-SA 2.0"></map-link>
    <map-extent units="OSMTILE" checked hidden>
      <map-input name="z" type="zoom" min="0" max="18"></map-input>
      <map-input name="x" type="location" units="tilematrix" axis="column"></map-input>
      <map-input name="y" type="location" units="tilematrix" axis="row"></map-input>
      <map-link rel="tile" tref="https://tile.openstreetmap.org/{z}/{x}/{y}.png"></map-link>
    </map-extent>
  </map-layer>
</gcds-map>
```

#### Couches et sous-couches

L'élément `<map-layer>` peut inclure l'élément `<map-extent>`, qui sert de gabarit pour
récupérer et inclure du contenu cartographique. L'élément `<map-extent>` est traité comme une
« sous-couche » visible dans le contrôle des couches, accessible à l'utilisateur via le bouton
de paramètres de la couche. Chaque sous-couche peut avoir son propre nom accessible, attribué
via l'attribut `<map-extent label="...">`. Si aucun `label` n'est fourni, la valeur par défaut
« Sous-couche » lui est attribuée. Les sous-couches peuvent également être masquées via
l'attribut booléen `hidden` si désiré. Notez que masquer de tels éléments d'interface
utilisateur peut affecter l'utilisabilité du contenu, selon sa nature. Dans l'exemple
ci-dessous, l'inclusion de la sous-couche dans l'interface utilisateur de la carte (en
n'ajoutant pas d'attribut `hidden`) diminue l'utilisabilité en augmentant la charge cognitive
de l'utilisateur, car il doit comprendre à quoi sert la sous-couche et pourquoi elle s'appelle
« Sous-couche ». Cela aurait pu être évité en incluant simplement l'attribut
`<map-extent hidden>`.

<gcds-map projection="CBMTILE" zoom="2" lat="63" lon="-89" controls static style="height: 400px;">
  <map-layer label="Toporama" checked>
      <map-link rel="license"
      href="https://ouvert.canada.ca/fr/licence-du-gouvernement-ouvert-canada"
      title="Licence du gouvernement ouvert - Canada"></map-link>
    <!-- ajouter l'attribut hidden ici rendrait l'interface plus simple -->
    <map-extent units="CBMTILE" checked>
      <map-input name="z" type="zoom" value="19" min="0" max="19"></map-input>
      <map-input name="w" type="width"></map-input>
      <map-input name="h" type="height"></map-input>
      <map-input name="xmin" type="location" units="pcrs" position="top-left" axis="easting" min="-2465257.3" max="3078646.8"></map-input>
      <map-input name="ymin" type="location" units="pcrs" position="bottom-left" axis="northing" min="-883189.1" max="3952792.7"></map-input>
      <map-input name="xmax" type="location" units="pcrs" position="top-right" axis="easting" min="-2465257.3" max="3078646.8"></map-input>
      <map-input name="ymax" type="location" units="pcrs" position="top-left" axis="northing" min="-883189.1" max="3952792.7"></map-input>
      <map-link rel="image" tref="https://maps.geogratis.gc.ca/wms/toporama_fr?SERVICE=WMS&amp;REQUEST=GetMap&amp;FORMAT=image/jpeg&amp;TRANSPARENT=FALSE&amp;STYLES=&amp;VERSION=1.3.0&amp;LAYERS=SCW-Toporama&amp;WIDTH={w}&amp;HEIGHT={h}&amp;CRS=EPSG:3978&amp;BBOX={xmin},{ymin},{xmax},{ymax}"></map-link>
    </map-extent>
  </map-layer>
</gcds-map>

```html
<gcds-map projection="CBMTILE" zoom="2" lat="63" lon="-89" controls static style="height: 400px;">
  <map-layer label="Toporama" checked>
    <!-- ajouter l'attribut hidden ici rendrait l'interface plus simple -->
    <map-extent units="CBMTILE" checked>
      <map-input name="z" type="zoom" value="19" min="0" max="19"></map-input>
      <map-input name="w" type="width"></map-input>
      <map-input name="h" type="height"></map-input>
      <map-input name="xmin" type="location" units="pcrs" position="top-left" axis="easting" min="-2465257.3" max="3078646.8"></map-input>
      <map-input name="ymin" type="location" units="pcrs" position="bottom-left" axis="northing" min="-883189.1" max="3952792.7"></map-input>
      <map-input name="xmax" type="location" units="pcrs" position="top-right" axis="easting" min="-2465257.3" max="3078646.8"></map-input>
      <map-input name="ymax" type="location" units="pcrs" position="top-left" axis="northing" min="-883189.1" max="3952792.7"></map-input>
      <map-link rel="image" tref="https://maps.geogratis.gc.ca/wms/toporama_fr?SERVICE=WMS&amp;REQUEST=GetMap&amp;FORMAT=image/jpeg&amp;TRANSPARENT=FALSE&amp;STYLES=&amp;VERSION=1.3.0&amp;LAYERS=SCW-Toporama&amp;WIDTH={w}&amp;HEIGHT={h}&amp;CRS=EPSG:3978&amp;BBOX={xmin},{ymin},{xmax},{ymax}"></map-link>
    </map-extent>
  </map-layer>
</gcds-map>
```

#### Projections alternatives pour les couches

Toutes les cartes ont une caractéristique mathématique fondamentale qui permet de représenter la
surface courbe et tridimensionnelle de la Terre dans les deux dimensions de l'écran : leur
« projection ». La projection cartographique est le terme utilisé pour identifier la classe de
transformation qui permet ce rendu, et la projection peut varier d'une carte à l'autre selon son
objectif. Par exemple, les cartes des pôles terrestres peuvent nécessiter une approche
différente de celle d'une carte de l'Amérique du Nord ou du Sud.

En MapML, la projection d'une carte est identifiée par la valeur de son attribut `projection`.
Le contenu affiché sur cette carte **doit** être conforme à cette projection, sans quoi son
rendu peut être légèrement ou complètement inexact. Les cartes MapML n'effectuent pas de
reprojection « à la volée » des données cartographiques, qui serait gourmande en calcul; les
cartes MapML utilisent la « négociation de projection », par laquelle l'auteur d'une couche
peut choisir de fournir et d'annoncer des représentations alternatives du contenu de la couche
par projection, et la carte cliente sélectionne la représentation de la couche qui convient le
mieux.

<details>
<summary style="margin-block-end: var(--gcds-heading-spacing-200);">Négociation de projection - contenu intégré</summary>

Dans cet exemple, du contenu intégré fournit deux sous-couches masquées, chacune avec une
`projection` différente. Le bouton fourni bascule la `projection` de la carte entre `CBMTILE`
et `OSMTILE`. La carte sélectionne et affiche la sous-couche qui correspond à sa projection.

<div style="position: relative;">
<gcds-map projection="CBMTILE" zoom="3" lat="57" lon="-95" controls style="height: 400px;">
  <map-layer label="Toporama" checked>
    <map-link rel="license"
      href="https://ouvert.canada.ca/fr/licence-du-gouvernement-ouvert-canada"
      title="Licence du gouvernement ouvert - Canada"></map-link>
    <map-extent units="CBMTILE" checked hidden>
      <map-input name="z" type="zoom" value="19" min="0" max="19"></map-input>
      <map-input name="w" type="width"></map-input>
      <map-input name="h" type="height"></map-input>
      <map-input name="xmin" type="location" units="pcrs" position="top-left" axis="easting" min="-2465257.3" max="3078646.8"></map-input>
      <map-input name="ymin" type="location" units="pcrs" position="bottom-left" axis="northing" min="-883189.1" max="3952792.7"></map-input>
      <map-input name="xmax" type="location" units="pcrs" position="top-right" axis="easting" min="-2465257.3" max="3078646.8"></map-input>
      <map-input name="ymax" type="location" units="pcrs" position="top-left" axis="northing" min="-883189.1" max="3952792.7"></map-input>
      <map-link rel="image" tref="https://maps.geogratis.gc.ca/wms/toporama_fr?SERVICE=WMS&REQUEST=GetMap&FORMAT=image/jpeg&TRANSPARENT=FALSE&STYLES=&VERSION=1.3.0&LAYERS=SCW-Toporama&WIDTH={w}&HEIGHT={h}&CRS=EPSG:3978&BBOX={xmin},{ymin},{xmax},{ymax}&m4h=t"></map-link>
    </map-extent>
    <map-extent units="OSMTILE" checked hidden>
      <map-input name="z" type="zoom" value="18" min="2" max="18"></map-input>
      <map-input name="w" type="width"></map-input>
      <map-input name="h" type="height"></map-input>
      <map-input name="xmin" type="location" units="pcrs" position="top-left" axis="easting" min="-1.88830035E7" max="-1917652.2"></map-input>
      <map-input name="ymin" type="location" units="pcrs" position="bottom-left" axis="northing" min="2700367.3" max="2.04484338E7"></map-input>
      <map-input name="xmax" type="location" units="pcrs" position="top-right" axis="easting" min="-1.88830035E7" max="-1917652.2"></map-input>
      <map-input name="ymax" type="location" units="pcrs" position="top-left" axis="northing" min="2700367.3" max="2.04484338E7"></map-input>
      <map-link rel="image" tref="https://maps.geogratis.gc.ca/wms/toporama_fr?SERVICE=WMS&REQUEST=GetMap&FORMAT=image/jpeg&TRANSPARENT=FALSE&STYLES=&VERSION=1.3.0&LAYERS=SCW-Toporama&WIDTH={w}&HEIGHT={h}&CRS=EPSG:3857&BBOX={xmin},{ymin},{xmax},{ymax}&m4h=t"></map-link>
    </map-extent>
  </map-layer>
</gcds-map>
<gcds-button size="small" style="position: absolute; bottom: 1rem; left: 50%; transform: translateX(-50%); z-index: 1000;" onclick="const m=this.parentElement.querySelector('gcds-map');const n=m.getAttribute('projection')==='CBMTILE'?'OSMTILE':'CBMTILE';m.setAttribute('projection',n);this.textContent=n==='CBMTILE'?'Projection Mercator':'Projection Lambert';">Projection Mercator</gcds-button>
</div>

```html
<gcds-map projection="CBMTILE" zoom="3" lat="57" lon="-95" controls style="height: 400px;">
  <map-layer label="Toporama" checked>
    <map-link rel="license"
      href="https://ouvert.canada.ca/fr/licence-du-gouvernement-ouvert-canada"
      title="Licence du gouvernement ouvert - Canada"></map-link>
  <map-layer label="Toporama" checked>
    <map-link rel="license"
      href="https://ouvert.canada.ca/fr/licence-du-gouvernement-ouvert-canada"
      title="Licence du gouvernement ouvert - Canada"></map-link>
    <map-extent units="CBMTILE" checked hidden>
      <map-input name="z" type="zoom" value="19" min="0" max="19"></map-input>
      <map-input name="w" type="width"></map-input>
      <map-input name="h" type="height"></map-input>
      <map-input name="xmin" type="location" units="pcrs" position="top-left" axis="easting" min="-2465257.3" max="3078646.8"></map-input>
      <map-input name="ymin" type="location" units="pcrs" position="bottom-left" axis="northing" min="-883189.1" max="3952792.7"></map-input>
      <map-input name="xmax" type="location" units="pcrs" position="top-right" axis="easting" min="-2465257.3" max="3078646.8"></map-input>
      <map-input name="ymax" type="location" units="pcrs" position="top-left" axis="northing" min="-883189.1" max="3952792.7"></map-input>
      <map-link rel="image" tref="https://maps.geogratis.gc.ca/wms/toporama_fr?SERVICE=WMS&REQUEST=GetMap&FORMAT=image/jpeg&TRANSPARENT=FALSE&STYLES=&VERSION=1.3.0&LAYERS=SCW-Toporama&WIDTH={w}&HEIGHT={h}&CRS=EPSG:3978&BBOX={xmin},{ymin},{xmax},{ymax}&m4h=t"></map-link>
    </map-extent>
    <map-extent units="OSMTILE" checked hidden>
      <map-input name="z" type="zoom" value="18" min="2" max="18"></map-input>
      <map-input name="w" type="width"></map-input>
      <map-input name="h" type="height"></map-input>
      <map-input name="xmin" type="location" units="pcrs" position="top-left" axis="easting" min="-1.88830035E7" max="-1917652.2"></map-input>
      <map-input name="ymin" type="location" units="pcrs" position="bottom-left" axis="northing" min="2700367.3" max="2.04484338E7"></map-input>
      <map-input name="xmax" type="location" units="pcrs" position="top-right" axis="easting" min="-1.88830035E7" max="-1917652.2"></map-input>
      <map-input name="ymax" type="location" units="pcrs" position="top-left" axis="northing" min="2700367.3" max="2.04484338E7"></map-input>
      <map-link rel="image" tref="https://maps.geogratis.gc.ca/wms/toporama_fr?SERVICE=WMS&REQUEST=GetMap&FORMAT=image/jpeg&TRANSPARENT=FALSE&STYLES=&VERSION=1.3.0&LAYERS=SCW-Toporama&WIDTH={w}&HEIGHT={h}&CRS=EPSG:3857&BBOX={xmin},{ymin},{xmax},{ymax}&m4h=t"></map-link>
    </map-extent>
  </map-layer>
</gcds-map>
```

</details>

<details open>
<summary style="margin-block-end: var(--gcds-heading-spacing-200);">Négociation de projection - contenu distant</summary>

Dans cet exemple, la carte inclut une seule couche qui pointe vers une ressource MapML dans la
même projection que la carte initiale. Ce document MapML inclut un élément `<map-link>` qui
pointe vers sa ressource de projection complémentaire. Lorsque l'utilisateur bascule la
`projection` de la carte entre `CBMTILE` et `OSMTILE`, la carte sélectionne et affiche le
document MapML complémentaire compatible.

<div style="position: relative;">
<gcds-map projection="CBMTILE" zoom="3" lat="57" lon="-95" controls style="height: 400px;">
  <map-layer label="Toporama" checked src="../assets/cbmtile/toporama.mapml"></map-layer>
</gcds-map>
<gcds-button size="small" style="position: absolute; bottom: 1rem; left: 50%; transform: translateX(-50%); z-index: 1000;" onclick="const m=this.parentElement.querySelector('gcds-map');const n=m.getAttribute('projection')==='CBMTILE'?'OSMTILE':'CBMTILE';m.setAttribute('projection',n);this.textContent=n==='CBMTILE'?'Projection Mercator':'Projection Lambert';">Projection Mercator</gcds-button>
</div>

```html
<gcds-map projection="CBMTILE" zoom="3" lat="57" lon="-95" controls style="height: 400px;">
   <map-layer label="Toporama" checked src="../assets/cbmtile/toporama.mapml"></map-layer>
</gcds-map>
```

</details>


#### Légendes

Une légende peut fournir une description de la signification des symboles utilisés par une
couche. La valeur du premier attribut `<map-link rel="legend" href>` est fournie comme lien à
partir du nom de la couche dans le contrôle des couches. Sachez que si la légende est fournie
sous forme d'image, l'image peut être en partie ou totalement inaccessible aux utilisateurs
ayant un handicap visuel. Une approche plus accessible pourrait être de fournir une page HTML
avec des descriptions textuelles des symboles associés, mais même cela pourrait ne pas rendre
une couche de carte complètement accessible.

<gcds-map projection="CBMTILE" zoom="2" lat="63.0" lon="-98.8" controls style="height: 400px;">
  <map-layer hidden label="Carte de base" checked src="../assets/cbmtile/toporama.mapml"></map-layer>
  <map-layer label="Indice d'accumulation 2026-06-26" checked>
    <map-meta name="extent"
      content="top-left-easting=-2378164.081065, top-left-northing=3854382.228876003, bottom-right-easting=3039835.918935, bottom-right-northing=-707617.7711239969"></map-meta>
    <map-link rel="legend"
      href="../assets/legend.html"
      title="Indice d'accumulation"></map-link>
    <map-extent units="CBMTILE" checked="">
      <map-input name="xmin" type="location" position="top-left" axis="easting" units="pcrs"></map-input>
      <map-input name="ymin" type="location" position="bottom-left" axis="northing" units="pcrs"></map-input>
      <map-input name="xmax" type="location" position="bottom-right" axis="easting" units="pcrs"></map-input>
      <map-input name="ymax" type="location" position="top-right" axis="northing" units="pcrs"></map-input>
      <map-input name="w" type="width" min="1" max="10000"></map-input>
      <map-input name="h" type="height" min="1" max="10000"></map-input>
      <map-input name="i" type="location" axis="i" units="map"></map-input>
      <map-input name="j" type="location" axis="j" units="map"></map-input>
      <map-link rel="image"
        tref="https://cwfis.cfs.nrcan.gc.ca/geoserver/public/wms?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&LAYERS=bui&WIDTH={w}&HEIGHT={h}&FORMAT=image%2Fpng&TRANSPARENT=TRUE&STYLES=cffdrs_bui_cbf&TIME=2026-06-26T00:00:00.000Z&CRS=EPSG:3978&BBOX={xmin},{ymin},{xmax},{ymax}"></map-link>
      <map-link rel="query"
        tref="https://cwfis.cfs.nrcan.gc.ca/geoserver/public/wms?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetFeatureInfo&LAYERS=bui&QUERY_LAYERS=bui&WIDTH={w}&HEIGHT={h}&FORMAT=image%2Fpng&TRANSPARENT=TRUE&INFO_FORMAT=application%2Fjson&STYLES=cffdrs_bui_cbf&TIME=2026-06-26T00:00:00.000Z&CRS=EPSG:3978&BBOX={xmin},{ymin},{xmax},{ymax}&I={i}&J={j}"></map-link>
    </map-extent>
  </map-layer>
</gcds-map>

```html
<gcds-map projection="CBMTILE" zoom="3" lat="57" lon="-95" controls style="height: 400px;">
  <map-layer hidden label="Carte de base" checked src="../assets/cbmtile/toporama.mapml"></map-layer>
  <map-layer label="Indice d'accumulation 2026-06-26" checked>
    <map-meta name="extent"
      content="top-left-easting=-2378164.081065, top-left-northing=3854382.228876003, bottom-right-easting=3039835.918935, bottom-right-northing=-707617.7711239969"></map-meta>
    <map-link rel="legend"
      href="../assets/legend.html"
      title="Indice d'accumulation"></map-link>
    <map-extent units="CBMTILE" checked="">
      <map-input name="xmin" type="location" position="top-left" axis="easting" units="pcrs"></map-input>
      <map-input name="ymin" type="location" position="bottom-left" axis="northing" units="pcrs"></map-input>
      <map-input name="xmax" type="location" position="bottom-right" axis="easting" units="pcrs"></map-input>
      <map-input name="ymax" type="location" position="top-right" axis="northing" units="pcrs"></map-input>
      <map-input name="w" type="width" min="1" max="10000"></map-input>
      <map-input name="h" type="height" min="1" max="10000"></map-input>
      <map-input name="i" type="location" axis="i" units="map"></map-input>
      <map-input name="j" type="location" axis="j" units="map"></map-input>
      <map-link rel="image"
        tref="https://cwfis.cfs.nrcan.gc.ca/geoserver/public/wms?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&LAYERS=bui&WIDTH={w}&HEIGHT={h}&FORMAT=image%2Fpng&TRANSPARENT=TRUE&STYLES=cffdrs_bui_cbf&TIME=2026-06-26T00:00:00.000Z&CRS=EPSG:3978&BBOX={xmin},{ymin},{xmax},{ymax}"></map-link>
      <map-link rel="query"
        tref="https://cwfis.cfs.nrcan.gc.ca/geoserver/public/wms?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetFeatureInfo&LAYERS=bui&QUERY_LAYERS=bui&WIDTH={w}&HEIGHT={h}&FORMAT=image%2Fpng&TRANSPARENT=TRUE&INFO_FORMAT=application%2Fjson&STYLES=cffdrs_bui_cbf&TIME=2026-06-26T00:00:00.000Z&CRS=EPSG:3978&BBOX={xmin},{ymin},{xmax},{ymax}&I={i}&J={j}"></map-link>
    </map-extent>
  </map-layer>
</gcds-map>
```

#### Types de contenu de carte

##### Contenu image

Une couche peut contenir des éléments `<map-extent>` qui définissent des requêtes
gabaritées pour des images (ou des entités, ou des tuiles) couvrant toute la zone
d'affichage de la carte, récupérées dynamiquement à mesure que l'utilisateur déplace
et zoome la carte.

<gcds-map lat="53.087426" lon="-91.27533" zoom="4" projection="OSMTILE" controls style="height: 400px;">
  <map-layer label="CBMT (étendue intégrée)" checked>
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
  <map-layer label="CBMT (étendue intégrée)" checked>
    <map-meta name="projection" content="OSMTILE"></map-meta>
    <!-- les limites d'une requête d'image ou de tuile sont décrites par l'élément map-extent semblable à un formulaire -->
    <map-extent units="OSMTILE" checked hidden>
      <map-input name="z" type="zoom" min="0" max="22"></map-input>
      <map-input name="xmin" type="location" units="pcrs" position="top-left" axis="easting"></map-input>
      <map-input name="ymin" type="location" units="pcrs" position="bottom-left" axis="northing"></map-input>
      <map-input name="xmax" type="location" units="pcrs" position="top-right" axis="easting"></map-input>
      <map-input name="ymax" type="location" units="pcrs" position="top-left" axis="northing"></map-input>
      <map-input name="w" type="width"></map-input>
      <map-input name="h" type="height"></map-input>
      <map-link rel="image" tref="https://example.com/wms?BBOX={xmin},{ymin},{xmax},{ymax}&amp;WIDTH={w}&amp;HEIGHT={h}"></map-link>
    </map-extent>
  </map-layer>
</gcds-map>
```

##### Contenu entité

L'information géographique est modélisée sous forme de points, lignes ou polygones, et le
modèle géométrique standard partagé par la plupart des domaines thématiques est appelé le
modèle « Simple Features » (SF), de l'Open Geospatial Consortium (OGC). Le modèle SF combine
des propriétés textuelles nommées d'une entité avec une propriété de forme normalisée appelée
« geometry ». De nombreux formats appliquent le modèle SF dans leur propre syntaxe, comme
GeoJSON, KML, Shapefiles et bien d'autres.

MapML applique le modèle SF dans l'élément `<map-feature>`, qui peut être utilisé dans du
contenu distant et intégré.

<gcds-map projection="OSMTILE" zoom="11" lat="45.4187" lon="-75.692" controls style="height: 400px;">
  <map-layer checked hidden>
    <map-link rel="license" href="https://www.openstreetmap.org/copyright/fr" title="&#xa9; les contributeurs d'OpenStreetMap CC BY-SA 2.0"></map-link>
    <map-extent units="OSMTILE" checked>
      <map-input name="z" type="zoom" min="0" max="18"></map-input>
      <map-input name="x" type="location" units="tilematrix" axis="column"></map-input>
      <map-input name="y" type="location" units="tilematrix" axis="row"></map-input>
      <map-link rel="tile" tref="https://tile.openstreetmap.org/{z}/{x}/{y}.png"></map-link>
    </map-extent>
  </map-layer>
  <map-layer label="Entités" checked>
    <map-meta name="projection" content="OSMTILE"></map-meta>
    <map-style>
      .polygon {
        fill: #80C2AF;
        stroke: #1167b1;
      }
      .line {
        stroke: #dc143c;
      }
      .point {
        fill: #D8A47F;
        stroke: #EF8354;
      }
    </map-style>
    <map-feature>
      <map-featurecaption>Polygone</map-featurecaption>
      <map-geometry cs="gcrs">
        <map-polygon class="polygon">
          <map-coordinates>-75.5859375 45.4656690 -75.6813812 45.4533876 -75.6961441 45.4239978 -75.7249832 45.4083331 -75.7792282 45.3772317 -75.7534790 45.3294614 -75.5831909 45.3815724 -75.6024170 45.4273712 -75.5673981 45.4639834 -75.5859375 45.4656690</map-coordinates>
        </map-polygon>
      </map-geometry>
      <map-properties><h2>Ceci est un polygone</h2></map-properties>
    </map-feature>
    <map-feature>
      <map-featurecaption>Ligne</map-featurecaption>
      <map-geometry cs="gcrs">
        <map-linestring class="line">
          <map-coordinates>-75.6168365 45.471929 -75.6855011 45.458445 -75.7016373 45.4391764 -75.7030106 45.4259255 -75.7236099 45.4208652 -75.7565689 45.4117074 -75.7833481 45.384225 -75.8197403 45.3714435 -75.8516693 45.377714</map-coordinates>
        </map-linestring>
      </map-geometry>
      <map-properties><h2>Ceci est une ligne</h2></map-properties>
    </map-feature>
    <map-feature>
      <map-featurecaption>Point</map-featurecaption>
      <map-geometry cs="gcrs">
        <map-point class="point">
          <map-coordinates>-75.6916809 45.4186964</map-coordinates>
        </map-point>
      </map-geometry>
      <map-properties><h2>Ceci est un point</h2></map-properties>
    </map-feature>
  </map-layer>
</gcds-map>

```html
<gcds-map projection="OSMTILE" zoom="11" lat="45.4187" lon="-75.692" controls>
  <map-layer label="Entités" checked>
    <map-meta name="projection" content="OSMTILE"></map-meta>
    <map-feature>
      <map-featurecaption>Polygone</map-featurecaption>
      <map-geometry cs="gcrs">
        <map-polygon class="polygon">
          <map-coordinates>-75.5859375 45.4656690 -75.6813812 45.4533876 -75.6961441 45.4239978 -75.7249832 45.4083331 -75.7792282 45.3772317 -75.7534790 45.3294614 -75.5831909 45.3815724 -75.6024170 45.4273712 -75.5673981 45.4639834 -75.5859375 45.4656690</map-coordinates>
        </map-polygon>
      </map-geometry>
      <map-properties><h2>Ceci est un polygone</h2></map-properties>
    </map-feature>
    <map-feature>
      <map-featurecaption>Ligne</map-featurecaption>
      <map-geometry cs="gcrs">
        <map-linestring class="line">
          <map-coordinates>-75.6168365 45.471929 -75.6855011 45.458445 -75.7016373 45.4391764 -75.7030106 45.4259255 -75.7236099 45.4208652 -75.7565689 45.4117074 -75.7833481 45.384225 -75.8197403 45.3714435 -75.8516693 45.377714</map-coordinates>
        </map-linestring>
      </map-geometry>
      <map-properties><h2>Ceci est une ligne</h2></map-properties>
    </map-feature>
    <map-feature>
      <map-featurecaption>Point</map-featurecaption>
      <map-geometry cs="gcrs">
        <map-point class="point">
          <map-coordinates>-75.6916809 45.4186964</map-coordinates>
        </map-point>
      </map-geometry>
      <map-properties><h2>Ceci est un point</h2></map-properties>
    </map-feature>
  </map-layer>
</gcds-map>
```

##### Contenu tuilé

##### GeoJSON

##### Tuiles vectorielles

### Accessibilité

#### Fournir un nom accessible aux couches non masquées

#### Masquer le contenu de carte non pertinent à l'aide de requêtes de média de carte

#### Assurer un contraste suffisant pour le contenu visuel

##### Styles alternatifs de couche

{% include "partials/map-live-code.njk" %}

