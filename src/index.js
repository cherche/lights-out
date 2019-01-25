import Elem from './js/element.js'
import Controller from './controller.js'
import KeyFriend from './key-friend.js'

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

const controller = Controller({ $body, $tbody, $winMessage })
// Technically, we could save our KeyFriend "instance" in a variable,
// but it's not like we actually care about enabling and disabling it
KeyFriend(controller)

// That's right. We're going to leak the controller to global scope
window.c = controller
