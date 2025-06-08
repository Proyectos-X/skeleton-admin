
import { ChevronRight } from "lucide-react";
import { useMatches } from "react-router";
import type { ReactNode } from "react";
import type { UIMatch } from "react-router";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "../../ui";
import React from "react";

/**
 * Componente que renderiza un breadcrumb dinámico basado en la ruta actual.
 * Espera que las rutas definidas en el router tengan `handle.breadcrumb`.
 */
export const NavBreadcrumbs = () => {
  const matches = useMatches() as UIMatch<
    unknown,
    { breadcrumb?: (match?: UIMatch) => string | ReactNode }
  >[];

  const crumbs = matches
    .filter((match) => match.handle?.breadcrumb)
    .map((match) => {
      try {
        const label = match.handle.breadcrumb?.(match);
        return label
          ? {
              label,
              path: match.pathname,
            }
          : null;
      } catch {
        return null;
      }
    })
    .filter(Boolean) as { label: string | ReactNode; path: string }[];

  if (crumbs.length === 0) return null;

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {crumbs.map((crumb, index) => {
          const isLast = index === crumbs.length - 1;

          return (
            <React.Fragment key={index}>
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink href={crumb.path}>{crumb.label}</BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {!isLast && <BreadcrumbSeparator><ChevronRight className="size-3.5" /></BreadcrumbSeparator>}
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
