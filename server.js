const express = require("express");
require("dotenv").config();
const Car = require("./models/car");
const rateLimiterUsingThirdParty = require("./middlewares/rateLimiter");

let parkingSlotMax = parseInt(process.env.LOTSIZE);
let availableSlot = parkingSlotMax;
let parkingList = new Array(parkingSlotMax).fill(undefined);

const app = new express();
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("server running at port", port);
});

app.use(express.json());
app.use(rateLimiterUsingThirdParty);

// TYPE => GET
// @Input params => a slot number of car number
// Ouput params = > parking info

app.get("/slotinfo/:ref", (req, res, next) => {
  let ref = req.params.ref;
  console.log("id ", ref);

  // by slot number
  let slotId = parseInt(ref);

  if (!isNaN(slotId)) {
    if (slotId > -1 && slotId < parkingSlotMax) {
      if (parkingList[slotId]) {
        return res.status(200).json({
          carName: parkingList[slotId],
          slotNumber: slotId,
          status: "success",
        });
      } else {
        return res
          .status(200)
          .json({ status: "fail", message: "this slot is empty" });
      }
    } else
      return res
        .status(200)
        .json({ status: "fail", message: "unknown slot number" });
  }
  // by car name
  else {
    let pos = parkingList.findIndex((p) => p == ref);
    console.log(pos);
    if (pos > -1) {
      return res.status(200).json({
        carName: parkingList[pos],
        slotNumber: pos,
        status: "success",
      });
    } else {
      return res.status(200).json({
        status: "fail",
        message:
          "unknown car, please provide either valid slot number or car number",
      });
    }
  }
});

// TYPE => POST
// @Input params => car number
// Ouput params = > parking info

app.post("/parkcar", (req, res, next) => {
  let { car } = req.body;
  try {
    if (availableSlot > 0) {
      let slotId = parkingList.findIndex((p) => p == undefined);
      parkingList[slotId] = car;

      availableSlot--;

      return res.status(200).json({
        status: "success",
        slotNumber: slotId,
        message: "parked",
      });
      // return res.send("car parked at slot number " + slotId);
    } else return res.send("Sorry ,parking is full");
  } catch {
    return res.send("something went wrong");
  }
});

// TYPE => DEELTE
// @Input params => slot number
// Ouput params = > @String => Parking message

app.delete("/unpark/:slotid", (req, res, next) => {
  let id = req.params.slotid;

  if (id && id < parkingSlotMax) {
    parkingList[id] = undefined;
    availableSlot++;
    res.status(200).json({
      status: "success",
      message: "Succesfully unparked your car",
    });
  } else return res.status(200).json("please provide a valid slot number");
});



module.exports = app;
