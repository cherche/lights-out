export default function PressHandler (el, handler) {
  const pressHandler = {
    el,
    active: true
  }

  const conditionedHandler = (e) => {
    if (!pressHandler.active) return
    handler(e)
  }

  const touchHandler = (e) => {
    // In the case of a touchstart, we do not wish
    // to also trigger the click event
    e.preventDefault()
    conditionedHandler(e)
  }

  pressHandler.bind = () => {
    el.addEventListener('mousedown', conditionedHandler)
    el.addEventListener('touchstart', touchHandler)
  }

  pressHandler.unbind = () => {
    el.removeEventListener('mousedown', conditionedHandler)
    el.removeEventListener('touchstart', touchHandler)
  }

  pressHandler.bind()

  return pressHandler
}
