import * as uild from "ulid";

export default (idProperty: string, prefix: string) => {
    if (idProperty) {
        return idProperty;
    }
    const id = uild.ulid();
    prefix = prefix ? "".concat(prefix, "_") : "";
    return "".concat(prefix).concat(id);
}