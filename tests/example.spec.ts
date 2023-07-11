import { test, expect } from '@playwright/test';

// test('aborted XHR', async ({ page }) => {
//   const xhrPromise = page.waitForRequest('http://localhost:3000/test');
//   await page.goto('http://127.0.0.1:3000/hello.html');
//   await xhrPromise;
//   // Exit before XHR response is received.
// });

test('aborted XHR in custom context', async ({ browser }) => {
  const context = await browser.newContext();
  await context.tracing.start({ screenshots: true, snapshots: true });
  const page = await context.newPage();

  const xhrPromise = page.waitForRequest('http://localhost:3000/test');
  await page.goto('http://127.0.0.1:3000/hello.html');
  await xhrPromise;
  // other actions...
  await page.close();
  await context.tracing.stop({ path: 'trace.zip' });
  await context.close();
});
