---
layout: layouts/page.html
title: Using Eleventy in a Box
permalink: /docs/

---

<p class="alt-lede">Eleventy in a Box is a reusable Eleventy starter for blogs, brochure websites, and small editorial projects. Optional add-on feature packs are available so you can add extra functionality when needed.</p>

<h2>What&#8217;s included</h2>

<ul>
<li>Eleventy v3</li>
<li>Netlify CMS admin at <code>/admin/</code></li>
<li>Neutral starter content and placeholder assets</li>
<li>Feature-pack system for optional modules</li>
</ul>

<hr>

<h2>Installation</h2>

<pre><code>npm install</code></pre>

<hr>

<h2>Developing</h2>

<pre><code>npm run start</code></pre>

<p>The development server runs at <a href="http://localhost:8080">http://localhost:8080</a>.</p>

<hr>

<h2>Building</h2>

<pre><code>npm run build</code></pre>

<p>Static files are written to <code>/dist</code>. The build clears <code>/dist</code> first, so stale output is removed automatically.</p>

<hr>

<h2>Optional feature packs</h2>

<p>The base boilerplate is intentionally minimal. Optional sections (for example, blog, FAQs, portfolio, and team) can be added via feature packs. Reusable interface patterns, including alternate navigation treatments, can also be installed as packs.</p>

<ul>
<li>Feature flags are in <code>features.json</code></li>
<li>Pack code lives in <code>feature-packs/[name]</code></li>
<li>Drop-in content/layout starter files live in <code>feature-packs/[name]/files/</code></li>
<li>Feature styles can live in <code>feature-packs/[name]/files/src/css/[name].css</code> and are loaded only when enabled</li>
</ul>

<h3>Adding the team pack</h3>

<pre><code>npm run add:team</code></pre>

<p>This command:</p>

<ol>
<li>Enables <code>"team": true</code> in <code>features.json</code></li>
<li>Copies team layouts/content into <code>src/</code></li>
<li>Adds <code>/team/</code> to both main and footer navigation</li>
<li>Merges the Team page and collection into <code>src/admin/config.yml</code></li>
</ol>

<h3>Adding the navigation menus pack</h3>

<pre><code>npm run add:navigation-menus</code></pre>

<p>This command:</p>

<ol>
<li>Enables <code>"navigationMenus": true</code> in <code>features.json</code></li>
<li>Copies a reusable navigation menu partial, stylesheet, and data file into <code>src/</code></li>
<li>Keeps the existing navigation items and swaps the header to a menu button pattern</li>
<li>Lets you choose between <code>"overlay-small"</code>, <code>"overlay-large"</code>, and <code>"slide"</code> in <code>src/_data/navigation_menu.json</code></li>
</ol>

<h3>Adding the blog pack</h3>

<pre><code>npm run add:blog</code></pre>

<p>This command:</p>

<ol>
<li>Enables <code>"blog": true</code> in <code>features.json</code></li>
<li>Copies blog layouts/content into <code>src/</code></li>
<li>Adds <code>/blog/</code> to <code>src/_data/navigation.json</code> if missing</li>
<li>Merges the Blog page and posts collection into <code>src/admin/config.yml</code></li>
</ol>

<h3>Adding the case studies pack</h3>

<pre><code>npm run add:case-studies</code></pre>

<p>This command:</p>

<ol>
<li>Enables <code>"caseStudies": true</code> in <code>features.json</code></li>
<li>Copies case study layouts, content, and sample entries into <code>src/</code></li>
<li>Adds <code>/case-studies/</code> to both main and footer navigation</li>
<li>Merges the case studies page and collection into <code>src/admin/config.yml</code></li>
</ol>

<h3>Adding the FAQs pack</h3>

<pre><code>npm run add:faqs</code></pre>

<p>This command:</p>

<ol>
<li>Enables <code>"faqs": true</code> in <code>features.json</code></li>
<li>Copies FAQ layouts, content, and sample entries into <code>src/</code></li>
<li>Adds <code>/faqs/</code> to both main and footer navigation</li>
<li>Merges the FAQ page and collection into <code>src/admin/config.yml</code></li>
</ol>

<h3>Adding the changelog pack</h3>

<pre><code>npm run add:changelog</code></pre>

<p>This command:</p>

<ol>
<li>Enables <code>"changelog": true</code> in <code>features.json</code></li>
<li>Copies changelog layouts, content, and sample release entries into <code>src/</code></li>
<li>Adds <code>/changelog/</code> to both main and footer navigation</li>
<li>Merges the changelog page and collection into <code>src/admin/config.yml</code></li>
</ol>

<h3>Adding the portfolio pack</h3>

<pre><code>npm run add:portfolio</code></pre>

<p>This command:</p>

<ol>
<li>Enables <code>"portfolio": true</code> in <code>features.json</code></li>
<li>Copies portfolio layouts, content, and sample entries into <code>src/</code></li>
<li>Adds <code>/portfolio/</code> to both main and footer navigation</li>
<li>Merges the portfolio page and collection into <code>src/admin/config.yml</code></li>
</ol>

<h3>Adding the testimonials pack</h3>

<pre><code>npm run add:testimonials</code></pre>

<p>This command:</p>

<ol>
<li>Enables <code>"testimonials": true</code> in <code>features.json</code></li>
<li>Copies testimonial layouts, content, and sample entries into <code>src/</code></li>
<li>Adds <code>/testimonials/</code> to footer navigation</li>
<li>Merges the testimonials page and collection into <code>src/admin/config.yml</code></li>
</ol>

<p>You can preview changes without writing files:</p>

<pre><code>node scripts/add-feature.js team --dry-run
node scripts/add-feature.js blog --dry-run
node scripts/add-feature.js case-studies --dry-run
node scripts/add-feature.js changelog --dry-run
node scripts/add-feature.js faqs --dry-run
node scripts/add-feature.js navigation-menus --dry-run
node scripts/add-feature.js portfolio --dry-run
node scripts/add-feature.js testimonials --dry-run</code></pre>

<p>You can remove a pack the same way:</p>

<pre><code>npm run remove:blog
npm run remove:case-studies
npm run remove:changelog
npm run remove:faqs
npm run remove:navigation-menus
npm run remove:portfolio
npm run remove:testimonials
npm run remove:team</code></pre>

<p>The removal script:</p>

<ol>
<li>Disables the pack feature flag in <code>features.json</code></li>
<li>Removes installed pack files from <code>src/</code></li>
<li>Removes manifest-driven navigation items</li>
<li>Removes CMS entries defined by the pack</li>
</ol>

<p>By default, modified installed files are left in place. Use <code>--force</code> only when you want to remove those as well.</p>

<hr>

<h2>Auditing</h2>

<pre><code>npm run check:boilerplate
npm run check:css</code></pre>

<p>This checks the feature-pack wiring for:</p>

<ol>
<li>Required pack files</li>
<li>Matching add/remove package scripts</li>
<li>Feature flags</li>
<li>Navigation entries</li>
<li>CMS fragments</li>
<li>Disabled packs that are still installed in <code>src/</code></li>
</ol>

<p>The CSS audit checks for:</p>

<ol>
<li><code>transform</code> shorthand usage</li>
<li>Undefined <code>data-layout</code> names in templates</li>
<li>Pack CSS files that are not wired through <code>head.html</code></li>
<li>CSS links in <code>head.html</code> that do not point to a real pack stylesheet</li>
</ol>

<hr>

<h2>Content model</h2>

<ul>
<li><code>src/index.md</code>: homepage</li>
<li><code>src/about.md</code>: about page</li>
<li><code>src/contact.md</code>: contact page</li>
<li><code>src/404.md</code>: 404 page</li>
<li><code>src/_data/site-content.json</code>: editable site content for the CMS</li>
<li><code>src/_data/site.js</code>: computed site data and environment-aware URL logic</li>
<li><code>src/_data/navigation.json</code>: main navigation</li>
<li><code>src/_data/footer_navigation.json</code>: footer navigation</li>
</ul>

<hr>

<h2>Layout system</h2>

<p>Layouts use city names in <code>data-layout</code> and can change grid rhythm with <code>data-grid</code>. The default rhythm is <code>4-5</code>.</p>

<pre><code>&lt;div class="layout" data-layout="berlin"&gt;</code></pre>

<p>Switch the same city recipe onto another compound grid:</p>

<pre><code>&lt;div class="layout" data-layout="berlin" data-grid="4-6"&gt;</code></pre>

<p>Available grid rhythms are <code>4-5</code>, <code>4-6</code>, and <code>3-4</code>. The <code>4-6</code> rhythm shares the same named lines as <code>4-5</code> where possible, while <code>3-4</code> has a compact override layer for city recipes that need fewer <code>b</code> lines.</p>

<hr>

<h2>Naming conventions</h2>

<h3>Images</h3>

<p>Use these names unless a pack has a specific reason not to:</p>

<ul>
<li><code>featureImage</code>: page-level hero or lead image</li>
<li><code>featureImageCaption</code>: optional caption for <code>featureImage</code></li>
<li><code>image</code>: main item image when the pack is not already using an established field name</li>
<li><code>thumbnail</code>: list or card image when the pack is not already using an established field name</li>
<li><code>avatar</code>: person image</li>
<li><code>logo</code>: brand or company mark</li>
<li><code>clientLogo</code>: client-specific logo inside case studies or similar work content</li>
</ul>

<p>Keep new aliases to a minimum. Reuse an existing name when the meaning is already clear.</p>

<h3>Data</h3>

<p>For index pages and content entries, prefer these fields where they fit:</p>

<ul>
<li><code>title</code></li>
<li><code>metaTitle</code></li>
<li><code>metaDesc</code></li>
<li><code>canonicalUrl</code></li>
<li><code>ogTitle</code></li>
<li><code>ogDescription</code></li>
<li><code>ogType</code></li>
<li><code>ogImage</code></li>
<li><code>ogImageAlt</code></li>
<li><code>lede</code></li>
<li><code>summary</code></li>
<li><code>order</code></li>
<li><code>featured</code></li>
<li><code>slug</code></li>
</ul>

<p>Editable site-wide content belongs in <code>src/_data/site-content.json</code>. Computed values such as <code>absoluteUrl</code> and <code>assetPath</code> belong in <code>src/_data/site.js</code>. Site-wide defaults for metadata, analytics, and font loading also live in <code>src/_data/site-content.json</code>.</p>

<hr>

<h2>Netlify CMS</h2>

<p>The CMS is configured for Git Gateway on the <code>main</code> branch. Before launching a real site:</p>

<ol>
<li>Edit <code>src/_data/site-content.json</code> or use the CMS Globals section for contact details, default metadata, social images, analytics IDs, and font loading.</li>
<li>Replace the starter copy with project content.</li>
<li>Enable Netlify Identity and Git Gateway in your Netlify project.</li>
</ol>

<hr>

<h2>Fonts</h2>

<p>Font loading is configurable in <code>src/_data/site-content.json</code> or the CMS Globals section.</p>

<ul>
<li><code>fonts.mode</code>: <code>none</code>, <code>google</code>, or <code>self-hosted</code></li>
<li><code>fonts.googleFontsUrl</code>: full Google Fonts stylesheet URL when using <code>google</code></li>
<li><code>fonts.preconnectGoogleFonts</code>: whether to add Google Fonts preconnect hints</li>
<li><code>fonts.stylesheet</code>: local stylesheet path such as <code>/css/fonts.css</code> when using <code>self-hosted</code></li>
</ul>
