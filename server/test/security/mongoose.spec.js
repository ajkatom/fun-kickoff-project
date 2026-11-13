const assert = require('assert');
const mongoose = require('mongoose');
const User = require('../../models/User');

describe('Mongoose security upgrade', () => {
  it('retains normal user validation and casting', () => {
    const user = new User({ username: 'test', email: 'test@example.com', password: 'test' });
    assert.strictEqual(user.validateSync(), undefined);
    assert(user.register_date instanceof Date);
    assert(new User({ username: 'test' }).validateSync().errors.email);
  });

  it('does not overwrite inherited methods when constructing documents', () => {
    const Model = mongoose.model('SecurityRegression', new mongoose.Schema({ name: String }, { strict: false }));
    const doc = new Model(JSON.parse('{"name":"ok","toString":{"polluted":"yes"}}'));
    assert.strictEqual(doc.name, 'ok');
    assert.strictEqual(typeof doc.toString, 'function');
    assert.strictEqual(Object.prototype.toString.polluted, undefined);
  });

  it('rejects prototype traversal in virtual paths', () => {
    assert.throws(() => new mongoose.Schema().virtual('__proto__.polluted'), /special property/);
    assert.strictEqual({}.polluted, undefined);
  });
});
