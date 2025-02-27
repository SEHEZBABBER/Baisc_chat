const mongoose = require('mongoose');
const Chat = require('./modules/Chat.js');
let Data = [
    {
        from: "Alice",
        to: "Bob",
        msg: "Hey Bob, how's it going?",
        date: new Date("2025-02-25T10:30:00Z")
    },
    {
        from: "Bob",
        to: "Alice",
        msg: "Hey Alice! I'm good, how about you?",
        date: new Date("2025-02-25T10:32:00Z")
    },
    {
        from: "Charlie",
        to: "David",
        msg: "Did you complete the project?",
        date: new Date("2025-02-26T08:45:00Z")
    },
    {
        from: "David",
        to: "Charlie",
        msg: "Almost done, just need some final touches.",
        date: new Date("2025-02-26T08:50:00Z")
    },
    {
        from: "Eve",
        to: "Frank",
        msg: "Let's catch up later!",
        date: new Date("2025-02-27T14:00:00Z")
    }
];
Chat.insertMany(Data);
main().then(()=>console.log("connection succesful"))
.catch(err => console.log(err));
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}