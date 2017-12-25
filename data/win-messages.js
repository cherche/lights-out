const symbols = [
  '<3'
].map(symbol => ({
  type: 'symbol',
  text: `${symbol}`
}))

const words = [
  'Amazing',
  'Beautiful',
  'Bingo',
  'Delightful',
  'Eureka',
  'Excellent',
  'Fantastic',
  'Grand',
  'Great',
  'Incredible',
  'Nice',
  'Spectacular',
  'Swell',
  'Terrific',
  'Tremendous',
  'Well done',
  'Whew',
  'Wonderful',
  'Wow',
  'Yipee'
].map(word => ({
  type: 'word',
  text: `${word}!`
}))

const phrases = [
  'I hope you appreciate these messages. They took time to make.',
  'Please share with your friends. I need love.',
  'This game is the reason that I don\'t have a girlfriend ... among many.',
  'This is the most warmth I\'ve ever felt.'
].map(phrase => ({
  type: 'phrase',
  text: `${phrase}`
}))

const winMessages = [].concat(symbols, words, phrases)

export default winMessages
