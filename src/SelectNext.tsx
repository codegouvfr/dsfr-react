"use client";

import React, {
    memo,
    forwardRef,
    type ReactNode,
    useId,
    type CSSProperties,
    type ForwardedRef,
    type DetailedHTMLProps,
    type SelectHTMLAttributes,
    type ChangeEvent
} from "react";
import { symToStr } from "tsafe/symToStr";
import { assert } from "tsafe/assert";
import type { Equals } from "tsafe";
import { fr } from "./fr";
import { cx } from "./tools/cx";
import type { FrClassName } from "./fr/generatedFromCss/classNames";
import { createComponentI18nApi } from "./i18n";

export type SelectProps<Options extends SelectProps.Option[]> = {
    options: Options;
    className?: string;
    label: ReactNode;
    hint?: ReactNode;
    nativeSelectProps?: Omit<
        DetailedHTMLProps<SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>,
        "value" | "onChange"
    > & {
        // Overriding the type of value and defaultValue to only accept the value type of the options
        value?: Options[number]["value"];
        onChange?: (
            e: Omit<ChangeEvent<HTMLSelectElement>, "target" | "currentTarget"> & {
                target: Omit<ChangeEvent<HTMLSelectElement>, "value"> & {
                    value: Options[number]["value"];
                };
                currentTarget: Omit<ChangeEvent<HTMLSelectElement>, "value"> & {
                    value: Options[number]["value"];
                };
            }
        ) => void;
    };
    /** Default: false */
    disabled?: boolean;
    /** Default: "default" */
    state?: SelectProps.State | "default";
    /** The message won't be displayed if state is "default" */
    stateRelatedMessage?: ReactNode;
    style?: CSSProperties;
    placeholder?: string;
};

export namespace SelectProps {
    export type Option<T extends string = string> = {
        value: T;
        label: string;
        disabled?: boolean;
        /** Default: false, should be used only in uncontrolled mode */
        selected?: boolean;
    };

    type ExtractState<FrClassName> = FrClassName extends `fr-select-group--${infer State}`
        ? Exclude<State, "disabled">
        : never;

    export type State = ExtractState<FrClassName>;
}

/**
 * @see <https://react-dsfr-components.etalab.studio/?path=/docs/components-select>
 * */
function NonMemoizedNonForwardedSelect<T extends SelectProps.Option[]>(
    props: SelectProps<T>,
    ref: React.LegacyRef<HTMLDivElement>
) {
    const {
        className,
        label,
        hint,
        nativeSelectProps,
        disabled = false,
        options,
        state = "default",
        stateRelatedMessage,
        placeholder,
        style,
        ...rest
    } = props;

    assert<Equals<keyof typeof rest, never>>();

    const { selectId, stateDescriptionId } = (function useClosure() {
        const selectIdExplicitlyProvided = nativeSelectProps?.id;
        const elementId = useId();
        const selectId = selectIdExplicitlyProvided ?? `select-${elementId}`;
        const stateDescriptionId =
            selectIdExplicitlyProvided !== undefined
                ? `${selectIdExplicitlyProvided}-desc`
                : `select-${elementId}-desc`;

        return { selectId, stateDescriptionId };
    })();

    const { t } = useTranslation();

    return (
        <div
            className={cx(
                fr.cx(
                    "fr-select-group",
                    disabled && "fr-select-group--disabled",
                    state !== "default" && `fr-select-group--${state}`
                ),
                className
            )}
            ref={ref}
            style={style}
            {...rest}
        >
            <label className={fr.cx("fr-label")} htmlFor={selectId}>
                {label}
                {hint !== undefined && <span className={fr.cx("fr-hint-text")}>{hint}</span>}
            </label>
            <select
                {...(nativeSelectProps as any)}
                className={cx(fr.cx("fr-select"), nativeSelectProps?.className)}
                id={selectId}
                aria-describedby={stateDescriptionId}
                disabled={disabled}
            >
                {[
                    {
                        "label": placeholder === undefined ? t("select an option") : placeholder,
                        "selected": true,
                        "value": "",
                        "disabled": true
                    },
                    ...options
                ].map((option, index) => (
                    <option {...option} key={`${option.value}-${index}`}>
                        {option.label}
                    </option>
                ))}
            </select>
            {state !== "default" && (
                <p id={stateDescriptionId} className={fr.cx(`fr-${state}-text`)}>
                    {stateRelatedMessage}
                </p>
            )}
        </div>
    );
}

export const Select = memo(forwardRef(NonMemoizedNonForwardedSelect)) as <
    T extends SelectProps.Option[]
>(
    props: SelectProps<T> & { ref?: ForwardedRef<HTMLDivElement> }
) => ReturnType<typeof NonMemoizedNonForwardedSelect>;

(Select as any).displayName = symToStr({ Select });

export default Select;

const { useTranslation, addSelectTranslations } = createComponentI18nApi({
    "componentName": symToStr({ Select }),
    "frMessages": {
        /* spell-checker: disable */
        "select an option": "Selectioner une option"
        /* spell-checker: enable */
    }
});

addSelectTranslations({
    "lang": "en",
    "messages": {
        "select an option": "Select an option"
    }
});

export { addSelectTranslations };
