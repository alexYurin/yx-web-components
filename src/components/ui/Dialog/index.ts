import YxBaseComponent from '@/components/ui/Base'
import template from './template.html?raw'
import './index.scss'

export const NAME = 'dialog'

export type YxDialogSideName = 'left' | 'right' | 'default'

export default class YxDialog extends YxBaseComponent(
  NAME,
  template,
  HTMLDialogElement,
) {
  public static ANIMATION_DURATION = 200

  public static ACTIONS = {
    show: `${YxDialog.JS_NAME}-show`,
    hide: `${YxDialog.JS_NAME}-hide`,
  }

  public static DATA_SET = {
    id: 'data-dialog-id',
    show: 'data-show',
    side: 'data-side',
    headerText: 'data-header',
  }

  public static SELECTORS = {
    header: `.${YxDialog.JS_NAME}-header`,
    headerText: `.${YxDialog.JS_NAME}-header-text`,
    wrapper: `.${YxDialog.JS_NAME}-wrapper`,
    content: `.${YxDialog.JS_NAME}-content`,
    showTrigger: `.${YxDialog.JS_NAME}-show`,
    hideTrigger: `.${YxDialog.JS_NAME}-hide`,
  }

  public static MODS = {
    hidden: `${YxDialog.NAME}_hidden`,
    side: {
      left: `${YxDialog.NAME}_side_left`,
      right: `${YxDialog.NAME}_side_right`,
      default: `${YxDialog.NAME}_side_default`,
    },
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

    const HTMLHeaderText = this.querySelector(YxDialog.SELECTORS.headerText)

    if (HTMLHeaderText) {
      HTMLHeaderText.textContent =
        this.getAttribute(YxDialog.DATA_SET.headerText) || ''
    }

    const sideName = this.getAttribute(
      YxDialog.DATA_SET.side,
    ) as YxDialogSideName

    this.classList.add(
      YxDialog.MODS.side[sideName] || YxDialog.MODS.side['default'],
    )

    this.addSubscriptions()

    if (this.hasAttribute(YxDialog.DATA_SET.show)) {
      this.show()
    }
  }

  public show(event?: Event) {
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

    this.close()
  }

  private isOutsideClick(event: MouseEvent) {
    const target = event.target as HTMLElement
    const isContentClick = Boolean(target.closest(YxDialog.SELECTORS.wrapper))
    const isHideButtonClick = Boolean(
      target.closest(YxDialog.SELECTORS.hideTrigger),
    )

    if (isContentClick && !isHideButtonClick) {
      return false
    }

    return true
  }

  private addSubscriptions() {
    document
      .querySelectorAll(YxDialog.SELECTORS.showTrigger)
      .forEach(HTMLShowTrigger => {
        this.subscribe('on', {
          eventName: 'click',
          element: HTMLShowTrigger,
          callback: this.show,
        })
      })

    this.subscribe('on', {
      eventName: 'click',
      callback: this.hide,
    })
  }
}
