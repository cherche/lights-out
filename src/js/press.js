export default function PressHandler (el, handler) {
  const touchHandler = (e) => {
    // In the case of a touchstart, we do not wish
    // to also trigger the click event
    e.stopPropagation()
    e.preventDefault()
    handler(e)
  }

  return {
    el,
    bind: () => {
      el.addEventListener('click', handler)
      el.addEventListener('touchstart', touchHandler)
    },
    unbind: () => {
      el.removeEventListener('click', handler)
      el.removeEventListener('touchstart', touchHandler)
    }
  }
}
