import "dotenv/config" 
import express from "express"
import path from 'path'
import createPath from "./helpers/createPath.js"
import multer from "multer"
import fs from "fs"
import sqlite3 from "sqlite3"
import bcript from "bcryptjs"
import morgan from "morgan"
import methodOverride from "method-override"

//const __dirname = path.dirname(fileURLToPath(import.meta.url))
const app = express()

app.set("view engine", "ejs")

app.use(express.static('styles'))

app.listen(3000, (err) => {
    err ? console.log(err) : console.log("listenning port 3000, we are online")
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))

app.get("/", (req, res) => {
    res.status(200).sendFile(createPath("visit"))
})

// методы для работы с запросами

app.use((req, res) => {
    //res.status(404).sendFile(createPath("not_found"));
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    //res.status(500).sendFile(createPath("server_error"));
});

