function sortTestimonials(left, right) {
  const nameCompare = (left.data.name || "").localeCompare(right.data.name || "");
  if (nameCompare !== 0) {
    return nameCompare;
  }

  return (left.data.company || "").localeCompare(right.data.company || "");
}

module.exports = function testimonialsFeature(eleventyConfig) {
  eleventyConfig.addCollection("testimonialsItems", (collection) => {
    return collection.getFilteredByGlob("./src/testimonials/*.md").sort(sortTestimonials);
  });
};
