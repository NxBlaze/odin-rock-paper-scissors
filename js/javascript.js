let selectedPlay;

function computerPlay() {
  let randomPlay = Math.floor(Math.random() * 3) + 1;
  switch (randomPlay) {
    case 1:
      selectedPlay = `Rock`;
      break;
    case 2:
      selectedPlay = `Paper`;
      break;
    case 3:
      selectedPlay = `Scissors`;
      break;
    default:
      selectedPlay = `Houston, we have a problem.`;
  }
  return selectedPlay;
}

console.log(computerPlay());
