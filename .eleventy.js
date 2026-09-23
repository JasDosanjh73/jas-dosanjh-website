const markdownIt = require("markdown-it");
const fs = require("node:fs");
const path = require("node:path");

// Filters
const dateFilter = require("./src/filters/date-filter.js");
const md = markdownIt({ html: true });
const isProduction = process.env.ELEVENTY_ENV === "production";

function stripHtml(value) {
  return String(value || "")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function createExcerpt(value, maxLength = 280) {
  const text = stripHtml(value);

  if (!text || text.length <= maxLength) {
    return text;
  }

  const truncated = text.slice(0, maxLength);
  const lastSpace = truncated.lastIndexOf(" ");

  if (lastSpace <= Math.floor(maxLength * 0.6)) {
    return `${truncated.trim()}…`;
  }

  return `${truncated.slice(0, lastSpace).trim()}…`;
}

function escapeXml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function minifyHtmlOutput(content, outputPath) {
  if (!isProduction || !outputPath || !outputPath.endsWith(".html")) {
    return content;
  }

  return content
    .replace(/<!--(?!\[if[\s\S]*?endif\]-->)[\s\S]*?-->/g, "")
    .replace(/>\s+</g, "><")
    .replace(/\n{2,}/g, "\n")
    .trim();
}

module.exports = function(eleventyConfig) {
  const features = JSON.parse(fs.readFileSync(path.join(__dirname, "features.json"), "utf8"));

  // Feature flags change plugin registration, so reload configuration as well as data.
  eleventyConfig.addWatchTarget("./features.json", { resetConfig: true });

  eleventyConfig.addCollection("books", (collection) => {
    return collection.getFilteredByGlob("./src/books/*.md")
      .sort((left, right) => (left.data.order ?? Infinity) - (right.data.order ?? Infinity));
  });

  eleventyConfig.addCollection("reviews", (collection) => {
    return collection.getFilteredByGlob("./src/reviews/*.md");
  });

  // Filters
  eleventyConfig.addFilter("dateFilter", dateFilter);
  eleventyConfig.addFilter("json", (value) => JSON.stringify(value));
  eleventyConfig.addFilter("excerpt", (content, maxLength = 280) => {
    return createExcerpt(content, maxLength);
  });
  eleventyConfig.addFilter("markdown", (content) => {
    if (!content) {
      return "";
    }

    return md.render(content);
  });
  eleventyConfig.addFilter("xmlEscape", (content) => {
    return escapeXml(content);
  });

  eleventyConfig.addTransform("optimizeHtml", (content, outputPath) => {
    return minifyHtmlOutput(content, outputPath);
  });

  // Passthrough copy
  eleventyConfig.addPassthroughCopy("src/admin");
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/js");
  eleventyConfig.addPassthroughCopy({ "src/fonts": "fonts" });
  eleventyConfig.addPassthroughCopy("src/images");
  eleventyConfig.addPassthroughCopy({
    "src/_includes/partials/svgs": "partials/svgs"
  });

  if (features.blog) {
    const blogPlugin = require("./feature-packs/blog/plugin.js");
    blogPlugin(eleventyConfig);
  }

  if (features.caseStudies) {
    const caseStudiesPlugin = require("./feature-packs/case-studies/plugin.js");
    caseStudiesPlugin(eleventyConfig);
  }

  if (features.changelog) {
    const changelogPlugin = require("./feature-packs/changelog/plugin.js");
    changelogPlugin(eleventyConfig);
  }

  if (features.faqs) {
    const faqsPlugin = require("./feature-packs/faqs/plugin.js");
    faqsPlugin(eleventyConfig);
  }

  if (features.navigationMenus) {
    const navigationMenusPlugin = require("./feature-packs/navigation-menus/plugin.js");
    navigationMenusPlugin(eleventyConfig);
  }

  if (features.portfolio) {
    const portfolioPlugin = require("./feature-packs/portfolio/plugin.js");
    portfolioPlugin(eleventyConfig);
  }

  if (features.testimonials) {
    const testimonialsPlugin = require("./feature-packs/testimonials/plugin.js");
    testimonialsPlugin(eleventyConfig);
  }

  if (features.team) {
    const teamPlugin = require("./feature-packs/team/plugin.js");
    teamPlugin(eleventyConfig);
  }

  if (features.timeline) {
    const timelinePlugin = require("./feature-packs/timeline/plugin.js");
    timelinePlugin(eleventyConfig);
  }

  // Use .eleventyignore, not .gitignore
  eleventyConfig.setUseGitIgnore(false);

  // Directory structure
  return {
    markdownTemplateEngine: "njk",
    dataTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dir: {
      input: "src",
      output: "dist"
    }
  };
};
