require("dotenv").config();
const express = require('express');
const app = express();
const db = require("./db");
const cors  = require('cors')

app.use(express.json());
app.use(cors());

app.get("/api/v1/restaurants", async (req,res)=>{

    const result = await db.query("select * from restaurants left join (select restaurant_id, count(*), trunc(avg(rating),2) as average_rating from reviews group by restaurant_id) reviews on restaurants.id=reviews.restaurant_id");

    res.status(200).json({
        status: "success",
        result: result.rows.length,
        data: {
            restaurants: result.rows,
        }
    });
})

app.get("/api/v1/restaurants/:id", async (req,res)=>{
    try {
        const result = await db.query("select * from restaurants left join (select restaurant_id, count(*), trunc(avg(rating),2) as average_rating from reviews group by restaurant_id) reviews on restaurants.id=reviews.restaurant_id where id=$1",[req.params.id]); 
        const reviews = await db.query("select * from reviews where restaurant_id=$1",[req.params.id]);

        res.status(200).json({
            status: "success",
            data: {
                restaurant: result.rows[0],
                reviews: reviews.rows
            }
        });
    } catch (error) {
        console.error(error)
    }
    
})

app.post("/api/v1/restaurants", async (req,res)=>{
    const result = await db.query("insert into restaurants (name,location,price_range) values ($1,$2,$3) returning *",[req.body.name,req.body.location,req.body.price_range])
    
    res.status(200).json({
        status: "success",
        data: {
            restaurant: result.rows[0]
        }
    });
}) 
app.post("/api/v1/restaurants/:id/addReview", async(req,res)=>{
    const review = await db.query("insert into reviews (restaurant_id,name,review,rating) values ($1,$2,$3,$4) returning *",[req.params.id,req.body.name,req.body.review,req.body.rating])

    res.status(200).json({
        status: "success",
        data: {
            review: review.rows[0]
        }
    })
})

app.put("/api/v1/restaurants/:id", async (req,res)=>{
    const results = await db.query("update restaurants set name=$1, location=$2, price_range=$3 where id=$4 returning *",[req.body.name,req.body.location,req.body.price_range,req.params.id])
    res.status(200).json({
        status: "success",
        data: {
            restaurant: results.rows[0],
        }
    });
})

app.delete('/api/v1/restaurants/:id', async (req, res) => {
    const results = await db.query("delete from restaurants where id=$1 returning *",[req.params.id])
    res.status(200).json({
        status: "success",
        data: {
            restaurant: results.rows,
        }
    });
});

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`App listening on port ${port}!`);
});