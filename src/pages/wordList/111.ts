const wordContainer = document.querySelectorAll('.word-container') as NodeListOf<HTMLElement>;

wordContainer.forEach((el: HTMLElement) => el.addEventListener('click', markWordBlock));

function markWordBlock(event: MouseEvent) {
  if (!(event.target instanceof HTMLDivElement)) { return; }

  const wordContainer = document.querySelectorAll('word-container') as NodeListOf<HTMLElement>;
  wordContainer.forEach((el) => el.classList.remove('word-container-active'));

  event.target.classList.add('word-container-active');
}

// const soundBtn = document.querySelector('.word-sound-svg') as HTMLElement;
// soundBtn.addEventListener('click', playWordAudio);

// // export function playWordAudio() {

    

// // }
 
