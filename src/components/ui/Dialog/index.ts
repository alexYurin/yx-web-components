import WcBaseComponent from '@/components/ui/Base'

import template from './template.html?raw'
import urlStyles from './index.scss?url'

export type WcDialogSideModeType = 'left' | 'right' | 'default'

export default class WcDialog extends WcBaseComponent(
  'dialog',
  template,
  urlStyles,
) {
  // public static NAME = 'dialog'

  // public static JS_ROOT_SELECTOR = `${__PREFIX_JS__}${WcDialog.NAME}`

  public static get ACTIONS() {
    return {
      show: `${WcDialog.NAME}-show`,
      hide: `${WcDialog.NAME}-hide`,
    }
  }

  // public static DATA_SET = {
  //   id: 'data-dialog-id',
  // }

  // public static ATTRIBUTES = {
  //   show: 'show',
  //   side: {
  //     left: 'side-left',
  //     right: 'side-right',
  //   },
  // }

  // public static SELECTORS = {
  //   dialog: `.${WcDialog.JS_ROOT_SELECTOR}`,
  //   container: `.${WcDialog.JS_ROOT_SELECTOR}-container`,
  //   showTrigger: `.${WcDialog.JS_ROOT_SELECTOR}-show`,
  //   hideTrigger: `.${WcDialog.JS_ROOT_SELECTOR}-hide`,
  // }

  // public static MODS = {
  //   hidden: `${WcDialog.NAME}_hidden`,
  //   side: {
  //     left: `${WcDialog.NAME}_side_left`,
  //     right: `${WcDialog.NAME}_side_right`,
  //     default: `${WcDialog.NAME}_side_default`,
  //   },
  // }

  // public static ANIMATION_DURATION = 200

  // public static define() {
  //   customElements.define('wc-dialog', WcDialog)
  // }

  constructor() {
    super()

    // this.show = this.show.bind(this)
    // this.hide = this.hide.bind(this)

    // this.addSubscriptions()

    // this.setAttribute('role', 'dialog')

    // if (this.hasAttribute(WcDialog.ATTRIBUTES.show)) {
    //   this.show()
    // }
  }

  // protected showModal() {
  //   this.getDialogElement().showModal()
  // }

  // protected hideModal() {
  //   this.getDialogElement().close()
  // }

  // public getDialogElement() {
  //   return this.shadowRoot?.querySelector(
  //     WcDialog.SELECTORS.dialog,
  //   ) as HTMLDialogElement
  // }

  // public show(event?: Event) {
  //   if (event) {
  //     event.preventDefault()
  //   }

  //   const target = event?.target as HTMLElement

  //   const isButtonTrigger =
  //     target && target.getAttribute(WcDialog.DATA_SET.id) === this.id

  //   if (isButtonTrigger || !event) {
  //     this.showModal()
  //     this.scrollTo(0, 0)

  //     return
  //   }
  // }

  // public hide(event?: MouseEvent) {
  //   if (event && !this.isOutsideClick(event)) {
  //     return
  //   }

  //   if (event) {
  //     event.preventDefault()
  //     event.stopPropagation()
  //   }

  //   this.classList.add(WcDialog.MODS.hidden)

  //   setTimeout(this.hideAnimation.bind(this), WcDialog.ANIMATION_DURATION)
  // }

  // private hideAnimation() {
  //   this.classList.remove(WcDialog.MODS.hidden)

  //   this.hideModal()
  // }

  // private isOutsideClick(event: MouseEvent) {
  //   const target = event.target as HTMLElement
  //   const isContainerClick = Boolean(
  //     target.closest(WcDialog.SELECTORS.container),
  //   )
  //   const isHideButtonClick = Boolean(
  //     target.closest(WcDialog.SELECTORS.hideTrigger),
  //   )

  //   if (isContainerClick && !isHideButtonClick) {
  //     return false
  //   }

  //   return true
  // }

  // private addSubscriptions() {
  //   document
  //     .querySelectorAll(WcDialog.SELECTORS.showTrigger)
  //     .forEach(HTMLShowTrigger => {
  //       this.subscribe({
  //         eventName: 'click',
  //         element: HTMLShowTrigger,
  //         callback: this.show,
  //       })
  //     })

  //   this.subscribe({
  //     eventName: 'mousedown',
  //     callback: this.hide,
  //   })
  // }
}
