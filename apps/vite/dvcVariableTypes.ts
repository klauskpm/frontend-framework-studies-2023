import { DVCVariable, DVCVariableValue } from '@devcycle/devcycle-js-sdk'
import {
    useVariable as originalUseVariable,
    useVariableValue as originalUseVariableValue
} from '@devcycle/devcycle-react-sdk'

type DVCJSON = { [key: string]: string | boolean | number }

export type DVCVariableTypes = {
    'food-create-edit': boolean
    'food-delete': boolean
    'food-graph': boolean
    'food-list': boolean
    'food-table': boolean
    'foods': boolean
}

export type UseVariableValue = <
    K extends string & keyof DVCVariableTypes,
    T extends DVCVariableValue & DVCVariableTypes[K],
>(
    key: K,
    defaultValue: T
) => DVCVariable<T>['value']

export const useVariableValue: UseVariableValue = originalUseVariableValue

export type UseVariable = <
    K extends string & keyof DVCVariableTypes,
    T extends DVCVariableValue & DVCVariableTypes[K],
>(
    key: K,
    defaultValue: T
) => DVCVariable<T>

export const useVariable: UseVariable = originalUseVariable