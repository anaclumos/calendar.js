const html = (s, ...args) =>
  s.map((ss, i) => `${ss}${args[i] || ''}`).join('')
