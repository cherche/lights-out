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
    'Wow',
    'Yipee'
  ].map(word => `${word}!`),

  phrase: [
    'I hope you appreciate these messages. They took time to make.',
    'I love you. Sorry, too soon?',
    'Please share with your friends. I need love.',
    'The reason that I don\'t have a girlfriend is this game ... among others.',
    'This is the most warmth I\'ve ever felt.'
  ]
}

let winMessages = ''

// This makes it super easy to add more groups in the future

for (const type of Object.keys(messages)) {
  const vals = messages[type]

  vals.forEach(text => winMessages += `{<br>  type: '${type}',<br>  text: '${text}'<br>},<br>`)
}

document.write(`<pre>${winMessages}</pre>`)
