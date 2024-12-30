const express = require('express');
const { resolve } = require('path');

const app = express();
const port = 3000;

let person = {
  firstName: 'Anam',
  lastName: 'Javed',
  gender: 'female',
  age: 26,
  isMember: true,
};

app.get('/person', (req, res) => {
  res.json(person);
});

app.get('/fullname', (req, res) => {
  res.send(person.firstName + ' ' + person.lastName);
});

function getFullName(person) {
  return person.firstName + ' ' + person.lastName;
}
app.get('/person/fullname', (req, res) => {
  let fullName = getFullName(person);
  res.json({ fullName: fullName });
});

function getFirstName(person) {
  return person.firstName;
}

function getGender(person) {
  return person.gender;
}

app.get('/person/firstname-gender', (req, res) => {
  let firstName = getFirstName(person);
  let gender = getGender(person);
  res.json({ firstName: firstName, gender: gender });
});

function getFirstNameGender(person) {
  return { firstName: person.firstName, gender: person.gender };
}
app.get('/person/firstname-genderr', (req, res) => {
  let firstNameandGender = getFirstNameGender(person);
  res.json(firstNameandGender);
});

function getIncrementedAge(person) {
  let age = person.age + 1;
  person.age = age;

  return person;
}

app.get('/person/increment-age', (req, res) => {
  let incrementedAge = getIncrementedAge(person);
  res.json(incrementedAge);
});

function getFullNameMembership(person) {
  let fullname = person.firstName + ' ' + person.lastName;

  return { fullname: fullname, isMember: person.isMember };
}
app.get('/person/fullname-membership', (req, res) => {
  let fullnameMembership = getFullNameMembership(person);
  res.json(fullnameMembership);
});

function getDiscountedPrice(cartTotal, person) {
  if (person.isMember) {
    let discountedPrice = cartTotal - (10 / 100) * cartTotal;
    return discountedPrice;
  }
  return cartTotal;
}

app.get('/person/final-price', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let discountedPrice = getDiscountedPrice(cartTotal, person);
  res.json({ discountedPrice: discountedPrice });
});

function getshippingCost(cartTotal, isMember) {
  let shippingCost;
  if (isMember === true && cartTotal > 500) {
    shippingCost = 0;
  } else {
    shippingCost = 99;
  }
  return shippingCost;
}

app.get('/person/shipping-cost', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let shippingCost = getshippingCost(cartTotal, person.isMember);
  res.json({ shippingCost: shippingCost.toFixed(2) });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
