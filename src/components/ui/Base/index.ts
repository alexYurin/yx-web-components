export type YxListenerProps = {
  element?: Element
  eventName: string
  callback: (...args: any[]) => void
}

function WcBaseComponent(name: string, template: string, urlStyles: string) {
  return class extends HTMLElement {
    public static NAME = name

    public static JS_ROOT_SELECTOR = `${__PREFIX_JS__}${name}`

    public shadowRoot: ShadowRoot

    public static define() {
      customElements.define(`${__PREFIX__}-${name}`, this)
    }

    public static get SELECTORS() {
      return {}
    }

    public static get ACTIONS() {
      return {}
    }

    public static get DATA_SET() {
      return {
        NAME: {},
        VALUE: {},
      }
    }

    public static get MODS() {
      return {}
    }

    protected eventController = new AbortController()
    protected listeners: YxListenerProps[] = []
    protected initialChildNodes: ChildNode[]

    constructor() {
      super()

      this.shadowRoot = this.attachShadow({ mode: 'open' })
      this.initialChildNodes = [...this.childNodes]

      this.insertStyles()
      this.renderTemplate()
      this.replaceChildren()
    }

    public dispatchCustomEvent<TProps extends Record<string, any>>(
      eventName: string,
      props: TProps,
      bubbles = true,
    ) {
      this.dispatchEvent(
        new CustomEvent(eventName, {
          bubbles,
          detail: props,
        }),
      )
    }

    public destroy(options = { withRemoveRootElement: false }) {
      this.eventController.abort()

      if (options.withRemoveRootElement) {
        this.remove()
      }
    }

    protected connectedCallback() {}

    protected insertStyles() {
      const link = document.createElement('link')

      link.rel = 'stylesheet'
      link.href = urlStyles

      this.shadowRoot.append(link)
    }

    protected renderTemplate() {
      const htmlTemplate = document.createElement(
        'template',
      ) as HTMLTemplateElement

      htmlTemplate.innerHTML = template

      this.shadowRoot.append(htmlTemplate.content)
    }

    protected subscribe<TProps extends YxListenerProps>(props: TProps) {
      const subscribeElement = props.element || this

      subscribeElement.addEventListener(props.eventName, props.callback, {
        signal: this.eventController.signal,
      })

      this.listeners = [...this.listeners, props]
    }

    protected unsubscribe<TProps extends YxListenerProps>(props: TProps) {
      const subscribeElement = props.element || this

      subscribeElement.removeEventListener(props.eventName, props.callback)

      this.listeners = this.listeners.filter(listener => {
        if (props.element) {
          return (
            !listener.element?.isSameNode(props.element) &&
            listener.eventName !== props.eventName
          )
        }

        return listener.eventName !== props.eventName
      })
    }
  }
}

export default WcBaseComponent
