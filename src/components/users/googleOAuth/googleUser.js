
export const googleUser = (data) => {
    const user = Object.assign({
        uid: data.googleId,
        first_name: data.profileObj?.givenName,
        last_name: data.profileObj?.familyName,
        email: data.profileObj?.email,
        provider: "google_oauth2",
        acces_token: data.accesToken,
        profile_image: data.profileObj?.imageUrl
    })
    return user;
}