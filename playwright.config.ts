import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, ".env") });

export default defineConfig({
  testDir: "./tests",
  /* Run tests in files in parallel */
  fullyParallel: true,
  timeout: 1000 * 60 * 2,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: "html",
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    actionTimeout: 60000,
    navigationTimeout: 60000,
    screenshot: "only-on-failure",
    baseURL: process.env.BASE_URL,
    extraHTTPHeaders: {
      "X-RESEARCH-E2E-TEST": process.env.X_RESEARCH_E2E_TEST as string,
      "STRAPI-CF-ACCESS-CLIENT-ID": process.env
        .STRAPI_CF_ACCESS_CLIENT_ID as string,
      "STRAPI-CF-ACCESS-CLIENT-SECRET": process.env
        .STRAPI_CF_ACCESS_CLIENT_SECRET as string,
    },
    headless: false,
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
      },
    },
    {
      name: "firefox",
      use: {
        ...devices["Desktop Firefox"],
      },
    },
  ],
});
