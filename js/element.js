export default function Elem (name, attr) {
  const el = document.createElement(name)

  if (typeof attr === 'object') {
    for (const key of Object.keys(attr)) {
      const val = attr[key]
      el[key] = val
    }
  }

  return el
}
