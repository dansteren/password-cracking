var bcrypt = require('bcrypt');
var fs = require('fs');

const saltRounds = 10;
let userIdCounter = 0;

function createPlaintextPasswords(strength) {
  switch (strength) {
    case 'very-weak':
      return ['01', '02', '03'];
    case 'weak':
      return ['04', '05', '06'];
    case 'good':
      return ['07', '08', '09'];
    case 'strong':
      return ['10', '11', '12'];
    case 'very-strong':
      return ['13', '14', '15'];
    default:
      return ['example', 'AnOtHeR', 'L@$tOn,e'];
  }
}

function generateEntry(password) {
  userIdCounter++;
  const username = 'user' + userIdCounter;
  const userId = 1000 + userIdCounter;
  const passwordHash = bcrypt.hashSync(password, saltRounds);
  const groupdId = userId;
  const userInfo = 'Test User' + userIdCounter + ',,,';
  const homeDirectory = '/home/' + username;
  const defaultCommand = '/bin/bash';

  return [
    username,
    passwordHash,
    userId,
    groupdId,
    userInfo,
    homeDirectory,
    defaultCommand
  ].join(':');
}

const strengths = ['very-weak', 'weak', 'good', 'strong', 'very-strong'];
strengths.forEach((strength, i) => {
  const passwords = createPlaintextPasswords(strength);
  const entries = passwords.map(password => generateEntry(password));
  fs.writeFileSync(`outputs/${i + 1}-${strength}.txt`, entries.join('\n'));
});
