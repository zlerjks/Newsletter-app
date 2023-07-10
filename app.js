const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");

var app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {
  const firstName = req.body.fname;
  const secondName = req.body.sname;
  const email = req.body.email;

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: secondName,
        },
      },
    ],
  };

  const jsonData = JSON.stringify(data);

  var url = "https://us18.api.mailchimp.com/3.0/lists/33c832b735";

  var options = {
    method: "POST",
    auth: "aneel:657d34a243f2646dd7403b614ba786ac-us18",
  };

  // post request through server
  const request = https.request(url, options, function (response) {
    if (response.statusCode === 200) {
      res.sendFile(__dirname + "/success.html");
    } else {
      res.sendFile(__dirname + "/failure.html");
    }

    // response.on("data", function(data){
    //     console.log(JSON.parse(data));
    // })
  });

  request.write(jsonData);
  request.end();
});

app.listen(process.env.PORT || 3000, function () {
  console.log("Server is running on port 3000");
});

//Api key 657d34a243f2646dd7403b614ba786ac-us18
// 33c832b735 audience id
// added a new comment
