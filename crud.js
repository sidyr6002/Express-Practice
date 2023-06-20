const express = require("express");
const app = express();
let { people } = require(`./data`);

//--------------- HOST AND PORT ----------------------
const hostName = "127.0.0.7";
const port = "4040";

//--------------- MIDDLEWARE -----------------------
app.use(express.json())

app.get("/", (req, res) => {
    return res.status(200).json({success: true, data: 'Hello World'});
});

app.get("/people", (req, res) => {
    const { id, name } = req.query;
    let filterPeople = [...people];

    if (id) {
        filterPeople = filterPeople.filter((person) => {
            return person.id == id;
        });
    }

    if (name) {
        filterPeople = filterPeople.filter((person) => {
            return person.name.startsWith(name);
        });
    }

    if (id || name) {
        return res.status(200).json({ success: true, data: filterPeople });
    }

    return res.status(200).json({ success: true, data: people });
});

app.post("/people", (req, res) => {
    const { name } = req.body;
    let obj = {
        id: people.at(-1).id + 1,
        name: name,
    };

    people = [...people, obj]

    return res.status(200).json({ success: true, data: `Added ${name} to the array successfully` });
});

app.put("/people/:id", (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    let person = people.find((person) => {
        return person.id == id;
    });

    console.log("person: -------", person)

    if (person == undefined) {
        return res.status(404).json({ success: false, data: `Not person with Id: ${id} is found` });
    }

    person.name = name;

    return res.status(200).json({ success: true, data: person });
});

app.delete("/people/:id", (req, res) => {
    const { id } = req.params;
    //----------- Finding Index -------------
    const index = people.findIndex((person) => person.id === Number(id));

    if (index == -1) {
        return res
            .status(404)
            .json({ success: false, data: "object not fount" });
    }

    let person = people[index];
    people.splice(index, 1);

    return res.status(200).json({ success: false, data: `Person: ${person.name} with Id: ${person.id} is successfully deleted` });
});

app.listen(port, hostName, () => {
    console.log(`Server is listening on: http://${hostName}:${port}`);
});