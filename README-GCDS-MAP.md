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

- use gcds components on gcds-map pages

## Deployment

### Automatic deployment 

This branch (gcds-map) of this fork (prushforth/gcds-docs) can be automatically deployed to
https://nrcan.github.io/gcds-map via the `npm run deploy` script in the main branch of the 
sibling clone of https://github.com/nrcan/gcds-map.git repo. See that project's readme for
more info.

### Building with a path prefix

By default, `npm run build` produces a `_site/` folder for serving from `/`. To build for
a subdirectory (e.g. GitHub Pages at `https://<org>.github.io/gcds-map/`):

```bash
PATH_PREFIX=/gcds-map npm run build
```

This prefixes all internal URLs, asset paths, and image references with `/gcds-map`.

### Manual deployment to GitHub Pages (of the https://github.com/nrcan/gcds-map.git repo)

After building with the prefix, copy the `_site/` contents to the `gh-pages` branch of the
target repository:

```bash
# 1. Build with prefix
PATH_PREFIX=/gcds-map npm run build

# 2. In the target repo (e.g. gcds-map), switch to gh-pages branch
cd /path/to/gcds-map
git checkout gh-pages

# 3. Remove old content (preserve .git, .nojekyll, CNAME)
find . -maxdepth 1 ! -name '.git' ! -name '.nojekyll' ! -name 'CNAME' ! -name '.' -exec rm -rf {} +

# 4. Copy built site
cd /path/to/gcds-map/docs (now on the gh-pages branch)
cp -r /path/to/gcds-docs/_site/* .

# 5. Commit (amend) and force push to keep gh-pages branch small
git add -A && git commit --amend -m "Update docs" && git push --force
```




