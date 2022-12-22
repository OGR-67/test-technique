# Delete all images

[Back to summary](../../README.md)  

Used to delete all images from database.

**URL** : `/api/images`

**Method** : `DELETE`

**Auth required** : YES - `HEADERS/authorization/Bearer token`

## Success Response

**Code** : `200 OK`

**Content example** :

```json
{
    "message": "153 Images were deleted successfully!"
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
