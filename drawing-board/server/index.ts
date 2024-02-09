import express from "express"
import cors from "cors"
import bodyParser from "body-parser"
import { JSONFilePreset } from 'lowdb/node'
import { nanoid } from "nanoid"

interface Data {
	projects: Project[]
}

interface Project {
  id: string
  name: string
  strokes?: Stroke[]
  image: string
}

interface Stroke {
  point: Point[]
}

interface Point {
  x: number
  y: number
}

const data: Data = {
  projects: [
    {
      id: nanoid(),
      name: "Test Project",
      image: "http://placekitten.com/100/100"
    }
  ]
}

let db = await JSONFilePreset("db.json", data)
db.write()


const app = express()

app.use(cors())
app.use(bodyParser.json())

const port = 4000

app.get("/projects", (req, res) => {
  const data = db.data.projects;
  const projects = data.map(({name, image, id}) => ({ name, image, id }))
  return res.json(projects)
})

app.post("/projects/new", (req, res) => {
  db.data.projects.push({ ...req.body, id: nanoid() })
  res.json({ success: true })
})

app.get("/projects/:projectId", (req, res) => {
  const { projectId } = req.params
  const project = db.data.projects.find((proj) => proj.id === projectId);

  if (project) return res.json({ success: true, project }) 
	else return res.json({ success: false })
})

app.listen(port, () =>
  console.log(`Backend running on http://localhost:${port}!`)
)
