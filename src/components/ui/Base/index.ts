export type YxListenerProps = {
  element?: Element
  eventName: string
  callback: (...args: any[]) => void
}

const YxBaseComponent = <TClass extends new (...args: any[]) => HTMLElement>(
  name: string,
  template: string,
  ExtendedClass: TClass,
) =>
  class Base extends ExtendedClass {
    protected listeners: YxListenerProps[] = []

    protected HTMLSlot: HTMLElement | null = null

    public name = `${__PREFIX__}-${name}`

    protected static NAME = `${__PREFIX__}-${name}`
    protected static JS_NAME = `${__PREFIX_JS__}-${name}`

    protected static BASE_SELECTORS = {
      slot: `.${__PREFIX_JS__}-slot`,
    }

    public static define() {
      console.error('Method define is not implemented')
    }

    protected connectedCallback() {
      this.classList.add(Base.NAME)

      const children = [...this.children]

      const html = new DOMParser()
        .parseFromString(template, 'text/html')
        .querySelector('template')

      if (!html) {
        return
      }

      this.replaceChildren()
      this.append(html.content)

      this.HTMLSlot = this.querySelector(
        Base.BASE_SELECTORS.slot,
      ) as HTMLElement

      if (this.HTMLSlot) {
        for (const child of children.values()) {
          this.HTMLSlot!.appendChild(child)
        }
      }
    }

    protected triggerEvent<TProps extends Record<string, any>>(
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

    protected subscribe(mode: 'on' | 'off', props: YxListenerProps) {
      const subscribeElement = props.element || this

      if (mode === 'on') {
        subscribeElement.addEventListener(props.eventName, props.callback)

        this.listeners.push(props)

        return
      }

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
      if (options.withRemoveRootElement) {
        this.remove()
      }
    }
  }

export default YxBaseComponent
