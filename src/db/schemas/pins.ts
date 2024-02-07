import { relations } from 'drizzle-orm'
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { sourcesToPinData, users } from '.'

export const mapPins = sqliteTable('pins', {
	id: text('id').notNull().primaryKey(),
	svg: text('svg'),
	background: text('bg_hex'),
	color: text('fill_hex'),

	pinDataId: text('pin_data_id')
		.notNull()
		.references(() => pinData.id),
	userId: text('user_id')
		.notNull()
		.references(() => users.id)
})

export const mapPinRelations = relations(mapPins, ({ one }) => ({
	user: one(users, {
		fields: [mapPins.userId],
		references: [users.id]
	}),
	pinData: one(pinData, {
		fields: [mapPins.pinDataId],
		references: [pinData.id]
	})
}))

export const pinData = sqliteTable('pin_data', {
	//! Make replicable
	id: text('id').notNull().primaryKey(),

	// Data
	name: text('name'),
	address: text('address'),
	description: text('description'),
	price: text('price'),
	rating: integer('rating'),
	coords: text('coords', { mode: 'json' }).$type<{ lat: number; long: number }>()
})

export const pinDataRelations = relations(pinData, ({ many }) => ({
	pins: many(mapPins),
	sources: many(sourcesToPinData)
}))
