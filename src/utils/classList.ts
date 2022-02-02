export interface ClassList {
    [key: string]: boolean;
}

const classList = (classes: ClassList) => {
    return Object.entries(classes)
        .filter((entry) => entry[1])
        .map((entry) => entry[0])
        .join(' ');
};

export default classList;
