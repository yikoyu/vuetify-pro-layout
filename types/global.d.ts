declare type Nullable<T> = T | null
declare type Recordable<T = any> = Record<string, T>
declare interface Fn<T = any, R = T> {
  (...arg: T[]): R
}

declare interface ComponentElRef<T extends HTMLElement = HTMLDivElement> {
  $el: T
}

declare type ComponentRef<T extends HTMLElement = HTMLDivElement> = Nullable<ComponentElRef<T>>
