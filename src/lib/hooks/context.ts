'use client'

import {
	type Context,
	useContext as reactUseContext,
	createContext as reactCreateContext
} from 'react'

/**
 * Extend react createContext hook to allow for a default value of undefined
 */
export function createContext<T>(defaultValue?: T) {
	return reactCreateContext(defaultValue)
}

/**
 * Extend react useContext hook to throw an error when used outside of a provider
 * @throws when `Context` is used outside of a provider, i.e. `undefined`
 */
export function useContext<T>(Context: Context<T | undefined>): T {
	const context = reactUseContext(Context)
	if (context === undefined) {
		throw new Error('Context is undefined. Check if is being used within its provider')
	}

	return context
}
