# Update

[Back to summary](../../README.md)  

Used to update the description of an image.

**URL** : `/api/images/:id`

**Method** : `PUT`

**Auth required** : YES `HEADERS/token`

**Data constraints** :

```json
{
    "description": "[description in plain text]"
}
```

**Data example** :

```json
{
    "description": "A modified description."
}
```

## Success Response

**Code** : `200 OK`

**Content example** :

```json
{
    "message": "Image was updated successfully."
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

### Can't update image

**Condition** : If cannot find the image with the given `id` or if `id` wasn't given.

**Code** : `400 BAD REQUEST`

**Content** :

```json
{
    "message": "Cannot update Image with id=153. Maybe Image was not found or HTTP Body is empty."
}
```
