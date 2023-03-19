export default async function getHome() {
    const res = await fetch('https://pacific-depths-48667.herokuapp.com/api/home')
    if (!res.ok) throw new Error('failed to fetch data')

    return res.json()
}