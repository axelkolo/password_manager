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

const showMenu = () => {
    console.log(`
    1. View passwords
    2. Manage new password
    3. Verify password
    4. Exit`); //Prompt the user with four options to select
   const response = prompt(">");

   if (response === "1") viewPasswords(); //After selecting a value from 1-4, the user may view their passwords, add a new one, verify their man password, or exit the app
   else if (response === "2") promptManageNewPasswords();
   else if (response === "3") promptOldPassword();
   else if (response === "4") process.exit();
   else { //If no valid option is selected, the user is prompted again
      console.log(`That's an invalid response. `);
      showMenu();
   }
};

const viewPasswords = () => {
    const { passwords } = mockDB; //Destructure passwords from my mockDB
    Object.entries(passwords).forEach(([key, value], index) => {
        console.log(`${index + 1}. ${key} => ${value}`);
    }); //Iterate through passwords in your local database and log them to my console
    showMenu(); //Call showMenu to display the menu options
};

const promptManageNewPassword = () => {
    const source = prompt("Enter name for password: "); //Prompt the user to add a new password and source name to manage
    const password = prompt("Enter password to save: ");

    mockDB.passwords[source] = password; //Save the source and password pair in mockDb
    console.log(`Password for ${source} has been saved!`);
    showMenu(); //Call showMenu to display the menu options
};

if (!mockDB.hash) promptNewPassword();//Check Whether you have a local password saved or if you need to type a new main password
else promptOldPassword();