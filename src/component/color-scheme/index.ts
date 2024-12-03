
const webStorageKeyName = 'colorScheme'

class ColorScheme extends HTMLMetaElement {
  #isCustomizedBuiltInElement = Boolean(this.getAttribute('is'))
  constructor () {
    super()
  }
  connectedCallback () {
    const colorScheme = sessionStorage.getItem(webStorageKeyName)
    if (!colorScheme) {
      return
    }
    if (this.#isCustomizedBuiltInElement) {
      this.setAttribute('content', colorScheme)
    } else {
      this.firstElementChild?.setAttribute('content', colorScheme)
    }
  }
}

customElements.define('color-scheme', ColorScheme, {
  extends: 'meta',
})

class ColorSchemeSelect extends HTMLSelectElement {
  #isCustomizedBuiltInElement = Boolean(this.getAttribute('is'))
  constructor () {
    super()
    this.addEventListener('change', this)
  }
  handleEvent (event: Event) {
    if (!(event.target instanceof HTMLSelectElement)) {
      return
    }
    if (event.target.value === 'light dark') {
      sessionStorage.removeItem(webStorageKeyName)
    } else {
      sessionStorage.setItem(webStorageKeyName, event.target.value)
    }
    const htmlMetaElement = document.querySelector('meta[name="color-scheme"]')
    if (htmlMetaElement) {
      htmlMetaElement.setAttribute('content', event.target.value)
    }
  }
  connectedCallback () {
    if (!this.#isCustomizedBuiltInElement) {
      this.firstElementChild?.addEventListener('change', this)
    }
    const colorScheme = sessionStorage.getItem(webStorageKeyName)
    const options = [
      {
        value: 'light dark',
        label: 'Follow System Settings',
        selected: !colorScheme,
      },
      {
        value: 'light',
        label: 'Always Light',
        selected: (colorScheme === 'light'),
      },
      {
        value: 'dark',
        label: 'Always Dark',
        selected: (colorScheme === 'dark'),
      },
    ]
    options.forEach((option) => {
      const htmlOptionElement = document.createElement('option')
      htmlOptionElement.setAttribute('value', option.value)
      htmlOptionElement.setAttribute('label', option.label)
      if (option.selected) {
        htmlOptionElement.setAttribute('selected', '')
      }
      if (this.#isCustomizedBuiltInElement) {
        this.appendChild(htmlOptionElement)
      } else {
        this.firstElementChild?.appendChild(htmlOptionElement)
      }
    })
  }
  disconnectedCallback () {
    if (!this.#isCustomizedBuiltInElement) {
      this.firstElementChild?.removeEventListener('change', this)
    }
  }
}

customElements.define('color-scheme-select', ColorSchemeSelect, {
  extends: 'select',
})
