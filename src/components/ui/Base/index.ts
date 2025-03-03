export type YxListenerProps = {
  element?: Element
  eventName: string
  callback: (...args: any[]) => void
}

const YxBaseComponent = (template?: string, urlStyles?: string) =>
  class extends HTMLDialogElement {
    protected eventController = new AbortController()
    protected listeners: YxListenerProps[] = []

    public static define() {
      console.error('Method define is not implemented')
    }

    protected connectedCallback() {
      // const shadowRoot = this.attachShadow({ mode: 'open' })
      // if (urlStyles) {
      //   const link = document.createElement('link')
      //   link.rel = 'stylesheet'
      //   link.href = urlStyles
      //   shadowRoot.append(link)
      // }
      // if (template) {
      //   const htmlTemplate = new DOMParser()
      //     .parseFromString(template, 'text/html')
      //     .querySelector('template')?.content
      //   shadowRoot.append(htmlTemplate!.cloneNode(true))
      // }
    }

    protected dispatch<TProps extends Record<string, any>>(
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

    protected destroy(options = { withRemoveRootElement: false }) {
      this.eventController.abort()

      if (options.withRemoveRootElement) {
        this.remove()
      }
    }
  }

export default YxBaseComponent
