class MyCustomFormatter {
  constructor() {
    this.errors = [];
  }

  addError(error, field, rule, args) {
    this.errors.push({ error, field, validation: rule.name })
  }

  toJSON() {
    return this.errors.length ? this.errors : null
  }
}

module.exports = { MyCustomFormatter }