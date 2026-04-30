import express from "express";

const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.send("Hello from backend");
});

app.post("/api/v1/upload", (req, res) => {
  const data = req.body;
  console.log("received", data)
  res.json({ message: "Upload received", data });
});

app.get("/api/v1/uploads", (req, res) => {

});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
