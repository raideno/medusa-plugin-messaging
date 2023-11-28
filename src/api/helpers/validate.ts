import { validate, ValidationError, ValidatorOptions } from "class-validator";

export default async (object: Object, validatorOptions?: ValidatorOptions): Promise<{
    isValid: boolean;
    errors: ValidationError[];
    0: boolean;
    1: ValidationError[];
}> => {
    const validation = await validate(object, validatorOptions);

    return {
        "0": validation.length === 0,
        "1": validation,
        isValid: validation.length === 0,
        errors: validation
    };
}