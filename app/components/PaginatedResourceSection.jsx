import * as React from 'react';
import {Pagination} from '@shopify/hydrogen';

/**
 * <PaginatedResourceSection > is a component that encapsulate how the previous and next behaviors throughout your application.
 * @param {Class<Pagination<NodesType>>['connection']>}
 */

export function PaginatedResourceSection({
  connection,
  children,
  resourcesClassName,
  className,
}) {
  return (
    <Pagination connection={connection}>
      {({nodes, isLoading, PreviousLink, NextLink}) => {
        const resoucesMarkup = nodes.map((node, index) =>
          children({node, index}),
        );

        return (
          <div className={`${className}`}>
            <PreviousLink>
              {isLoading ? (
                'Chargement...'
              ) : (
                <span className="py-4">↑ Précédents</span>
              )}
            </PreviousLink>
            {resourcesClassName ? (
              <div className={resourcesClassName}>{resoucesMarkup}</div>
            ) : (
              resoucesMarkup
            )}
            <NextLink>
              {isLoading ? (
                'Chargement...'
              ) : (
                <span className="py-4">Suivants ↓</span>
              )}
            </NextLink>
          </div>
        );
      }}
    </Pagination>
  );
}
