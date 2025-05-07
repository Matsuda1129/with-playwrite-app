import { test, expect } from "@playwright/test";

test("should validate the profile form", async ({ page }) => {
  await page.goto("http://localhost:3000");
  await page.waitForTimeout(1000);

  // 必須項目が未入力の場合にエラーメッセージが表示されることを確認
  await page.click("text=送信");
  await page.waitForTimeout(1000);
  await expect(page.locator("text=名前は必須項目です。")).toBeVisible();
  await page.waitForTimeout(1000);
  await expect(page.locator("text=ニックネームは必須項目です。")).toBeVisible();
  await page.waitForTimeout(1000);
  await expect(
    page.locator("text=メールアドレスは必須項目です。")
  ).toBeVisible();
  await page.waitForTimeout(1000);

  await page.fill("input[name=name]", "テスト名前");
  await page.waitForTimeout(1000);
  await page.fill("input[name=nickname]", "テストニックネーム");
  await page.waitForTimeout(1000);
  await page.fill("input[name=email]", "test@example.com");
  await page.waitForTimeout(1000);
  await page.click("text=送信");
  await page.waitForTimeout(1000);
});
