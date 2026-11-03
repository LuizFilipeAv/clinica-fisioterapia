/** Height of the fixed chrome above pinned content: top bar + sticky section label. */
export function chromeOffset() {
  const css = getComputedStyle(document.documentElement)
  return parseFloat(css.getPropertyValue('--bar-h')) + parseFloat(css.getPropertyValue('--label-h'))
}
