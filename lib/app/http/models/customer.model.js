"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
let CustomerSchema = new mongoose_1.default.Schema({
    'username': String,
    'name': String,
    'address': String,
    'birthdate': Date,
    'email': String,
    'active': Boolean,
    'accounts': [Number],
    'tier_and_details': {
        ['id']: {
            'tier': String,
            'id': String,
            'active': Boolean,
            'benefits': [String]
        }
    }
});
const CustomerModel = mongoose_1.default.model('customers', CustomerSchema);
exports.CustomerModel = CustomerModel;
//# sourceMappingURL=customer.model.js.map