let bloqueos = 0
let overflowOriginal = String()

export function bloquearScroll() {
  if (bloqueos === 0) overflowOriginal = document.body.style.overflow
  bloqueos += 1
  document.body.style.overflow = 'hidden'
}

export function liberarScroll() {
  bloqueos -= 1
  if (bloqueos === 0) document.body.style.overflow = overflowOriginal
}
