module.exports = function timelineFeature(eleventyConfig) {
  eleventyConfig.addFilter("visibleTimelineItems", (items) => {
    return (items || []).filter((item) => item.visible === true);
  });

  eleventyConfig.addCollection("timelineItems", (collection) => {
    return collection
      .getFilteredByGlob("./src/timeline/*.md")
      .filter((item) => item.data.visible === true)
      .sort((left, right) => {
        const orderCompare = Number(left.data.order || 0) - Number(right.data.order || 0);
        return orderCompare || left.fileSlug.localeCompare(right.fileSlug);
      })
      .flatMap((item) => (item.data.careerTimeline || []).map((entry) => ({
        ...entry,
        visible: item.data.visible
      })));
  });
};
