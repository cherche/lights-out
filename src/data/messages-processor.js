function process (messages) {
  let winMessages = ''

  // This makes it super easy to add more groups in the future

  for (const type of Object.keys(messages)) {
    const vals = messages[type]

    vals.forEach((rawText) => {
      text = rawText.split('\'').join('\\\'')

      winMessages += `{<br>  type: "${type}",<br>  text: "${text}"<br>},<br>`
    })
  }

  return winMessages
}

document.write(`<pre>${process(messages)}</pre>`)
