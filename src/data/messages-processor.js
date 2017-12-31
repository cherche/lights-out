/*
function process (messages) {
  let winMessages = ''

  // This makes it super easy to add more groups in the future

  for (const type of Object.keys(messages)) {
    const vals = messages[type]

    vals.forEach((rawText) => {
      const text = rawText.split('\'').join('\\\'')

      winMessages += `{<br>  type: '${type}',<br>  text: '${text}'<br>},<br>`
    })
  }

  return winMessages
}
*/

// Open up a blank HTML file, run the following, and copy it into messages-processed.js

// document.write(`<pre>${process(messages)}</pre>`)

// If only there were a way to streamline it, though...
