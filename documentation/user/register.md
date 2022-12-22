# Register

[Back to summary](../../README.md)  

Used to create a user.

**URL** : `/user/register/`

**Method** : `POST`

**Auth required** : NO

**Data constraints** :

```json
{
    "email": "[valid email address]",
    "password": "[password in plain text - at least 8 characters]"
}
```

**Data example** :

```json
{
    "username": "iLoveImages@example.com",
    "password": "abcd1234"
}
```

## Success Response

**Code** : `200 OK`

**Content example** :

```json
{
    "token": "93144b288eb1fdccbe46d6fc0f241a51766ecd3d"
}
```

## Error Response

### Missing credential(s)

**Condition** : If 'email' and/or 'password' are missing.

**Code** : `400 BAD REQUEST`

**Content** :

```json
{
    "message": "email and password cannot be empty!"
}
```

### Invalid email

**Condition** : If 'email' don't follow emails patterns.

**Code** : `400 BAD REQUEST`

**Content** :

```json
{
    "message": "invalid email adress"
}
```

### Password to short

**Condition** : If 'password' doesn't contain at least 8 characters

**Code** : `400 BAD REQUEST`

**Content** :

```json
{
    message: "password must have at least 8 characters"
}
```

### User already exists

**Condition** : If 'email' already exists in database.

**Code** : `409 CONFLICT`

**Content** :

```json
{
    "message": "user iLoveImages@example.com already exist"
}
```
