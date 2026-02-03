#!/usr/bin/env node
/**
 * Job posting scraper using Playwright
 * Usage: node scripts/scrape-job.js <url>
 *
 * Outputs JSON with job details extracted from the page.
 */

const { chromium } = require('playwright');

async function scrapeJob(url) {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  try {
    await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });

    // Wait a bit for any dynamic content
    await page.waitForTimeout(2000);

    // Get the full page text content
    const content = await page.evaluate(() => {
      // Remove script and style elements
      const scripts = document.querySelectorAll('script, style, noscript');
      scripts.forEach(s => s.remove());
      return document.body.innerText;
    });

    // Get the page title
    const title = await page.title();

    // Try to extract structured data if available
    const structuredData = await page.evaluate(() => {
      const scripts = document.querySelectorAll('script[type="application/ld+json"]');
      const data = [];
      scripts.forEach(script => {
        try {
          data.push(JSON.parse(script.textContent));
        } catch (e) {}
      });
      return data;
    });

    // Get meta description
    const metaDescription = await page.evaluate(() => {
      const meta = document.querySelector('meta[name="description"]');
      return meta ? meta.getAttribute('content') : null;
    });

    const result = {
      url,
      title,
      metaDescription,
      structuredData: structuredData.length > 0 ? structuredData : null,
      content: content.substring(0, 50000) // Limit content length
    };

    console.log(JSON.stringify(result, null, 2));

  } catch (error) {
    console.error(JSON.stringify({ error: error.message, url }));
    process.exit(1);
  } finally {
    await browser.close();
  }
}

const url = process.argv[2];
if (!url) {
  console.error('Usage: node scripts/scrape-job.js <url>');
  process.exit(1);
}

scrapeJob(url);
