const Joi = require("joi");
const express = require("express");
const app = express();

app.use(express.json());

const courses = [
  { id: 1, name: "preya" },
  { id: 2, name: "skc" },
  { id: 3, name: "sdc" },
  { id: 4, name: "vsz" },
  { id: 5, name: "vasd" },
];
app.get("/", (req, res) => {
  res.send("hello world;");
});
app.get("/post/:year/:month", (req, res) => {
  res.send(req.path);
});
app.get("/people",(req,res)=>{
  res.json(courses)
})
app.get("/people/:id", (req, res) => {
  let course = courses.find((c) => c.id == parseInt(req.params.id));
  if (!course) return res.status(404).send("the course is not available");
  res.send(course);
});
app.post("/people", (req, res) => {

  const {error} = validateCourse(req.body);

  if (error) return res.status(400).json(error.details[0].message); 

  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };
  courses.push(course);
  res.send(course);
});
app.put("/people/:id", (req, res) => {
  let course = courses.find((c) => c.id == parseInt(req.params.id));
  if (!course) return res.status(404).send("the course is not available");
  
const { error } =validateCourse(req.body);
  if (error) {
    res.status(400).send(error.details[0].message); 
    return;
  }
  course.name=req.body.name
  res.json(course)
});
app.delete("/people/:id",(req,res)=>{
  let course = courses.find((c) => c.id == parseInt(req.params.id));
  if (!course) return res.status(404).send("the course is not available");
  //delete
  const index=courses.indexOf(course)
  courses.splice(index,1)
  res.send(course)


})
function validateCourse(course){
  const schema = Joi.object({
    name: Joi.string().trim().min(3).required(),
  });
  return schema.validate(course);
}
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on port ${port}`));
