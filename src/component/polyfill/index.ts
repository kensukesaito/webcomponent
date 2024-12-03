
const supportsCustomizedBuiltInElements = () => {
  let isSupported = false
  try {
    class Dummy extends HTMLSpanElement {}
    customElements.define('x-' + Math.random().toString(36).substring(2), Dummy, {
      extends: 'span',
    })
    new Dummy()
    isSupported = true
  } catch (error) {}
  return isSupported
}

const overrideInheritedHtmlElementInterfaces = () => {
  HTMLMetaElement = HTMLElement
  HTMLScriptElement = HTMLElement
  HTMLSelectElement = HTMLElement
}

const tagNames = [
  'code',
]

const convertCustomizedBuiltInElementsToAutonomousCustomElements = () => {
  const customizedBuiltInElements = document.querySelectorAll('[is]')
  customizedBuiltInElements.forEach((customizedBuiltInElement) => {
    const customElementName = customizedBuiltInElement.getAttribute('is')
    customizedBuiltInElement.removeAttribute('is')
    if (customElementName) {
      const autonomousCustomElement = document.createElement(customElementName)
      customizedBuiltInElement.getAttributeNames().forEach((attributeName) => {
        const attributeValue = customizedBuiltInElement.getAttribute(attributeName)
        if (attributeValue) {
          autonomousCustomElement.setAttribute(attributeName, attributeValue)
        }
      })
      if (tagNames.includes(customizedBuiltInElement.tagName.toLowerCase())) {
        autonomousCustomElement.replaceChildren(...Array.from(customizedBuiltInElement.childNodes))
        customizedBuiltInElement.replaceChildren(autonomousCustomElement)
      } else {
        autonomousCustomElement.replaceChildren(customizedBuiltInElement.cloneNode())
        customizedBuiltInElement.replaceWith(autonomousCustomElement)
      }
    }
  })
}

if (!supportsCustomizedBuiltInElements()) {
  overrideInheritedHtmlElementInterfaces()
  convertCustomizedBuiltInElementsToAutonomousCustomElements()
}
