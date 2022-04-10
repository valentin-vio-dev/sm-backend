import { applyDecorators, Type } from '@nestjs/common';
import { ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import { SelectQueryBuilder } from 'typeorm';

export interface PaginatorOptions {
  limit: number;
  currentPage: number;
  order?: string;
}

export interface PaginationResult<T> {
  first: number;
  last: number;
  limit: number;
  results: T[];
}

export async function paginate<T>(
  qb: SelectQueryBuilder<T>,
  options: PaginatorOptions = { limit: 10, currentPage: 1 },
): Promise<PaginationResult<T>> {
  const offset = (options.currentPage - 1) * options.limit;
  const results = await qb.limit(options.limit).offset(offset).getMany();
  return {
    first: offset + 1,
    last: offset + results.length,
    limit: +options.limit,
    results,
  };
}

export const ApiPaginatedDto = <Model extends Type<any>>(options: {
  type: Model;
  description: string;
}) => {
  return applyDecorators(
    ApiOkResponse({
      schema: {
        allOf: [
          {
            properties: {
              first: {
                type: 'number',
              },
              last: {
                type: 'number',
              },
              limit: {
                type: 'number',
              },
              results: {
                type: 'array',
                items: { $ref: getSchemaPath(options.type) },
              },
            },
          },
        ],
      },
      description: options.description,
    }),
  );
};
