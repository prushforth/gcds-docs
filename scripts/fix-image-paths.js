#!/usr/bin/env node

/**
 * Post-build script to fix image paths with PATH_PREFIX
 * Run this after the Eleventy build completes
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

const pathPrefix = process.env.PATH_PREFIX || '/';
const siteDir = './_site';

if (pathPrefix === '/') {
  console.log('No PATH_PREFIX set, skipping image path fixes');
  process.exit(0);
}

console.log(`Fixing image paths with prefix: ${pathPrefix}`);

// Find all HTML files
const htmlFiles = glob.sync(`${siteDir}/**/*.html`);

let totalReplacements = 0;

htmlFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let modified = false;

  // Fix image src paths
  const imgRegex = /src="\/images\//g;
  if (imgRegex.test(content)) {
    content = content.replace(/src="\/images\//g, `src="${pathPrefix}/images/`);
    modified = true;
  }

  // Fix any remaining /images/ references in content
  const contentRegex = /href="\/images\//g;
  if (contentRegex.test(content)) {
    content = content.replace(/href="\/images\//g, `href="${pathPrefix}/images/`);
    modified = true;
  }

  if (modified) {
    fs.writeFileSync(file, content, 'utf8');
    totalReplacements++;
  }
});

console.log(`Fixed image paths in ${totalReplacements} files`);
