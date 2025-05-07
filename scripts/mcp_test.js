const fs = require('fs');
const { chromium } = require('playwright');

async function generateAndRunTest() {
  const testDescription = fs.readFileSync('e2e/test_description.txt', 'utf-8');
  const testSteps = testDescription.split('\\n');

 let testCode = `const { test, expect } = require('@playwright/test');

test('自然言語で記述されたテスト', async ({ page }) => {\n`;

  for (const step of testSteps) {
    if (step.includes('アクセス')) {
      const url = step.split('にアクセス')[0].trim().replace(/^\d+\.\s*/, '').trim();
      testCode += `  await page.goto(\`http://${url}\`);\n`;
    } else if (step.includes('入力')) {
      const [target, value] = step.split('に');
      const selector = target.replace(/^\d+\.\s*/, '').trim();
      testCode += `  await page.fill(\`[name="${selector}"]\`, '${value.replace('と入力', '').trim()}');\n`;
    } else if (step.includes('クリック')) {
      const selector = step.split('をクリック')[0].trim().replace(/^\d+\.\s*/, '').trim();
      testCode += `  await page.click('${selector}');\n`;
    } else if (step.includes('表示されることを確認')) {
      const selector = step.split('が表示されることを確認')[0].trim().replace(/^\d+\.\s*/, '').trim();
      testCode += `  await page.waitForSelector('${selector}');\n`;
    }
  }
  testCode += `});`;

  fs.writeFileSync('e2e/natural_language_test.spec.ts', testCode);

  const { spawn } = require('child_process');
  const testProcess = spawn('npx', ['playwright', 'test', 'e2e/natural_language_test.spec.ts']);

 testProcess.stdout.on('data', (data) => {
    console.log('stdout: ' + String(data));
  });

  testProcess.stderr.on('data', (data) => {
    console.error('stderr: ' + String(data));
  });

  testProcess.on('close', (code) => {
    console.log('child process exited with code ' + code);
  });
}

generateAndRunTest();
