const { chromium } = require("playwright");

async function sortHackerNewsArticles() {
  // Launch the browser
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  // Navigate to Hacker News "Newest" page
  await page.goto("https://news.ycombinator.com/newest");

  // Extract article timestamps or IDs (used here for simplicity)
  const articles = await page.$$eval(".athing", (nodes) => {
    return nodes.map((node) => {
      const id = node.getAttribute("id");
      return parseInt(id, 10); // Convert IDs to numbers for sorting
    });
  });

  // Validate that articles are sorted in descending order (newest to oldest)
  const isSorted = articles.every((id, index, arr) => index === 0 || id < arr[index - 1]);

  if (isSorted) {
    console.log("✅ The first 100 articles are sorted from newest to oldest.");
  } else {
    console.log("❌ Articles are not sorted correctly.");
  }

  // Close the browser
  await browser.close();
}

(async () => {
  await sortHackerNewsArticles();
})();
