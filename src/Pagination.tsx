import React, { memo, forwardRef } from "react";
import { symToStr } from "tsafe/symToStr";
import { assert } from "tsafe/assert";
import type { Equals } from "tsafe";
import { fr } from "./lib";
import { cx } from "./lib/tools/cx";
import { createComponentI18nApi } from "./lib/i18n";
import "./dsfr/component/stepper/stepper.css";
import { getLink } from "./lib/routing";
import type { RegisteredLinkProps } from "./lib/routing";

export type PaginationProps = {
    className?: string;
    count: number;
    defaultPage?: number;
    classes?: Partial<Record<"root" | "list" | "link", string>>;
    showFirstLast?: boolean;
    getPageLinkProps: (pageNumber: number)=> RegisteredLinkProps;
};

const getPageHref = (pageNumber: number) => `/page/${pageNumber}`;

// naive page slicing
const getPaginationParts = ({ count, defaultPage }: { count: number; defaultPage: number }) => {
    const maxVisiblePages = 10;
    const slicesSize = 4;
    // first n pages
    if (count <= maxVisiblePages) {
        return Array.from({ length: count }, (_, v) => ({
            number: v + 1,
            active: defaultPage === v + 1
        }));
    }
    // last n pages
    if (defaultPage > count - maxVisiblePages) {
        return Array.from({ length: maxVisiblePages }, (_, v) => {
            const pageNumber = count - (maxVisiblePages - v) + 1;
            return {
                number: pageNumber,
                active: defaultPage === pageNumber
            };
        });
    }
    // slices
    return [
        ...Array.from({ length: slicesSize }, (_, v) => {
            if (defaultPage > slicesSize) {
                const pageNumber = v + defaultPage;
                return { number: pageNumber, active: defaultPage === pageNumber };
            }
            return { number: v + 1, active: defaultPage === v + 1 };
        }),
        { number: null, active: false },
        ...Array.from({ length: slicesSize }, (_, v) => {
            const pageNumber = count - (slicesSize - v) + 1;
            return {
                number: pageNumber,
                active: defaultPage === pageNumber
            };
        })
    ];
};

/** @see <https://react-dsfr-components.etalab.studio/?path=/docs/components-pagination> */
export const Pagination = memo(
    forwardRef<HTMLDivElement, PaginationProps>((props, ref) => {
        const {
            className,
            count,
            defaultPage = 1,
            showFirstLast = true,
            getPageHref,
            classes = {},
            ...rest
        } = props;

        assert<Equals<keyof typeof rest, never>>();

        const { t } = useTranslation();

        const { Link } = getLink();

        const parts = getPaginationParts({ count, defaultPage });

        return (
            <nav
                role="navigation"
                className={cx(fr.cx("fr-pagination"), classes.root, className)}
                aria-label={t("aria-label")}
                ref={ref}
            >
                <ul className={cx(fr.cx("fr-pagination__list"), classes.list)}>
                    {showFirstLast && (
                        <li>
                            <Link
                                {...(count > 0 && defaultPage > 1 & getPageLinkProp(1))}
                                className={cx(
                                    fr.cx("fr-pagination__link", "fr-pagination__link--first"),
                                    classes.link,
                                    getPageLinkProp(1).className
                                )}
                                aria-disabled={count > 0 ? true : undefined}
                                role="link"
                            >
                                {t("first page")}
                            </Link>
                        </li>
                    )}
                    <li>
                        <a
                            className={cx(
                                fr.cx(
                                    "fr-pagination__link",
                                    "fr-pagination__link--prev",
                                    "fr-pagination__link--lg-label"
                                ),
                                classes.link
                            )}
                            aria-disabled={defaultPage <= 1 ? true : undefined}
                            href={defaultPage > 1 ? getPageHref(defaultPage - 1) : undefined}
                            role="link"
                        >
                            {t("previous page")}
                        </a>
                    </li>
                    {parts.map(part => (
                        <li key={part.number}>
                            {part.number === null ? (
                                <a className={cx(fr.cx("fr-pagination__link"), classes.link)}>
                                    ...
                                </a>
                            ) : (
                                <Link
                                    className={cx(fr.cx("fr-pagination__link"), classes.link)}
                                    aria-current={part.active ? true : undefined}
                                    title={`Page ${part.number}`}
                                    href={getPageHref(part.number)}
                                >
                                    {part.number}
                                </Link>
                            )}
                        </li>
                    ))}
                    <li>
                        <a
                            className={cx(
                                fr.cx(
                                    "fr-pagination__link",
                                    "fr-pagination__link--next",
                                    "fr-pagination__link--lg-label"
                                ),
                                classes.link
                            )}
                            aria-disabled={defaultPage < count ? true : undefined}
                            href={defaultPage < count ? getPageHref(defaultPage + 1) : undefined}
                            role="link"
                        >
                            {t("next page")}
                        </a>
                    </li>
                    {showFirstLast && (
                        <li>
                            <a
                                className={cx(
                                    fr.cx("fr-pagination__link", "fr-pagination__link--last"),
                                    classes.link
                                )}
                                aria-disabled={defaultPage < count ? true : undefined}
                                href={defaultPage < count ? getPageHref(count) : undefined}
                            >
                                {t("last page")}
                            </a>
                        </li>
                    )}
                </ul>
            </nav>
        );
    })
);

Pagination.displayName = symToStr({ Pagination });

const { useTranslation, addPaginationTranslations } = createComponentI18nApi({
    "componentName": symToStr({ Pagination }),
    "frMessages": {
        "first page": "Première page",
        "next page": "Page suivante",
        "last page": "Dernière page",
        "aria-label": "Pagination",
        "previous page": "Page précédente"
    }
});

addPaginationTranslations({
    "lang": "en",
    "messages": {
        "first page": "First page",
        "next page": "Next page",
        "last page": "Last page",
        "aria-label": "Pagination",
        "previous page": "Previous page"
    }
});

export { addPaginationTranslations };

export default Pagination;
