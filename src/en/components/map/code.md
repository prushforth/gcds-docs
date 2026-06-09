---
title: Map
layout: 'layouts/component-documentation.njk'
loadGcdsMap: true
translationKey: 'mapCode'
tags: ['mapEN', 'code']
# date: "git Last Modified"
---

## Build a map

## Coding and accessibility for maps

{% include "partials/getcode.njk" %}

<iframe
  title="Overview of gcds-map properties and events."
  src="https://nrcan.github.io/gcds-map/storybook/iframe.html?id=components-map--events-properties&viewMode=docs&demo=true&singleStory=true&lang=en"
  width="1200"
  height="100"
  style="display: block; margin: 0 auto; border: 0; overflow: hidden;"
  scrolling="no"
  frameBorder="0"
  allow="clipboard-write"
></iframe>

<script>
  // ── Iframe auto-resize ──
  window.addEventListener('message', (ev) => {
    if (ev.data && ev.data.type === 'storybook-resize' && ev.data.src) {
      const reportedId = new URL(ev.data.src).searchParams.get('id');
      document.querySelectorAll('iframe').forEach((iframe) => {
        try {
          const iframeId = new URL(iframe.src).searchParams.get('id');
          if (reportedId && reportedId === iframeId) {
            iframe.style.height = ev.data.height + 'px';
          }
        } catch(e) {}
      });
    }
  });
</script>
