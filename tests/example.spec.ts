import { test, expect } from '@playwright/test';

test('aborted XHR', async ({ page }) => {
  const xhrPromise = page.waitForRequest('http://localhost:3000/test');
  await page.goto('http://127.0.0.1:3000/hello.html');
  await xhrPromise;
  // Exit before XHR response is received.
});
