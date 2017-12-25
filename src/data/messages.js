const messages = {
  symbol: [
    '<3'
  ],

  word: [
    'Amazing',
    'Awesome',
    'Beautiful',
    'Bingo',
    'Delightful',
    'Eureka',
    'Excellent',
    'Fantastic',
    'Grand',
    'Great',
    'Incredible',
    'Lovely',
    'Nice',
    'Spectacular',
    'Sweet',
    'Swell',
    'Terrific',
    'Tremendous',
    'Well done',
    'Whew',
    'Wonderful',
    'Woo-hoo',
    'Wow',
    'Yipee'
  ].map(word => `${word}!`),

  phrase: [
    'Also try: literally any other game. It\'s guaranteed to be better than this one.',
    'Could you please share this with your friends? I need love.',
    'Do you hear that? It\'s the sound of your sadness after realizing that you spent hours playing this.',
    'I bet you don\'t even read these, do you?',
    'I\'m sorry if these messages have hurt your feelings.',
    'My sandwich? MY SANDWICH?!?!',
    'Now if only I could get people to pay this much attention to me instead...',
    'The music video for "The Scientist" by Coldplay is pretty good.',
    'This game is the reason that I don\'t have a girlfriend.',
    'This is the most warmth I\'ve ever felt.',
    'Woah, you\'re a pro at button-pressing.',
    'Your happiness brings me happiness. Mostly.'
  ]
}

const winMessages = []

// This makes it super easy to add more groups in the future

for (const type of Object.keys(messages)) {
  const vals = messages[type]
  vals.forEach(text => winMessages.push({ type, text }))
}

export default winMessages
