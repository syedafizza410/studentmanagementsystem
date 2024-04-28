#!/usr/bin/env node
import inquirer from 'inquirer';
import chalk from 'chalk';
const randomNumber = Math.floor(10000 + Math.random() * 90000);
let myBalance = 0;
let answer = await inquirer.prompt([
    {
        name: "Center",
        type: "input",
        message: chalk.yellow.bold `Enter center name:`,
    },
    {
        name: "students",
        type: "input",
        message: chalk.yellow.bold `Enter student name:`,
        validate: function (value) {
            if (value.trim() !== "") {
                return true;
            }
            return "Please enter a non-empty value.";
        }
    },
    {
        name: "Teacher name",
        type: "input",
        message: chalk.yellow.bold `Enter teacher name:`,
    },
    {
        name: "courses",
        type: "list",
        message: chalk.yellow.bold `Select the course to erolled`,
        choices: ["CSS", "HTML", "Typescript", "Python", "Javascript"],
    }
]);
const tutionFee = {
    "CSS": 2000,
    "HTML": 3000,
    "Typescript": 4000,
    "Python": 5000,
    "Javascript": 8000,
};
console.log(`\nTution Fee: ${tutionFee[answer.courses]}/-\n`);
console.log(`Balance: ${myBalance}\n`);
let paymentType = await inquirer.prompt([
    {
        name: "payment",
        type: "list",
        message: chalk.yellow.bold `Select payment method`,
        choices: ["BankTreansfer", "Easypaisa", "Jazzcash"],
    },
    {
        name: "amount",
        type: "input",
        message: chalk.yellow.bold `Transfer Money`,
        validate: function (value) {
            if (value.trim() !== "") {
                return true;
            }
            return "Please enter a non-empty value.";
        }
    }
]);
console.log(`\nYou select payment method ${paymentType.payment}\n`);
const tutionFees = tutionFee[answer.courses];
const paymentAmount = parseFloat(paymentType.amount);
if (tutionFees === paymentAmount) {
    console.log(`Congratulations, you have successfully enolled in ${answer.courses}`);
    let ans = await inquirer.prompt([
        {
            name: "Select",
            type: "list",
            message: chalk.yellow.bold `What would you like to do next?`,
            choices: ["View Status", "Exit"],
        }
    ]);
    if (ans.Select === "View Status") {
        console.log(chalk.red.bold `\n******Status******\n`);
        console.log(`Student Name: ${answer.students}`);
        console.log(`Student ID: ${randomNumber}`);
        console.log(`Course: ${answer.courses}`);
        console.log(`Tution Fees Paid: ${paymentAmount}`);
        console.log(`Balance: ${myBalance += paymentAmount}`);
    }
    else {
        console.log(chalk.blue.bold `\n******Exiting Student Management System******\n`);
    }
}
else {
    console.log(chalk.red.bold `Invalid amount due to course\n`);
}
