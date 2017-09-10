"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function verificationPhone(phoneNumber) {
    return /^1[3578]\d{9}$/.test(phoneNumber);
}
exports.verificationPhone = verificationPhone;
