import bcrypt from "bcrypt";

const password = "test1234";
const hash = bcrypt.hashSync(password, 10) //hashSync function is used to hash my password, with 10 rounds of hashing
console.log(`My hashed password is: ${hash}`);