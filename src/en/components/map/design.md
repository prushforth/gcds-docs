---
title: Map
layout: 'layouts/component-documentation.njk'
loadGcdsMap: true
translationKey: 'mapDesign'
tags: ['mapEN', 'design']
# date: "git Last Modified"
---

## Map anatomy

<img src="/images/en/components/anatomy/gcds-map-anatomy.svg" alt="An image of the anatomy." />

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


## Design and accessibility for map
