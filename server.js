const express = require("express")
const app = express();
const PORT = process.env.PORT || 3001;
const db = require('./models')
const cors = require("cors")

app.use(cors())
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ hello: "world" })
})

app.post('/signup', (req, res) => {
  const { email, password, user_name } = req.body;
  if (email === "" || password === "" || user_name === "") {
    res.json({ error: "name or body can't be empty" });
    return;
  }

  db.user.create({ email, password, user_name }).then((record) => {
    res.json(record)
  })
})

app.post('/login', (req, res) => {

  const email = req.body.email;
  const password = req.body.password;

  if (email === "" || password === "") {
    res.json({ error: "name or body can't be empty" });
    return;
  }



  db.user.findOne({ where: { email: email } }).then((record) => {


    if (record) {

      if (record.password === password) {
        return res.json(record)
      } else {
        return res.json({ error: "invalid password" })
      }
    } else {
      return res.json({ error: "no user found" })
    }
  }).catch(() => {
    return res.json({ error: "no user found" })
  })
})

app.post("/user/:user_id/score", (req, res) => {
  const score = Number(req.body.score)
  const user_id = req.params.user_id
  
  db.user.findByPk(user_id).then((record)=>{
    record.createScore({score}).then(result => {
      res.json(result)
    })
  })
})

app.get("/user/:user_id/score", (req, res) => {
  const user_id = req.params.user_id 
  db.user.findByPk(user_id, {include: {model:db.score}}).then((record)=>{
    res.json(record)
  })

})

app.listen(PORT, () => {
  console.log(`app lisening to port ${PORT}`)
})