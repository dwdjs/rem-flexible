/**
 * flexible
 * @see https://github.com/amfe/lib-flexible
 * @param designWidth 设计师起稿宽度
 * @param pxPerRem 每个1rem多少px
 */
export default function flexible(designWidth = 750, pxPerRem = 100) {
  const docEl = document.documentElement
  const dpr = window.devicePixelRatio || 1

  // adjust body font size
  function setBodyFontSize () {
    if (document.body) {
      document.body.style.fontSize = (12 * dpr) + 'px'
    } else {
      document.addEventListener('DOMContentLoaded', setBodyFontSize)
    }
  }
  setBodyFontSize();

  // set 1rem = viewWidth / (10)
  function setRemUnit () {
    let { clientWidth } = docEl
    // if (minAdaptWidth && clientWidth < minAdaptWidth) clientWidth = minAdaptWidth
    // if (maxAdaptWidth && clientWidth < maxAdaptWidth) clientWidth = maxAdaptWidth
    const rem = clientWidth / (designWidth / pxPerRem)
    docEl.style.fontSize = rem + 'px'
  }

  setRemUnit()

  // reset rem unit on page resize
  window.addEventListener('resize', setRemUnit)
  window.addEventListener('pageshow', function (e) {
    if (e.persisted) {
      setRemUnit()
    }
  })

  // detect 0.5px supports
  if (dpr >= 2) {
    const fakeBody = document.createElement('body')
    const testElement = document.createElement('div')
    testElement.style.border = '.5px solid transparent'
    fakeBody.appendChild(testElement)
    docEl.appendChild(fakeBody)
    if (testElement.offsetHeight === 1) {
      docEl.classList.add('hairlines')
    }
    docEl.removeChild(fakeBody)
  }
}
