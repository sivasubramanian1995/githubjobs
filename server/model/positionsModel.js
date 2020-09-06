
const knex = require('../knex');

exports.dbcheck = () => {
    console.log(knex)
}
exports.create = async (data) => {
    await knex('position').truncate()
    data.map(val => {
        knex('position').insert(val).then( function (result) {
            console.log('Inserted')
         }).catch( err => {
            console.log(err)
         })
    })
}

exports.fetch = async () => {
    return knex.select('*').from('position')
}