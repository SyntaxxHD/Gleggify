const images = []

const applyOverlay = (thumbnailElement, overlayImageUrl, flip) => {
  const overlayImage = document.createElement('img')
  overlayImage.src = overlayImageUrl
  overlayImage.style.position = 'absolute'
  overlayImage.style.top = '0'
  overlayImage.style.left = '0'
  overlayImage.style.width = '100%'
  overlayImage.style.height = '100%'
  overlayImage.style.zIndex = '0'
  overlayImage.style.filter = 'drop-shadow(0px 0 10px black)'

  if (flip) {
    overlayImage.style.transform = 'scaleX(-1)'
  }

  thumbnailElement.style.position = 'relative'
  thumbnailElement.parentElement.appendChild(overlayImage)
}

const applyOverlayToThumbnails = () => {
  const elementQuery = 'ytd-thumbnail:not(.ytd-video-preview, .ytd-rich-grid-slim-media) a > yt-image > img.yt-core-image:only-child:not(.yt-core-attributed-string__image-element)'
  const thumbnailElements = document.querySelectorAll(elementQuery)

  thumbnailElements.forEach(thumbnailElement => {
    const overlayImageUrl = getRandomImageFromDirectory()
    const flip = Math.random() < 0.25
    applyOverlay(thumbnailElement, overlayImageUrl, flip)
  })
}

const getRandomImageFromDirectory = () => {
  const randomIndex = Math.floor(Math.random() * images.length)
  return images[randomIndex]
}

const imageList = ['augenbrauenmire', 'coolmire', 'ekelmire', 'ernstmire', 'erstauntmire', 'schreimire', 'süssmire', 'schlatzmire']

const loadImages = async () => {
  for (const imageName of imageList) {
    const testedURL = chrome.runtime.getURL(`images/${imageName}.png`)

    try {
      await fetch(testedURL)
      images.push(testedURL)
    } catch (error) {
      console.error('Error loading image:', error)
    }
  }
}

loadImages().then(() => {
  setInterval(applyOverlayToThumbnails, 100)
})
