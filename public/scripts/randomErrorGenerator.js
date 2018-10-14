const errZero = [
  "Oops. You probably meant to say something.",
  "Surely, you've got a thought in there somewhere.",
  "To chirp, first type a chirp, then hit 'chirp.'",
  "Try again, but say something this time.",
  "Someone is trigger-happy! Try again, but with an actual chirp.",
  "You forgot to say a thing. Say a thing."
  ]

const errTooMuch = [
  "Stop. No one's got time for all that!",
  "140 characters or less, or it's not a chirp!",
  "Try getting to the point sooner.",
  "Nope. Nope. Nope. Too many words.",
  "Try this again, but with more focus: 140 chars or less.",
  "100% of successful chirps get to the point in 140 chars or less. We only host successful chirps.",
  "Whoa! That's, like, way too many characters.",
  "Please just say the important bit and leave the rest to a less discriminating audience."
]

let randErr = function(arr) {
  let x=0;
  for (let i = 0; i < arr.length; i++) {
    x = Math.floor((Math.random() * arr.length));
  }
  return arr[x];
}