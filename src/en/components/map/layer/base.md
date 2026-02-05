---
layout: 'layouts/base.njk'
github: https://github.com/NRCan/gcds-map/tree/main/src/components/map-layer
loadGcdsMap: true
permalink: false
tags: ['maplayerEN', 'header']
---
<!-- NOTE: layer.json required to make the loadGcdsMap front matter variable accessible to the layout template.  -->
<style>
gcds-map {
  width: 100%;
  height: 350px;
}
</style>
# Layer <br>`<map-layer>`

{% docLinks locale, stage, figma, github %}
{% enddocLinks %}

Web map data or content is inherently layered. Add it to the `<gcds-map>` component using one or more child `<map-layer>` elements.  Each layer is rendered on top of the previous one.  Often a map is composed of a single opaque "base map" layer and one or more thematic layers on top.

{% componentPreview "`<map-layer>` component preview" %}
<gcds-map lat="62.1326" lon="-91.0" zoom="2" projection="CBMTILE" controls controlslist="geolocation">
  <map-caption>A map that demonstrates how layers are used by the gcds-map compponent</map-caption>
  <map-layer label="Test Layer"  src="{{ '/components/gcds-map/dist/gcds-map/assets/mapml/en/cbmtile/cbmtsimple' | url }}"  checked></map-layer>
  <map-layer label="Test Layer"  src="{{ '/components/gcds-map/dist/gcds-map/assets/mapml/en/cbmtile/current_conditions' | url }}"  checked></map-layer>
</gcds-map>
{% endcomponentPreview %}
