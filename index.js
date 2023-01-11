import bcrypt from "bcrypt";
import promptModule from "prompt-sync";

const prompt = promptModule;
const mockDB = { passwords: {} };

const password = "test1234";
const hash = bcrypt.hashSync(password, 10) //hashSync function is used to hash my password, with 10 rounds of hashing
console.log(`My hashed password is: ${hash}`);

const saveNewPassword = (password) => {
    const hash = bcrypt.hashSync(password, 10); // hash the plain text password
    mockDB.hash = hash; //save the password hash to the hash key in my local database
    console.log("Password has been save!");
    showMenu(); //Call the showMenu function
};

const compareHashedPassword = async (password) => {
    const { hash } = mockDB; //check if password hash exists
    return await bcrypt.compare(password, hash); //Compare the input password to the value in my local dataase
}

const promptNewPassword = () => {
    const response = prompt("Enter a main password: "); //Prompt the user to type in a new password
    saveNewPassword(response); //save the user's input text through saveNewPasword
};

const promptOldPassword = () => {
    const response = prompt("Enter your password: ");
    if (result) { //Che k if their typed password is successfully validated
        console.log("Password verified.");
        showMenu();
    } else {
        console.log("Password incorrect.");
        promptOldPassword(); //Re-run promptOldPassword if the user is not validated
    }
};