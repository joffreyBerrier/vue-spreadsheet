const PercyScript = require("@percy/script");

PercyScript.run(async (page, percySnapshot) => {
  await page.goto("http://localhost:8080/");
  // ensure the page has loaded before capturing a snapshot
  await page.waitFor("#app");
  await percySnapshot("index");

  await page.click('[data-row-index="1"][data-col-index="1"]');
  await percySnapshot("click on cell");

  const cell = await page.$('[data-row-index="1"][data-col-index="1"]');

  await cell.click({
    button: "right",
  });
  await percySnapshot("cell context-menu");

  // Disable
  await page.click('[data-row-index="0"][data-col-index="3"]');
  const disableCell = await page.$('[data-row-index="0"][data-col-index="3"]');

  await disableCell.click({
    button: "right",
  });
  await percySnapshot("context-menu on disable cell");

  // keys navigation
  await page.click('[data-row-index="2"][data-col-index="2"]');
  // top
  await page.keyboard.press("ArrowUp");
  await percySnapshot("move to top");

  // bottom
  await page.keyboard.press("ArrowDown");
  await percySnapshot("move to bottom");

  // left
  await page.keyboard.press("ArrowLeft");
  await percySnapshot("move to left");

  // right
  await page.keyboard.press("ArrowRight");
  await percySnapshot("move to right");

  // keys navigation + maj
  await page.click('[data-row-index="3"][data-col-index="3"]');
  // top
  await page.keyboard.down("ShiftLeft");
  await page.keyboard.press("ArrowUp");
  await page.keyboard.up("ShiftLeft");
  await percySnapshot("move shift to top");

  // bottom
  await page.keyboard.down("ShiftLeft");
  await page.keyboard.press("ArrowDown");
  await page.keyboard.up("ShiftLeft");
  await percySnapshot("move shift to bottom");

  // left
  await page.keyboard.down("ShiftLeft");
  await page.keyboard.press("ArrowLeft");
  await page.keyboard.up("ShiftLeft");
  await percySnapshot("move shift to left");

  // right
  await page.keyboard.down("ShiftLeft");
  await page.keyboard.press("ArrowRight");
  await page.keyboard.up("ShiftLeft");
  await percySnapshot("move shift to right");

  // Type letter on numeric field
  const inputNumericTypeString = await page.$('[data-row-index="0"][data-col-index="2"]');

  await inputNumericTypeString.click();
  await new Promise((x) => setTimeout(x, 1000));
  await inputNumericTypeString.click({ clickCount: 2 });
  await page.type('[data-row-index="0"][data-col-index="2"] textarea', "test comment", {
    delay: 20,
  });
  await percySnapshot("type string on numeric field");

  // Type number on numeric field
  const inputNumericTypeNumber = await page.$('[data-row-index="0"][data-col-index="2"]');

  await inputNumericTypeNumber.click();
  await new Promise((x) => setTimeout(x, 1000));
  await inputNumericTypeNumber.click({ clickCount: 2 });
  await page.type('[data-row-index="0"][data-col-index="2"] textarea', "123", {
    delay: 20,
  });
  await percySnapshot("type number on numeric field");
});
