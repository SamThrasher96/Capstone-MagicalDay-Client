export const getAllShowDetails = () => {
    const token = localStorage.getItem("auth_token")
    const headers = token
    ? { "Authorization": `Token ${token}` }
    : {};

    return fetch("http://localhost:8000/showdetails", {
    headers
    })
    .then(response => response.json());
};

export const getSingleShowDetails = (showId) => {
    const token = localStorage.getItem("auth_token");
    const headers = token
        ? { "Authorization": `Token ${token}` }
        : {};

    return fetch(`http://localhost:8000/showdetails/${showId}`, {
        headers
    })
    .then(response => response.json());
};