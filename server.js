const express = require("express")
const routes = require("./routes")

// import sequelize connection
const sequelize = require("./config/connection")

const app = express()
const PORT = process.env.PORT || 3001

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(routes)

// test connection
try {
  sequelize.authenticate()
  console.log("Database connected...")
} catch (err) {
  console.log(err)
}

// sync sequelize models to the database, then turn on the server
sequelize
  .sync({ force: false })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`)
    })
  })
  .catch(err => console.log(err))
