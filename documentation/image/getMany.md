# Find images

[Back to summary](../../README.md)  

Used to retrieve images.

**URL** : `/api/images/`

**Method** : `GET`

**Auth required** : YES - `HEADERS/authorization/Bearer token`

**Query constraints** : `description`

**Query examples** :

* `/api/images`
* `/api/images?description=example`

## Success Response

**Code** : `200 OK`

**Content example** :

```json
{[
    {
    "id": 1,
    "imageData": {
        "type": "Buffer", 
        "data": [255,216,"...",126]
    }
    "imageMime": "image/jpeg",
    "imageExt": ".jpg",
    "description":"a wonderful example", 
    "updatedAt":"2022-12-20T08:21:21.896Z", 
    "createdAt":"2022-12-20T08:21:21.896Z"
    },
    {
    "id": 2,
    "imageData": {
        "type": "Buffer", 
        "data": [55,26,"...",12]
    }
    "imageMime": "image/jpeg",
    "imageExt": ".jpg",
    "description":"an another wonderful example", 
    "updatedAt":"2022-12-20T18:21:21.896Z", 
    "createdAt":"2022-12-20T18:21:21.896Z"
    }
]}
```

## Error Response

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
