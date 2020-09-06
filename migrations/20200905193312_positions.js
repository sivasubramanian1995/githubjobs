
exports.up = function(knex) {
    return knex.schema.createTableIfNotExists('position', function (table){
        table.string('id').primary()
        table.string('type')
        table.string('url')
        table.string('created_at')
        table.string('company')
        table.string('company_url')
        table.string('location')
        table.string('title')
        table.string('description')
        table.string('how_to_apply')
        table.string('company_logo')
      })
    
};

exports.down = function(knex) {
    return knex.schema.dropTable('position')
};
