'use client'

import {
	type Context,
	useContext as reactUseContext,
	createContext as reactCreateContext
} from 'react'

export function createContext<T>(defaultValue?: T) {
	return reactCreateContext(defaultValue)
}

export function useContext<T>(Context: Context<T | undefined>): T {
	const context = reactUseContext(Context)
	if (context === undefined) {
		throw new Error('Context is undefined. Check if is being used within its provider')
	}

	return context
}
