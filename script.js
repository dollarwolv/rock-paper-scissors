const allButtons = document.querySelectorAll('.buttons button');
var isAnimating = false

function playAnimation(elementId, onCallback) {
  var elem = document.getElementById(elementId);
  let pos = 0;
  let frameCounter = 0;

  const id = setInterval(frame, 2);

  function frame() {
    if (frameCounter == 320) {
      clearInterval(id);

      if (onCallback){
        onCallback();
        return;
      }
    }

    let blockNumber = Math.floor(frameCounter / 40);
    
    if (blockNumber % 2 === 0) {
        pos++;
    } else {
        pos--;
    }

    elem.style.transform = `translateY(-${pos}px)`; 
    frameCounter++;
  }
}

allButtons.forEach(button => {
    // For each button, we add a 'click' event listener
    button.addEventListener('click', function() {
        if (isAnimating) {
            console.log("Animation in progress, please wait.");
            return;
        }

        isAnimating = true
        
        console.log(this.className + ' button was clicked!'); // 'this' refers to the button that was clicked

        // --- BONUS: VISUALLY DISABLE BUTTONS ---
        allButtons.forEach(btn => {
            btn.disabled = true;
            // Optional: Change the style to make it look disabled.
            btn.style.opacity = '0.5'; 
        });

        playAnimation('player-img');
        playAnimation('computer-img', function() {
            console.log("Animation finished!");
            isAnimating = false

            allButtons.forEach(btn => {
            btn.disabled = false;
            btn.style.opacity = '0.5'; 
            });
        });
        
    });
});