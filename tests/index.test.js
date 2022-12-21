const axios = require("axios");
const { describe, expect, test } = require('@jest/globals');

const host = "http://localhost:8080"
let token = ""

describe("API tests", () => {

    describe("User related tests", () => {
        describe("Register", () => {

            test("Try to create a user without every fields provided - status code 400", async () => {

                const axiosOptions = {
                    method: "POST",
                    url: `${host}/user/register`,
                    data: {
                        "email": "",
                        "password": ""
                    }
                }

                await expect(axios.request(axiosOptions))
                    .rejects.toThrowError("Request failed with status code 400");

            })

            test("Try to register with invalid email - status code 400", async () => {

                const axiosOptions = {
                    method: "POST",
                    url: `${host}/user/register`,
                    data: {
                        "email": "example.mail.com",
                        "password": "password"
                    }
                }

                await expect(axios.request(axiosOptions))
                    .rejects.toThrowError("Request failed with status code 400");

            })

            test('Create user should work', async () => {

                const axiosOptions = {
                    method: "POST",
                    url: `${host}/user/register`,
                    data: {
                        "email": "example@mail.com",
                        "password": "password"
                    }
                }

                let response = await axios.request(axiosOptions)
                expect(response.status).toBe(200);

                // Keep track of this data for the rest of tests
                token = response.data.token
                userId = response.data.id
            });

            test("Try to create the same user - status code 409", async () => {

                const axiosOptions = {
                    method: "POST",
                    url: `${host}/user/register`,
                    data: {
                        "email": "example@mail.com",
                        "password": "password"
                    }
                }

                await expect(axios.request(axiosOptions))
                    .rejects.toThrowError("Request failed with status code 409");
            })
        })

        describe("Login", () => {

            test("Try to login with wrong credentials should fail", async () => {

                const axiosOptions = {
                    method: "GET",
                    url: `${host}/user/login`,
                    data: {
                        "email": "example@mail.com",
                        "password": "password"
                    }
                }

                // user doesn't exist
                axiosOptions.data.email = "exampleWrong@mail.com"
                await expect(axios.request(axiosOptions))
                    .rejects.toThrowError("Request failed with status code 400");

                // Wrong password
                axiosOptions.data.email = "example@mail.com"
                axiosOptions.data.password = "passwordWrong"
                await expect(axios.request(axiosOptions))
                    .rejects.toThrowError("Request failed with status code 401");
            })

            test("Login to colect token should work", async () => {
                const axiosOptions = {
                    method: "GET",
                    url: `${host}/user/login`,
                    data: {
                        "email": "example@mail.com",
                        "password": "password"
                    }
                }

                let response = await axios.request(axiosOptions)
                expect(response.status).toBe(200);
                expect(response.data.token).toBe(token)
            })
        })

        describe("Delete one user", () => {

            test("Try to delete with invalid token - status code 401", async () => {

                const axiosOptions = {
                    method: "DELETE",
                    url: `${host}/user/delete/1`,
                    headers: { token: "invalid" },
                }

                await expect(axios.request(axiosOptions))
                    .rejects.toThrowError("Request failed with status code 401")
            })

            test("Try to DELETE user with id not a number status code 400", async () => {

                const axiosOptions = {
                    method: "DELETE",
                    url: `${host}/user/delete/notANumber`,
                    headers: { token: token },
                }

                await expect(axios.request(axiosOptions))
                    .rejects.toThrowError("Request failed with status code 400")
            })

            test("Delete one user should work", async () => {

                let axiosOptions = {
                    method: "POST",
                    url: `${host}/user/register`,
                    data: {
                        "email": "example2@mail.com",
                        "password": "password"
                    }
                }

                let response = await axios.request(axiosOptions)
                expect(response.status).toBe(200);
                let id = response.data.id
                let token = response.data.token

                axiosOptions = {
                    method: "DELETE",
                    url: `${host}/user/delete/${id}`,
                    headers: { token: token },
                }

                response = await axios.request(axiosOptions)
                expect(response.status).toBe(200)
                expect(response.data.message).toBe("User was deleted successfully!")

            })
        })
    })

    describe("Image related tests", () => {
        describe("Create Image", () => {

            test("Try to create an image without providing a description - status code 400", async () => {

                const axiosOptions = {
                    method: "POST",
                    url: `${host}/api/images`,
                    headers: { token: token },
                    data: {
                        "imagePath": "./tests/testImage.jpg"
                    }
                }
                await expect(axios.request(axiosOptions))
                    .rejects.toThrowError("Request failed with status code 400");
            })

            test("Try to create an image without token - status code 400", async () => {

                const axiosOptions = {
                    method: "POST",
                    url: `${host}/api/images`,
                    data: {
                        "imagePath": "./tests/testImage.jpg",
                        "description": "a wonderful mountain"
                    }
                }
                await expect(axios.request(axiosOptions))
                    .rejects.toThrowError("Request failed with status code 400")
            })

            test("Try to create an image with wrong token - status code 401", async () => {

                const axiosOptions = {
                    method: "POST",
                    url: `${host}/api/images`,
                    headers: { token: "invalid" },
                    data: {
                        "imagePath": "./tests/testImage.jpg",
                        "description": "a wonderful mountain"
                    }
                }
                await expect(axios.request(axiosOptions))
                    .rejects.toThrowError("Request failed with status code 401")
            })

            test("Create Imag should work", async () => {

                const axiosOptions = {
                    method: "POST",
                    url: `${host}/api/images`,
                    headers: { token: token },
                    data: {
                        "imagePath": "./tests/testImage.jpg",
                        "description": "a wonderful mountain"
                    }
                }

                let response = await axios.request(axiosOptions)
                expect(response.status).toBe(200)
                expect(response.data.description).toBe("a wonderful mountain")
                expect(response.data.imageMime).toBe("image/jpeg")
            })
        })

        describe("Find images", () => {

            test("Try to find image with invalid token - status code 401", async () => {

                const axiosOptions = {
                    method: "GET",
                    url: `${host}/api/images`,
                    headers: { token: "invalid" },
                }

                await expect(axios.request(axiosOptions))
                    .rejects.toThrowError("Request failed with status code 401")
            })

            test("Find all images should work", async () => {
                let axiosOptions = {
                    method: "POST",
                    url: `${host}/api/images`,
                    headers: { token: token },
                    data: {
                        "imagePath": "./tests/testImage.jpg",
                        "description": "a wonderful mountain"
                    }
                }

                await axios.request(axiosOptions)

                axiosOptions = {
                    method: "GET",
                    url: `${host}/api/images`,
                    headers: { token: token }
                }

                let response = await axios.request(axiosOptions)
                expect(response.status).toBe(200)
                expect(Array.isArray(response.data)).toBe(true)
            })

            test("Find images with a keyword in description should also work", async () => {

                const axiosOptions = {
                    method: "GET",
                    url: `${host}/api/images?description="mountain"`,
                    headers: { token: token }
                }

                let response = await axios.request(axiosOptions)
                expect(response.status).toBe(200)
                expect(Array.isArray(response.data)).toBe(true)
            })
        })

        describe("Find one image", () => {

            test("Try to find image with invalid token - status code 401", async () => {

                const axiosOptions = {
                    method: "GET",
                    url: `${host}/api/images/1`,
                    headers: { token: "invalid" },
                }

                await expect(axios.request(axiosOptions))
                    .rejects.toThrowError("Request failed with status code 401")
            })

            test("Try to find image with id not a number - status code 400", async () => {

                const axiosOptions = {
                    method: "GET",
                    url: `${host}/api/images/notANumber`,
                    headers: { token: token },
                }

                await expect(axios.request(axiosOptions))
                    .rejects.toThrowError("Request failed with status code 400")
            })

            test("Find the image of id 1 should work", async () => {

                const axiosOptions = {
                    method: "GET",
                    url: `${host}/api/images/1`,
                    headers: { token: token },
                }

                let response = await axios.request(axiosOptions)
                expect(response.status).toBe(200)

            })
        })

        describe("Update an Image description", () => {

            test("Try to update with invalid token - status code 401", async () => {

                const axiosOptions = {
                    method: "PUT",
                    url: `${host}/api/images/1`,
                    headers: { token: "invalid" },
                }

                await expect(axios.request(axiosOptions))
                    .rejects.toThrowError("Request failed with status code 401")
            })

            test("Try to update image with id not a number - status code 400", async () => {

                const axiosOptions = {
                    method: "PUT",
                    url: `${host}/api/images/notANumber`,
                    headers: { token: token },
                }

                await expect(axios.request(axiosOptions))
                    .rejects.toThrowError("Request failed with status code 400")
            })

            test("Try to update image with id 1 without description in body - status code 400", async () => {
                const axiosOptions = {
                    method: "PUT",
                    url: `${host}/api/images/1`,
                    headers: { token: token },
                }

                await expect(axios.request(axiosOptions))
                    .rejects.toThrowError("Request failed with status code 400")

            })

            test("Update the image of id 1 should work", async () => {

                const axiosOptions = {
                    method: "PUT",
                    url: `${host}/api/images/1`,
                    headers: { token: token },
                    data: { description: "a modified description" }
                }

                let response = await axios.request(axiosOptions)
                expect(response.status).toBe(200)
                expect(response.data.message).toBe("Image was updated successfully.")

            })
        })

        describe("Convert an image to an HTML image tag", () => {

            test("Try to update with invalid token - status code 401", async () => {

                const axiosOptions = {
                    method: "GET",
                    url: `${host}/api/images/convert/1`,
                    headers: { token: "invalid" },
                }

                await expect(axios.request(axiosOptions))
                    .rejects.toThrowError("Request failed with status code 401")
            })

            test("Try to convert image with id not a number - status code 400", async () => {

                const axiosOptions = {
                    method: "GET",
                    url: `${host}/api/images/convert/notANumber`,
                    headers: { token: token },
                }

                await expect(axios.request(axiosOptions))
                    .rejects.toThrowError("Request failed with status code 400")
            })

            test("Convert the image of id 1 should work", async () => {

                const axiosOptions = {
                    method: "GET",
                    url: `${host}/api/images/convert/1`,
                    headers: { token: token },
                }

                let response = await axios.request(axiosOptions)
                expect(response.status).toBe(200)
                expect(response.data).toEqual(expect.stringContaining('<img src=\"data:image'))

            })
        })

        describe("Delete an Image", () => {
            test("Try to delete with invalid token - status code 401", async () => {

                const axiosOptions = {
                    method: "DELETE",
                    url: `${host}/api/images/1`,
                    headers: { token: "invalid" },
                }

                await expect(axios.request(axiosOptions))
                    .rejects.toThrowError("Request failed with status code 401")
            })

            test("Try to DELETE image with id not a number - status code 400", async () => {

                const axiosOptions = {
                    method: "DELETE",
                    url: `${host}/api/images/notANumber`,
                    headers: { token: token },
                }

                await expect(axios.request(axiosOptions))
                    .rejects.toThrowError("Request failed with status code 400")
            })

            test("Delete an image should work", async () => {

                let axiosOptions = {
                    method: "POST",
                    url: `${host}/api/images`,
                    headers: { token: token },
                    data: {
                        "imagePath": "./tests/testImage.jpg",
                        "description": "a wonderful mountain"
                    }
                }

                let response = await axios.request(axiosOptions)
                let id = response.data.id

                axiosOptions = {
                    method: "DELETE",
                    url: `${host}/api/images/${id}`,
                    headers: { token: token },
                }

                response = await axios.request(axiosOptions)
                expect(response.status).toBe(200)
                expect(response.data.message).toBe("Image was deleted successfully!")

            })
        })

        describe("Delete all images", () => {
            test("Try to delete with invalid token - status code 401", async () => {

                const axiosOptions = {
                    method: "DELETE",
                    url: `${host}/api/images`,
                    headers: { token: "invalid" },
                }

                await expect(axios.request(axiosOptions))
                    .rejects.toThrowError("Request failed with status code 401")
            })

            test("Delete all images should work", async () => {

                let axiosOptions = {
                    method: "DELETE",
                    url: `${host}/api/images`,
                    headers: { token: token },
                }

                let response = await axios.request(axiosOptions)
                expect(response.status).toBe(200)
                expect(response.data.message)
                    .toEqual(expect.stringContaining("Images were deleted successfully!"))

            })
        })
    })
})
