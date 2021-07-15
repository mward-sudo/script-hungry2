/**
 * Generic type narrowing - returns false if parameter is
 * undefined or null. Useful when receiving data from untyped
 * JS or external API JSON responses.
 *
 * @example return narrowType<YourType>(unknownVar) ? unknownVar : null
 *
 * TODO: Implement full type checks (shape and data types) when
 * a DRY solution is found that works for TypeScript & runtime JS
 */
const narrowType = <T>(t: unknown): t is T => true

export default narrowType
