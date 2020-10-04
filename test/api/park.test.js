const app = require("../../server");
const chai = require("chai");
const chaiHttp = require("chai-http");
const carMock = require("../fixtures/car");
const { expect } = chai;
chai.use(chaiHttp);

describe("Server!", () => {
  it("parks a car", (done) => {
    chai
      .request(app)
      .post("/parkcar")
      .send(carMock)
      .end((err, res) => {
        console.log(res.body);
        expect(res).to.have.status(200);
        expect(res.body.status).to.equals("success");
        expect(res.body.message).to.equals("parked");
        done();
      });
  });

  it("get parking info", (done) => {
    chai
      .request(app)
      .get("/slotinfo/0")
      .end((err, res) => {
        console.log(res.body);
        expect(res).to.have.status(200);
        expect(res.body.status).to.equals("success");
        done();
      });
  });

  it("un park", (done) => {
    chai
      .request(app)
      .delete("/unpark/0")
      .end((err, res) => {
        console.log(res.body);
        expect(res).to.have.status(200);
        expect(res.body.status).to.equals("success");
        expect(res.body.message).to.equals("Succesfully unparked your car");
        done();
      });
  });
});
