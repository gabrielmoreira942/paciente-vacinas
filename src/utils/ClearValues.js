export { clearObject }

const clearObject = (obj) => {
    for (const key in obj) {
        obj[key] =
            typeof obj[key] === "object" && obj[key] !== null
                ? Object.fromEntries(
                    Object.keys(obj[key]).map((subKey) => [subKey, ""])
                )
                : "";
    }
}