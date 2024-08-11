import express from "express";
import session from "express-session";
import { dirname } from "path";
import { fileURLToPath } from "url";
import fs from "fs";



const __dirname = dirname(fileURLToPath(import.meta.url));

const port = 3001;
const app = express();

app.use(express.json(),express.urlencoded({ extended: true }));

app.use(session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: true
}));

// Set EJS as the view engine
app.set("view engine", "ejs");

// Set the directory for EJS files
app.set("views", __dirname + "/views");

// Serve static files from the "public" directory
app.use(express.static("public"));

// Render the Home.ejs file on the root route
app.get("/", (req, res) => {
    res.render("Home");
});

// Render the Home.ejs file on the root route
app.get("/Home", (req, res) => {
    res.render("Home.ejs");
});

// Have_a_pet_to_give_away
app.get("/Have_a_pet_to_give_away", (req, res) => {
    res.render("Have_a_pet_to_give_away.ejs");
});

//Disclaimer
app.get("/Disclaimer", (req, res) => {
    res.render("Disclaimer.ejs");
});


//Find_a_dog_or_cat
app.get("/Find_a_dog_or_cat", (req, res) => {
    res.render("Find_a_dog_or_cat.ejs");
});

//Dog_care
app.get("/Dog_care", (req, res) => {
    res.render("Dog_care.ejs");
});

//Cat_care
app.get("/Cat_care", (req, res) => {
    res.render("Cat_care.ejs");
});

//Contact_Us
app.get("/Contact_Us", (req, res) => {
    res.render("Contact_Us.ejs");
});

//Browse_Available_Pets
app.get("/Browse_Available_Pets", (req, res) => {
    res.render("Browse_Available_Pets.ejs");
});

//login
app.get("/login", (req, res) => {
    res.render("login.ejs");
});
//port
app.listen(port, () => console.log(`Server listening on port ${port}`));


//Creating an account 
app.get("/Create_an_account", (req, res) => {
    res.render("Create_an_account");
});

//logout
app.get("/LogOut", (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.send("Error logging out.");
        }
        res.render("LogOut", { message: "You have been successfully logged out and will be soon redirected to the home page."} );
       
    });
});

app.post("/Create_an_account", (req, res) => {
    const { username, password } = req.body;
    const userString = `${username}:${password}\n`;

    if (!username || !password) {
        return res.render("Create_an_account", { message: "Username and password are required" });
    }

    fs.readFile("login.txt","utf-8", (err, data) => {
        if (err) {
            console.error("Error reading login.txt:", err);
            return res.render("Create_an_account", { message: "An error occurred while creating your account." });
        }

        if (data.includes(`${username}:`)) {
            return res.render("Create_an_account", { message: "Username already exists" });
        }

        fs.appendFile("login.txt", userString, (err) => {
            if (err) {
                console.error("Error appending to login.txt:", err);
                return res.render("Create_an_account", { message: "An error occurred while creating your account." });
            }
            res.render("Create_an_account", { message: "Account created successfully" });
        });
    });
});

app.post("/login", (req, res) => {
    const { username, password } = req.body;

    fs.readFile("login.txt", "utf8",(err, data) => {
        if (err) {
            console.error("Error reading login.txt:", err);
            return res.status(500).send("Error logging in.");
        }

        const users = data.split("\n");
        const userExists = users.some(user => user === `${username}:${password}`);

        if (userExists) {
            req.session.username = req.body.username;
            res.redirect("/Have_a_pet_to_give_away");
        } else {
            res.render("login", { message: "Invalid username or password" });
        }
    })
});

//Pet registration
var lines =0;
app.post("/registerPet", (req, res) => {

    fs.readFile('available_pet_information.txt', 'utf8', (err, data) => {
        if (err) throw err;
        if(lines ===0)
            lines =1;
        else{
            lines = data.split(/\r\n|\n/).length -1;
        }
        
    });

    const { pet, breed, Age, gender, friend, petDes, fName,lName, email } = req.body;
    const petString = ++lines+`:${pet}:${breed}:${Age}:${gender}:${friend}:${petDes}:${fName}:${lName}:${email}\n`;


    fs.appendFile("available_pet_information.txt", petString, (err) => {
        if (err) {
            console.error("Failed to write pet data:", err);
            return res.status(500).send("Failed to register pet.");
        }
        res.render("Have_a_pet_to_give_away", { message: "Pet registered successfully." });
    });
});

//browse available pets
app.post("/Browse_Available_Pets", (req, res) => {
    const { pet, breed, Age, gender, friend } = req.body;
    fs.readFile("available_pet_information.txt", "utf8", (err, data) => {
        if (err) {
            console.error("Error reading pets.txt:", err);
            return res.status(500).send("Error reading pet data file.");
        }
        const petsData = data.split("\n");
        const filteredPets = petsData.filter(line => {
            const parts = line.split(":");
            return (!pet || parts[0].toLowerCase() === pet.toLowerCase()) &&
                (!breed || breed === "mixedBreed" || parts[1].toLowerCase().includes(breed.toLowerCase())) &&
                (Age === "No preference" || parts[2] === Age) &&
                (gender === "No preference" || parts[3] === gender) &&
                (!friend || parts[4] === friend);
        });
        res.render("Browse_Available_Pets", { pets: filteredPets });
    });
});