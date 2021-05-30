const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const { post } = require("request");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get('/', function (req, res) {
    res.sendFile(__dirname + "/signup.html");
});

app.post('/', function (req, res) {
    const email = req.body.email;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;

    console.log("email :" + email + " first name : " + firstName + " last name : " + lastName);
    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    }

    const jsondata = JSON.stringify(data);

    const url = "https://us6.api.mailchimp.com/3.0/lists/882d561871";
    const options = {
        method: "post",
        auth: "rahul:177c006ccb2490cb7cad8f836d8406e6-us6"
    }
    const requestdata = https.request(url, options, function (response) {

        if (response.statusCode === 200) {
            res.sendFile(__dirname + "/success.html");
            console.log("Success");
        }
        else {
            res.send("Please try again");
            console.log("Failure");
        }

        response.on("data", function (data) {
            console.log(JSON.parse(data));
        });
    });
    requestdata.write(jsondata);
    requestdata.end();

});

// '{"name":"","contact":{"company":"","address1":"","address2":"","city":"","state":"","zip":"","country":"","phone":""},"permission_reminder":"","use_archive_bar":false,"campaign_defaults":{"from_name":"","from_email":"","subject":"","language":""},"notify_on_subscribe":"","notify_on_unsubscribe":"","email_type_option":false,"visibility":"pub","double_optin":false,"marketing_permissions":false}'

app.listen(3000 || process.env.PORT, function () {
    console.log("server running at port 3000");
});

// api key
// 177c006ccb2490cb7cad8f836d8406e6-us6

// list id
// 882d561871

// MAILCHIMP CREDENTIALS :
// Username : hurricanerahul
// Password : Roy#280201