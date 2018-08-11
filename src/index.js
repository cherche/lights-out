import Elem from './js/element.js'
import Controller from './controller.js'

const $body = document.body

// Build the skeleton of the app (nothing interactive)
const $tbody = Elem('tbody')
const $main = Elem('div', {
  attr: { className: 'main flex-container' },
  children: [
    Elem('table', {
      attr: { id: 'game' },
      children: [$tbody]
    })
  ]
})

const $winMessage = Elem('h1', {
  attr: { className: 'win-message' }
})
const $win = Elem('div', {
  attr: { className: 'win flex-container' },
  children: [$winMessage]
})

// Order matters
$body.appendChild($main)
$body.appendChild($win)

// Disable touch scroll
document.addEventListener('touchmove', e => e.preventDefault())

window.c = Controller({ $body, $tbody, $winMessage })
