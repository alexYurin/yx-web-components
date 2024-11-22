import YxBaseComponent from '@/components/ui/Base'
import template from './template.html?raw'
import './index.scss'

export const NAME = 'dialog'

export default class YxDialog extends YxBaseComponent(
  NAME,
  template,
  HTMLDialogElement,
) {
  public static ANIMATION_DURATION = 200

  public static SELECTORS = {
    header: `.${YxDialog.JS_NAME}-header`,
    content: `.${YxDialog.JS_NAME}-content`,
  }

  public static DATA_SET = {
    show: 'data-dialog-show',
    hide: 'data-dialog-hide',
    headerText: 'data-header',
  }

  public static MODS = {
    hidden: `${YxDialog.NAME}_hidden`,
  }

  public static define() {
    customElements.define(YxDialog.NAME, YxDialog, { extends: 'dialog' })
  }

  constructor() {
    super()

    this.show = this.show.bind(this)
    this.hide = this.hide.bind(this)
  }

  protected connectedCallback() {
    super.connectedCallback()

    const HTMLHeader = this.querySelector(YxDialog.SELECTORS.header)

    if (HTMLHeader) {
      HTMLHeader.textContent =
        this.getAttribute(YxDialog.DATA_SET.headerText) || ''
    }

    this.addSubscriptions()
  }

  public show(event?: Event) {
    if (event) {
      event.preventDefault()
    }

    const target = event?.target as HTMLElement

    const isButtonTrigger =
      target && target.getAttribute(YxDialog.DATA_SET.show) === this.id

    if (isButtonTrigger || !event) {
      this.showModal()

      return
    }
  }

  public hide(event?: MouseEvent) {
    if (event && !this.isOutsideClick(event)) {
      return
    }

    this.classList.add(YxDialog.MODS.hidden)

    setTimeout(this.hideAnimation.bind(this), YxDialog.ANIMATION_DURATION)
  }

  private hideAnimation() {
    this.classList.remove(YxDialog.MODS.hidden)

    this.close()
  }

  private isOutsideClick(event: MouseEvent) {
    const target = event.target as HTMLElement
    const closeButton = target.closest(`[${YxDialog.DATA_SET.hide}]`)

    const extraCloseButton = Array.from(
      this.querySelectorAll(`[${YxDialog.DATA_SET.hide}]`),
    ).find(closeElement => {
      const targetCloseButton = target.closest(`[${YxDialog.DATA_SET.hide}]`)

      return closeElement?.isSameNode(targetCloseButton)
    })

    const isChildHeader = this.querySelector(
      YxDialog.SELECTORS.header,
    )?.contains(target)

    const isChildContent = this.querySelector(
      YxDialog.SELECTORS.content,
    )?.contains(target)

    const isChildClick = isChildHeader || isChildContent

    const isCloseButton = Boolean(closeButton || extraCloseButton)

    if (isCloseButton) {
      return true
    }

    if (isChildClick) {
      return false
    }

    return true
  }

  private addSubscriptions() {
    document
      .querySelectorAll(`[${YxDialog.DATA_SET.show}]`)
      .forEach(HTMLShowTrigger => {
        this.subscribe('on', {
          eventName: 'click',
          element: HTMLShowTrigger,
          callback: this.show,
        })
      })

    this.querySelectorAll(`[${YxDialog.DATA_SET.hide}]`).forEach(
      HTMLHideTrigger => {
        this.subscribe('on', {
          eventName: 'click',
          element: HTMLHideTrigger,
          callback: this.hide,
        })
      },
    )

    this.subscribe('on', {
      eventName: 'click',
      callback: this.hide,
    })
  }
}
