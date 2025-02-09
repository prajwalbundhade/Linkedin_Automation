const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

const LINKEDIN_PAGE_ID = "100756289"; // Replace with your LinkedIn Page ID
const ACCESS_TOKEN = "AQWxIzYT7hVmlkvszfCsQbzgOs1qg-lXD1aFuAkePjmpwAfaYLyWdTv43fg6BsJDvWRUHtFsbXPJ6ZD9QaV38s1fTVzjRGGMzCEd_KiwfS7YvkVnhp7EPazDyEA4eozHPyze79OM8dD3MTOl-ZrQMHaPE4E4cR4whmnJmwHx8l4QEgRaSnpi9re58c4y4deR9LRwN0tOBSbUa34tjfYF9SrPiKg6PyiZ9zP-ogkZtVeQ-GdFwPtp8Dxyvodn4UiteOT1LSDSEjPwp8WleQXLyalZ9s4jMnPb9MrCM51QiJ5kxl_qv5DBThroXukqJfkxsdRB7tYS6y3xbd04wwsJqzRh6-ufDQ"; // Replace with LinkedIn API token

const corsOptions = {
    origin: "*", // Allow all origins
    methods: "GET,POST",
    allowedHeaders: "Content-Type,Authorization",
  };
  
app.use(cors(corsOptions));
  
app.post("/post-job", async (req, res) => {
    const { company, position, location, experience, eligibility, salary, post_link } = req.body;

    const message = `📢 Job Opening Alert!\n\n🌟 Company: ${company}\n🌟 Position: ${position}\n🌟 Location: ${location}\n\n✅ Experience: ${experience} \n✅ Eligibility: ${eligibility}\n💼 Salary: ${salary}\n\n🚀 Link to apply: ${post_link}\n\nJoin Our Telegram: https://t.me/reformers2022\n\n#Hiring #Jobs #JobAlert #CareerOpportunities`;

    try {
        const response = await axios.post(
            `https://api.linkedin.com/v2/ugcPosts`,
            {
                author: `urn:li:organization:${LINKEDIN_PAGE_ID}`,
                lifecycleState: "PUBLISHED",
                specificContent: {
                    "com.linkedin.ugc.ShareContent": {
                        shareCommentary: {
                            text: message
                        },
                        shareMediaCategory: "NONE"
                    }
                },
                visibility: {
                    "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC"
                }
            },
            {
                headers: {
                    Authorization: `Bearer ${ACCESS_TOKEN}`,
                    "Content-Type": "application/json"
                }
            }
        );

        res.json({ success: true, message: "Job posted successfully!" });
    } catch (error) {
        res.status(500).json({ success: false, error: error.response?.data || error.message });
    }
});

app.listen(5000, () => {
    console.log("Server is running on port 5000");
});
