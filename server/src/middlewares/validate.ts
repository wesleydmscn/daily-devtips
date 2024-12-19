import { Request, Response, NextFunction } from 'express';
import { validate, ValidationError } from 'class-validator';
import { plainToInstance } from 'class-transformer';

type DTOClassType = new () => object;

export const validateDto = (dtoClass: DTOClassType) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const dtoInstance = plainToInstance(dtoClass, req.body);
    const errors: ValidationError[] = await validate(dtoInstance);

    if (errors.length > 0) {
      res.status(400).json({
        message: 'Validation failed',
        errors: errors.map((error) => {
          return {
            field: error.property,
            constraints: error.constraints,
          };
        }),
      });

      return;
    }

    next();
  };
};
