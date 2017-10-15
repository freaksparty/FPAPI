const ApiItem = require('../api_item.js');

class UsersApiItem extends ApiItem {
  constructor(api, id, root) {
    super({
      api,
      id,
      root,
      url: 'users',
      base: 'user'
    });
  }

  _mocked(id) {
    var username = this._mock().name(id);

    return {
      borndate: this._mock().date(),
      checked: true,
      dni: this._mock().dni(),
      email: this._mock().email(id),
      login: username,
      password: this._mock().password(id),
      name: username,
      phone: this._mock().phone(),
      shirt_size: this._mock().shirt()
    };
  }
};

module.exports = UsersApiItem;
