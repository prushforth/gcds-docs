---
layout: 'layouts/base.njk'
github: https://github.com/NRCan/gcds-map/tree/main/src/components/gcds-map
loadGcdsMap: true
figma: insert figma url
permalink: false
tags: ['mapEN', 'header']
---
<style>
gcds-map {
  width: 100%;
  height: 350px;
}
</style>
# Map <br>`<gcds-map>`

{% docLinks locale stage figma github %}
{% enddocLinks %}

A map is an interactive tool to display and query layered location information at varying scales

{% componentPreview "`<gcds-map>` component preview" %}
<gcds-map lat="45.4215" lon="-75.6972" zoom="10" projection="CBMTILE" controls controlslist="geolocation">
  <map-caption>A topographic map of Ottawa, Canada, showing the city and the region at about 1cm to 5km initial scale</map-caption>
  <map-layer label="Test Layer"  src="{{ '/components/gcds-map/dist/gcds-map/assets/mapml/en/cbmtile/cbmt' | url }}"  checked></map-layer>
</gcds-map>
{% endcomponentPreview %}
