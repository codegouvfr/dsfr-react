import React, { memo, forwardRef, type ReactNode, type CSSProperties } from "react";
import { symToStr } from "tsafe/symToStr";
import { assert } from "tsafe/assert";
import type { Equals } from "tsafe";

import type { FrIconClassName, RiIconClassName } from "./fr/generatedFromCss/classNames";
import { fr } from "./fr";
import type { RegisteredLinkProps } from "./link";
import { getLink } from "./link";
import { cx } from "./tools/cx";

//https://main--ds-gouv.netlify.app/example/component/card/
export type CardProps = {
    className?: string;
    title: ReactNode;
    desc?: ReactNode;
    imageUrl?: string;
    imageAlt?: string;
    start?: ReactNode;
    detail?: ReactNode;
    end?: ReactNode;
    endDetail?: ReactNode;
    badges?: ReactNode[]; // todo: restrict to badge component ? these badges are display on the image
    /** where actions can be placed */
    footer?: ReactNode;
    /** Default: "medium", only affect the text */
    size?: "small" | "medium" | "large";
    /** make the whole card clickable */
    enlargeLink?: boolean;
    /** only needed when enlargeLink=true */
    iconId?: FrIconClassName | RiIconClassName;
    shadow?: boolean;
    background?: boolean;
    border?: boolean;
    grey?: boolean;
    classes?: Partial<
        Record<
            | "root"
            | "title"
            | "card"
            | "link"
            | "body"
            | "content"
            | "desc"
            | "header"
            | "img"
            | "imgTag"
            | "start"
            | "detail"
            | "end"
            | "endDetail"
            | "badges"
            | "footer",
            string
        >
    >;
    style?: CSSProperties;
    /** Default false */
    horizontal?: boolean;
} & (CardProps.EnlargedLink | CardProps.NotEnlargedLink);

export namespace CardProps {
    export type EnlargedLink = {
        enlargeLink: true;
        linkProps: RegisteredLinkProps;
        iconId?: FrIconClassName | RiIconClassName;
    };
    export type NotEnlargedLink = {
        enlargeLink?: false;
        linkProps?: RegisteredLinkProps;
        iconId?: never;
    };
}

/** @see <https://react-dsfr-components.etalab.studio/?path=/docs/components-card> */
export const Card = memo(
    forwardRef<HTMLDivElement, CardProps>((props, ref) => {
        const {
            className,
            title,
            linkProps,
            desc,
            imageUrl,
            imageAlt,
            start,
            detail,
            end,
            endDetail,
            badges,
            footer,
            horizontal = false,
            size = "medium",
            classes = {},
            enlargeLink = true,
            background = true,
            border = true,
            shadow = false,
            grey = false,
            iconId,
            style,
            ...rest
        } = props;

        assert<Equals<keyof typeof rest, never>>();

        const { Link } = getLink();

        return (
            <div
                className={cx(
                    fr.cx(
                        "fr-card",
                        enlargeLink && "fr-enlarge-link",
                        horizontal && "fr-card--horizontal",
                        (() => {
                            switch (size) {
                                case "large":
                                    return "fr-card--lg";
                                case "small":
                                    return "fr-card--sm";
                                case "medium":
                                    return undefined;
                            }
                        })(),
                        !background && "fr-card--no-background",
                        !border && "fr-card--no-border",
                        shadow && "fr-card--shadow",
                        grey && "fr-card--grey",
                        iconId !== undefined && iconId
                    ),
                    classes.root,
                    className
                )}
                style={style}
                ref={ref}
                {...rest}
            >
                <div className={cx(fr.cx("fr-card__body"), classes.body)}>
                    <div className={cx(fr.cx("fr-card__content"), classes.content)}>
                        <h3 className={cx(fr.cx("fr-card__title"), classes.title)}>
                            {linkProps !== undefined ? (
                                <Link
                                    {...linkProps}
                                    className={cx(linkProps.className, classes.link)}
                                >
                                    {title}
                                </Link>
                            ) : (
                                title
                            )}
                        </h3>
                        {desc !== undefined && (
                            <p className={cx(fr.cx("fr-card__desc"), classes.desc)}>{desc}</p>
                        )}
                        <div className={cx(fr.cx("fr-card__start"), classes.start)}>
                            {start}
                            {detail !== undefined && (
                                <p className={cx(fr.cx("fr-card__detail"), classes.detail)}>
                                    {detail}
                                </p>
                            )}
                        </div>
                        <div className={cx(fr.cx("fr-card__end"), classes.end)}>
                            {end}
                            {endDetail !== undefined && (
                                <p className={cx(fr.cx("fr-card__detail"), classes.endDetail)}>
                                    {endDetail}
                                </p>
                            )}
                        </div>
                    </div>
                    {footer !== undefined && (
                        <div className={cx(fr.cx("fr-card__footer"), classes.footer)}>{footer}</div>
                    )}
                </div>
                {/* ensure we don't have an empty imageUrl string */}
                {imageUrl !== undefined && imageUrl.length && (
                    <div className={cx(fr.cx("fr-card__header"), classes.header)}>
                        <div className={cx(fr.cx("fr-card__img"), classes.img)}>
                            <img
                                className={cx(fr.cx("fr-responsive-img"), classes.imgTag)}
                                src={imageUrl}
                                alt={imageAlt}
                            />
                        </div>
                        {badges !== undefined && badges.length && (
                            <ul className={cx(fr.cx("fr-badges-group"), classes.badges)}>
                                {badges.map((badge, i) => (
                                    <li key={i}>{badge}</li>
                                ))}
                            </ul>
                        )}
                    </div>
                )}
            </div>
        );
    })
);

Card.displayName = symToStr({ Card });

export default Card;
