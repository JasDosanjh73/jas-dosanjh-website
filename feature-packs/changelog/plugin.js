function getReleaseTimestamp(item) {
  const fallbackDate = item.date instanceof Date ? item.date : new Date(0);
  const value = item.data.releaseDate || fallbackDate;
  const timestamp = new Date(value).getTime();

  return Number.isNaN(timestamp) ? 0 : timestamp;
}

function getReleaseOrder(item) {
  return Number(item.data.order || 0);
}

function sortChangelogEntries(left, right) {
  const dateCompare = getReleaseTimestamp(right) - getReleaseTimestamp(left);
  if (dateCompare !== 0) {
    return dateCompare;
  }

  const orderCompare = getReleaseOrder(left) - getReleaseOrder(right);
  if (orderCompare !== 0) {
    return orderCompare;
  }

  return (right.data.version || "").localeCompare(left.data.version || "");
}

module.exports = function changelogFeature(eleventyConfig) {
  eleventyConfig.addFilter("changelogToken", (value) => {
    return String(value || "")
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  });

  eleventyConfig.addCollection("changelogEntries", (collection) => {
    return collection.getFilteredByGlob("./src/changelog/*.md").sort(sortChangelogEntries);
  });
};
