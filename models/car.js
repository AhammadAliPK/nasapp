module.exports = class Car {
  constructor(carName, slot) {
    this._carname = carName;
    this._slot = slot;
  }

  get carName() {
    return this._carname;
  }

  get slotNumber() {
    return this._slot;
  }
};
