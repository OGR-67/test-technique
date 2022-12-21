# Find a single image

[Back to summary](../../README.md)  

Used to retireve a particular image.

**URL** : `/api/images/:id`

**Method** : `GET`

**Auth required** : YES `HEADERS/token`

**URL constraints** : `:id` as an integer

**URL example** : `/api/images/1`

## Success Response

**Code** : `200 OK`

**Content example** :

```json
{
    "id": 1,
    "imageData": {
        "type": "Buffer", 
        "data": [255,216,"...",126]
    },
    "imageMime": "image/jpeg",
    "imageType": ".jpg",
    "description":"a wonderful example", 
    "updatedAt":"2022-12-20T08:21:21.896Z", 
    "createdAt":"2022-12-20T08:21:21.896Z"
}
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

### Can't find image

**Condition** : If cannot find the image with the given `id`.

**Code** : `404 NOT FOUD`

**Content** :

```json
{
    "message": "Cannot find Image with id=153."
}
```
