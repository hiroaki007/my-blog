export async function fetcher<T = any>(url: string): Promise<T> {
    const res = await fetch(url)
    if (!res.ok) {
        throw new Error('データの取得に失敗しました')
    }
    return res.json()
}