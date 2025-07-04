export const GenerateImageUrl = (imageId) => {
    const baseUrl = import.meta.env.VITE_API_URL
    if (!id) return ''
    return `${baseUrl}/files?id=${id}`
}