
const {test,expect}=require('@playwright/test');
test('desktop and mobile portfolio interactions',async({browser})=>{
 for(const viewport of [{width:1280,height:900},{width:390,height:844}]){
 const page=await browser.newPage({viewport,reducedMotion:'reduce'});
 await page.route('https://**/*',route=>route.abort());
 await page.goto('http://127.0.0.1:8000/');
 await expect(page.locator('#ak-hero-title')).toBeVisible();
 await expect(page.locator('[data-ak-count]').first()).toHaveText('1M+');
 await page.locator('[data-stage="silver"]').click();await expect(page.locator('#ak-stage-info')).toContainText('Clean and validate');
 await page.locator('#ak-command').fill('skills');await page.locator('#ak-terminal-form button').click();await expect(page.locator('#ak-terminal-output')).toContainText('PySpark');
 await page.locator('#ak-chat-launch').click();await page.locator('#ak-question').fill('What did he do at Sigmoid?');await page.locator('#ak-chat-send').click();await expect(page.locator('#ak-chat-log')).toContainText('Sigmoid',{timeout:10000});
 await expect(page.locator('#ak-chat-log .ak-assistant a').first()).toBeVisible();
 await page.locator('#ak-chat-clear').click();await page.locator('#ak-question').fill('weather tomorrow in Tokyo');await page.locator('#ak-chat-send').click();await expect(page.locator('#ak-chat-log')).toContainText('could not find');
 await page.locator('#ak-chat-close').click();await page.locator('[data-nav-link="projects"]').click();await expect(page.locator('article[data-page="projects"]')).toBeVisible();await page.locator('[data-nav-link="experience"]').click();await expect(page.locator('article[data-page="experience"]')).toBeVisible();
 await page.locator('#theme-toggle').click();await expect(page.locator('body')).toHaveClass(/light-theme/);
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+2)).toBeTruthy();
 await page.close();
 }
});
