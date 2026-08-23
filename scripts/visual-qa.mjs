import { spawn } from "node:child_process";
import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

const chrome = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const profile = await mkdtemp(join(tmpdir(), "vi-que-viet-qa-"));
const port = 9333;
const browser = spawn(chrome, ["--headless=new", `--remote-debugging-port=${port}`, `--user-data-dir=${profile}`, "--no-first-run", "--disable-gpu", "about:blank"], { stdio: "ignore" });

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
async function fetchJson(url, options) {
  for (let attempt = 0; attempt < 30; attempt += 1) {
    try { const response = await fetch(url, options); if (response.ok) return response.json(); } catch {}
    await delay(100);
  }
  throw new Error(`Chrome DevTools did not respond at ${url}`);
}

const target = await fetchJson(`http://127.0.0.1:${port}/json/new?about:blank`, { method: "PUT" });
const socket = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((resolve, reject) => { socket.addEventListener("open", resolve, { once: true }); socket.addEventListener("error", reject, { once: true }); });
let nextId = 1;
const pending = new Map();
socket.addEventListener("message", ({ data }) => {
  const message = JSON.parse(data);
  if (!message.id) return;
  const request = pending.get(message.id);
  if (!request) return;
  pending.delete(message.id);
  if (message.error) request.reject(new Error(message.error.message));
  else request.resolve(message.result);
});
function command(method, params = {}) { const id = nextId++; socket.send(JSON.stringify({ id, method, params })); return new Promise((resolve, reject) => pending.set(id, { resolve, reject })); }

await command("Page.enable");
await command("Runtime.enable");
await command("Emulation.setDeviceMetricsOverride", { width: 390, height: 844, deviceScaleFactor: 1, mobile: true });
const routes = ["/", "/san-pham", "/san-pham/page/3", "/san-pham/xuc-xich-ga-nam", "/oem-odm", "/nha-may", "/ve-vi-que-viet", "/tin-tuc", "/tin-tuc/quy-trinh-san-xuat-khep-kin", "/lien-he"];
for (const route of routes) {
  await command("Page.navigate", { url: `http://localhost:3000${route}` });
  await delay(350);
  const metrics = await command("Runtime.evaluate", { expression: "({innerWidth,scrollWidth:document.documentElement.scrollWidth,bodyWidth:document.body.scrollWidth,title:document.title})", returnByValue: true });
  console.log(route, JSON.stringify(metrics.result.value));
  if (route === "/" || route === "/san-pham" || route === "/oem-odm" || route === "/nha-may") {
    const screenshot = await command("Page.captureScreenshot", { format: "png", captureBeyondViewport: false });
    const name = route === "/" ? ".qa-mobile-390.png" : route === "/san-pham" ? ".qa-products-390.png" : route === "/oem-odm" ? ".qa-oem-page-390.png" : ".qa-factory-page-390.png";
    await writeFile(join(process.cwd(), name), Buffer.from(screenshot.data, "base64"));
  }
  if (route === "/") {
    await command("Runtime.evaluate", { expression: "document.documentElement.style.scrollBehavior='auto';const el=document.getElementById('tu-lieu-thuc-te');if(el)window.scrollTo(0,el.offsetTop+180)" });
    await delay(700);
    const screenshot = await command("Page.captureScreenshot", { format: "png", captureBeyondViewport: false });
    await writeFile(join(process.cwd(), ".qa-video-section-390.png"), Buffer.from(screenshot.data, "base64"));
    await command("Runtime.evaluate", { expression: "const partners=document.getElementById('doi-tac-dong-hanh');if(partners)window.scrollTo(0,partners.offsetTop+100)" });
    await delay(350);
    const partnerScreenshot = await command("Page.captureScreenshot", { format: "png", captureBeyondViewport: false });
    await writeFile(join(process.cwd(), ".qa-partners-390.png"), Buffer.from(partnerScreenshot.data, "base64"));
    await command("Runtime.evaluate", { expression: "const story=document.getElementById('cau-chuyen-vi-que-viet');if(story)window.scrollTo(0,story.offsetTop+100)" });
    await delay(350);
    const mobileStory = await command("Page.captureScreenshot", { format: "png", captureBeyondViewport: false });
    await writeFile(join(process.cwd(), ".qa-brand-story-390.png"), Buffer.from(mobileStory.data, "base64"));
    await command("Runtime.evaluate", { expression: "const oem=document.getElementById('oem-odm-home');if(oem)window.scrollTo(0,oem.offsetTop+100)" });
    await delay(350);
    const mobileOem = await command("Page.captureScreenshot", { format: "png", captureBeyondViewport: false });
    await writeFile(join(process.cwd(), ".qa-oem-390.png"), Buffer.from(mobileOem.data, "base64"));
  }
  if (route === "/nha-may") {
    await command("Runtime.evaluate", { expression: "document.documentElement.style.scrollBehavior='auto';const spaces=document.getElementById('khong-gian-nha-may');if(spaces)window.scrollTo(0,spaces.offsetTop-66)" });
    await delay(350);
    const mobileFactorySpaces = await command("Page.captureScreenshot", { format: "png", captureBeyondViewport: false });
    await writeFile(join(process.cwd(), ".qa-factory-spaces-390.png"), Buffer.from(mobileFactorySpaces.data, "base64"));
    await command("Runtime.evaluate", { expression: "const process=document.getElementById('quy-trinh-nha-may');if(process)window.scrollTo(0,process.offsetTop-66)" });
    await delay(350);
    const mobileFactoryJourney = await command("Page.captureScreenshot", { format: "png", captureBeyondViewport: false });
    await writeFile(join(process.cwd(), ".qa-factory-journey-390.png"), Buffer.from(mobileFactoryJourney.data, "base64"));
  }
}
await command("Emulation.setDeviceMetricsOverride", { width: 1440, height: 1000, deviceScaleFactor: 1, mobile: false });
await command("Page.navigate", { url: "http://localhost:3000/san-pham" });
await delay(500);
const desktopProducts = await command("Page.captureScreenshot", { format: "png", captureBeyondViewport: false });
await writeFile(join(process.cwd(), ".qa-products-desktop.png"), Buffer.from(desktopProducts.data, "base64"));
await command("Page.navigate", { url: "http://localhost:3000/oem-odm" });
await delay(500);
const desktopOemPage = await command("Page.captureScreenshot", { format: "png", captureBeyondViewport: false });
await writeFile(join(process.cwd(), ".qa-oem-page-desktop.png"), Buffer.from(desktopOemPage.data, "base64"));
await command("Page.navigate", { url: "http://localhost:3000/nha-may" });
await delay(500);
const desktopFactoryPage = await command("Page.captureScreenshot", { format: "png", captureBeyondViewport: false });
await writeFile(join(process.cwd(), ".qa-factory-page-desktop.png"), Buffer.from(desktopFactoryPage.data, "base64"));
await command("Runtime.evaluate", { expression: "document.documentElement.style.scrollBehavior='auto';const spaces=document.getElementById('khong-gian-nha-may');if(spaces)window.scrollTo(0,spaces.offsetTop-76)" });
await delay(350);
const desktopFactorySpaces = await command("Page.captureScreenshot", { format: "png", captureBeyondViewport: false });
await writeFile(join(process.cwd(), ".qa-factory-spaces-desktop.png"), Buffer.from(desktopFactorySpaces.data, "base64"));
await command("Runtime.evaluate", { expression: "const process=document.getElementById('quy-trinh-nha-may');if(process)window.scrollTo(0,process.offsetTop-76)" });
await delay(350);
const desktopFactoryJourney = await command("Page.captureScreenshot", { format: "png", captureBeyondViewport: false });
await writeFile(join(process.cwd(), ".qa-factory-journey-desktop.png"), Buffer.from(desktopFactoryJourney.data, "base64"));
await command("Runtime.evaluate", { expression: "const people=document.getElementById('con-nguoi-nha-may');if(people)window.scrollTo(0,people.offsetTop-76)" });
await delay(350);
const desktopFactoryFocus = await command("Page.captureScreenshot", { format: "png", captureBeyondViewport: false });
await writeFile(join(process.cwd(), ".qa-factory-focus-desktop.png"), Buffer.from(desktopFactoryFocus.data, "base64"));
await command("Page.navigate", { url: "http://localhost:3000/" });
await delay(500);
await command("Runtime.evaluate", { expression: "document.documentElement.style.scrollBehavior='auto';const el=document.getElementById('tu-lieu-thuc-te');if(el)window.scrollTo(0,el.offsetTop-76)" });
await delay(500);
const desktopVideo = await command("Page.captureScreenshot", { format: "png", captureBeyondViewport: false });
await writeFile(join(process.cwd(), ".qa-video-section-desktop.png"), Buffer.from(desktopVideo.data, "base64"));
await command("Runtime.evaluate", { expression: "const partners=document.getElementById('doi-tac-dong-hanh');if(partners)window.scrollTo(0,partners.offsetTop-76)" });
await delay(350);
const desktopPartners = await command("Page.captureScreenshot", { format: "png", captureBeyondViewport: false });
await writeFile(join(process.cwd(), ".qa-partners-desktop.png"), Buffer.from(desktopPartners.data, "base64"));
await command("Runtime.evaluate", { expression: "const story=document.getElementById('cau-chuyen-vi-que-viet');if(story)window.scrollTo(0,story.offsetTop-76)" });
await delay(350);
const desktopStory = await command("Page.captureScreenshot", { format: "png", captureBeyondViewport: false });
await writeFile(join(process.cwd(), ".qa-brand-story-desktop.png"), Buffer.from(desktopStory.data, "base64"));
await command("Runtime.evaluate", { expression: "const oem=document.getElementById('oem-odm-home');if(oem)window.scrollTo(0,oem.offsetTop-76)" });
await delay(350);
const desktopOem = await command("Page.captureScreenshot", { format: "png", captureBeyondViewport: false });
await writeFile(join(process.cwd(), ".qa-oem-desktop.png"), Buffer.from(desktopOem.data, "base64"));
socket.close();
browser.kill();
await new Promise((resolve) => browser.once("exit", resolve));
if (profile.startsWith(tmpdir())) {
  try { await rm(profile, { recursive: true, force: true, maxRetries: 3, retryDelay: 100 }); } catch {}
}
