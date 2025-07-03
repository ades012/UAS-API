const db = require('../../db/database');

module.exports = {
  InventoryService: {
    InventoryPort: {
      getItemById: ({ id }) => {
        const itemId = parseInt(id);
        const row = db.prepare('SELECT * FROM items WHERE id = ?').get(itemId);
        return row ? { id: row.id, name: row.name } : { id: 0, name: 'Not Found' };
      },
      getAllItems: () => {
        const rows = db.prepare('SELECT id, name FROM items').all();
        return { items: rows };
        },
      addItem: ({ name }) => {
        const stmt = db.prepare('INSERT INTO items (name) VALUES (?)');
        const result = stmt.run(name);
        return { id: result.lastInsertRowid, name };
        },
      deleteItem: ({ id }) => {
        const itemId = parseInt(id);
        const result = db.prepare('DELETE FROM items WHERE id = ?').run(itemId);
        return { success: result.changes > 0 };
        }
    }
  }
};
