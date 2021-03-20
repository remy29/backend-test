# Net-Cents Backend Test

## Stack 
- Javascript/Node.js
- Express.js server
- PostgreSQL Database
- Mocha / Chai Testing

### Dependencies 
- dotenv: 8.2.0 
- express: 4.17.1 
- axios: 0.21.1 (for  handling api requests)
- express-basic-auth: 1.2.0 (for handling basic authentication)
- pg: 8.5.1 (for making database queries)

## Setup 
run in terminal from root directory:
1. ```npm install```
2. ```psql -U {your postgreSQL user} -d postgres```
3. ```CREATE database {db name of choice};```
4. ```\q```
5. ```psql -U {your postgresQ} -d {db name of choice}```
6. ```\i db/schema.sql```

next make a .env file following the format in .env.example.
note ```USER_PASSWORD='{ " ": " " }'```  will be the username/password combination for authentication, fill it out like ex: ```USER_PASSWORD='{ "admin": "net-cents" }'```
```TEST_USER``` and ```TEST_PASSWORD``` should match this username/password combination.

In a seperate terminal window from the db run ```npm start``` to start the server. 

To run test suite, terminate server and run ```npm test```

## Use 
from a terminal window run ```curl -H "Authorization: Basic {base64 encoded username:password combination}" http://localhost:{chosen server port}```

example ```curl -H "Authorization: Basic YWRtaW46bmV0LWNlbnRz" http://localhost:3000/```

or use a service such as postman or RESTed and choose basic auth and enter credentials 

or from another app use axios or other http request library with headers in request ex: 
``` 
axios.get(
	'http://localhost:3000/',
	{
		headers: {Authorization: 'Basic YWRtaW0LWNlbnRz'} 
	}
) 
```

## Example Return
```JSON 
[
  {
    "hash": "dc86641603325657765d125f76bba8a991e33650c0982c6978c5cc74551c8a23",
    "total": "134601316",
    "fees": "10170",
    "inputs": [
      {
        "output_value": 134611486,
        "addresses": [
          "1L6vurXCdZPxnUQEbGoNGLxxndeMhWYzEy"
        ],
        "script_type": "pay-to-pubkey-hash"
      }
    ],
    "outputs": [
      {
        "value": 1100000,
        "addresses": [
          "1Jj3t9LTphLkFT61XmFmvnMXCTR5QYNePm"
        ],
        "script_type": "pay-to-pubkey-hash"
      },
      {
        "value": 133501316,
        "addresses": [
          "1L6vurXCdZPxnUQEbGoNGLxxndeMhWYzEy"
        ],
        "script_type": "pay-to-pubkey-hash"
      }
    ]
  }
]
```