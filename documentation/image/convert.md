# Delete an Image

[Back to summary](../../README.md)  

Used to convert an image to a HTML image tag.

**URL** : `/api/images/convert/:id`

**Method** : `GET`

**Auth required** : YES `HEADERS/token`

**URL constraints** : `:id` as an integer

**URL example** : `/api/images/convert/1`

## Success Response

**Code** : `200 OK`

**Content example** :

```HTML
<img src="data:image/jpeg;base64,/9jkZJRgABAQAAAQABAA==rChQ/r+uv9" alt="A wonderful example">
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