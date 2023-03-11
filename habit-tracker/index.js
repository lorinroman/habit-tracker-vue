const express = require('express');
const cors = require('cors');
const firebase = require('firebase');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const _ = require("lodash");
const Chance = require('chance');
require('dotenv').config();


//initializare firebase
const firebaseConfig = {
    apiKey: "AIzaSyBBFw0zBGTxw0u5L-qhk5qJeNb8UacZKjQ",
    authDomain: "habit-tracker-vue.firebaseapp.com",
    projectId: "habit-tracker-vue",
    storageBucket: "habit-tracker-vue.appspot.com",
    messagingSenderId: "288337576959",
    appId: "1:288337576959:web:d7d5bd77870128639fddca"
};

firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore()


const app = express();
app.use(express.json());
app.use(cors());



const port = 3000;

app.listen(port, async () => {
    console.log(`Server pornit pe portul ${port}`);
});



//auth json web token
const secret = process.env.SECRET || 'secret';

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization');
        if (!token)
            return res.status(400).json({ eroare: 'Utilizator neautentificat' });

        const userObject = jwt.verify(token, secret);

        const userSnapshot = await firebase
            .firestore()
            .collection("users")
            .where("email", "==", userObject.email)
            .get();


        if (!userSnapshot.empty)
            req.user = _.omit(userSnapshot.docs[0].data(), "password");

    } catch (e) {
        console.error(e);
        return res.status(400).json({ eroare: 'Token gresit sau expirat' });
    } finally {
        next();
    }
};



//http
//user signup/create
app.post('/api/user/signup', async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const displayName = req.body.displayName;


        const hashedPassword = await bcrypt.hash(password, 10);
        const user = { displayName: displayName, email: email, password: hashedPassword }
        const habits = [];

        //Date generate - ChanceJS
        const chance = new Chance();

        for (let i = 0; i < 5; i++) {
            habits.push({
                title: chance.word(),
                description: chance.sentence(),
                difficulty: chance.weighted(['easy', 'medium', 'hard'], [5, 3, 2])
            });
        }

        user.habits = habits;

        habits.forEach(habit => {
            firestore.collection("habits").add(habit);
        });
        await firestore.collection("users").add(user);
        return res.status(201).json(user);
    } catch (e) {
        console.log(e);
        res.status(500).json(e);
    }
});

//user signin
app.post('/api/user/signin', async (req, res) => {
    const { email, password } = req.body;
    try {
        const querySnapshot = await firestore
            .collection("users")
            .where("email", "==", email)
            .get();

        if (querySnapshot.empty) {
            return res.status(404).send({ message: "User not found" });
        }

        const user = querySnapshot.docs[0].data();

        if (await bcrypt.compare(password, user.password)) {
            const token = jwt.sign({ id: user.id, email: user.email }, secret);

            return res.status(200).json({ token });
        } else {
            return res.status(400).json({ error: 'Incorrect password' });
        }
    } catch (e) {
        console.log(e);
        return res.status(500).json(e);
    }
});

//read
app.get('/api/user', auth, async (req, res) => {
    try {
        return res.status(200).json(req.user);
    } catch (e) {
        console.log(e);
        return res.status(500).json(e);
    }
})

app.get('/api/user/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const userRef = firestore.collection("users").doc(id);
        const userSnapshot = await userRef.get();

        if (!userSnapshot.exists) {
            return res.status(404).send({ message: "User not found" });
        }

        const user = userSnapshot.data();
        return res.status(200).json(user);
    } catch (e) {
        console.log(e);
        return res.status(500).json(e);
    }
});

//update 
app.patch('/api/user/:userId', auth, async (req, res) => {

    try {

        const habitsRef = firestore.collection("habits");
        const snapshot = await habitsRef.get();
        const habits = [];
        snapshot.forEach(doc => {
            habits.push(doc.data());
        });

        const userId = req.params.userId;
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        await firestore.collection("users").doc(userId).update({
            displayName: req.body.displayName,
            email: req.body.email,
            password: hashedPassword,
            habits: habits
        });

        return res.status(200).json("User updated");
    } catch (e) {
        console.log(e);
        return res.status(500).json(e);
    }

})
//delete
app.delete('/api/user/:userId', auth, async (req, res) => {

    try {

        const userId = req.params.userId;
        const userRef = firestore.collection("users").doc(userId);
        const user = await userRef.get();

        console.log(user.data());
        const habits = user.data().habits;



        for (const habit of habits) {

            await firebase.firestore().collection("habits").doc(habit.id).delete();
        }

        await userRef.delete();

        return res.status(200).json("Account deleted.");
    } catch (e) {
        console.log(e);
        return res.status(500).json(e);
    }
})

//habits
//create
app.post('/api/habit/user/:userId', auth, async (req, res) => {
    try {
        const userId = req.params.userId;
        const { title, description, difficulty } = req.body;
        const habit = {
            completed: false,
            title,
            description,
            difficulty
        };


        const habitRef = await firestore.collection("habits").add(habit);
        await firestore
            .collection("users")
            .doc(userId)
            .update({
                habits: firebase.firestore.FieldValue.arrayUnion(habitRef)
            });

        return res.status(200).json(habit);
    } catch (e) {
        console.log(e);
        return res.status(500).json(e);
    }
})

//read
app.get("/api/habit/:habitId", async (req, res) => {
    const habitId = req.params.habitId;
    const habitSnapshot = await firebase
        .firestore()
        .collection("habits")
        .doc(habitId)
        .get();

    if (!habitSnapshot.exists) {
        return res.status(404).json({ message: "Habit not found" });
    }

    const habitData = habitSnapshot.data();
    return res.status(200).json({ habit: habitData });
});




//delete
app.delete('/api/habit/:habitId/user/:userId', auth, async (req, res) => {

    try {
        const habitId = req.params.habitId;
        const userId = req.params.userId;
        const habitRef = await firestore.collection("habits").doc(habitId);

        const userSnapshot = await firebase.firestore()
            .collection("users")
            .doc(userId)
            .get();
        const userData = userSnapshot.data();
        const habits = userData.habits;

        // console.log(habits)
        // const newHabitArray =[]
        // habits.forEach(habit=>{
        //     if(habit.id!== habitId){
        //         newHabitArray.push(habit)
        //     }
        // })
 
        
        await firestore
            .collection("users")
            .doc(userId)
            .update({ habits: habits.filter(habit=>habit.id!== habitId)});

        await habitRef.delete();


        return res.status(200).json("Habit deleted.");
    } catch (e) {
        console.log(e);
        return res.status(500).json(e);
    }
})
// app.delete('/habit/:habitId/user/:userId', async (req, res) => {
//     try {
//         const habitId = req.params.habitId;
//         const userId = req.params.userId;

//         const userRef = firestore.collection("users").doc(userId);

//         const user = await userRef.get();

//         const habits = user.data().habits;
//         const habitIndex = habits.findIndex(habit => habit.habitId === habitId);

//         if (habitIndex === -1) {
//             return res.status(404).json({ error: "Habit not found." });
//         }

//         habits.splice(habitIndex, 1);
//         await userRef.update({ habits });

//         const habitRef = firestore.collection("habits").doc(habitId);
//         await habitRef.delete();

//         return res.status(200).json("Habit deleted.");
//     } catch (e) {
//         console.log(e);
//         return res.status(500).json(e);
//     }
// });


//update
app.patch('/api/habit/:habitId/user/:userId', auth, async (req, res) => {
    const userId = req.params.userId;
    const habitId = req.params.habitId;
    const updatedHabit = req.body;

    try {
        await updateHabit(userId, habitId, updatedHabit);
        res.status(200).send("Habit updated successfully");
    } catch (error) {
        res.status(500).send("Error updating habit: " + error.message);
    }
});

async function updateHabit(userId, habitId, updatedHabit) {
    const userSnapshot = await firebase
        .firestore()
        .collection("users")
        .doc(userId)
        .get();
    const userData = userSnapshot.data();
    const habitArray = userData.habits;

    const updatedHabitArray = habitArray.filter(habit => habit.id !== habitId);
    updatedHabitArray.push(updatedHabit);

    await Promise.all([
        firebase
            .firestore()
            .collection("habits")
            .doc(habitId)
            .update(updatedHabit),
        firebase
            .firestore()
            .collection("users")
            .doc(userId)
            .update({ habits: updatedHabitArray })
    ]);

}




