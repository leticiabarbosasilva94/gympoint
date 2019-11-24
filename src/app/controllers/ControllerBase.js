// This is experimental
export default class ControllerBase {
  constructor() {
    if (this.error) this.error = this.error.bind(this);
    if (this.index) this.index = this.index.bind(this);
    if (this.store) this.store = this.store.bind(this);
    if (this.update) this.update = this.update.bind(this);
    if (this.show) this.show = this.show.bind(this);
    if (this.delete) this.delete = this.delete.bind(this);
  }

  index(req, res) {
    return res.status(400).json('NOT IMPLEMENTED');
  }

  store(req, res) {
    return res.status(400).json('NOT IMPLEMENTED');
  }

  update(req, res) {
    return res.status(400).json('NOT IMPLEMENTED');
  }

  show(req, res) {
    return res.status(400).json('NOT IMPLEMENTED');
  }

  delete(req, res) {
    return res.status(400).json('NOT IMPLEMENTED');
  }

  error(req, res, message, code = 400) {
    let messages;

    if (Array.isArray(message)) {
      messages = message;
    } else {
      messages = [message];
    }

    return res.status(code).json({
      errors: messages
    });
  }
}
