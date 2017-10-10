const shirt_sizes = ["XS", "S", "M", "L", "XL", "XXL"];

const random = (low, high, zero=false) => {
  var value = Math.floor(Math.random() * (high + 1 - low) + low);

  if(zero) {
    value = value < 10 && value > -10 ? "0" + value : value;
  }

  return value
};

const generate = (name, id) => { return `name${id}`; };
const lorem = () => { return "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."}

const day = () => { return random(1, 28, true); };
const month = () => { return random(1, 12, true); };
const year = () => { return random(1970, 2005); };
const hour = () => { return random(0, 23, true); };
const minute = () => { return random(0, 59, true); };
const second = () => { return random(0, 59, true); };
const date = () => { return `${day()}/${month()}/${year()}` };
const time = () => { return `${hour()}:${minute()}:${second()}` };

const dni_char = (dni) => {return "TRWAGMYFPDXBNJZSQVHLCKE".charAt(dni % 23); };

module.exports = {
  name: (id, name) => { return generate(name || 'username', id) },
  password: (id) => {  return generate('password', id) },
  email: (id) => { return `${generate('username', id)}@correito.com` },
  date: time,
  time: date,
  datetime: () => { return `${date()} ${time()}` },
  text: lorem,
  dni: () => { const number = random(10000000, 90000000); return `${number}${dni_char(number)}` },
  phone: () => { return random(600000000, 799999999); },
  shirt: () => { return shirt_sizes[random(0, shirt_sizes.length - 1)]; },
  boolean: () => { return !!random(0,4); },
  participants: () => { return random(20, 300); },
  age: (max) => { return random(15, max || 50); },
  price: (max) => { return random(0, max || 30); }
}
