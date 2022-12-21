# Delete an Image

[Back to summary](../../README.md)  

Used to delete an Image.

**URL** : `/api/images/:id`

**Method** : `DELETE`

**Auth required** : YES `HEADERS/token`

**URL constraints** : `:id` as an integer

**URL example** : `/api/images/1`

## Success Response

**Code** : `200 OK`

**Content example** :

```json
{
    "message": "Image was deleted successfully!"
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

### Can't delete image

**Condition** : If cannot find the image with the given `id`.

**Code** : `400 BAD REQUEST`

**Content** :

```json
{
    "message": "Cannot update Image with id=153. Maybe Image was not found!"
}
```

### Id is not an integer

**Condition** : If the given Id is not an integer.

**Code** : `400 BAD REQUEST`

**Content** :

```json
{
    "message": "id must be an integer. Check documentation."
}
```
