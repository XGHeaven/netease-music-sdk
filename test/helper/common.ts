export async function testLimitOffset(
    picker: (limit: number, offset: number) => any[] | Promise<any[]>,
    limit: number,
    offset: number = 0,
) {
    const list1 = await Promise.resolve(picker(limit, offset))
    const list2 = await Promise.resolve(picker(limit, offset + limit - 1))
    expect(list1).toHaveLength(limit)
    expect(list2).toHaveLength(limit)
    expect(list1[limit - 1]).toEqual(list2[0])
}
