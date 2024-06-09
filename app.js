import inquirer from "inquirer";
//Bank Account Class
class BankAccount {
    accountNumber;
    balance;
    constructor(accountNumber, balance) {
        this.accountNumber = accountNumber;
        this.balance = balance;
    }
    //Debit money     (user withdraw)
    withdraw(amount) {
        if (this.balance >= amount) {
            this.balance -= amount;
            console.log(`Withdrawal of $${amount} successful. Remaining balance $${this.balance}`);
        }
        else {
            console.log("Insufficient Balance.");
        }
    }
    //Credited Money
    deposit(amount) {
        if (amount > 100) {
            amount -= 1; // $1 fee charge if more than $100 is deposited
        }
        this.balance += amount;
        console.log(`Deposit of $${amount} successful. Remaining balance $${this.balance}`);
    }
    // check Balance
    checkBalance() {
        console.log(`Current balance: $${this.balance}`);
    }
}
//customer class
class Customer {
    firstName;
    lastName;
    gender;
    age;
    mobileNumber;
    account;
    constructor(firstName, lastName, gender, age, mobileNumber, account) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.age = age;
        this.mobileNumber = mobileNumber;
        this.account = account;
    }
}
//create bank accounts
const accounts = [
    new BankAccount(1000, 500),
    new BankAccount(1001, 1000),
    new BankAccount(1002, 2000)
];
// create customers
const customers = [
    new Customer("Rimsha", "Aslam", "Female", 21, 3162356890, accounts[0]),
    new Customer("Rumel", "Khan", "Male", 23, 3462356890, accounts[1]),
    new Customer("Rumesha", "Ansari", "Female", 25, 3362356890, accounts[2])
];
//Function to interact with bank account
async function service() {
    do {
        const accountNumberInput = await inquirer.prompt([
            {
                name: "accountNumber",
                type: "number",
                message: "Enter your account number:"
            }
        ]);
        const customer = customers.find(customer => customer.account.accountNumber === accountNumberInput.accountNumber);
        if (customer) {
            console.log(`Welcome, ${customer.firstName} ${customer.lastName}!\n`);
            const ans = await inquirer.prompt([
                {
                    name: "select",
                    type: "list",
                    message: "Select an operation",
                    choices: ["Deposit", "Withdraw", "Check Balance", "Exit"]
                }
            ]);
            switch (ans.select) {
                case "Deposit":
                    const depositAmount = await inquirer.prompt([
                        {
                            name: "amount",
                            type: "number",
                            message: "Enter the amount to deposit:"
                        }
                    ]);
                    customer.account.deposit(depositAmount.amount);
                    break;
                case "Withdraw":
                    const withdrawAmount = await inquirer.prompt([
                        {
                            name: "amount",
                            type: "number",
                            message: "Enter the amount to withdraw:"
                        }
                    ]);
                    customer.account.withdraw(withdrawAmount.amount);
                    break;
                case "Check Balance":
                    customer.account.checkBalance();
                    break;
                case "Exit":
                    console.log("Exiting bank program...");
                    console.log("\n Thank you for using our bank services. Have a greatday!");
                    return;
            }
        }
        else {
            console.log("Invalid account number.Please try again!");
        }
    } while (true);
}
service();
