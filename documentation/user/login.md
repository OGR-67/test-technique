# Login

[Back to summary](../../README.md)  

Used to collect a Token for a registered User.

**URL** : `/user/login/`

**Method** : `GET`

**Auth required** : NO

**Data constraints** :

```json
{
    "email": "[valid email address]",
    "password": "[password in plain text]"
}
```

**Data example** :

```json
{
    "email": "iLoveImages@example.com",
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
    "message": [
        "email and password cannot be empty!"
    ]
}
```

### Invalid email

**Condition** : If 'email' don't follow emails patterns.

**Code** : `400 BAD REQUEST`

**Content** :

```json
{
    "message": [
        "invalid email adress"
    ]
}
```

### User doesn't exist

**Condition** : If 'email' doesn't exist in database.

**Code** : `400 BAD REQUEST`

**Content** :

```json
{
    "message": [
        "user iLoveImages@example.com doesn't exist in our database"
    ]
}
```

### Invalid password

**Condition** : Wrong `email` and `password` combination.

**Code** : `401 UNAUTHORIZED`

**Content** :

```json
{
    "message": [
        "invalid password"
    ]
}
```
