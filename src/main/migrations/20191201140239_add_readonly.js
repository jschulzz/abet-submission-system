
exports.up = function(knex) {
    return knex.schema.table('portfolio', function(p) {
        p.boolean('readonly').notNull().defaultTo(false);
    });
};

exports.down = function(knex) {
    return knex.schema.table('portfolio', function(p) {
        p.dropColumn('readonly');
    });
};
