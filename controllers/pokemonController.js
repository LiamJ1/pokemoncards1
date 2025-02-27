const {Pokemon} = require('../models')
const types = ['Grass', 'Fire', 'Water', 'Fairy', 'Ice', 'Bug', 'Dragon', 'Ghost', 'Poison','Dark', 'Rock', 'Electric', 'Ground'];
module.exports.viewAll = async function(req, res, next) {
    let searchTypes = ['All'];
    for(let i = 0; i<types.length; i++) {
        searchTypes.push(types[i]);
    }
    let pokemons;
    let searchType = req.query.type || 'All';
    let searchRandom = req.query.random || false;
    if (searchType==='All'){
        pokemons = await Pokemon.findAll();
    } else {
        pokemons = await Pokemon.findAll({
            where: {
                type: searchType
            }
        });
    }
    if (pokemons.length > 0) {
        let randomIndex = getRandomInt(pokemons.length);
        pokemons = [pokemons[randomIndex]];
    }
    res.render('index', {pokemons, types:searchTypes, searchType, searchRandom});
}

module.exports.renderEditForm = async function(req, res, next) {
    const pokemon  = await Pokemon.findByPk(
        req.params.id
    );
    res.render('edit', {pokemon, types});
}

module.exports.updatePokemon = async function(req, res) {
    await Pokemon.update(
        {
            id: req.body.id,
            name: req.body.name,
            health: req.body.health,
            image: req.body.image,
            type: req.body.type,
            attackone: req.body.attackone,
            attacktwo: req.body.attacktwo,
            attackonecost: req.body.attackonecost,
            attacktwocost: req.body.attacktwocost,
        },
        {
            where:
                {
                    id: req.params.id
                }
        });
    res.redirect('/');
}

module.exports.deletePokemon = async function(req, res) {
    await Pokemon.destroy({
        where: {
            id: req.params.id
        }
    });
    res.redirect('/');
}

module.exports.renderAddForm = function(req, res) {
    const pokemon = {
        name: "",
        health: "",
        image: "",
        type: types[0],
        attackone: "",
        attacktwo: "",
        attackonecost: "",
        attacktwocost: "",
    };
    res.render('add', {pokemon, types});
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}