const { Configuration, OpenAIApi } = require("openai");
const express = require('express')

const configuration = new Configuration({
    organization: "org-xB5gcVvKe7zYtovE4cuTtVft",
    apiKey: "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",
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
    const {message} = req.body;
    console.log(message,"message")
    console.log(message)
    const response = await openai.createCompletion({
        model: "text-davinci-003",
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
    // console.log(response.data.data)
    res.json({
        models: response.data.data
    })
})
 
app.listen(port, () => {
    console.log(`Example app Listening at http://localhost:${port}`)
})