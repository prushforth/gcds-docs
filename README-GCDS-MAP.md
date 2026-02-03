# gcds-map changes to gcds-docs

## PATH_PREFIX

Changes were required to allow this project to be built for serving from a non-root folder
i.e. not at https://example.org/, but at e.g. https://example.org/foo. This required changes to the
following files (compared to main, 2026-02-03):

$ git diff main --name-status (manually excluding additions for gcds-map documentation)
M       .eleventy.js
A       scripts/fix-image-paths.js
A       src/_data/eleventyComputed.js
M       src/_includes/layouts/base.njk
M       src/_includes/layouts/component-documentation.njk
M       src/_includes/layouts/component-preview.njk
M       src/_includes/layouts/installation.njk
M       src/_includes/partials/card-list.njk
M       src/_includes/partials/header.njk
M       src/_includes/partials/needhelp.njk
M       src/_includes/partials/responsive-layout.njk
M       src/_includes/partials/shortcuts-template.njk
M       src/_includes/partials/state.njk
M       src/_includes/partials/template-list.njk
M       src/en/css-shortcuts/gap.md
M       src/en/css-shortcuts/margin.md
M       src/en/css-shortcuts/padding.md
M       src/en/unsubscribe/error.md
M       src/en/unsubscribe/success.md
M       src/fr/raccourcis-css/marge-interieure.md
M       src/fr/raccourcis-css/marge.md
M       src/fr/se-desabonner/erreur.md
M       src/fr/se-desabonner/succes.md
R097    src/scripts/search.js   src/scripts/search.js.njk

By default, the command `npm run build` builds the _site folder for serving from the root folder. 
To obtain a build that will not feature broken content when served from /foo, build the project 
with `PATH_PREFIX=/foo npm run build`

## Changes for gcds-map

Apart from the changes above, this project is meant eventually to contain gcds-docs -style
documentation for the gcds-map AND related components i.e. `<map-layer>`, `<map-extent>` etc.

It is currently not determined how to add such "subcomponents" in the component tree.  Maybe it's
not possible and will have to be done and hosted as a separate project i.e. with the gcds-map
component source code tbd.

Currently (2026-02-03), the changes in support of the gcds-map documentation are:

git diff main --name-status
A       src/en/components/map/base.md
A       src/en/components/map/code.md
A       src/en/components/map/design.md
A       src/en/components/map/use-case.md
M       src/en/en.json
A       src/fr/composants/map/base.md
A       src/fr/composants/map/cas-dutilisation.md
A       src/fr/composants/map/code.md
A       src/fr/composants/map/design.md
M       src/fr/fr.json
A       src/images/common/components/map-icons/weather-icons-clear-night.png
A       src/images/common/components/map-icons/weather-icons-cloudy-night.png
A       src/images/common/components/map-icons/weather-icons-cloudy-rainy.png
A       src/images/common/components/map-icons/weather-icons-cloudy-snow.png
A       src/images/common/components/map-icons/weather-icons-cloudy.png
A       src/images/common/components/map-icons/weather-icons-sunny-cloud.png
A       src/images/common/components/map-icons/weather-icons-sunny.png
A       src/images/common/components/map-icons/weather-icons-white-clouds.png
A       src/images/common/components/map-icons/weather-icons.png
A       src/images/common/components/preview-map.svg

To Do (2026-02-03)

- create subcomponent structure
- lighten preview-map.svg image by generalizing vectors and replacing b64 icons with svg sprites
- create map anatomy diagram for use on design.md for map component
- use gcds components on gcds-map pages


