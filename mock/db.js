const faker = require('faker');
const _ = require('lodash');
const { NUMBER_OF_HERO, NUMBER_OF_VILLAIN } = require('./counts');

const heroes = _.times(NUMBER_OF_HERO, n => ({
  id: n,
  name: faker.fake('{{name.lastName}}, {{name.firstName}} {{name.suffix}}'), // faker.name.findName(),
  email: faker.internet.email(),
  avatar: faker.internet.avatar()
}));
const villains = _.times(NUMBER_OF_VILLAIN, n => ({
  id: n,
  name: faker.fake('{{name.lastName}}, {{name.firstName}} {{name.suffix}}'), // faker.name.findName(),
  email: faker.internet.email(),
  avatar: faker.internet.avatar()
}));

module.exports = (req, res, next) => ({
  heroes,
  villains
});
