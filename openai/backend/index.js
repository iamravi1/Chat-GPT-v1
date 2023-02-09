const { Configuration, OpenAIApi } = require("openai");
const express = require('express')
require('dotenv').config()

const configuration = new Configuration({
    organization: process.env.ORG,
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
app.use(bodyParser.json())
app.use(cors())

app.use(express.json())
app.use(express.urlencoded({extended:true}))
const port = 3080

app.post('/',async(req,res) => {
    const {message,currentModel} = req.body;
    const response = await openai.createCompletion({
        model: `${currentModel}`,
        prompt: `${message}`,
        max_tokens: 100,
        temperature: 0.5,
      });
    res.json({
        message: response.data.choices[0].text,
    })
})


app.get('/models',async (req,res) => {
    const response = await openai.listEngines();
    res.json({
        models: response.data.data
    })
})
 
app.get('/', (req, res) => {
    res.send("Chat GPT");
})

app.listen(port, () => {
    console.log(`Example app Listening at http://localhost:${port}`)
})