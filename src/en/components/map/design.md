---
title: Map
layout: 'layouts/component-documentation.njk'
loadGcdsMap: true
translationKey: 'mapDesign'
tags: ['mapEN', 'design']
# date: "git Last Modified"
---

## Map anatomy

<ol class="anatomy-list">
  <li>The <strong>Layer control</strong> is an expandable list of layers. Each entry provides detailed controls for manipulating layer characteristics. 
  <li><strong>The Zoom control</strong> is a pair of keyboard-accessible buttons allowing users to zoom in or out.
  <li>The <strong>Reload</strong> button allows users to reset the map to its original location. It does not change the layer states.
  <li>The <strong>Fullscreen</strong> button is allows the map to be viewed fullscreen. When in fullscreen mode, the button action returns the map to non-fullscreen state.
  <li>The <strong>Scale bar</strong> control provides an active readout of the rough idea of the scale of the map.  
  <li>The <strong>Geolocation</strong> control is a 3-state control. It is either off, tracking the device location, or showing the last known device location.
  <li>The <strong>Attribution</strong> control is required, and shows the license link for map layer content.
  <li>The <strong>map viewport</strong> is where map layer content is rendered.
</ol>

<img src="/images/en/components/anatomy/gcds-map-anatomy.svg" alt="An image of the anatomy." />

## Design and accessibility for map

The map component supports keyboard use. Map controls follow a predefined visual and tab order. You can add or remove most controls, except the required attribution (licensing) control.

When choosing map layers (especially image-based WMS/WMTS layers), select high-contrast styling and avoid relying on colour alone to communicate meaning. Provide alternate selectable styles, if possible.

For non-visual access, provide a short text description of the map’s purpose. For topical maps, add a `<map-caption>…</map-caption>` as the first child of the map component.

When the map includes features, they are grouped as a single tab stop. Use the arrow keys to move between features. Features are ordered by ascending distance from the map centre.

