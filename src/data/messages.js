const messages = {
  symbol: [
    "<3"
  ],

  word: [
    "Amazing",
    "Awesome",
    "Beautiful",
    "Bingo",
    "Cool",
    "Delightful",
    "Eureka",
    "Excellent",
    "Fantastic",
    "Grand",
    "Great",
    "Incredible",
    "Lovely",
    "Magnificent",
    "Nice",
    "Spectacular",
    "Sweet",
    "Swell",
    "Terrific",
    "Tremendous",
    "Well done",
    "Whew",
    "Wonderful",
    "Woo-hoo",
    "Wow",
    "Yipee"
  ].map(word => `${word}!`),

  phrase: [
    "18 pages. Front and back!!",
    "A more creative person would've had cooler animations.",
    "Also try: literally any other game. It's guaranteed to be better than this one.",
    "Do you hear that? It's the sound of your sadness after realizing that you spent hours playing this.",
    "Don't stop playing. I need your love.",
    "I bet you don't even read these, do you?",
    "I could've used this message as free advertising space...",
    "I'm sorry if these messages have hurt your feelings.",
    "How long does it take you to complete a single puzzle? Disappointing.",
    "Listen to all of ABBA's songs. They're really good.",
    "My sandwich? MY SANDWICH?!?!",
    "Now if only I could get people to pay this much attention to me instead...",
    "Sais-tu parler français?",
    "Somebody once told me the world is gonna roll me.",
    "The music video for \"The Scientist\" by Coldplay is pretty good.",
    "These win messages are really the only reason to play.",
    "This game is the reason that I don't have a girlfriend.",
    "This is the most warmth I've ever felt.",
    "What is love? Baby don't hurt me.",
    "Woah, you're a pro at button-pressing.",
    "You could be out with friends, but instead, you're with me. Nice.",
    "Your happiness brings me happiness. Mostly.",
    "You're really pushing my buttons."
  ]
}

const winMessages = []

// This makes it super easy to add more groups in the future

for (const type of Object.keys(messages)) {
  const vals = messages[type]
  vals.forEach(text => winMessages.push({ type, text }))
}

export default winMessages
