/* eslint-disable import/prefer-default-export */
export function cleanProperty(element) {
  let { style } = element;

  if (!style) {
    style = {};
  }

  style.setProperty("--rectangleWidth", "100%");
  style.setProperty("--rectangleHeight", "40px");
  style.setProperty("--rectangleTop", 0);
  style.setProperty("--rectangleBottom", 0);
}
