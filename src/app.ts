import express, { Application, Request, Response } from 'express'
const { Client } = require('../activecollab-node-sdk/build/Client/Client.js');
//import acClient from './acClient';


const PORT: Number = 5000;

async function init() {
    try {
        // Init Self-Hosted
        const client = new Client(
            "k.imamov+ac-test-gitlab@ondigo.de",
            "",
            "ON Gitlab-Integration TEST",
            "ONDIGO GmbH & Co. KG",
            undefined,
            "https://project.ondigo.de"
        );
        await client.issueToken();

        const app: Application = express()


        app.get('/projects', async (req: Request, res: Response) => {
            try {
                const projectsResponse = await client.get("/projects/564");
                const data = projectsResponse.data;
                console.log(data);
                if (data) {
                    res.send(data);
                }

            } catch (error) {
                console.log(error)
            }

        })

        app.post('/gitlab', async (req: Request, res: Response) => {
            console.log(req.body)
        })

        app.listen(PORT, function () {
            console.log(`App is listening on port ${PORT} !`)
        })
    } catch (error) {
        console.log(error);
    }


}


init();


