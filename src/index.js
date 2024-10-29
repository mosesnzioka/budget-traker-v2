import express from "express";
import { PrismaClient } from "@prisma/client";

const app = express();
const client = new PrismaClient();

app.use(express.json());

//Add an item /Items

app.post("/Items", async (req, res) => {
  const { title, quantity, unitprice } = req.body;

  try {
    // Check if an item with the same title exists
    const existingItem = await client.budget.findUnique({
      where: { title: title },
    });

    if (existingItem) {
      return res.status(409).json({ message: "Item with this title already exists." });
    }

    // Create the new item
    const newItem = await client.budget.create({
      data: {
        title: title,
        quantity: quantity,
        unitprice: parseFloat(unitprice.replace("ksh ", "")),
      },
    });

    res.status(201).json({ message: "Item created successfully", data: newItem });
  } catch (error) {
    res.status(500).json({ message: "Error creating item", error: error.message });
  }
});



//Getting all Items

app.get("/Items", async (req, res) => {
  try{
    const allitems = await client.budget.findMany()
    if(allitems <= 0){
      res.status(204).json({message: "you don't have Items yet"})
    } else{
      res.status(200).json({data : allitems})
    }

  }catch{
    res.status(500).json({message: "server error"});
  }
});

//Getting a single item /Items/:title

app.get("/Items/:title", async (req, res) => {
 const Title = req.params.title
 try{
  const item = await client.budget.findFirst({
    where: {title: Title}
  })
  if(!Title){
    res.status(404).json({message: `Item with title ${Title} does not exist`})
  } else{
    res.status(200).json({ data: item})
  }
 }catch (e){
  res.status(500).json({message: "server error"})

 }
});

//Updating an Item /Items/:title

app.patch("/Items/:title", (req, res) => {
  res.send("Updating an Item");
});

//deleting an Item /Items/:title

app.delete("/Items/:title", (req, res) => {
  res.send("Deleting an Item");
});

app.listen(3000, () => {
  console.log("server running at port 3000");
});