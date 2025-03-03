import YxBaseComponent from '@/components/ui/Base'

import template from './template.html?raw'
import urlStyles from './index.scss?url'

export type YxDialogSideModeType = 'left' | 'right' | 'default'

export default class YxDialog extends YxBaseComponent(template, urlStyles) {
  public static NAME = 'dialog'

  public static JS_ROOT_SELECTOR = `${__PREFIX_JS__}${YxDialog.NAME}`

  public static ACTIONS = {
    show: `${YxDialog.NAME}-show`,
    hide: `${YxDialog.NAME}-hide`,
  }

  public static DATA_SET = {
    id: 'data-dialog-id',
  }

  public static ATTRIBUTES = {
    show: 'show',
    side: {
      left: 'side-left',
      right: 'side-right',
    },
  }

  public static SELECTORS = {
    dialog: `.${YxDialog.JS_ROOT_SELECTOR}`,
    container: `.${YxDialog.JS_ROOT_SELECTOR}-container`,
    showTrigger: `.${YxDialog.JS_ROOT_SELECTOR}-show`,
    hideTrigger: `.${YxDialog.JS_ROOT_SELECTOR}-hide`,
  }

  public static MODS = {
    hidden: `${YxDialog.NAME}_hidden`,
    side: {
      left: `${YxDialog.NAME}_side_left`,
      right: `${YxDialog.NAME}_side_right`,
      default: `${YxDialog.NAME}_side_default`,
    },
  }

  public static ANIMATION_DURATION = 200

  public static define() {
    customElements.define('yx-dialog', YxDialog, {
      extends: 'dialog',
    })
  }

  constructor() {
    super()

    this.show = this.show.bind(this)
    this.hide = this.hide.bind(this)

    this.addSubscriptions()

    this.setAttribute('role', 'dialog')

    console.log('Constructor')

    if (this.hasAttribute(YxDialog.ATTRIBUTES.show)) {
      this.show()
    }
  }

  protected hideModal() {
    this.close()
  }

  public getDialogElement() {
    return this.shadowRoot?.querySelector(
      YxDialog.SELECTORS.dialog,
    ) as HTMLDialogElement
  }

  public show(event?: Event) {
    console.log('sada')

    if (event) {
      event.preventDefault()
    }

    const target = event?.target as HTMLElement

    const isButtonTrigger =
      target && target.getAttribute(YxDialog.DATA_SET.id) === this.id

    if (isButtonTrigger || !event) {
      this.showModal()
      this.scrollTo(0, 0)

      return
    }
  }

  public hide(event?: MouseEvent) {
    if (event && !this.isOutsideClick(event)) {
      return
    }

    if (event) {
      event.preventDefault()
      event.stopPropagation()
    }

    this.classList.add(YxDialog.MODS.hidden)

    setTimeout(this.hideAnimation.bind(this), YxDialog.ANIMATION_DURATION)
  }

  private hideAnimation() {
    this.classList.remove(YxDialog.MODS.hidden)

    this.hideModal()
  }

  private isOutsideClick(event: MouseEvent) {
    const target = event.target as HTMLElement
    const isContainerClick = Boolean(
      target.closest(YxDialog.SELECTORS.container),
    )
    const isHideButtonClick = Boolean(
      target.closest(YxDialog.SELECTORS.hideTrigger),
    )

    if (isContainerClick && !isHideButtonClick) {
      return false
    }

    return true
  }

  private addSubscriptions() {
    document
      .querySelectorAll(YxDialog.SELECTORS.showTrigger)
      .forEach(HTMLShowTrigger => {
        this.subscribe({
          eventName: 'click',
          element: HTMLShowTrigger,
          callback: this.show,
        })
      })

    this.subscribe({
      eventName: 'mousedown',
      callback: this.hide,
    })
  }
}
