import React, { type ReactNode, type CSSProperties } from "react";
import type { AlertProps } from "./Alert";
export type BadgeProps = {
    className?: string;
    style?: CSSProperties;
    severity?: AlertProps.Severity | "new";
    small?: boolean;
    noIcon?: boolean;
    children: NonNullable<ReactNode>;
};
/** @see <https://react-dsfr-components.etalab.studio/?path=/docs/components-badge> */
export declare const Badge: React.MemoExoticComponent<React.ForwardRefExoticComponent<BadgeProps & React.RefAttributes<HTMLDivElement>>>;
export default Badge;
