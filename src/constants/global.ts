const months = ["January", "February", "March", "April", "May", "Jun", "July", "August", "September", "October", "November", "December"];

export const monthOptions = months.map((month) => ({
    value: month,
    label: month,
}))



const bloodGroups = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-", "Rh+", "Rh-"]

export const bloodGroupsOptions = bloodGroups.map((bloodGroup) => ({
    value: bloodGroup,
    label: bloodGroup,
}))

const gender = ["male", "female"]

export const genderOptions = gender.map((item) => ({
    value: item,
    label: item,
}))