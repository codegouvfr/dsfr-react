import React, { type CSSProperties } from "react";
export type FranceConnectButtonProps = FranceConnectButtonProps.Common & (FranceConnectButtonProps.WithUrl | FranceConnectButtonProps.WithOnClick);
export declare namespace FranceConnectButtonProps {
    type Common = {
        className?: string;
        /** Default: false */
        plus?: boolean;
        classes?: Partial<Record<"root" | "login" | "brand", string>>;
        style?: CSSProperties;
    };
    type WithUrl = {
        url: string;
        onClick?: never;
    };
    type WithOnClick = {
        url?: never;
        onClick: React.MouseEventHandler<HTMLButtonElement>;
    };
}
/** @see <https://react-dsfr-components.etalab.studio/?path=/docs/components-franceconnectbutton> */
export declare const FranceConnectButton: React.MemoExoticComponent<React.ForwardRefExoticComponent<FranceConnectButtonProps & React.RefAttributes<HTMLDivElement>>>;
export default FranceConnectButton;
declare const addFranceConnectButtonTranslations: (params: {
    lang: string;
    messages: Partial<{
        "what is service": (params: {
            plus: boolean;
        }) => string;
        "new window": string;
    }>;
}) => void;
export { addFranceConnectButtonTranslations };
