// Turn off ESLint for this file because it's sent down to users as-is.
/* eslint-disable */
if (
  document.readyState === 'complete' ||
  (document.readyState !== 'loading' && !document.documentElement.doScroll)
) {
  onReady();
} else {
  document.addEventListener('DOMContentLoaded', onReady);
}

function onReady() {
  document
    .querySelectorAll('.post article h2')
    .forEach((el, i) => el.classList.add(`after${i % 6}`));
}
