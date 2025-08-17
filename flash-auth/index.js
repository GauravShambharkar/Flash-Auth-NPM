const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const flashAuth = async (model_Payload, search_payload) => {
  try {
    const valid = await model_Payload.findOne(search_payload);
    if (valid) return valid;
  } catch (e) {
    console.log("cannot find Model is wrong", e);
  }
};

// const flashLog = async (idPayload, secretkey) => {
//   const token = await jwt.sign(idPayload, secretkey);
// };

const flashValidPass = async (model_payload, search_payload, plainPassword) => {
  try {
    const user = await model_payload.findOne(search_payload);
    if (!user) return false; // user not found

    const isValidUser = await bcrypt.compare(plainPassword, user.password);
    return isValidUser; // true or false
  } catch (err) {
    console.error(
      "Error, hashed password must be stored in password key:",
      err
    );
    return false;
  }
};

module.exports = {
  flashAuth,
  // flashLog,
  flashValidPass,
};
