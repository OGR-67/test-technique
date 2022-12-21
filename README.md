# ImageAPI

## Open Endpoints

Open endpoints require no Authentication.

* [Register](documentation/user/register.md) : `POST /user/register`
* [Login](documentation/user/login.md) : `GET /user/login`

## Endpoints that require Authentication

Closed endpoints require a valid Token to be included in the header of the
request. A Token can be acquired from the Login view above.

* [Create A New Image](documentation/image/post.md) : `POST /api/images`
* [Show Images](documentation/image/getMany.md) : `GET /api/images`
* [Show A Single Image](documentation/image/getOne.md) : `GET /api/images/:id`
* [Update An Image](documentation/image/update.md) : `PUT /api/images/:id`
* [Delete An Image](documentation/image/deleteOne.md) : `DELETE /api/images/:id`
* [Delete All Images](documentation/image/deleteAll.md) : `DELETE /api/images`
* [Convert to HTML](/documentation/image/convert.md) : `GET /api/images/convert/:id`
