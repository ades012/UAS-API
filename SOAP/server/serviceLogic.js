const db = require('../../db/database');

module.exports = {
  InventoryService: {
    InventoryPort: {
      getItemById: ({ id }) => {
        const row = db.prepare('SELECT * FROM items WHERE id = ?').get(id);
        return row ? { id: row.id, name: row.name } : { id: 0, name: 'Not Found' };
      }
    }
  }
};
