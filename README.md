# Back-End Challenge

### 1. Clone the repo
`git clone git@github.com:EzequielGomezCucchiararo/Back-End-NodeJs-API-REST-Ch.git`

### 2. Install dependencies
`npm install`

### 3. Running scripts

#### 3.1 Import sentences to FB
`npm run import-sentences sentences.jsonl.txt`

#### 3.2 Top words
`npm run top-sentences-words`

### 4. Running API Rest service
`npm run start`

#### Endpoints API REST

##### Example "Get all sentences"
```
GET http://localhost:3000/api/v1/sentences
Accept: application/json
```

Response Example:

```
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 1687
ETag: W/"697-TxwXJPkgCNoPd1nB6suGbTfxrSA"
Date: Fri, 28 Oct 2022 08:04:11 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{
  "status": "OK",
  "data": [
    {
      "id": "e3fe698a-d04d-4706-b839-17ca6ea9bafb",
      "description": "â€“ Sie weisen in die KÃ¤ltekammern ein",
      "categories": [
        "tech"
      ]
    },
  ]
}
```

### 5. Run test
`npm run test`


### Pending TODO:
1. Authentication
2. Schema Validation for requests
3. Translations
4. Integration and E2E tests (CRUD mainly)
5. More unit tests
6. Views/Templating for form
