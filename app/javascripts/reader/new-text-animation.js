import TweenLite from 'gsap/TweenLite'
require('gsap/CSSPlugin')

export default function newTextAnimation (elt) {
  TweenLite.fromTo(elt, 1.5,
    {backgroundColor: 'rgba(255, 255, 0, 1)'},
    {backgroundColor: 'rgba(255, 255, 0, 0)', ease: Power0.easeIn} // eslint-disable-line no-undef
  )
}
