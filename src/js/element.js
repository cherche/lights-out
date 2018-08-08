export default function Elem (name, opts = {}) {
  const el = document.createElement(name)

  const { attr, children } = opts

  if (typeof attr === 'object') {
    for (const key of Object.keys(attr)) {
      const val = attr[key]
      el[key] = val
    }
  }

  if (Array.isArray(children)) children.forEach(child => el.appendChild(child))

  return el
}
