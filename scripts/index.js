let dateExe = document.getElementById('date-exe');
let clickCount = 0;
let dialog = document.getElementById('dialog');
dialog.style.display = 'none'; // Initially hide the dialog box
dialog.classList.add('dialog');
document.body.style.userSelect = 'none';

const dateSuggestions = [
  "Been thinking about it—up for hanging out?",
  "Mind if I suggest we grab a meal together?",
  "Considering asking—wanna go out sometime?",
  "Contemplating this—care to join me for coffee?",
  "I've been meaning to ask—dinner date, perhaps?",
  "Considering a casual outing—interested?",
  "Hey, how about we go for a drink sometime?",
  "Been wanting to ask—fancy a casual meet-up?",
  "Contemplating a casual date—your thoughts?",
  "Thinking of suggesting a casual dinner. Intrigued?",
  "Been tossing this idea around—up for a casual date?",
  "Pondering a casual coffee or tea date. What say you?",
  "Been thinking about this—interested in a casual outing?",
  "Considering asking—wanna grab a bite sometime?",
  "How about we turn our chats into a face-to-face meet-up?",
  "Contemplating this—interested in a casual dinner?",
  "Mind if I suggest we go out for a casual activity?",
  "Considering a casual date—would you be up for it?",
  "Been pondering this idea—up for a casual meet-up?",
  "How about turning our virtual connection into a real one?",
  "Contemplating this—interested in a casual coffee date?",
  "Thinking of asking—would you be interested in a casual outing?",
  "Been tossing around the idea—up for a casual date?"
];

function getRandomDateSuggestion() {
  var randomIndex = Math.floor(Math.random() * dateSuggestions.length);
  var suggestion = dateSuggestions[randomIndex];

  // Update the dialog box
  var dialogText = document.querySelector(".dialog p");
  dialogText.textContent = suggestion;

  return suggestion;
}



dateExe.addEventListener('click', function() {
  clickCount++;
  if (clickCount === 2 && dialog.style.display !== 'block') {
    // Change the cursor to loading mode
    document.body.style.cursor = 'wait';
    // After a delay of 1 second, show the dialog box and reset the cursor
    setTimeout(function() {
      let rect = dateExe.getBoundingClientRect();
      // Position the dialog box below date.exe
      dialog.style.position = 'absolute';
      dialog.style.left = `${rect.left}px`;
      dialog.style.top = `${rect.bottom}px`;
      dialog.style.display = 'block';
      dialog.style.opacity = '1'; // Reset the opacity
      document.body.style.cursor = 'default';
      getRandomDateSuggestion();
      getRandomCatGif();



      // Reset the position of the "No" button
      noButton.style.position = 'static';
      noButton.style.left = 'auto';
      noButton.style.top = 'auto';
    }, 1000);
    // Reset the click count
    clickCount = 0;
  }
});

dialog.addEventListener('mousedown', function(event) {
    let shiftX = event.clientX - dialog.getBoundingClientRect().left;
    let shiftY = event.clientY - dialog.getBoundingClientRect().top;

    dialog.style.position = 'absolute';
    dialog.style.zIndex = 1000;

    function moveAt(pageX, pageY) {
        dialog.style.left = pageX - shiftX + 'px';
        dialog.style.top = pageY - shiftY + 'px';
    }

    function onMouseMove(event) {
        moveAt(event.pageX, event.pageY);
    }

    document.addEventListener('mousemove', onMouseMove);

    dialog.onmouseup = function() {
        document.removeEventListener('mousemove', onMouseMove);
        dialog.onmouseup = null;
    };
});

// JavaScript for moving "No" button away from cursor
let noButton = document.getElementById('no');

noButton.addEventListener('mouseover', function(e) {
  noButton.style.cursor = 'not-allowed';

  // Calculate the new position of the button, ensuring it doesn't move more than 50px away from its current position
  let randomX = noButton.offsetLeft + (Math.random() * 320 - 160);
  let randomY = noButton.offsetTop + (Math.random() * 320 - 160);

  noButton.style.position = 'absolute';
  noButton.style.left = `${randomX}px`;
  noButton.style.top = `${randomY}px`;
  let yesButton = document.getElementById('yes'); // Replace 'yes' with the actual id of your "Yes" button
  yesButton.style.position = 'relative'
});
function minimizeDialog() {
  let dialog = document.getElementById('dialog');
  dialog.style.height = '30px'; // or any other minimal height
}

function maximizeDialog() {
  let dialog = document.getElementById('dialog');
  dialog.style.width = 'calc(100% - 4px)'; // Subtract the left and right padding
  dialog.style.height = 'calc(100% - 4px)'; // Subtract the top and bottom padding
  dialog.style.left = '0';
  dialog.style.top = '0';
}
function closeDialog() {
  let dialog = document.querySelector('.dialog');

  // Change the opacity to 0 to start the fade-out effect
  dialog.style.opacity = '0';

  // After the transition ends, hide the dialog box
  setTimeout(function() {
    dialog.style.display = 'none';
  }, 500); // This should match the duration of the transition in your CSS
}
dialog.addEventListener('mouseover', function() {
  let heart = document.createElement('img');
  heart.src = 'https://img.icons8.com/water-color/50/pixel-heart.png';
  heart.style.position = 'absolute';
  heart.style.pointerEvents = 'none';
  heart.style.width = '50px';
  heart.style.height = '50px';

  // Generate random positions for the hearts
  let randomX = Math.random() * window.innerWidth;
  let randomY = Math.random() * window.innerHeight;

  heart.style.left = `${randomX}px`;
  heart.style.top = `${randomY}px`;
  heart.style.zIndex = 0; // Make the hearts appear below the dialog box
  document.body.appendChild(heart);

  // Animate the heart to fall down
  let animation = heart.animate([
    { transform: 'translateY(0px)', opacity: 1 },
    { transform: 'translateY(100px)', opacity: 0 }
  ], {
    duration: 2000, // 2 seconds
    easing: 'ease-out'
  });

  // Remove the heart when the animation ends
  animation.onfinish = function() {
    document.body.removeChild(heart);
  };
});


function updateClock() {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const seconds = now.getSeconds().toString().padStart(2, '0');
  document.getElementById('clock').textContent = `${hours}:${minutes}:${seconds}`;
}

setInterval(updateClock, 1000);


document.addEventListener('mousemove', function(e) {
  if (Math.random() < 0.1) { // Adjust spawn rate as needed
      const heart = document.createElement('div');
      heart.className = 'heart';
      heart.style.left = `${e.pageX}px`;
      heart.style.top = `${e.pageY}px`;
      document.body.appendChild(heart);
      setTimeout(() => heart.remove(), 2000); // Remove after 2 seconds
  }
});

// JavaScript for the "Yes" button
// send a webhook to discord with the message "she said Yes" and ip information of the person that clicked the button using ipgrabber also send me more information about the person that clicked the button

let yesButton = document.getElementById('yes');
yesButton.addEventListener('click', function() {
  document.body.innerHTML = '';
  let thanksMessage = document.createElement('div');
  thanksMessage.id = 'thanks-message';
  thanksMessage.textContent = "Sweet! Can't wait for it . Any idea where you'd like to go let me know !?";
  thanksMessage.style.zIndex = '1000';
  thanksMessage.style.fontWeight = 'bold';
  document.body.appendChild(thanksMessage);
  thanksMessage.style.display = 'block';
  document.body.className = 'romantic-lighting fade-in';
  fillPageWithAnimatedHeartsAndFlowers();
});


window.onload = function() {
  getRandomCatGif(); // Load the cat gif
  document.getElementById('splash-screen').style.display = 'none';
};


// Function to get a random cat gif from the Giphy API
function getRandomCatGif() {
  // Replace 'YOUR_GIPHY_API_KEY' with your actual Giphy API key
  var url = 'https://api.giphy.com/v1/gifs/random?api_key=nwXLar3835qmjCedTsva4jS36NwgOsA0&tag=cat smile&rating=g';

  fetch(url)
    .then(response => response.json())
    .then(data => {
      var catGifid = data.data.id;
      var catGifUrl = `https://i.giphy.com/${catGifid}.webp`;
      // Change the cat gif
      var catGifElement = document.querySelector(".dialog .cat-gif");
      catGifElement.src = catGifUrl;
    })
    .catch(error => console.error('Error:', error));
}
function createAnimatedElement(className) {
  let element = document.createElement('div');
  element.className = className + ' ' + className + '-' + Math.floor(Math.random() * 3 + 1); // Add different classes for different animation patterns
  element.style.left = `${Math.random() * window.innerWidth}px`;
  element.style.top = `${Math.random() * window.innerHeight}px`;
  element.style.animationDuration = `${Math.random() * 2 + 3}s`; // Random duration between 3 and 5 seconds
  element.style.animationDelay = `${Math.random() * 2}s`; // Random delay between 0 and 2 seconds
  element.style.animationDuration = `${Math.random() * 5 + 5}s`;
  element.style.animationIterationCount = 'infinite';
  document.body.appendChild(element);
}


function fillPageWithAnimatedHeartsAndFlowers() {
  for (let i = 0; i < 100; i++) { // Adjust the number of hearts and flowers as needed
    createAnimatedElement('end_heart');
    createAnimatedElement('end_flower');
  }
  // Display the  message after 2 seconds
  setTimeout(function() {
    let thanksMessage = document.getElementById('thanks-message');
    thanksMessage.style.display = 'block';
    thanksMessage.style.zIndex = '1000';
    createAnimatedElement('end_heart');
    createAnimatedElement('end_flower');
  }, 100);
}