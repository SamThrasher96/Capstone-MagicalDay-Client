export const getMenuItemByLocationId = (locationId) => {
    return fetch(`http://localhost:8000/menuitems?location=${locationId}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
    })
    .then(response => response.json())
}
