#!/usr/bin/env node
/**
 * Rescrape all job postings to get complete raw_text
 */

const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const JSON_PATH = path.join(__dirname, '../blog/so-you-want-to-be-an-ai-engineer/data/ai-engineer-jobs.json');

async function scrapeJob(browser, url) {
  const page = await browser.newPage();

  try {
    await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(2000);

    const content = await page.evaluate(() => {
      const scripts = document.querySelectorAll('script, style, noscript');
      scripts.forEach(s => s.remove());
      return document.body.innerText;
    });

    return content.substring(0, 50000);
  } catch (error) {
    console.error(`Failed to scrape ${url}: ${error.message}`);
    return null;
  } finally {
    await page.close();
  }
}

async function main() {
  // Read existing JSON
  const data = JSON.parse(fs.readFileSync(JSON_PATH, 'utf8'));

  console.log(`Scraping ${data.postings.length} job postings...`);

  const browser = await chromium.launch({ headless: true });

  for (let i = 0; i < data.postings.length; i++) {
    const posting = data.postings[i];
    console.log(`[${i + 1}/${data.postings.length}] Scraping: ${posting.company} - ${posting.job_title}`);

    const content = await scrapeJob(browser, posting.job_url);

    if (content) {
      posting.raw_text = content;
      console.log(`  ✓ Got ${content.length} chars`);
    } else {
      console.log(`  ✗ Failed`);
    }

    // Small delay between requests
    await new Promise(r => setTimeout(r, 1000));
  }

  await browser.close();

  // Write updated JSON
  fs.writeFileSync(JSON_PATH, JSON.stringify(data, null, 2));
  console.log(`\nUpdated ${JSON_PATH}`);
}

main().catch(console.error);
