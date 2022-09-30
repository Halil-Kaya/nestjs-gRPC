export const enumAdapterHelper = (value, valueEnum: Record<string, any>, targetEnum: Record<string, any>): string | number | undefined => {
    const indexOf = Object.values(valueEnum).indexOf(value);
    return targetEnum[Object.keys(valueEnum)[indexOf]]
}
