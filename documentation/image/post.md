# Create an Image Record

[Back to summary](../../README.md)  

Used to create an Image record.

**URL** : `/api/images`

**Method** : `POST`

**Auth required** : YES - `HEADERS/authorization/Bearer token`

**Data constraints** :

```json
{
    "imagePath": "[valid image path]",
    "descrition": "[description in plain text]"
}
```

**Data example** :

```json
{
    "imagePath": "https://images.bank.com/1234.jpg",
    "descrition": "A beautiful example"
}
```

## Success Response

**Code** : `200 OK`

**Content example** :

```json
{
    "id": 1,
    "imageData": {
        "type": "Buffer", 
        "data": [255,216,"...",234,126]
    },
    "imageMime": "image/jpeg",
    "imageExt": ".jpg",
    "description":"a wonderful example", 
    "updatedAt":"2022-12-20T08:21:21.896Z", 
    "createdAt":"2022-12-20T08:21:21.896Z"
}
```

## Error Response

### No description was given

**Condition** : If 'description' wasn't given in body.

**Code** : `400 BAD REQUEST`

**Content** :

```json
{
    "message": "Description cannot be empty!"
}
```

### Can't find token

**Condition** : If 'token' wasn't given in headers.

**Code** : `400 BAD REQUEST`

**Content** :

```json
{
    "message": "Can't find token. Check your headers"
}
```

### Invalid token

**Condition** : If 'token' is invalid.

**Code** : `401 UNAUTHORIZED`

**Content** :

```json
{
    "message": "Invalid token, please register to get full access"
}
```
