import positionsData from '../data/positions.json';

// Function to convert a string to PascalCase
export function convertToPascalCase(input) {
  // Remove accents and special characters
  const cleanedText = input
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9 ]/g, '')
    .toLowerCase();

  // Split words by spaces and convert to PascalCase
  const words = cleanedText.split(' ');
  const pascalCaseText = words
    .map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join('');

  return pascalCaseText;
}

export function getRandomNumber() {
  return Math.floor(Math.random() * (100000 - 1) + 1);
}

// Function to save token to local storage
export function saveUserToken(token) {
  localStorage.setItem('token', token);
}

// Function to get token from local storage
export function getUserToken() {
  return localStorage.getItem('token');
}

// Function to remove token from local storage
export function handleLogoutStorage() {
  localStorage.clear();
}

// Function to save user to local storage
export function saveUserData(user) {
  localStorage.setItem('user', JSON.stringify(user));
}

// Function to get user from local storage
export function getUserData() {
  return JSON.parse(localStorage.getItem('user'));
}

//Function to abbreviate player positions
export function abbreviatePosition(position) {
  const abbreviations = {
    Goalkeeper: 'GK',
    Defender: 'D',
    Midfielder: 'M',
    Forward: 'F',
  };

  return abbreviations[position] || 'F';
}

// Pick color based on background
export function pickTextColorBasedOnBgColorAdvanced(
  bgColor,
  lightColor,
  darkColor
) {
  var color = bgColor.charAt(0) === '#' ? bgColor.substring(1, 7) : bgColor;
  var r = parseInt(color.substring(0, 2), 16); // hexToR
  var g = parseInt(color.substring(2, 4), 16); // hexToG
  var b = parseInt(color.substring(4, 6), 16); // hexToB
  var uicolors = [r / 255, g / 255, b / 255];
  var c = uicolors.map((col) => {
    if (col <= 0.03928) {
      return col / 12.92;
    }
    return Math.pow((col + 0.055) / 1.055, 2.4);
  });
  var L = 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
  return L > 0.179 ? darkColor : lightColor;
}

export const getPlayingPositionById = (id) => {
  const position = positionsData.find((p) => p.id === id);
  return position ? position.abbreviated : null;
};

//Abbreviate player names
export function abbreviatePlayerName(name, maxLength = 8) {
  // Split the name into words
  const words = name.split(' ');

  if (words.length === 1 && words[0].length <= maxLength) {
    return words[0]; // Return the original name if it's within the limit
  } else {
    // Generate initials from the words
    const initials = words.map((word) => word.charAt(0)).join('');

    // Return initials if they are within the limit, otherwise truncate
    return initials.length <= maxLength
      ? initials
      : initials.substring(0, maxLength);
  }
}
